import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AvatarSVG from '../components/AvatarSVG'

const FEATURES = [
  { icon: '💬', title: 'AI Maslahat', desc: 'Istalgan vaqt, 7/24. Muammoingizni yozing — AI yechim topishga yordam beradi.', to: '/chat' },
  { icon: '👩‍⚕️', title: 'Real Psixologlar', desc: 'Sertifikatlangan munosabat mutaxassislari bilan onlayn sessiya band qiling.', to: '/psychologists' },
  { icon: '📚', title: 'Kurslar', desc: "Gottman va EFT metodikasiga asoslangan amaliy kurslarni o'z sur'atda o'ting.", to: '/courses' },
  { icon: '✨', title: 'Munosabat Testi', desc: 'Juftligingizdagi kuchli va zaif tomonlarni 8 ta savol orqali aniqlang.', to: '/quiz' },
]

const STEPS = [
  { n: '1', icon: '💬', title: 'AI bilan gaplashing', desc: 'Muammoingizni yozing. AI darhol javob beradi.' },
  { n: '2', icon: '📊', title: 'Tahlil oling', desc: "Vaziyatingizni tushuning, yechim yo'llarini ko'ring." },
  { n: '3', icon: '🌱', title: 'Rivojlaning', desc: 'Psixolog yoki kurs orqali chuqurroq ishlang.' },
]

const REVIEWS = [
  { name: 'Malika T.', city: 'Toshkent', text: "Mehr AI bizning nikohimizni saqlab qoldi. 3 yillik muammomizga 2 hafta ichida yechim topdik.", stars: 5 },
  { name: 'Sardor va Nilufar', city: 'Samarqand', text: "AI chat juda foydali bo'ldi. Psixolog kursi esa hamma narsani o'zgartirdi.", stars: 5 },
  { name: 'Zulfiya R.', city: 'Namangan', text: "Kechasi soat 2da ham maslahat olish mumkin. Bu imkoniyat menga juda kerak edi.", stars: 5 },
]

const TIPS = [
  '"Munosabatingizdagi eng kichik yaxshilik — eng katta sarmoya."',
  '"Bir-biringizni tinglash — sevgining eng chuqur ifodasi."',
  '"Har bir qiyinchilik juftliklarni kuchaytiradi."',
  '"Minnatdorlik — baxtli munosabatning siriga."',
]

