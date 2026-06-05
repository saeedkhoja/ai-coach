import { useState, useRef, useEffect } from 'react'
import AvatarSVG from './AvatarSVG'

const SYSTEM_PROMPT = `Sen "Munosabat AI" — juftliklar (er-xotin yoki sevishganlar) uchun maxsus yaratilgan, mehribon va professional munosabat maslahatchiasisisan.

Xususiyatlaring:
- Hamdard, iliq va tushunuvchi muloqot olib borasan
- O'zbek tilida gaplashasan
- Munosabatdagi muammolarga ilmiy asosda (John Gottman, Sue Johnson metodikasi) va amaliy maslahatlar berasan
- Hech qachon hukm chiqarmaysan, har doim ikki tomonni ham tushunishga harakat qilasan
- Oddiy, samimiy tilda gaplashasan — akademik yoki sovuq emas
- Har bir javobda biroz iliqlik va umid berasan
- Suhbatni chuqurlashtirish uchun savollar berasan
- Juda uzun javob berma — 2-4 qisqa paragraf kifoya
- Emoji dan kam foydalanasan — 1-2 ta max

Kirishda o'zingni "Munosabat AI — sizning shaxsiy munosabat maslahatchangiz" deb tanishtir.`

const SUGGESTED_QUESTIONS = [
  "Janjal keyin qanday yarashish kerak?",
  "Erim/xotinim meni tushunmaydi",
  "Munosabatimizda kommunikatsiya yo'q",
  "Qanday qilib ishonchni qayta qurish mumkin?",
  "Sevgi so'nib bormoqda, nima qilsam?",
]

