import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AvatarSVG from './AvatarSVG'

// Backend bazaviy manzili — production uchun VITE_API_BASE bilan o'zgartiriladi.
// Backend CORS endi har qanday originga ruxsat bergani uchun to'g'ridan-to'g'ri ishlaydi.
const API_BASE = import.meta.env.VITE_API_BASE ?? 'https://staging.calora.uz'
const API_URL = `${API_BASE}/api/MunosabatAi/maslahat`

const GREETING = `Salom! Men sizning shaxsiy AI maslahatchangizman 💕

Munosabatingizdagi har qanday muammo, savol yoki tashvish bilan murojaat qiling. Sizni tinglashga va yordam berishga doimo tayyorman.

Bugun nima haqida gaplashmoqchisiz?`

const SUGGESTED = [
  "Janjal keyin qanday yarashaman?",
  "Erim meni tushunmaydi",
  "Kommunikatsiyamiz yo'q",
  "Ishonchni qanday tiklayman?",
]

function TypingDots() {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '10px 14px', background: '#F9F9F9', borderRadius: '18px 18px 18px 4px', border: '1px solid #F3E8EB' }}>
      {[0, 1, 2].map(i => (
        <span key={i} className="typing-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: '#FB7185', display: 'inline-block' }} />
      ))}
    </div>
  )
}

function Message({ msg, streaming }) {
  const isUser = msg.role === 'user'
  return (
    <div className="message-appear" style={{ display: 'flex', gap: 10, marginBottom: 16, flexDirection: isUser ? 'row-reverse' : 'row', alignItems: 'flex-end' }}>
      {!isUser && (
        <div style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: 'linear-gradient(135deg,#FFE4E6,#EDE9FE)', border: '1.5px solid #FECDD3' }}>
          <AvatarSVG size={32} />
        </div>
      )}
      {isUser && (
        <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, background: 'linear-gradient(135deg,#E11D48,#A78BFA)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 14 }}>
          👤
        </div>
      )}
      <div style={{ maxWidth: '72%', display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-end' : 'flex-start', gap: 3 }}>
        <div style={{
          padding: '10px 15px', fontSize: 14, lineHeight: 1.6, whiteSpace: 'pre-wrap', borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          ...(isUser
            ? { background: 'linear-gradient(135deg,#E11D48,#A78BFA)', color: 'white' }
            : { background: '#F9F9F9', color: '#2D1520', border: '1px solid #F0E0E4' }
          )
        }}>
          {msg.content}
          {streaming && <span className="stream-caret" style={{ display: 'inline-block', width: 2, height: 15, marginLeft: 2, background: '#FB7185', verticalAlign: 'text-bottom', borderRadius: 1 }} />}
        </div>
        {msg.time && <span style={{ fontSize: 11, color: '#C4A0AE', padding: '0 3px' }}>{msg.time}</span>}
      </div>
    </div>
  )
}

