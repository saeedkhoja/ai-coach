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
  { icon: '😔', label: 'Yolg\'izlik his' },
]

export default function ChatPage() {
  return (
    <div className="page-bg" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ maxWidth: 980, margin: '0 auto', width: '100%', flex: 1, display: 'flex', gap: 16, padding: '20px 20px', minHeight: 0, height: 0 }}>

        {/* Sidebar */}
        <aside style={{ width: 210, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12 }} className="chat-side">

          {/* Avatar card */}
          <div style={{ background: 'white', border: '1px solid #F5E0E5', borderRadius: 18, padding: '20px 16px', textAlign: 'center' }}>
            <div className="pulse" style={{ width: 64, height: 64, borderRadius: '50%', margin: '0 auto 10px', background: 'linear-gradient(135deg,#FFE4E6,#EDE9FE)', border: '2px solid #FECDD3', overflow: 'hidden' }}>
              <AvatarSVG size={64} />
            </div>
            <p className="font-display" style={{ fontWeight: 700, fontSize: 15, color: '#BE185D', marginBottom: 2 }}>Munosabat AI</p>
            <p style={{ fontSize: 12, color: '#A0657A', marginBottom: 8 }}>Munosabat maslahatchi</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 99, background: '#F0FDF4', border: '1px solid #BBF7D0', fontSize: 11.5, color: '#15803D' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} />
              Onlayn
            </div>
          </div>

          {/* Topics */}
          <div style={{ background: 'white', border: '1px solid #F5E0E5', borderRadius: 18, padding: '14px 12px', flex: 1 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#BE185D', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10, padding: '0 4px' }}>Mavzular</p>
            {TOPICS.map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 8px', borderRadius: 8, fontSize: 13, color: '#5A2A38', cursor: 'default', transition: 'background 0.15s', marginBottom: 1 }}
                onMouseEnter={e => e.currentTarget.style.background = '#FFF1F2'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <span style={{ fontSize: 16 }}>{t.icon}</span> {t.label}
              </div>
            ))}
          </div>
        </aside>

        {/* Chat */}
        <div style={{ flex: 1, minWidth: 0, background: 'white', border: '1px solid #F5E0E5', borderRadius: 22, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 20px rgba(190,24,93,0.06)' }}>
          {/* Header */}
          <div style={{ padding: '14px 20px', borderBottom: '1px solid #FAF0F2', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', overflow: 'hidden', background: 'linear-gradient(135deg,#FFE4E6,#EDE9FE)', border: '2px solid #FECDD3' }}>
                <AvatarSVG size={42} animated />
              </div>
              <span style={{ position: 'absolute', bottom: 1, right: 1, width: 10, height: 10, borderRadius: '50%', background: '#22C55E', border: '2px solid white' }} />
            </div>
            <div style={{ flex: 1 }}>
              <p className="font-display" style={{ fontWeight: 600, fontSize: 15, color: '#BE185D', margin: 0 }}>Munosabat AI</p>
              <p style={{ fontSize: 12, color: '#A0657A', margin: 0 }}>Munosabat maslahatchi · O'zbek tilida</p>
            </div>
            <button onClick={() => { const k = localStorage.getItem('mehr_api_key'); if(k) { localStorage.removeItem('mehr_api_key'); window.location.reload() } }} style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid #F5E0E5', background: 'transparent', color: '#B07A8E', fontSize: 12, cursor: 'pointer' }}>
              🔑 API kalit
            </button>
          </div>
          <ChatWidget />
        </div>
      </div>

      <style>{`
        @media (max-width: 680px) { .chat-side { display: none !important; } }
      `}</style>
    </div>
  )
}
