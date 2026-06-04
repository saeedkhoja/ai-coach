import { useState } from 'react'
import { Link } from 'react-router-dom'

const Qs = [
  { q: 'Muammo paydo bo\'lganda siz nima qilasiz?', opts: [{ t: 'Ochiqchasiga gaplashaman', s: 4 }, { t: 'Biroz vaqt o\'tib gaplashaman', s: 3 }, { t: 'Ichimda saqlab keyin portlayman', s: 1 }, { t: 'Suhbatdan qochaman', s: 0 }] },
  { q: 'Sheringiz xato qilganda birinchi reaktsiyangiz?', opts: [{ t: 'Tushunishga harakat qilaman', s: 4 }, { t: 'Holatga qarab', s: 3 }, { t: 'Xafa bo\'laman, aytmayman', s: 1 }, { t: 'Darhol tanqid qilaman', s: 0 }] },
  { q: 'Oxirgi oy ichida janjalsiz kunlar qancha?', opts: [{ t: '25+ kun — juda oz janjal', s: 4 }, { t: '15–25 kun — o\'rtacha', s: 3 }, { t: '5–15 kun — ko\'p janjal', s: 1 }, { t: '5 kundan kam', s: 0 }] },
  { q: 'Sheringiz sizni qanchalik tushunadi?', opts: [{ t: 'Juda yaxshi tushunadi', s: 4 }, { t: 'Ko\'pincha tushunadi', s: 3 }, { t: 'Ba\'zan tushunadi', s: 1 }, { t: 'Deyarli tushunmaydi', s: 0 }] },
  { q: 'Birga vaqt o\'tkazish qanchalik qulay?', opts: [{ t: 'Juda qulay — birgalikni yaxshi ko\'raman', s: 4 }, { t: 'Ko\'pincha qulay', s: 3 }, { t: 'Ba\'zan noqulay', s: 1 }, { t: 'Ko\'pincha noqulay', s: 0 }] },
  { q: 'Kelajakni birgalikda rejalashtirasizmi?', opts: [{ t: 'Ha, doim birgalikda', s: 4 }, { t: 'Ba\'zan muhokama qilamiz', s: 3 }, { t: 'Kamdan-kam', s: 1 }, { t: 'Yo\'q, har birimiz alohida', s: 0 }] },
  { q: 'Munosabatingizdagi umumiy hissiyot?', opts: [{ t: 'Baxtliman va optimistman', s: 4 }, { t: 'Odatda yaxshi, ba\'zi muammolar bor', s: 3 }, { t: 'Ko\'p vaqt qiyin', s: 1 }, { t: 'Juda og\'ir his qilaman', s: 0 }] },
  { q: 'Sheringizga minnatdorlik qanchalik tez bildirасиз?', opts: [{ t: 'Har kuni', s: 4 }, { t: 'Haftada 1–2 marta', s: 3 }, { t: 'Kamdan-kam', s: 1 }, { t: 'Deyarli hech qachon', s: 0 }] },
]

const getResult = (total) => {
  const max = Qs.length * 4
  const pct = (total / max) * 100
  if (pct >= 80) return { emoji: '🌟', level: 'Ajoyib', color: '#15803D', bg: '#F0FDF4', border: '#BBF7D0', title: 'Munosabatingiz juda sog\'lom', desc: 'Siz va sheringiz kuchli poydevorda turibsiz. Kommunikatsiya, hurmat va sevgi yaxshi darajada.', action: '/courses', actionLabel: '📚 Kurslarni ko\'ring', tip: 'Munosabatni yanada boyitish uchun "Sevgi Tillari" kursini maslahat beramiz.' }
  if (pct >= 60) return { emoji: '💛', level: 'Yaxshi', color: '#B45309', bg: '#FFFBEB', border: '#FDE68A', title: 'Rivojlanish imkoniyati bor', desc: 'Asosiy poydevor yaxshi, lekin bir nechta sohalarda ishlash kerak.', action: '/chat', actionLabel: '💬 AI bilan suhbat', tip: 'AI chat orqali zaif tomonlarni mustahkamlashni boshlang.' }
  if (pct >= 40) return { emoji: '🧡', level: "E'tibor kerak", color: '#C2410C', bg: '#FFF7ED', border: '#FED7AA', title: "Munosabatingizga e'tibor kerak", desc: 'Bir nechta muhim sohalarda muammolar bor. Hozir harakat qilish muhim.', action: '/psychologists', actionLabel: '👩‍⚕️ Psixolog tanlang', tip: 'Psixolog sessiyasi yoki kurs boshlashni tavsiya etamiz.' }
  return { emoji: '❤️', level: 'Yordam kerak', color: '#BE185D', bg: '#FFF1F2', border: '#FECDD3', title: 'Munosabatingiz qiyin bosqichda', desc: 'Jiddiy muammolar mavjud. Vaqtida yordam olish eng muhim qadam.', action: '/psychologists', actionLabel: '👩‍⚕️ Psixolog band qiling', tip: 'Sertifikatlangan psixologimiz bilan birinchi sessiyani hoziroq band qiling.' }
}

