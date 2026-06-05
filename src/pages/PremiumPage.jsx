import { useState } from 'react'

const BENEFITS = [
  { icon: '💬', title: 'Cheksiz AI maslahat', desc: "Kechayu kunduz, cheklovsiz. Istalgan vaqt, istalgan savol — AI doimo siz bilan." },
  { icon: '🧠', title: 'Chuqurroq tahlil', desc: "Premium AI munosabatingizni eslab qoladi va shaxsiy, kontekstga mos maslahat beradi." },
  { icon: '👩‍⚕️', title: 'Psixolog chegirmasi', desc: "Barcha onlayn sessiyalarga 30% chegirma. Bir sessiyada a'zolik pulini qoplaysiz." },
  { icon: '📚', title: 'Barcha kurslar bepul', desc: "30+ premium kursga to'liq kirish — alohida to'lovsiz, umrbod." },
  { icon: '📊', title: 'Munosabat kuzatuvi', desc: "Haftalik hisobot va shaxsiy rivojlanish rejasi bilan o'sishingizni ko'ring." },
  { icon: '⚡', title: 'Birinchi navbatda', desc: "Yangi funksiyalar, psixologlar va kontentdan birinchi bo'lib foydalaning." },
]

const COMPARE = [
  ['AI maslahat', 'Cheklangan', 'Cheksiz'],
  ['Suhbat tarixini eslab qolish', false, true],
  ['Barcha video kurslar', false, true],
  ['Psixolog sessiyasiga chegirma', false, '30%'],
  ['Haftalik munosabat hisoboti', false, true],
  ['Yangiliklardan birinchi xabar', false, true],
  ['Reklama yo\'q', false, true],
]

const FAQ = [
  { q: 'To\'lovni istalgan vaqt bekor qila olamanmi?', a: 'Ha, albatta. Hech qanday majburiyat yo\'q — istalgan vaqt bir tugma bilan a\'zolikni bekor qilasiz.' },
  { q: '99 000 so\'m qanday to\'lanadi?', a: 'Oyiga bir marta. Click, Payme yoki bank kartasi orqali avtomatik. Yashirin to\'lovlar yo\'q.' },
  { q: 'Pulim qaytariladimi?', a: '7 kun ichida mamnun bo\'lmasangiz — 100% pulingizni so\'rovsiz qaytaramiz.' },
]