export default function ChatWidget({ compact = false }) {
  const [msgs, setMsgs] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)        // fetch jarayonida "..." ko'rsatkichi
  const [streamingIdx, setStreamingIdx] = useState(-1) // qaysi xabar hozir yozilyapti
  const [busy, setBusy] = useState(false)            // input bloklash
  const [showPremium, setShowPremium] = useState(false)
  const endRef = useRef(null)
  const inputRef = useRef(null)
  const initRef = useRef(false)
  const streamTimer = useRef(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, typing])

  useEffect(() => {
    if (initRef.current) return
    initRef.current = true
    setTyping(true)
    setTimeout(() => {
      setMsgs([{ role: 'assistant', content: GREETING, time: now() }])
      setTyping(false)
      inputRef.current?.focus()
    }, 900)
    return () => { if (streamTimer.current) clearTimeout(streamTimer.current) }
  }, [])

  const now = () => new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })

  const isPremium = () => localStorage.getItem('munosabat_premium') === 'true'
  const freeUsed = () => localStorage.getItem('munosabat_free_used') === 'true'

  // Javobni belgi-belgi "yozayotganday" oqim bilan ko'rsatish
  const streamAssistant = (fullText) => {
    const clean = (fullText || '').trim() || 'Kechirasiz, javob topilmadi.'
    setMsgs(p => {
      const next = [...p, { role: 'assistant', content: '', time: now() }]
      setStreamingIdx(next.length - 1)
      return next
    })
    let i = 0
    const tick = () => {
      // har bir qadamda bir nechta belgi qo'shamiz (tezroq, lekin tabiiy)
      i += clean[i] === ' ' ? 1 : 2
      const slice = clean.slice(0, i)
      setMsgs(p => {
        const copy = [...p]
        copy[copy.length - 1] = { ...copy[copy.length - 1], content: slice }
        return copy
      })
      if (i < clean.length) {
        streamTimer.current = setTimeout(tick, 18)
      } else {
        setStreamingIdx(-1)
        setBusy(false)
      }
    }
    tick()
  }

  const parseAnswer = (raw) => {
    try {
      const j = JSON.parse(raw)
      if (typeof j === 'string') return j
      const cand = j.javob ?? j.maslahat ?? j.natija ?? j.result ?? j.message ?? j.text ?? j.data ?? j.response
      if (typeof cand === 'string') return cand
      if (cand && typeof cand === 'object') return cand.text ?? cand.javob ?? JSON.stringify(cand)
      return JSON.stringify(j)
    } catch {
      return raw // oddiy matn
    }
  }

  const send = async (text) => {
    const content = (text ?? input).trim()
    if (!content || busy) return

    // Foydalanuvchi xabarini darhol ko'rsatamiz
    setInput('')
    setMsgs(p => [...p, { role: 'user', content, time: now() }])

    // Gating: birinchi marta bepul, keyin Premium kerak
    if (!isPremium() && freeUsed()) {
      setTimeout(() => setShowPremium(true), 450)
      return
    }

    setBusy(true)
    setTyping(true)
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { accept: '*/*', 'Accept-Language': 'UZ', 'Content-Type': 'application/json' },
        body: JSON.stringify({ muammo: content }),
      })
      if (!res.ok) throw new Error('HTTP ' + res.status)
      const raw = await res.text()
      const answer = parseAnswer(raw)

      // Bepul foydalanish belgilanadi (Premium bo'lmasa)
      if (!isPremium()) localStorage.setItem('munosabat_free_used', 'true')

      setTyping(false)
      streamAssistant(answer)
    } catch (e) {
      setTyping(false)
      setBusy(false)
      setMsgs(p => [...p, { role: 'assistant', content: `Kechirasiz, hozir javob bera olmadim. Iltimos birozdan keyin qayta urinib ko'ring. (${e.message})`, time: now() }])
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, position: 'relative' }}>

      {/* Premium taklif modali */}
      {showPremium && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 18, background: 'rgba(43,10,34,0.45)', backdropFilter: 'blur(8px)', borderRadius: 'inherit' }}>
          <div style={{
            position: 'relative', overflow: 'hidden', width: '100%', maxWidth: 360, borderRadius: 24, padding: '32px 28px',
            background: 'linear-gradient(160deg,#2A0A22 0%,#5B1248 55%,#7B1FA2 100%)',
            border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 20px 60px rgba(123,31,162,0.4)',
          }}>
            <div style={{ position: 'absolute', top: -50, right: -30, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,215,0,0.3), transparent 70%)', filter: 'blur(24px)' }} />
            <div style={{ position: 'relative', textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>👑</div>
              <h3 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: 'white', marginBottom: 10 }}>
                Bepul urinishingiz tugadi
              </h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.78)', lineHeight: 1.6, marginBottom: 20 }}>
                Siz bitta bepul savol berdingiz. AI maslahatchi bilan <b>cheksiz</b> suhbatni davom ettirish uchun Premium obunaga a'zo bo'ling.
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 6, marginBottom: 4 }}>
                <span className="font-display" style={{ fontSize: 32, fontWeight: 700, color: 'white' }}>99 000</span>
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>so'm / oy</span>
              </div>
              <div style={{ marginBottom: 22 }}>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', textDecoration: 'line-through', marginRight: 8 }}>199 000 so'm</span>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99, background: 'linear-gradient(135deg,#FF4081,#E91E8C)', color: 'white' }}>-50%</span>
              </div>
              <Link to="/premium" style={{
                display: 'block', width: '100%', padding: '14px', borderRadius: 13, boxSizing: 'border-box',
                background: 'linear-gradient(135deg,#FFD700,#FFA000)', color: '#5B2C00', fontSize: 15, fontWeight: 700,
                textDecoration: 'none', boxShadow: '0 8px 24px rgba(255,160,0,0.35)', marginBottom: 10,
              }}>
                👑 Premium a'zo bo'lish
              </Link>
              <button onClick={() => setShowPremium(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: 13, cursor: 'pointer', padding: 4 }}>
                Hozir emas
              </button>
              <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.5)', marginTop: 12 }}>
                ✓ 7 kun pul qaytarish kafolati
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Messages area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: compact ? '16px 16px' : '20px 24px', minHeight: 0 }}>
        {msgs.map((m, i) => <Message key={i} msg={m} streaming={i === streamingIdx} />)}
        {typing && (
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', marginBottom: 16 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', background: 'linear-gradient(135deg,#FFE4E6,#EDE9FE)', border: '1.5px solid #FECDD3', flexShrink: 0 }}>
              <AvatarSVG size={32} />
            </div>
            <TypingDots />
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Suggested chips */}
      {msgs.length <= 1 && !typing && (
        <div style={{ padding: '0 16px 10px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {SUGGESTED.map((q, i) => (
            <button key={i} onClick={() => send(q)} style={{ padding: '6px 13px', borderRadius: 20, border: '1px solid #FECDD3', background: 'white', color: '#BE185D', fontSize: 12.5, cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'inherit' }}
              onMouseEnter={e => { e.target.style.background = '#FFE4E6' }} onMouseLeave={e => { e.target.style.background = 'white' }}>
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input bar */}
      <div style={{ padding: '10px 14px 14px', borderTop: '1px solid #F0E0E4', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', background: 'white', border: '1.5px solid #FECDD3', borderRadius: 16, padding: '8px 8px 8px 14px', boxShadow: '0 2px 8px rgba(190,24,93,0.06)', transition: 'border-color 0.15s' }}
          onFocusCapture={e => e.currentTarget.style.borderColor = '#FB7185'} onBlurCapture={e => e.currentTarget.style.borderColor = '#FECDD3'}>
          <textarea ref={inputRef} value={input} rows={1} disabled={busy}
            onChange={e => { setInput(e.target.value); e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px' }}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
            placeholder={busy ? 'Munosabat AI yozmoqda…' : 'Muammoingizni yozing…'}
            style={{ flex: 1, border: 'none', outline: 'none', resize: 'none', fontSize: 14, lineHeight: 1.5, fontFamily: 'inherit', background: 'transparent', color: '#2D1520', minHeight: 24, maxHeight: 100, padding: 0 }} />
          <button onClick={() => send()} disabled={!input.trim() || busy}
            style={{ width: 36, height: 36, borderRadius: 10, border: 'none', flexShrink: 0, cursor: input.trim() && !busy ? 'pointer' : 'default', background: input.trim() && !busy ? 'linear-gradient(135deg,#E11D48,#A78BFA)' : '#F5E0E5', color: 'white', fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s', transform: input.trim() && !busy ? 'scale(1)' : 'scale(0.9)' }}>
            ➤
          </button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 6 }}>
          <span style={{ fontSize: 11, color: '#C4A0AE' }}>Enter — yuborish · Shift+Enter — yangi qator</span>
        </div>
      </div>
    </div>
  )
}