export default function QuizPage() {
  const [cur, setCur] = useState(0)
  const [answers, setAnswers] = useState([])
  const [done, setDone] = useState(false)
  const [chosen, setChosen] = useState(null)

  const total = answers.reduce((s, a) => s + a, 0)
  const result = getResult(total)

  const pick = (score) => {
    setChosen(score)
    setTimeout(() => {
      const next = [...answers, score]
      setAnswers(next)
      setChosen(null)
      if (cur + 1 >= Qs.length) setDone(true)
      else setCur(cur + 1)
    }, 420)
  }

  const reset = () => { setCur(0); setAnswers([]); setDone(false); setChosen(null) }

  return (
    <div className="page-bg">
      <section className="section">
        <div className="wrap-sm">

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div className="tag tag-purple" style={{ marginBottom: 14 }}>✨ Bepul test</div>
            <h1 className="font-display" style={{ fontSize: 'clamp(26px,5vw,40px)', fontWeight: 700, color: '#1A0A10', marginBottom: 10 }}>
              Munosabat sog'lomligi testi
            </h1>
            <p style={{ fontSize: 15, color: '#9F4F6B' }}>8 ta savol · 3 daqiqa · Aniq natija</p>
          </div>

          {!done ? (
            <div className="card" style={{ padding: 'clamp(24px,4vw,36px)' }}>
              {/* Progress */}
              <div style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#B07A8E', marginBottom: 8 }}>
                  <span>Savol {cur + 1} / {Qs.length}</span>
                  <span>{Math.round((cur / Qs.length) * 100)}%</span>
                </div>
                <div style={{ height: 5, borderRadius: 99, background: '#FFE4E6', overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: 99, background: 'linear-gradient(90deg,#E11D48,#9333EA)', width: `${(cur / Qs.length) * 100}%`, transition: 'width 0.4s ease' }} />
                </div>
              </div>

              {/* Question */}
              <h2 className="font-display" style={{ fontSize: 'clamp(17px,3vw,22px)', fontWeight: 600, color: '#1A0A10', textAlign: 'center', marginBottom: 28, lineHeight: 1.4 }}>
                {Qs[cur].q}
              </h2>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {Qs[cur].opts.map((opt, i) => (
                  <button key={i} onClick={() => pick(opt.s)} disabled={chosen !== null}
                    style={{
                      padding: '14px 18px', borderRadius: 13, border: '1.5px solid', fontSize: 14.5, fontWeight: 400, textAlign: 'left', cursor: chosen !== null ? 'default' : 'pointer', transition: 'all 0.2s',
                      background: chosen === opt.s ? 'linear-gradient(135deg,#E11D48,#9333EA)' : 'white',
                      borderColor: chosen === opt.s ? 'transparent' : '#F0E0E4',
                      color: chosen === opt.s ? 'white' : '#3D1A28',
                      transform: chosen === opt.s ? 'scale(1.01)' : 'scale(1)',
                      boxShadow: chosen === opt.s ? '0 6px 20px rgba(225,29,72,0.25)' : 'none',
                    }}>
                    <span style={{ display: 'inline-flex', width: 26, height: 26, borderRadius: '50%', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, marginRight: 12, background: chosen === opt.s ? 'rgba(255,255,255,0.25)' : '#FFE4E6', color: chosen === opt.s ? 'white' : '#BE185D' }}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt.t}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Result */
            <div>
              <div className="card" style={{ padding: 'clamp(24px,4vw,36px)', textAlign: 'center', marginBottom: 16 }}>
                <div style={{ fontSize: 56, marginBottom: 12 }}>{result.emoji}</div>
                <div style={{ display: 'inline-flex', padding: '5px 14px', borderRadius: 99, fontSize: 12.5, fontWeight: 700, background: result.bg, color: result.color, border: `1px solid ${result.border}`, marginBottom: 14 }}>
                  {result.level}
                </div>
                <h2 className="font-display" style={{ fontSize: 24, fontWeight: 700, color: '#1A0A10', marginBottom: 10 }}>{result.title}</h2>
                <p style={{ fontSize: 15, color: '#7A3A50', lineHeight: 1.65, marginBottom: 20 }}>{result.desc}</p>

                {/* Score bar */}
                <div style={{ padding: '16px 20px', borderRadius: 14, background: '#FFF8F9', border: '1px solid #F5E0E5', marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#B07A8E', marginBottom: 6 }}>
                    <span>Umumiy ball</span>
                    <span className="font-display" style={{ fontWeight: 700, color: '#BE185D' }}>{total} / {Qs.length * 4}</span>
                  </div>
                  <div style={{ height: 8, borderRadius: 99, background: '#FFE4E6', overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: 99, background: 'linear-gradient(90deg,#E11D48,#9333EA)', width: `${(total / (Qs.length * 4)) * 100}%`, transition: 'width 0.6s ease' }} />
                  </div>
                </div>

                <div style={{ padding: '12px 16px', borderRadius: 12, background: result.bg, border: `1px solid ${result.border}`, marginBottom: 22, textAlign: 'left', fontSize: 13.5, color: result.color, lineHeight: 1.55 }}>
                  💡 {result.tip}
                </div>

                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
                  <Link to={result.action} className="btn-primary" style={{ fontSize: 14 }}>{result.actionLabel}</Link>
                  <button onClick={reset} className="btn-secondary" style={{ fontSize: 14 }}>🔄 Qayta topshirish</button>
                </div>
              </div>

              {/* Per-question breakdown */}
              <div className="card" style={{ padding: '22px 24px' }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1A0A10', marginBottom: 16 }}>Savollar bo'yicha</h3>
                {Qs.map((q, i) => {
                  const sc = answers[i]; const pct = (sc / 4) * 100
                  const c = pct >= 75 ? '#15803D' : pct >= 50 ? '#B45309' : '#BE185D'
                  return (
                    <div key={i} style={{ marginBottom: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, marginBottom: 4, color: '#7A3A50' }}>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, marginRight: 8 }}>{q.q.slice(0, 48)}…</span>
                        <span style={{ fontWeight: 600, color: c, flexShrink: 0 }}>{sc}/4</span>
                      </div>
                      <div style={{ height: 4, borderRadius: 99, background: '#FFE4E6' }}>
                        <div style={{ height: '100%', borderRadius: 99, background: c, width: `${pct}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