export default function PremiumPage() {
  const [done, setDone] = useState(false)
  const [method, setMethod] = useState(null)
  const [paid, setPaid] = useState(false)

  return (
    <div className="page-bg">

      {/* ── HERO ── */}
      <section className="section" style={{ paddingBottom: 40, position: 'relative', overflow: 'hidden' }}>
        <div className="wrap-sm" style={{ textAlign: 'center', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px', borderRadius: 99, fontSize: 12.5, fontWeight: 700, letterSpacing: 0.5, background: 'linear-gradient(135deg,#FFD700,#FFA000)', color: '#5B2C00', marginBottom: 20, boxShadow: '0 4px 16px rgba(255,160,0,0.3)' }}>
            👑 PREMIUM A'ZOLIK
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(30px,6vw,52px)', fontWeight: 700, lineHeight: 1.12, marginBottom: 18 }}>
            <span className="grad-text">Munosabatingizga</span><br />sarmoya kiriting
          </h1>
          <p style={{ fontSize: 'clamp(15px,2.5vw,18px)', color: '#7A3A50', lineHeight: 1.6, maxWidth: 480, margin: '0 auto 8px', fontWeight: 300 }}>
            Bir piyola qahva narxida — har kuni siz bilan bo'ladigan shaxsiy munosabat maslahatchisi.
          </p>
        </div>
      </section>

      {/* ── PRICING CARD ── */}
      <section style={{ padding: '0 20px 56px' }}>
        <div style={{ maxWidth: 460, margin: '0 auto' }}>
          <div style={{
            position: 'relative', borderRadius: 28, overflow: 'hidden',
            background: 'linear-gradient(160deg,#2A0A22 0%,#5B1248 50%,#7B1FA2 100%)',
            boxShadow: '0 20px 60px rgba(123,31,162,0.35)', padding: '36px 32px',
            border: '1px solid rgba(255,255,255,0.12)',
          }}>
            {/* Glow */}
            <div style={{ position: 'absolute', top: -60, right: -40, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,143,177,0.4), transparent 70%)', filter: 'blur(30px)' }} />

            <div style={{ position: 'relative' }}>
              {/* Badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 99, fontSize: 11.5, fontWeight: 700, background: 'rgba(255,215,0,0.18)', color: '#FFD700', marginBottom: 18, border: '1px solid rgba(255,215,0,0.3)' }}>
                🔥 ENG MASHHUR TANLOV
              </div>

              <h3 className="font-display" style={{ fontSize: 26, fontWeight: 700, color: 'white', marginBottom: 6 }}>Premium</h3>
              <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.65)', marginBottom: 22 }}>Barcha imkoniyatlar bir joyda</p>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
                <span className="font-display" style={{ fontSize: 46, fontWeight: 700, color: 'white', lineHeight: 1 }}>99 000</span>
                <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)' }}>so'm / oy</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', textDecoration: 'line-through' }}>199 000 so'm</span>
                <span style={{ fontSize: 11.5, fontWeight: 700, padding: '3px 10px', borderRadius: 99, background: 'linear-gradient(135deg,#FF4081,#E91E8C)', color: 'white' }}>-50% CHEGIRMA</span>
              </div>

              {/* Value bullets */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 26 }}>
                {['Cheksiz AI maslahat 24/7', 'Barcha kurslar bepul (qiymati 500 000+)', 'Psixolog sessiyalariga 30% chegirma', 'Haftalik shaxsiy rivojlanish hisoboti'].map((t, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: 'rgba(255,255,255,0.92)' }}>
                    <span style={{ flexShrink: 0, width: 20, height: 20, borderRadius: '50%', background: 'rgba(34,197,94,0.25)', color: '#4ADE80', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, marginTop: 1 }}>✓</span>
                    {t}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button onClick={() => setDone(true)} style={{
                width: '100%', padding: '15px', borderRadius: 14, border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg,#FFD700,#FFA000)', color: '#5B2C00', fontSize: 16, fontWeight: 700,
                boxShadow: '0 8px 28px rgba(255,160,0,0.4)', transition: 'transform 0.15s',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = ''}>
                👑 Premium a'zo bo'lish
              </button>

              <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 14 }}>
                ✓ 7 kun pul qaytarish kafolati · ✓ Istalgan vaqt bekor qilish
              </p>
            </div>
          </div>

          {/* Urgency note */}
          <p style={{ textAlign: 'center', fontSize: 13, color: '#BE185D', marginTop: 18, fontWeight: 500 }}>
            ⏰ -50% chegirma faqat birinchi 100 a'zo uchun amal qiladi
          </p>
        </div>
      </section>

      <div className="divider" />

      {/* ── BENEFITS ── */}
      <section className="section">
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <div className="tag tag-purple" style={{ marginBottom: 12 }}>Nima olasiz</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(22px,4vw,34px)', fontWeight: 700, color: '#1A0A10' }}>
              Premium bilan hamma narsa ochiq
            </h2>
          </div>
          <div className="grid-3" style={{ gap: 16 }}>
            {BENEFITS.map((b, i) => (
              <div key={i} className="card" style={{ padding: '24px 22px' }}>
                <div style={{ width: 48, height: 48, borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, background: 'linear-gradient(135deg,#FFE4E6,#EDE9FE)', border: '1px solid #FECDD3', marginBottom: 14 }}>
                  {b.icon}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#BE185D', marginBottom: 7 }}>{b.title}</h3>
                <p style={{ fontSize: 13.5, color: '#7A3A50', lineHeight: 1.6 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── COMPARISON ── */}
      <section className="section-sm">
        <div className="wrap-sm">
          <h2 className="font-display" style={{ fontSize: 'clamp(20px,3.5vw,30px)', fontWeight: 700, color: '#1A0A10', textAlign: 'center', marginBottom: 32 }}>
            Bepul va Premium farqi
          </h2>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {/* Header row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr', borderBottom: '1px solid #F5E0E5' }}>
              <div style={{ padding: '16px 18px', fontSize: 13, fontWeight: 600, color: '#7A3A50' }}>Imkoniyat</div>
              <div style={{ padding: '16px 12px', fontSize: 13, fontWeight: 600, color: '#9F4F6B', textAlign: 'center' }}>Bepul</div>
              <div style={{ padding: '16px 12px', fontSize: 13, fontWeight: 700, textAlign: 'center', background: 'linear-gradient(135deg,#FFF1F2,#F5F3FF)', color: '#7B1FA2' }}>👑 Premium</div>
            </div>
            {COMPARE.map(([label, free, prem], i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr', borderBottom: i < COMPARE.length - 1 ? '1px solid #FAF0F2' : 'none' }}>
                <div style={{ padding: '13px 18px', fontSize: 13.5, color: '#3D1A28' }}>{label}</div>
                <div style={{ padding: '13px 12px', fontSize: 13, textAlign: 'center', color: '#9F4F6B' }}>
                  {free === true ? <span style={{ color: '#22C55E' }}>✓</span> : free === false ? <span style={{ color: '#D1A5B3' }}>—</span> : free}
                </div>
                <div style={{ padding: '13px 12px', fontSize: 13, fontWeight: 600, textAlign: 'center', background: 'rgba(245,243,255,0.5)', color: '#7B1FA2' }}>
                  {prem === true ? <span style={{ color: '#22C55E' }}>✓</span> : prem}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── FAQ ── */}
      <section className="section-sm">
        <div className="wrap-sm">
          <h2 className="font-display" style={{ fontSize: 26, fontWeight: 700, color: '#1A0A10', textAlign: 'center', marginBottom: 28 }}>
            Savollaringiz bormi?
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {FAQ.map((f, i) => (
              <details key={i} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <summary style={{ padding: '16px 20px', cursor: 'pointer', fontWeight: 500, fontSize: 15, color: '#1A0A10', display: 'flex', justifyContent: 'space-between', alignItems: 'center', listStyle: 'none' }}>
                  {f.q}<span style={{ fontSize: 18, color: '#BE185D', marginLeft: 8 }}>+</span>
                </summary>
                <div style={{ padding: '0 20px 16px', fontSize: 14, color: '#7A3A50', lineHeight: 1.65 }}>{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="section-sm">
        <div className="wrap-sm" style={{ textAlign: 'center' }}>
          <div style={{ borderRadius: 24, padding: 'clamp(32px,5vw,48px)', background: 'linear-gradient(135deg,#E11D48,#7B1FA2)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1), transparent 50%)' }} />
            <h2 className="font-display" style={{ fontSize: 'clamp(22px,4vw,32px)', fontWeight: 700, color: 'white', marginBottom: 10, position: 'relative' }}>
              Bugun boshlang — kuningiz 3 300 so'mga
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', marginBottom: 26, position: 'relative' }}>
              Munosabatingiz har qanday narsadan qimmatroq. Sarmoyangiz bugun o'zini oqlaydi.
            </p>
            <button onClick={() => setDone(true)} style={{ position: 'relative', padding: '15px 36px', borderRadius: 14, border: 'none', cursor: 'pointer', background: 'white', color: '#BE185D', fontSize: 16, fontWeight: 700, boxShadow: '0 8px 28px rgba(0,0,0,0.18)' }}>
              👑 Premium a'zo bo'lish — 99 000 so'm/oy
            </button>
          </div>
        </div>
      </section>

      {/* To'lov modali */}
      {done && (
        <div onClick={() => { setDone(false); setMethod(null); setPaid(false) }} style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, background: 'rgba(43,10,34,0.45)', backdropFilter: 'blur(10px)' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: 'white', borderRadius: 24, padding: 32, maxWidth: 400, width: '100%', border: '1px solid #FECDD3', boxShadow: '0 20px 60px rgba(123,31,162,0.25)' }}>

            {paid ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 56, marginBottom: 14 }}>🎉</div>
                <h3 className="font-display" style={{ fontSize: 24, fontWeight: 700, color: '#7B1FA2', marginBottom: 10 }}>Xush kelibsiz, Premium a'zo!</h3>
                <p style={{ fontSize: 14.5, color: '#7A3A50', lineHeight: 1.6, marginBottom: 24 }}>
                  To'lovingiz qabul qilindi. Endi AI maslahatchi bilan cheksiz suhbat qila olasiz. 💕
                </p>
                <button onClick={() => { setDone(false); setMethod(null); setPaid(false) }} style={{ width: '100%', padding: '13px', borderRadius: 13, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#E11D48,#7B1FA2)', color: 'white', fontSize: 15, fontWeight: 600 }}>
                  Boshlash
                </button>
              </div>
            ) : (
              <>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 22 }}>
                  <div style={{ fontSize: 40, marginBottom: 10 }}>👑</div>
                  <h3 className="font-display" style={{ fontSize: 21, fontWeight: 700, color: '#7B1FA2', marginBottom: 4 }}>To'lov usulini tanlang</h3>
                  <p style={{ fontSize: 13.5, color: '#9F4F6B' }}>Premium a'zolik — 99 000 so'm / oy</p>
                </div>

                {/* Payment methods */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                  {/* Click */}
                  <button onClick={() => setMethod('click')} style={{
                    display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 14, cursor: 'pointer',
                    border: method === 'click' ? '2px solid #00A0E3' : '1.5px solid #E8DEE2', background: method === 'click' ? '#F0FAFF' : 'white',
                    transition: 'all 0.15s', textAlign: 'left',
                  }}>
                    {/* Click logo */}
                    <div style={{ width: 56, height: 32, borderRadius: 7, background: '#00A0E3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ color: 'white', fontWeight: 800, fontSize: 14, letterSpacing: '-0.5px' }}>Click</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14.5, fontWeight: 600, color: '#1A0A10', margin: '0 0 2px' }}>Click</p>
                      <p style={{ fontSize: 12, color: '#9F4F6B', margin: 0 }}>Click ilovasi yoki karta orqali</p>
                    </div>
                    <span style={{ width: 20, height: 20, borderRadius: '50%', border: method === 'click' ? '6px solid #00A0E3' : '2px solid #D1A5B3', flexShrink: 0, transition: 'all 0.15s' }} />
                  </button>

                  {/* Payme */}
                  <button onClick={() => setMethod('payme')} style={{
                    display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 14, cursor: 'pointer',
                    border: method === 'payme' ? '2px solid #00CCCC' : '1.5px solid #E8DEE2', background: method === 'payme' ? '#EFFEFE' : 'white',
                    transition: 'all 0.15s', textAlign: 'left',
                  }}>
                    {/* Payme logo */}
                    <div style={{ width: 56, height: 32, borderRadius: 7, background: '#33CCCC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ color: 'white', fontWeight: 800, fontSize: 13, letterSpacing: '-0.3px' }}>Payme</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14.5, fontWeight: 600, color: '#1A0A10', margin: '0 0 2px' }}>Payme</p>
                      <p style={{ fontSize: 12, color: '#9F4F6B', margin: 0 }}>Payme ilovasi yoki karta orqali</p>
                    </div>
                    <span style={{ width: 20, height: 20, borderRadius: '50%', border: method === 'payme' ? '6px solid #00CCCC' : '2px solid #D1A5B3', flexShrink: 0, transition: 'all 0.15s' }} />
                  </button>
                </div>

                {/* Total */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderRadius: 12, background: '#FFF1F2', marginBottom: 16 }}>
                  <span style={{ fontSize: 13.5, color: '#7A3A50' }}>Jami to'lov</span>
                  <span className="font-display" style={{ fontSize: 18, fontWeight: 700, color: '#BE185D' }}>99 000 so'm</span>
                </div>

                <button onClick={() => method && setPaid(true)} disabled={!method} style={{
                  width: '100%', padding: '15px', borderRadius: 14, border: 'none', cursor: method ? 'pointer' : 'not-allowed',
                  background: method ? 'linear-gradient(135deg,#E11D48,#7B1FA2)' : '#E8DEE2', color: 'white', fontSize: 15.5, fontWeight: 700,
                  transition: 'all 0.15s',
                }}>
                  {method ? `${method === 'click' ? 'Click' : 'Payme'} orqali to'lash` : 'To\'lov usulini tanlang'}
                </button>

                <p style={{ textAlign: 'center', fontSize: 11.5, color: '#C4A0AE', marginTop: 12 }}>
                  🔒 To'lov xavfsiz · 7 kun pul qaytarish kafolati
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