function Message({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div className={`message-appear flex gap-3 mb-5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isUser && (
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden shadow-md"
            style={{ background: 'linear-gradient(135deg, #FFE4E6, #EDE9FE)' }}>
            <AvatarSVG size={40} />
          </div>
        </div>
      )}
      <div className={`max-w-[75%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        {!isUser && (
          <span className="text-xs font-medium px-2" style={{ color: '#BE185D' }}>Munosabat AI</span>
        )}
        <div
          className="px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm"
          style={isUser ? {
            background: 'linear-gradient(135deg, #E11D48, #A78BFA)',
            color: 'white',
            borderRadius: '18px 18px 4px 18px',
          } : {
            background: 'rgba(255,255,255,0.85)',
            color: '#4B2A3A',
            borderRadius: '18px 18px 18px 4px',
            border: '1px solid #FECDD3',
          }}
        >
          {msg.content}
        </div>
        <span className="text-xs px-2" style={{ color: '#C4899E' }}>
          {msg.time}
        </span>
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="message-appear flex gap-3 mb-5">
      <div className="w-10 h-10 rounded-full overflow-hidden shadow-md flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, #FFE4E6, #EDE9FE)' }}>
        <AvatarSVG size={40} />
      </div>
      <div>
        <span className="text-xs font-medium px-2 block mb-1" style={{ color: '#BE185D' }}>Munosabat AI</span>
        <div className="px-4 py-3 rounded-2xl rounded-bl-none inline-flex gap-2 items-center"
          style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid #FECDD3' }}>
          <span className="typing-dot w-2 h-2 rounded-full inline-block" style={{ background: '#FB7185' }} />
          <span className="typing-dot w-2 h-2 rounded-full inline-block" style={{ background: '#FB7185' }} />
          <span className="typing-dot w-2 h-2 rounded-full inline-block" style={{ background: '#FB7185' }} />
        </div>
      </div>
    </div>
  )
}

export default function ChatPage({ onBack }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('mehr_api_key') || '')
  const [showApiInput, setShowApiInput] = useState(false)
  const [tempKey, setTempKey] = useState('')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const isInitialized = useRef(false)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true
      sendGreeting()
    }
  }, [])

  const getTime = () => {
    return new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })
  }

  const sendGreeting = async () => {
    setIsTyping(true)
    await new Promise(r => setTimeout(r, 1200))
    setMessages([{
      role: 'assistant',
      content: 'Salom! Men Munosabat AI — sizning shaxsiy munosabat maslahatchangizman 💕\n\nMen er-xotin yoki sevishganlar o\'rtasidagi muammolarni tushunishga va yechim topishga yordam beraman. Bugun qanday muammo yoki savol bilan keldingiz?',
      time: getTime()
    }])
    setIsTyping(false)
    inputRef.current?.focus()
  }

  const saveApiKey = () => {
    if (tempKey.trim()) {
      setApiKey(tempKey.trim())
      localStorage.setItem('mehr_api_key', tempKey.trim())
      setShowApiInput(false)
      setTempKey('')
    }
  }

  const sendMessage = async (text) => {
    const content = text || input.trim()
    if (!content) return
    if (!apiKey) {
      setShowApiInput(true)
      return
    }

    setInput('')
    const userMsg = { role: 'user', content, time: getTime() }
    setMessages(prev => [...prev, userMsg])
    setIsTyping(true)

    try {
      const allMessages = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }))

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: allMessages,
        }),
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        throw new Error(err.error?.message || `HTTP ${response.status}`)
      }

      const data = await response.json()
      const aiText = data.content[0]?.text || ''

      setMessages(prev => [...prev, { role: 'assistant', content: aiText, time: getTime() }])
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Uzr, xatolik yuz berdi: ${err.message}. Iltimos, API kalitingizni tekshiring.`,
        time: getTime()
      }])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ maxHeight: '100vh' }}>
      {/* Header */}
      <header className="glass sticky top-0 z-50 px-4 py-3 shadow-sm"
        style={{ borderBottom: '1px solid #FECDD3' }}>
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-full transition-all hover:scale-110"
            style={{ background: '#FFE4E6', color: '#BE185D' }}
            title="Orqaga"
          >
            ←
          </button>

          <div className="flex items-center gap-3 flex-1">
            <div className="relative">
              <div className="w-11 h-11 rounded-full overflow-hidden shadow-md"
                style={{ background: 'linear-gradient(135deg, #FFE4E6, #EDE9FE)' }}>
                <AvatarSVG size={44} animated />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white"
                style={{ background: '#22C55E' }} />
            </div>
            <div>
              <p className="font-display font-semibold text-base leading-none mb-0.5"
                style={{ color: '#BE185D' }}>Munosabat AI</p>
              <p className="text-xs" style={{ color: '#A0657A' }}>● Onlayn · Doimo tayyor</p>
            </div>
          </div>

          <button
            onClick={() => setShowApiInput(true)}
            className="p-2 rounded-full text-sm transition-all hover:scale-110"
            style={{ background: '#FFE4E6', color: '#BE185D' }}
            title="API kalit"
          >
            🔑
          </button>
        </div>
      </header>

      {/* API Key Modal */}
      {showApiInput && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(190, 24, 93, 0.15)', backdropFilter: 'blur(8px)' }}>
          <div className="glass rounded-3xl p-8 max-w-md w-full shadow-2xl"
            style={{ border: '1px solid #FECDD3' }}>
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">🔑</div>
              <h2 className="font-display text-2xl font-semibold mb-2" style={{ color: '#BE185D' }}>
                API Kalit
              </h2>
              <p className="text-sm" style={{ color: '#9F4F6B' }}>
                Anthropic API kalitingizni kiriting. U faqat sizning brauzeringizda saqlanadi.
              </p>
            </div>
            <input
              type="password"
              value={tempKey}
              onChange={e => setTempKey(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && saveApiKey()}
              placeholder="sk-ant-..."
              className="w-full px-4 py-3 rounded-xl text-sm outline-none mb-4"
              style={{
                background: '#FFF1F2',
                border: '2px solid #FECDD3',
                color: '#4B2A3A',
              }}
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowApiInput(false)}
                className="flex-1 py-3 rounded-xl text-sm font-medium transition-all hover:scale-105"
                style={{ background: '#FFE4E6', color: '#BE185D' }}
              >
                Bekor
              </button>
              <button
                onClick={saveApiKey}
                className="flex-1 py-3 rounded-xl text-sm font-medium text-white transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #E11D48, #A78BFA)' }}
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-4 py-6"
        style={{ maxHeight: 'calc(100vh - 140px)' }}>
        <div className="max-w-3xl mx-auto">
          {messages.map((msg, i) => <Message key={i} msg={msg} />)}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Suggested questions (only if few messages) */}
      {messages.length <= 2 && !isTyping && (
        <div className="px-4 pb-2">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs mb-2 px-1" style={{ color: '#C4899E' }}>Tavsiya etilgan savollar:</p>
            <div className="flex gap-2 flex-wrap">
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  className="text-xs px-3 py-2 rounded-full transition-all hover:scale-105"
                  style={{
                    background: 'rgba(255,255,255,0.8)',
                    border: '1px solid #FECDD3',
                    color: '#BE185D',
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input area */}
      <footer className="glass px-4 py-4 sticky bottom-0"
        style={{ borderTop: '1px solid #FECDD3' }}>
        <div className="max-w-3xl mx-auto flex gap-3 items-end">
          <div className="flex-1 rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.9)', border: '2px solid #FECDD3' }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Muammoingizni yozing..."
              rows={1}
              className="w-full px-4 py-3 text-sm outline-none resize-none"
              style={{
                background: 'transparent',
                color: '#4B2A3A',
                minHeight: '48px',
                maxHeight: '120px',
              }}
            />
          </div>
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || isTyping}
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg transition-all hover:scale-110 disabled:opacity-50 disabled:scale-100 shadow-lg"
            style={{ background: 'linear-gradient(135deg, #E11D48, #A78BFA)', flexShrink: 0 }}
          >
            ➤
          </button>
        </div>
        <p className="text-center text-xs mt-2" style={{ color: '#C4899E' }}>
          Enter — yuborish · Shift+Enter — yangi qator
        </p>
      </footer>
    </div>
  )
}