export default function HomePage() {
  const [tip, setTip] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setTip(p => (p + 1) % TIPS.length), 3800)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="page-bg">

      {/* ── HERO ── */}
      <section className="section" style={{ paddingBottom: 72 }}>
        <div className="wrap" style={{ textAlign: 'center' }}>

          {/* Avatar */}
          <div className="fade-up" style={{ marginBottom: 24 }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <div className="pulse" style={{ width: 100, height: 100, borderRadius: '50%', margin: '0 auto', background: 'linear-gradient(135deg,#FFE4E6,#EDE9FE)', border: '3px solid #FECDD3', overflow: 'hidden', boxShadow: '0 8px 32px rgba(190,24,93,0.15)' }}>
                <AvatarSVG size={100} />
              </div>
              <span style={{ position: 'absolute', bottom: 4, right: 4, width: 16, height: 16, borderRadius: '50%', background: '#22C55E', border: '3px solid white', boxShadow: '0 2px 8px rgba(34,197,94,0.4)' }} />
            </div>
          </div>

          {/* Headline */}
          <div className="fade-up-1">
            <div className="tag" style={{ marginBottom: 20, fontSize: 12.5 }}>
              <span className="hb">♥</span> O'zbekiston №1 munosabat platformasi
            </div>
            <h1 className="font-display" style={{ fontSize: 'clamp(38px, 7vw, 68px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 20, letterSpacing: '-1px' }}>
              <span className="grad-text">Munosabatingiz</span>
              <br />mustahkam bo'lsin
            </h1>
            <p style={{ fontSize: 'clamp(16px, 2.5vw, 19px)', color: '#7A3A50', lineHeight: 1.65, maxWidth: 520, margin: '0 auto 32px', fontWeight: 300 }}>
              Er-xotin va sevishganlar uchun AI maslahatchi, real psixologlar va o'quv kurslarini bir platformada toping.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="fade-up-2" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
            <Link to="/chat" className="btn-primary" style={{ fontSize: 16, padding: '14px 30px' }}>
              💬 AI bilan suhbat boshlang
            </Link>
            <Link to="/how-it-works" className="btn-secondary" style={{ fontSize: 16, padding: '14px 28px' }}>
              Qanday ishlaydi?
            </Link>
          </div>

          {/* Trust bar */}
          <div className="fade-up-3" style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center', marginBottom: 56 }}>
            {[['12 000+', 'Foydalanuvchi'], ['4.9 ★', 'Baho'], ['50+', 'Psixolog'], ['98%', 'Mamnuniyat']].map(([v, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div className="font-display grad-text" style={{ fontSize: 26, fontWeight: 700, lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: 12, color: '#B07A8E', marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Rotating tip */}
          <div style={{ maxWidth: 420, margin: '0 auto', padding: '14px 20px', borderRadius: 14, background: 'rgba(255,255,255,0.8)', border: '1px solid #FECDD3' }}>
            <p key={tip} className="msg-in" style={{ fontSize: 13.5, color: '#9F4F6B', fontStyle: 'italic' }}>
              💡 {TIPS[tip]}
            </p>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── HOW IT WORKS ── */}
      <section className="section-sm">
        <div className="wrap-sm">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="tag" style={{ marginBottom: 12 }}>Jarayon</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(22px,4vw,34px)', fontWeight: 700, color: '#1A0A10' }}>
              3 qadamda boshlang
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="steps-g">
            {STEPS.map((s, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '28px 20px' }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, background: 'linear-gradient(135deg,#FFE4E6,#EDE9FE)', border: '1px solid #FECDD3' }}>
                  {s.icon}
                </div>
                <div style={{ width: 24, height: 24, borderRadius: '50%', margin: '-8px auto 12px', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#E11D48,#9333EA)', color: 'white' }}>{s.n}</div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1A0A10', marginBottom: 6 }}>{s.title}</h3>
                <p style={{ fontSize: 13.5, color: '#9F4F6B', lineHeight: 1.55 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── FEATURES ── */}
      <section className="section">
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="tag" style={{ marginBottom: 12 }}>Imkoniyatlar</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(22px,4vw,36px)', fontWeight: 700, color: '#1A0A10', marginBottom: 12 }}>
              Bir platformada — hamma narsani toping
            </h2>
            <p style={{ fontSize: 16, color: '#9F4F6B', maxWidth: 480, margin: '0 auto' }}>
              AI dan psixologlargacha, testlardan kurslargacha — munosabatingiz uchun zarur barcha vosita
            </p>
          </div>
          <div className="grid-2" style={{ gap: 14 }}>
            {FEATURES.map((f, i) => (
              <Link key={i} to={f.to} style={{ textDecoration: 'none' }}>
                <div className="card" style={{ padding: '26px 24px', display: 'flex', gap: 18, alignItems: 'flex-start', height: '100%' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 13, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, background: 'linear-gradient(135deg,#FFE4E6,#EDE9FE)', border: '1px solid #FECDD3' }}>
                    {f.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: '#BE185D', marginBottom: 6 }}>{f.title}</h3>
                    <p style={{ fontSize: 13.5, color: '#7A3A50', lineHeight: 1.6, marginBottom: 10 }}>{f.desc}</p>
                    <span style={{ fontSize: 13, color: '#E11D48', fontWeight: 500 }}>Ko'rish →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── REVIEWS ── */}
      <section className="section-sm">
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div className="tag" style={{ marginBottom: 12 }}>Sharhlar</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(20px,3.5vw,32px)', fontWeight: 700, color: '#1A0A10' }}>
              Ular nima deydi?
            </h2>
          </div>
          <div className="grid-3" style={{ gap: 14 }}>
            {REVIEWS.map((r, i) => (
              <div key={i} className="card" style={{ padding: '22px 20px' }}>
                <div style={{ display: 'flex', gap: 1, marginBottom: 10 }}>
                  {[1,2,3,4,5].map(s => <span key={s} style={{ color: '#F59E0B', fontSize: 14 }}>★</span>)}
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: '#3D1A28', fontStyle: 'italic', marginBottom: 14 }}>"{r.text}"</p>
                <div>
                  <p style={{ fontWeight: 600, fontSize: 13.5, color: '#BE185D', marginBottom: 1 }}>{r.name}</p>
                  <p style={{ fontSize: 12, color: '#C4A0AE' }}>{r.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── PREMIUM SUBSCRIPTION ── */}
      <section className="section">
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px', borderRadius: 99, fontSize: 12.5, fontWeight: 700, letterSpacing: 0.5, background: 'linear-gradient(135deg,#FFD700,#FFA000)', color: '#5B2C00', marginBottom: 14, boxShadow: '0 4px 16px rgba(255,160,0,0.25)' }}>
              👑 PREMIUM A'ZOLIK
            </div>
            <h2 className="font-display" style={{ fontSize: 'clamp(22px,4vw,36px)', fontWeight: 700, color: '#1A0A10', marginBottom: 12 }}>
              Bepul boshlang, Premium bilan to'liq oching
            </h2>
            <p style={{ fontSize: 16, color: '#9F4F6B', maxWidth: 500, margin: '0 auto' }}>
              Har ikki rejada ham boshlash mumkin. Premium sizga cheksiz imkoniyat beradi.
            </p>
          </div>

          {/* Free vs Premium cards */}
          <div className="plans-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 18, alignItems: 'stretch', maxWidth: 760, margin: '0 auto' }}>

            {/* FREE */}
            <div style={{ background: 'white', border: '1px solid #F0E0E4', borderRadius: 22, padding: '28px 26px', display: 'flex', flexDirection: 'column' }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#9F4F6B', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 }}>Bepul</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 18 }}>
                <span className="font-display" style={{ fontSize: 34, fontWeight: 700, color: '#1A0A10' }}>0</span>
                <span style={{ fontSize: 14, color: '#9F4F6B' }}>so'm</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11, flex: 1, marginBottom: 22 }}>
                {[
                  [true, 'AI maslahat — cheklangan'],
                  [true, 'Munosabat testi'],
                  [true, 'Blog va maqolalar'],
                  [false, 'Cheksiz suhbat'],
                  [false, 'Video kurslar'],
                  [false, 'Psixolog chegirmasi'],
                ].map(([ok, t], i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 13.5, color: ok ? '#3D1A28' : '#C4A0AE' }}>
                    <span style={{ flexShrink: 0, width: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, background: ok ? '#DCFCE7' : '#F3E8EC', color: ok ? '#16A34A' : '#D1A5B3' }}>{ok ? '✓' : '×'}</span>
                    {t}
                  </div>
                ))}
              </div>
              <Link to="/chat" className="btn-secondary" style={{ justifyContent: 'center', width: '100%' }}>
                Bepul boshlash
              </Link>
            </div>

            {/* PREMIUM */}
            <div style={{ position: 'relative', borderRadius: 22, padding: '28px 26px', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: 'linear-gradient(160deg,#2A0A22 0%,#5B1248 55%,#7B1FA2 100%)', boxShadow: '0 16px 48px rgba(123,31,162,0.3)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <div style={{ position: 'absolute', top: -50, right: -30, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,215,0,0.28), transparent 70%)', filter: 'blur(24px)' }} />
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#FFD700', textTransform: 'uppercase', letterSpacing: 0.8 }}>👑 Premium</p>
                  <span style={{ fontSize: 10.5, fontWeight: 700, padding: '3px 10px', borderRadius: 99, background: 'linear-gradient(135deg,#FF4081,#E91E8C)', color: 'white' }}>-50%</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 2 }}>
                  <span className="font-display" style={{ fontSize: 34, fontWeight: 700, color: 'white' }}>99 000</span>
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>so'm / oy</span>
                </div>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', textDecoration: 'line-through', marginBottom: 18 }}>199 000 so'm</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 11, flex: 1, marginBottom: 22 }}>
                  {[
                    'Cheksiz AI maslahat 24/7',
                    'Suhbat tarixini eslab qoladi',
                    'Barcha video kurslar bepul',
                    'Psixolog sessiyalariga 30% chegirma',
                    'Haftalik rivojlanish hisoboti',
                    'Reklama yo\'q · Birinchi navbatda',
                  ].map((t, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 13.5, color: 'rgba(255,255,255,0.92)' }}>
                      <span style={{ flexShrink: 0, width: 18, height: 18, borderRadius: '50%', background: 'rgba(74,222,128,0.22)', color: '#4ADE80', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>✓</span>
                      {t}
                    </div>
                  ))}
                </div>
                <Link to="/premium" style={{ display: 'block', textAlign: 'center', width: '100%', padding: '14px', borderRadius: 13, boxSizing: 'border-box', background: 'linear-gradient(135deg,#FFD700,#FFA000)', color: '#5B2C00', fontSize: 15, fontWeight: 700, textDecoration: 'none', boxShadow: '0 8px 24px rgba(255,160,0,0.35)' }}>
                  👑 Premium a'zo bo'lish
                </Link>
              </div>
            </div>
          </div>

          <p style={{ textAlign: 'center', fontSize: 13, color: '#BE185D', marginTop: 20, fontWeight: 500 }}>
            ⏰ -50% chegirma faqat birinchi 100 a'zo uchun · ✓ 7 kun pul qaytarish kafolati
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section">
        <div className="wrap-sm">
          <div style={{ borderRadius: 28, padding: 'clamp(36px,5vw,56px) clamp(24px,4vw,48px)', textAlign: 'center', background: 'linear-gradient(135deg,#E11D48 0%,#9333EA 100%)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.06) 0%, transparent 50%)' }} />
            <h2 className="font-display" style={{ fontSize: 'clamp(22px,4vw,36px)', fontWeight: 700, color: 'white', marginBottom: 12, position: 'relative' }}>
              Munosabatingizni yangi bosqichga olib chiqing
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', marginBottom: 28, position: 'relative' }}>
              Birinchi suhbat bepul — hoziroq boshlang
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
              <Link to="/chat" style={{ padding: '13px 26px', borderRadius: 14, fontWeight: 600, fontSize: 15, background: 'white', color: '#E11D48', textDecoration: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}>
                💬 AI bilan boshlang
              </Link>
              <Link to="/psychologists" style={{ padding: '13px 26px', borderRadius: 14, fontWeight: 600, fontSize: 15, background: 'rgba(255,255,255,0.15)', color: 'white', textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.35)' }}>
                👩‍⚕️ Psixolog tanlang
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .steps-g { grid-template-columns: 1fr !important; }
          .plans-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
