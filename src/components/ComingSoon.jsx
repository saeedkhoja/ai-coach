import { Link } from 'react-router-dom'

export default function ComingSoon({ title, desc }) {
  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      borderRadius: 22, padding: 'clamp(24px,4vw,36px)', marginBottom: 36,
      background: 'linear-gradient(135deg,#1A0A18 0%,#4A0E3A 55%,#6B21A8 100%)',
      border: '1px solid rgba(255,255,255,0.1)',
      boxShadow: '0 12px 48px rgba(107,33,168,0.25)',
    }}>
      {/* Decorative glow */}
      <div style={{ position: 'absolute', top: -40, right: -20, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,143,177,0.35), transparent 70%)', filter: 'blur(20px)' }} />
      <div style={{ position: 'absolute', bottom: -60, left: -30, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.3), transparent 70%)', filter: 'blur(24px)' }} />

      <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ flex: 1, minWidth: 240 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 99, fontSize: 12, fontWeight: 700, letterSpacing: 0.5, background: 'rgba(255,255,255,0.12)', color: '#FBCFE8', marginBottom: 14, border: '1px solid rgba(255,255,255,0.15)' }}>
            ⏳ TEZ ORADA
          </span>
          <h2 className="font-display" style={{ fontSize: 'clamp(22px,4vw,32px)', fontWeight: 700, color: 'white', marginBottom: 10, lineHeight: 1.25 }}>
            {title}
          </h2>
          <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.78)', lineHeight: 1.6, maxWidth: 460 }}>
            {desc}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
          <Link to="/chat" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 24px', borderRadius: 14,
            background: 'white', color: '#6B21A8', fontSize: 14.5, fontWeight: 700, textDecoration: 'none',
            boxShadow: '0 6px 24px rgba(0,0,0,0.2)', whiteSpace: 'nowrap',
          }}>
            💬 Hozircha AI bilan gaplashing
          </Link>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', paddingLeft: 4 }}>
            Tayyor bo'lganda birinchi siz xabar olasiz
          </span>
        </div>
      </div>
    </div>
  )
}
