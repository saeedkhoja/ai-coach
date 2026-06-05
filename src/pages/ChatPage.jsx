import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AvatarSVG from '../components/AvatarSVG'
import ChatWidget from '../components/ChatWidget'

const TOPICS = [
  { icon: '💔', label: 'Janjal & Yarashish' },
  { icon: '💬', label: 'Kommunikatsiya' },
  { icon: '🔒', label: 'Ishonch' },
  { icon: '💝', label: 'Sevgi tili' },
  { icon: '👶', label: 'Farzand masalasi' },
  { icon: '💰', label: 'Moliyaviy masalalar' },
  { icon: '🔄', label: 'Ajrashish oldi' },
  { icon: '😔', label: "Yolg'izlik his" },
]

function ChatHeader() {
  const premium = typeof window !== 'undefined' && localStorage.getItem('munosabat_premium') === 'true'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderBottom: '1px solid #F2E6EA', background: 'rgba(255,253,254,0.96)', backdropFilter: 'blur(12px)', flexShrink: 0 }}>
      <Link to="/" aria-label="Orqaga" style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FBE9EF', color: '#BE185D', fontSize: 18, flexShrink: 0, textDecoration: 'none' }}>
        ‹
      </Link>
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', background: 'linear-gradient(135deg,#FFE4E6,#EDE9FE)' }}>
          <AvatarSVG size={40} animated />
        </div>
        <span style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRadius: '50%', background: '#22C55E', border: '2px solid #FFFDFE' }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p className="font-display" style={{ fontWeight: 700, fontSize: 16, color: '#BE185D', margin: 0, lineHeight: 1.2 }}>Munosabat AI</p>
        <p style={{ fontSize: 12, color: '#22A05A', margin: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} /> onlayn
        </p>
      </div>
      {premium && (
        <span style={{ padding: '5px 12px', borderRadius: 99, fontSize: 11.5, fontWeight: 700, background: 'linear-gradient(135deg,#FFE99A,#FFC94D)', color: '#8A5A00', flexShrink: 0 }}>👑</span>
      )}
    </div>
  )
}

export default function ChatPage() {
  // Klaviatura ochilganda input "sakramasligi" uchun: visualViewport balandligini kuzatamiz
  const [vh, setVh] = useState(null)
  useEffect(() => {
    const vv = window.visualViewport
    if (!vv) return
    const apply = () => setVh(vv.height)
    apply()
    vv.addEventListener('resize', apply)
    vv.addEventListener('scroll', apply)
    return () => { vv.removeEventListener('resize', apply); vv.removeEventListener('scroll', apply) }
  }, [])

  // Body scroll'ni butunlay bloklaymiz — sahifa qimirlamasin
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  const outerStyle = {
    position: 'fixed', inset: 0,
    height: vh ? `${vh}px` : '100dvh',
    display: 'flex', justifyContent: 'center',
    background: '#FFF5F7', overflow: 'hidden',
  }

  return (
    <div style={outerStyle}>
      <div className="chat-shell" style={{ width: '100%', maxWidth: 960, display: 'flex', gap: 16, padding: '14px 16px', height: '100%', minHeight: 0 }}>

        {/* Sidebar — faqat desktop */}
        <aside className="chat-side" style={{ width: 210, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
          <div style={{ background: 'white', border: '1px solid #F2E0E6', borderRadius: 18, padding: '18px 14px', textAlign: 'center' }}>
            <div className="pulse" style={{ width: 60, height: 60, borderRadius: '50%', margin: '0 auto 10px', background: 'linear-gradient(135deg,#FFE4E6,#EDE9FE)', overflow: 'hidden' }}>
              <AvatarSVG size={60} />
            </div>
            <p className="font-display" style={{ fontWeight: 700, fontSize: 15, color: '#BE185D', marginBottom: 2 }}>Munosabat AI</p>
            <p style={{ fontSize: 12, color: '#A0657A', marginBottom: 8 }}>Munosabat maslahatchi</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 99, background: '#F0FDF4', border: '1px solid #BBF7D0', fontSize: 11.5, color: '#15803D' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} /> Onlayn
            </div>
          </div>
          <div style={{ background: 'white', border: '1px solid #F2E0E6', borderRadius: 18, padding: '14px 12px', flex: 1, overflowY: 'auto', minHeight: 0 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#BE185D', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10, padding: '0 4px' }}>Mavzular</p>
            {TOPICS.map((t, i) => (
              <div key={i} className="topic-row" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px', borderRadius: 9, fontSize: 13, color: '#5A2A38', cursor: 'default', transition: 'background 0.15s', marginBottom: 1 }}>
                <span style={{ fontSize: 16 }}>{t.icon}</span> {t.label}
              </div>
            ))}
          </div>
        </aside>

        {/* Chat paneli */}
        <div className="chat-card" style={{ flex: 1, minWidth: 0, background: '#FFFDFE', border: '1px solid #F2E0E6', borderRadius: 22, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 28px rgba(190,24,93,0.07)', minHeight: 0 }}>
          <ChatHeader />
          <ChatWidget />
        </div>
      </div>

      <style>{`
        .topic-row:hover { background: #FFF1F2; }
        @media (max-width: 760px) {
          .chat-side { display: none !important; }
          .chat-shell { padding: 0 !important; gap: 0 !important; max-width: 100% !important; }
          .chat-card { border-radius: 0 !important; border: none !important; box-shadow: none !important; }
        }
      `}</style>
    </div>
  )
}
