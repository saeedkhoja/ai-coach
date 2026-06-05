import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AvatarSVG from './AvatarSVG'

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
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '12px 15px', background: '#F4EEF1', borderRadius: '20px 20px 20px 6px' }}>
      {[0, 1, 2].map(i => (
        <span key={i} className="typing-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: '#C77D9A', display: 'inline-block' }} />
      ))}
    </div>
  )
}

// Bitta xabar pufakchasi (messenger uslubida, guruhlangan)
function Bubble({ msg, streaming, showAvatar, grouped }) {
  const isUser = msg.role === 'user'
  return (
    <div style={{
      display: 'flex', gap: 8, flexDirection: isUser ? 'row-reverse' : 'row',
      alignItems: 'flex-end', marginTop: grouped ? 2 : 12,
    }}>
      {/* Avatar — faqat guruhning oxirgi AI xabarida */}
      {!isUser && (
        <div style={{ width: 30, height: 30, flexShrink: 0 }}>
          {showAvatar && (
            <div style={{ width: 30, height: 30, borderRadius: '50%', overflow: 'hidden', background: 'linear-gradient(135deg,#FFE4E6,#EDE9FE)' }}>
              <AvatarSVG size={30} />
            </div>
          )}
        </div>
      )}

      <div className="bubble-pop" style={{
        maxWidth: '78%',
        padding: '9px 14px', fontSize: 14.5, lineHeight: 1.5, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
        ...(isUser
          ? {
              background: 'linear-gradient(135deg,#E11D48,#A855F7)', color: 'white',
              borderRadius: grouped ? '20px 6px 6px 20px' : '20px 20px 6px 20px',
              boxShadow: '0 1px 2px rgba(225,29,72,0.25)',
            }
          : {
              background: '#F4EEF1', color: '#241019',
              borderRadius: grouped ? '6px 20px 20px 6px' : '20px 20px 20px 6px',
            }
        ),
      }}>
        {msg.content}
        {streaming && <span className="stream-caret" style={{ display: 'inline-block', width: 2, height: 16, marginLeft: 2, background: isUser ? '#fff' : '#C77D9A', verticalAlign: 'text-bottom', borderRadius: 1 }} />}
      </div>
    </div>
  )
}

