import { useState, useRef, useEffect } from 'react'
import AvatarSVG from './AvatarSVG'

const SYSTEM_PROMPT = `Sen "Mehr AI" — juftliklar (er-xotin yoki sevishganlar) uchun maxsus yaratilgan, mehribon va professional munosabat maslahatchiasisisan.
- O'zbek tilida gaplash
- Hamdard, iliq, samimiy bo'l
- 2-3 qisqa paragraf bilan javob ber
- Munosabat muammolariga amaliy maslahat ber (Gottman, EFT asosida)
- Emoji dan kam foydalanasan — 1-2 ta max`

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
    <div style={{ display: 'flex', gap: 5, padding: '10px 14px', background: '#F9F9F9', borderRadius: '18px 18px 18px 4px', border: '1px solid #F3E8EB', display: 'inline-flex', alignItems: 'center' }}>
      {[0,1,2].map(i => (
        <span key={i} className="typing-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: '#FB7185', display: 'inline-block' }} />
      ))}
    </div>
  )
}

function Message({ msg }) {
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
        }}>{msg.content}</div>
        <span style={{ fontSize: 11, color: '#C4A0AE', padding: '0 3px' }}>{msg.time}</span>
      </div>
    </div>
  )
}

export default function ChatWidget({ compact = false }) {
  const [msgs, setMsgs] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('mehr_api_key') || '')
  const [showKey, setShowKey] = useState(false)
  const [tmpKey, setTmpKey] = useState('')
  const endRef = useRef(null)
  const inputRef = useRef(null)
  const initRef = useRef(false)

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
  }, [])

  const now = () => new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })

  const saveKey = () => {
    if (tmpKey.trim()) {
      setApiKey(tmpKey.trim())
      localStorage.setItem('mehr_api_key', tmpKey.trim())
      setShowKey(false); setTmpKey('')
    }
  }

  const send = async (text) => {
    const content = (text ?? input).trim()
    if (!content) return
    if (!apiKey) { setShowKey(true); return }
    setInput('')
    const userMsg = { role: 'user', content, time: now() }
    setMsgs(p => [...p, userMsg])
    setTyping(true)
    try {
      const history = [...msgs, userMsg].map(m => ({ role: m.role, content: m.content }))
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
        body: JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens: 800, system: SYSTEM_PROMPT, messages: history }),
      })
      if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.error?.message || `HTTP ${res.status}`) }
      const d = await res.json()
      setMsgs(p => [...p, { role: 'assistant', content: d.content[0]?.text || '', time: now() }])
    } catch (e) {
      setMsgs(p => [...p, { role: 'assistant', content: `Xatolik: ${e.message}. API kalitni tekshiring.`, time: now() }])
    } finally { setTyping(false) }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, position: 'relative' }}>

      {/* API Key modal */}
      {showKey && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, background: 'rgba(255,241,242,0.9)', backdropFilter: 'blur(8px)', borderRadius: 'inherit' }}>
          <div style={{ background: 'white', borderRadius: 20, padding: 28, width: '100%', maxWidth: 340, border: '1px solid #FECDD3', boxShadow: '0 8px 40px rgba(190,24,93,0.12)' }}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>🔑</div>
              <p className="font-display" style={{ fontSize: 18, fontWeight: 600, color: '#BE185D', marginBottom: 6 }}>API Kalit kerak</p>
              <p style={{ fontSize: 13, color: '#9F4F6B', lineHeight: 1.5 }}>Anthropic console.anthropic.com dan bepul API kalit oling va bu yerga kiriting</p>
            </div>
            <input type="password" value={tmpKey} onChange={e => setTmpKey(e.target.value)} onKeyDown={e => e.key === 'Enter' && saveKey()} placeholder="sk-ant-api03-..." autoFocus
              style={{ width: '100%', padding: '11px 14px', borderRadius: 12, border: '1.5px solid #FECDD3', fontSize: 13.5, outline: 'none', background: '#FFF1F2', color: '#3D1A28', boxSizing: 'border-box', marginBottom: 12 }} />
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setShowKey(false)} style={{ flex: 1, padding: '11px', borderRadius: 12, border: 'none', background: '#FFE4E6', color: '#BE185D', fontSize: 13.5, fontWeight: 500, cursor: 'pointer' }}>Bekor</button>
              <button onClick={saveKey} style={{ flex: 1, padding: '11px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg,#E11D48,#A78BFA)', color: 'white', fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}>Saqlash</button>
            </div>
          </div>
        </div>
      )}

      {/* Messages area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: compact ? '16px 16px' : '20px 24px', minHeight: 0 }}>
        {msgs.map((m, i) => <Message key={i} msg={m} />)}
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
          <textarea ref={inputRef} value={input} rows={1}
            onChange={e => { setInput(e.target.value); e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px' }}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
            placeholder="Muammoingizni yozing…"
            style={{ flex: 1, border: 'none', outline: 'none', resize: 'none', fontSize: 14, lineHeight: 1.5, fontFamily: 'inherit', background: 'transparent', color: '#2D1520', minHeight: 24, maxHeight: 100, padding: 0 }} />
          <button onClick={() => send()} disabled={!input.trim() || typing}
            style={{ width: 36, height: 36, borderRadius: 10, border: 'none', flexShrink: 0, cursor: input.trim() && !typing ? 'pointer' : 'default', background: input.trim() && !typing ? 'linear-gradient(135deg,#E11D48,#A78BFA)' : '#F5E0E5', color: 'white', fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s', transform: input.trim() && !typing ? 'scale(1)' : 'scale(0.9)' }}>
            ➤
          </button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6, padding: '0 2px' }}>
          <span style={{ fontSize: 11, color: '#C4A0AE' }}>Enter — yuborish · Shift+Enter — yangi qator</span>
          <button onClick={() => setShowKey(true)} style={{ background: 'none', border: 'none', fontSize: 11, color: '#C4A0AE', cursor: 'pointer', fontFamily: 'inherit' }}>🔑 API kalit</button>
        </div>
      </div>
    </div>
  )
}
