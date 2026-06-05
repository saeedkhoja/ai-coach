import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const LINKS = [
  { to: '/psychologists', label: 'Psixologlar' },
  { to: '/courses', label: 'Kurslar' },
  { to: '/blog', label: 'Blog' },
  { to: '/quiz', label: 'Test' },
  { to: '/how-it-works', label: 'Qanday ishlaydi' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false); document.body.style.overflow = '' }, [pathname])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])

  return (
    <>
      <header style={{
        position: 'sticky', top: 0, zIndex: 100, height: 64,
        background: scrolled ? 'rgba(255,250,250,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(254,205,211,0.5)' : '1px solid transparent',
        transition: 'all 0.25s',
      }}>
        <div className="wrap" style={{ height: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '0 20px' }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, marginRight: 8 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg,#E11D48,#9333EA)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 10px rgba(225,29,72,0.3)' }}>
              <span style={{ color: 'white', fontSize: 15 }} className="hb">♥</span>
            </div>
            <span className="font-display grad-text" style={{ fontSize: 19, fontWeight: 700 }}>Munosabat AI</span>
          </Link>

          <div style={{ flex: 1 }} />

          {/* Desktop links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="d-nav">
            {LINKS.map(l => (
              <Link key={l.to} to={l.to} style={{
                padding: '6px 13px', borderRadius: 8, fontSize: 14, fontWeight: 500,
                color: pathname === l.to ? '#BE185D' : '#7A3A50',
                background: pathname === l.to ? '#FFF1F2' : 'transparent',
                transition: 'all 0.15s',
              }}>
                {l.label}
              </Link>
            ))}
          </nav>

          <Link to="/premium" className="d-nav" style={{
            padding: '7px 14px', borderRadius: 8, fontSize: 14, fontWeight: 700, marginLeft: 4,
            color: '#8A5A00', background: 'linear-gradient(135deg,#FFE99A,#FFC94D)',
            display: 'inline-flex', alignItems: 'center', gap: 5,
          }}>
            👑 Premium
          </Link>

          <Link to="/chat" className="btn-primary d-nav" style={{ padding: '8px 18px', fontSize: 14, marginLeft: 10 }}>
            💬 AI Maslahat
          </Link>

          {/* Hamburger */}
          <button onClick={() => setOpen(p => !p)} className="ham-btn" style={{ display: 'none', width: 38, height: 38, borderRadius: 9, border: 'none', background: '#FFF1F2', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, flexShrink: 0 }}>
            {[0,1,2].map(i => (
              <span key={i} style={{ display: 'block', width: 18, height: 2, borderRadius: 2, background: '#BE185D', transition: 'all 0.2s',
                transform: open && i === 0 ? 'rotate(45deg) translate(5px,5px)' : open && i === 2 ? 'rotate(-45deg) translate(5px,-5px)' : 'none',
                opacity: open && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </header>

      {/* Overlay */}
      {open && <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 98, background: 'rgba(0,0,0,0.08)', backdropFilter: 'blur(3px)' }} />}

      {/* Mobile drawer */}
      <div style={{
        position: 'fixed', top: 64, left: 0, right: 0, zIndex: 99,
        background: 'rgba(255,250,250,0.98)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #FECDD3', padding: '12px 16px 18px',
        transform: open ? 'translateY(0)' : 'translateY(-120%)',
        opacity: open ? 1 : 0,
        visibility: open ? 'visible' : 'hidden',
        pointerEvents: open ? 'auto' : 'none',
        transition: 'transform 0.22s cubic-bezier(0.4,0,0.2,1), opacity 0.2s',
      }} className="mob-drawer">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 12 }}>
          {LINKS.map(l => (
            <Link key={l.to} to={l.to} style={{
              padding: '11px 14px', borderRadius: 10, fontSize: 15, fontWeight: 500,
              color: pathname === l.to ? '#BE185D' : '#5A2A38',
              background: pathname === l.to ? '#FFF1F2' : 'transparent',
            }}>{l.label}</Link>
          ))}
          <Link to="/premium" style={{
            padding: '11px 14px', borderRadius: 10, fontSize: 15, fontWeight: 700,
            color: '#8A5A00', background: 'linear-gradient(135deg,#FFE99A,#FFC94D)',
            display: 'flex', alignItems: 'center', gap: 6, marginTop: 4,
          }}>👑 Premium a'zolik</Link>
        </div>
        <Link to="/chat" className="btn-primary" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          💬 AI bilan suhbat boshlang
        </Link>
      </div>

      <style>{`
        @media (max-width: 740px) {
          .d-nav { display: none !important; }
          .ham-btn { display: flex !important; }
        }
        @media (min-width: 741px) {
          .mob-drawer { display: none !important; }
        }
      `}</style>
    </>
  )
}