export default function ChatWidget() {
  const [msgs, setMsgs] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [streamingIdx, setStreamingIdx] = useState(-1)
  const [busy, setBusy] = useState(false)
  const [showPremium, setShowPremium] = useState(false)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)
  const initRef = useRef(false)
  const streamTimer = useRef(null)

  // Faqat xabarlar konteynerini pastga suramiz (butun sahifani emas) — mobil uchun muhim
  const scrollToBottom = () => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }
  useEffect(() => { scrollToBottom() }, [msgs, typing])

  useEffect(() => {
    if (initRef.current) return
    initRef.current = true
    setTyping(true)
    setTimeout(() => {
      setMsgs([{ role: 'assistant', content: GREETING, time: now() }])
      setTyping(false)
    }, 800)
    return () => { if (streamTimer.current) clearTimeout(streamTimer.current) }
  }, [])

  const now = () => new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })
  const isPremium = () => localStorage.getItem('munosabat_premium') === 'true'
  const freeUsed = () => localStorage.getItem('munosabat_free_used') === 'true'

  const streamAssistant = (fullText) => {
    const clean = (fullText || '').trim() || 'Kechirasiz, javob topilmadi.'
    setMsgs(p => {
      const next = [...p, { role: 'assistant', content: '', time: now() }]
      setStreamingIdx(next.length - 1)
      return next
    })
    let i = 0
    const tick = () => {
      i += clean[i] === ' ' ? 1 : 2
      const slice = clean.slice(0, i)
      setMsgs(p => {
        const copy = [...p]
        copy[copy.length - 1] = { ...copy[copy.length - 1], content: slice }
        return copy
      })
      if (i < clean.length) streamTimer.current = setTimeout(tick, 16)
      else { setStreamingIdx(-1); setBusy(false) }
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
      return raw
    }
  }

  const send = async (text) => {
    const content = (text ?? input).trim()
    if (!content || busy) return
    setInput('')
    if (inputRef.current) inputRef.current.style.height = 'auto'
    setMsgs(p => [...p, { role: 'user', content, time: now() }])

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
      if (!isPremium()) localStorage.setItem('munosabat_free_used', 'true')
      setTyping(false)
      streamAssistant(answer)
    } catch (e) {
      setTyping(false)
      setBusy(false)
      setMsgs(p => [...p, { role: 'assistant', content: `Kechirasiz, hozir javob bera olmadim. Iltimos birozdan keyin qayta urinib ko'ring.`, time: now() }])
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, position: 'relative', background: '#FFFDFE' }}>

      {/* Premium taklif modali */}
      {showPremium && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 18, background: 'rgba(43,10,34,0.5)', backdropFilter: 'blur(10px)' }}>
          <div style={{ position: 'relative', overflow: 'hidden', width: '100%', maxWidth: 360, borderRadius: 24, padding: '32px 26px', background: 'linear-gradient(160deg,#2A0A22 0%,#5B1248 55%,#7B1FA2 100%)', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 20px 60px rgba(123,31,162,0.45)' }}>
            <div style={{ position: 'absolute', top: -50, right: -30, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,215,0,0.3), transparent 70%)', filter: 'blur(24px)' }} />
            <div style={{ position: 'relative', textAlign: 'center' }}>
              <div style={{ fontSize: 46, marginBottom: 12 }}>👑</div>
              <h3 className="font-display" style={{ fontSize: 21, fontWeight: 700, color: 'white', marginBottom: 10 }}>Bepul urinishingiz tugadi</h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.78)', lineHeight: 1.6, marginBottom: 20 }}>
                AI maslahatchi bilan <b>cheksiz</b> suhbatni davom ettirish uchun Premium obunaga a'zo bo'ling.
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 6, marginBottom: 4 }}>
                <span className="font-display" style={{ fontSize: 32, fontWeight: 700, color: 'white' }}>99 000</span>
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>so'm / oy</span>
              </div>
              <div style={{ marginBottom: 22 }}>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', textDecoration: 'line-through', marginRight: 8 }}>199 000 so'm</span>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99, background: 'linear-gradient(135deg,#FF4081,#E91E8C)', color: 'white' }}>-50%</span>
              </div>
              <Link to="/premium" style={{ display: 'block', width: '100%', padding: '14px', borderRadius: 13, boxSizing: 'border-box', background: 'linear-gradient(135deg,#FFD700,#FFA000)', color: '#5B2C00', fontSize: 15, fontWeight: 700, textDecoration: 'none', boxShadow: '0 8px 24px rgba(255,160,0,0.35)', marginBottom: 10 }}>
                👑 Premium a'zo bo'lish
              </Link>
              <button onClick={() => setShowPremium(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: 13, cursor: 'pointer', padding: 4 }}>Hozir emas</button>
              <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.5)', marginTop: 12 }}>✓ 7 kun pul qaytarish kafolati</p>
            </div>
          </div>
        </div>
      )}

      {/* Xabarlar (faqat shu joy scroll bo'ladi) */}
      <div ref={scrollRef} className="chat-scroll" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '12px 14px 8px', minHeight: 0, WebkitOverflowScrolling: 'touch' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          {msgs.map((m, i) => {
            const prev = msgs[i - 1]
            const next = msgs[i + 1]
            const grouped = prev && prev.role === m.role          // oldingisi bilan bir xil yuboruvchi
            const showAvatar = !(next && next.role === m.role)    // guruhning oxirgisida avatar
            return <Bubble key={i} msg={m} streaming={i === streamingIdx} grouped={grouped} showAvatar={showAvatar} />
          })}
          {typing && (
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', marginTop: 12 }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', overflow: 'hidden', background: 'linear-gradient(135deg,#FFE4E6,#EDE9FE)', flexShrink: 0 }}>
                <AvatarSVG size={30} />
              </div>
              <TypingDots />
            </div>
          )}
        </div>
      </div>

      {/* Tavsiyalar (faqat boshida) */}
      {msgs.length <= 1 && !typing && (
        <div style={{ padding: '0 14px 8px' }}>
          <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {SUGGESTED.map((q, i) => (
              <button key={i} onClick={() => send(q)} className="suggest-chip" style={{ padding: '7px 13px', borderRadius: 20, border: '1px solid #F3D4DD', background: 'white', color: '#BE185D', fontSize: 12.5, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}>
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input — pastga mahkamlangan */}
      <div style={{ padding: '8px 12px calc(8px + env(safe-area-inset-bottom))', borderTop: '1px solid #F2E6EA', background: '#FFFDFE', flexShrink: 0 }}>
        <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', gap: 8, alignItems: 'flex-end' }}>
          <div className="input-wrap" style={{ flex: 1, display: 'flex', alignItems: 'flex-end', background: '#F6EFF2', borderRadius: 22, padding: '6px 6px 6px 16px', border: '1.5px solid transparent', transition: 'border-color 0.15s' }}>
            <textarea
              ref={inputRef} value={input} rows={1} disabled={busy}
              onChange={e => { setInput(e.target.value); e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px' }}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
              placeholder={busy ? 'Munosabat AI yozmoqda…' : 'Xabar yozing…'}
              style={{ flex: 1, border: 'none', outline: 'none', resize: 'none', fontSize: 15, lineHeight: 1.45, fontFamily: 'inherit', background: 'transparent', color: '#241019', minHeight: 24, maxHeight: 120, padding: '6px 0' }}
            />
            <button onClick={() => send()} disabled={!input.trim() || busy} aria-label="Yuborish"
              style={{ width: 38, height: 38, borderRadius: '50%', border: 'none', flexShrink: 0, cursor: input.trim() && !busy ? 'pointer' : 'default', background: input.trim() && !busy ? 'linear-gradient(135deg,#E11D48,#A855F7)' : '#E7D2DA', color: 'white', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s', transform: input.trim() && !busy ? 'scale(1)' : 'scale(0.92)' }}>
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
