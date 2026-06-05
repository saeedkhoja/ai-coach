import { Link } from 'react-router-dom'

const STEPS = [
  {
    n: '01', icon: '👑', title: 'Premium harid qiling',
    desc: 'AI maslahatchi bilan cheksiz suhbat qilish uchun Premium obunaga a\'zo bo\'ling.',
    items: ['Premium sahifasiga o\'ting', 'Click yoki Payme orqali to\'lov qiling', 'Atigi 99 000 so\'m / oy — bir piyola qahva narxida', '7 kun pul qaytarish kafolati'],
    note: 'Istalgan vaqt bekor qila olasiz — hech qanday majburiyat yo\'q.',
  },
  {
    n: '02', icon: '💬', title: 'AI bilan suhbat boshlang',
    desc: 'Chat sahifasiga o\'tib muammoingizni yozing. AI darhol javob beradi.',
    items: ['Muammoingizni erkin yozing', 'AI tahlil qilib, maslahat beradi', 'Chuqurroq muhokama uchun savol bering', 'Istalgan vaqt — 7/24 tayyor'],
    note: 'O\'zbek tilida gaplashadi.',
  },
  {
    n: '03', icon: '👩‍⚕️', title: 'Psixolog bilan ishlang',
    desc: 'Murakkab yoki davomiy muammolar uchun real psixolog bilan onlayn sessiya o\'ting.',
    items: ['Mutaxassislik va narxga qarab tanlang', '"Band qilish" orqali vaqt belgilang', 'Psixolog siz bilan bog\'lanadi', 'Video yoki chat orqali sessiya'],
    note: 'Birinchi 15 daqiqa bepul.',
  },
  {
    n: '04', icon: '📚', title: 'Kurs va test',
    desc: 'O\'z sur\'atda kurslarni o\'ting yoki munosabat testini topshiring.',
    items: ['30+ kurs mavjud', 'Boshlang\'ich dan ilg\'orgacha darajalar', 'Munosabat sog\'lomligini tekshiring', 'Natijaga qarab shaxsiy maslahat'],
    note: 'Sertifikat beriladi.',
  },
]

const FAQS = [
  { q: 'Munosabat AI mutlaqo bepulmi?', a: 'AI chat uchun faqat Anthropic API kaliti kerak — bepul trial bilan keladi. Psixolog sessiyalari va kurslar alohida to\'lov talab qiladi.' },
  { q: 'Ma\'lumotlarim xavfsizmi?', a: 'Ha. API kalit faqat sizning brauzeringizda mahalliy saqlanadi. Hech qanday suhbat bizning serverimizga yuboriilmaydi.' },
  { q: 'AI haqiqiy psixologni almashtira oladimi?', a: 'AI kundalik maslahat va dastlabki tahlil uchun juda foydali. Ammo murakkab yoki og\'ir vaziyatlarda real psixolog bilan ishlash tavsiya etiladi.' },
  { q: 'Qaysi tilda ishlaydi?', a: 'To\'liq O\'zbek tilida. Psixologlarimiz ham O\'zbek, Rus va Ingliz tillarida xizmat ko\'rsatadi.' },
  { q: 'Psixolog sessiyalari qancha?', a: '100 000 dan 200 000 so\'mgacha. Birinchi 15 daqiqa bepul.' },
]

export default function HowItWorksPage() {
  return (
    <div className="page-bg">

      {/* Header */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="wrap" style={{ textAlign: 'center' }}>
          <div className="tag fade-up" style={{ marginBottom: 16 }}>📖 To'liq qo'llanma</div>
          <h1 className="font-display fade-up-1" style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: 700, color: '#1A0A10', marginBottom: 14 }}>
            Qanday ishlaydi?
          </h1>
          <p className="fade-up-2" style={{ fontSize: 16, color: '#9F4F6B', maxWidth: 480, margin: '0 auto' }}>
            4 oddiy qadam bilan munosabatingizni yaxshilashni boshlang
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="section">
        <div className="wrap" style={{ maxWidth: 840 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {STEPS.map((s, i) => (
              <div key={i} className="card" style={{ padding: '28px 28px', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 24, alignItems: 'flex-start' }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg,#E11D48,#9333EA)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span className="font-display" style={{ fontSize: 20, fontWeight: 700, color: 'white' }}>{s.n}</span>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 20 }}>{s.icon}</span>
                    <h3 className="font-display" style={{ fontSize: 19, fontWeight: 700, color: '#BE185D' }}>{s.title}</h3>
                  </div>
                  <p style={{ fontSize: 14.5, color: '#7A3A50', marginBottom: 14, lineHeight: 1.6 }}>{s.desc}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '6px 16px', marginBottom: 12 }} className="step-items">
                    {s.items.map((item, j) => (
                      <div key={j} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13.5, color: '#5A2A38' }}>
                        <span style={{ color: '#E11D48', flexShrink: 0, marginTop: 1 }}>✓</span> {item}
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: '8px 12px', borderRadius: 8, background: '#FFF1F2', border: '1px solid #FECDD3', fontSize: 12.5, color: '#BE185D' }}>
                    💡 {s.note}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* FAQ */}
      <section className="section-sm">
        <div className="wrap" style={{ maxWidth: 720 }}>
          <h2 className="font-display" style={{ fontSize: 28, fontWeight: 700, color: '#1A0A10', textAlign: 'center', marginBottom: 32 }}>
            Ko'p so'raladigan savollar
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {FAQS.map((f, i) => (
              <details key={i} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <summary style={{ padding: '16px 20px', cursor: 'pointer', fontWeight: 500, fontSize: 15, color: '#1A0A10', display: 'flex', justifyContent: 'space-between', alignItems: 'center', listStyle: 'none', userSelect: 'none' }}>
                  {f.q}
                  <span style={{ fontSize: 18, color: '#BE185D', marginLeft: 8, flexShrink: 0 }}>+</span>
                </summary>
                <div style={{ padding: '0 20px 16px', fontSize: 14, color: '#7A3A50', lineHeight: 1.65 }}>{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm">
        <div className="wrap-sm" style={{ textAlign: 'center' }}>
          <h2 className="font-display" style={{ fontSize: 28, fontWeight: 700, color: '#1A0A10', marginBottom: 10 }}>Tayyor bo'ldingizmi?</h2>
          <p style={{ fontSize: 15, color: '#9F4F6B', marginBottom: 24 }}>Hoziroq boshlang — birinchi suhbat bepul</p>
          <Link to="/chat" className="btn-primary" style={{ fontSize: 16 }}>💬 AI bilan suhbat boshlang</Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 560px) {
          .step-items { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
