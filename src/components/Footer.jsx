import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: 'white', borderTop: '1px solid #F5E0E5' }}>
      <div className="wrap" style={{ padding: '48px 20px 28px' }}>

        {/* Top */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: 40, marginBottom: 40 }} className="footer-g">
          <div>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: 'linear-gradient(135deg,#E11D48,#9333EA)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontSize: 14 }} className="hb">♥</span>
              </div>
              <span className="font-display grad-text" style={{ fontSize: 18, fontWeight: 700 }}>Munosabat AI</span>
            </Link>
            <p style={{ fontSize: 13.5, color: '#9F4F6B', lineHeight: 1.65, marginBottom: 18, maxWidth: 240 }}>
              Juftliklar va sevishganlar uchun O'zbekistondagi ilk AI munosabat maslahatchi platformasi.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {['📸', '🐦', '💼'].map((ic, i) => (
                <a key={i} href="#" style={{ width: 34, height: 34, borderRadius: 9, border: '1px solid #F5E0E5', background: '#FFF8F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#FFE4E6'; e.currentTarget.style.borderColor = '#FECDD3' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#FFF8F9'; e.currentTarget.style.borderColor = '#F5E0E5' }}>
                  {ic}
                </a>
              ))}
            </div>
          </div>

          {[
            { title: 'Xizmatlar', links: [{ to: '/chat', l: 'AI Maslahat' }, { to: '/premium', l: '👑 Premium' }, { to: '/psychologists', l: 'Psixologlar' }, { to: '/courses', l: 'Kurslar' }] },
            { title: 'Bilim', links: [{ to: '/blog', l: 'Blog' }, { to: '/how-it-works', l: 'Qanday ishlaydi' }, { to: '/blog', l: 'Maqolalar' }, { to: '/how-it-works', l: "Qo'llanma" }] },
            { title: 'Kompaniya', links: [{ to: '/', l: 'Biz haqimizda' }, { to: '/', l: 'Aloqa' }, { to: '/', l: 'Maxfiylik' }, { to: '/', l: 'Shartlar' }] },
          ].map((col, i) => (
            <div key={i}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#BE185D', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 14 }}>{col.title}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {col.links.map((lnk, j) => (
                  <Link key={j} to={lnk.to} style={{ fontSize: 13.5, color: '#7A3A50', transition: 'color 0.15s' }}
                    onMouseEnter={e => e.target.style.color = '#BE185D'} onMouseLeave={e => e.target.style.color = '#7A3A50'}>
                    {lnk.l}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div style={{ padding: '24px 28px', borderRadius: 18, background: 'linear-gradient(135deg,#FFF1F2,#F5F3FF)', border: '1px solid #FECDD3', display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <p className="font-display" style={{ fontWeight: 600, fontSize: 16, color: '#BE185D', marginBottom: 3 }}>Haftalik maslahatlar</p>
            <p style={{ fontSize: 13, color: '#9F4F6B' }}>Har hafta eng yaxshi munosabat maslahatlarini oling</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input type="email" placeholder="Elektron pochtangiz" style={{ padding: '10px 16px', borderRadius: 10, border: '1px solid #FECDD3', fontSize: 14, outline: 'none', background: 'white', color: '#1A0A10', minWidth: 220 }} />
            <button className="btn-primary" style={{ padding: '10px 20px', fontSize: 14 }}>Obuna</button>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'space-between', alignItems: 'center', paddingTop: 20, borderTop: '1px solid #F5E0E5' }}>
          <p style={{ fontSize: 13, color: '#C4A0AE' }}>© 2024 Munosabat AI · Sevgi va muruvvat bilan yaratilgan <span className="hb">♥</span></p>
          <p style={{ fontSize: 12, color: '#C4A0AE' }}>O'zbekiston · Barcha huquqlar himoyalangan</p>
        </div>
      </div>

      <style>{`
        .footer-g { grid-template-columns: 1.6fr 1fr 1fr 1fr; }
        @media (max-width: 860px) { .footer-g { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .footer-g { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  )
}
