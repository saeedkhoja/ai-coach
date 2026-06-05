import { useState } from 'react'
import ComingSoon from '../components/ComingSoon'

const psychologists = [
  { id: 1, name: 'Dr. Nilufar Rashidova', title: 'Oilaviy psixolog, 12 yil tajriba', spec: ['Nikoh maslahati', 'Kommunikatsiya', 'Ishonch'], rating: 4.9, reviews: 248, price: '150 000', available: true, nextSlot: 'Bugun 15:00', avatar: '👩‍⚕️', about: "Juftliklar bilan ishlashga ixtisoslashgan. Gottman metodidan foydalanaman.", langs: ["O'zbek", 'Rus'] },
  { id: 2, name: 'Dr. Kamola Yusupova', title: 'Klinikalik psixolog, 8 yil tajriba', spec: ['Emotsional bog\'liqlik', 'Travma', 'Sevgi tillari'], rating: 4.8, reviews: 187, price: '120 000', available: true, nextSlot: 'Ertaga 10:00', avatar: '🧑‍⚕️', about: "EFT (Emotsiya-Yo'naltirilgan Terapiya) usulini qo'llayman.", langs: ["O'zbek", 'Ingliz'] },
  { id: 3, name: 'Dr. Sabohat Mirova', title: 'Munosabat murabbiyi, 15 yil tajriba', spec: ['Nikoh saqlab qolish', 'Qayta bog\'lanish', 'Jinsiy munosabatlar'], rating: 5.0, reviews: 312, price: '200 000', available: false, nextSlot: 'Dushanba 14:00', avatar: '👩‍🏫', about: "15 yil davomida 500+ juftlikka yordam berdim.", langs: ["O'zbek"] },
  { id: 4, name: 'Dr. Mohira Toshmatova', title: 'Oila va juftlik terapevti, 10 yil', spec: ['Xiyonat terapiyasi', 'Ishonch', 'Ajrashish oldini olish'], rating: 4.7, reviews: 156, price: '130 000', available: true, nextSlot: 'Bugun 18:30', avatar: '🧕', about: "Murakkab vaziyatlarda juftliklarga ixtisoslashganman.", langs: ["O'zbek", 'Rus', 'Ingliz'] },
  { id: 5, name: 'Aziz Holmatov', title: 'Erkaklar va juftlik psixologi, 7 yil', spec: ['Erkak psixologiyasi', 'Rol va mas\'uliyat', 'Kommunikatsiya'], rating: 4.6, reviews: 98, price: '100 000', available: true, nextSlot: 'Ertaga 11:00', avatar: '👨‍⚕️', about: "Erkaklar nuqtai nazaridan munosabat muammolarini hal qilishga yordam beraman.", langs: ["O'zbek", 'Rus'] },
  { id: 6, name: 'Dr. Gulnora Hasanova', title: 'Seksolog va juftlik terapevti, 11 yil', spec: ['Jinsiy munosabatlar', 'Intim muloqot', 'Nikohiy qoniqish'], rating: 4.9, reviews: 203, price: '180 000', available: false, nextSlot: 'Chorshanba 16:00', avatar: '👩‍🔬', about: "Juftliklarning jismoniy va emotsional intim hayotini yaxshilashga ixtisoslashganman.", langs: ["O'zbek", 'Rus', 'Ingliz'] },
]

const SPECS = ['Hammasi', 'Kommunikatsiya', 'Ishonch', 'Janjal', 'Intim', 'Ajrashish']

export default function PsychologistsPage() {
  const [filter, setFilter] = useState('Hammasi')
  const [showBooking, setShowBooking] = useState(null)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', note: '' })

  const filtered = filter === 'Hammasi' ? psychologists : psychologists.filter(p =>
    p.spec.some(s => s.toLowerCase().includes(filter.toLowerCase())))

  const handleBook = (e) => {
    e.preventDefault()
    setDone(true)
    setTimeout(() => { setShowBooking(null); setDone(false); setForm({ name: '', phone: '', note: '' }) }, 2500)
  }

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 20px 56px' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <span style={{ display: 'inline-flex', padding: '5px 14px', borderRadius: 99, fontSize: 12, fontWeight: 500, background: '#FFE4E6', color: '#BE185D', marginBottom: 12 }}>50+ sertifikatlangan mutaxassis</span>
        <h1 className="font-display" style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700, color: '#BE185D', marginBottom: 10 }}>Psixologlar</h1>
        <p style={{ fontSize: 16, color: '#9F4F6B', maxWidth: 480, margin: '0 auto' }}>
          O'zbekistonning eng yaxshi oilaviy psixologlari bilan onlayn sessiya band qiling
        </p>
      </div>

      <ComingSoon
        title="Psixologlar bilan onlayn sessiya — tez orada!"
        desc="Hozir eng yaxshi sertifikatlangan mutaxologlarni platformaga jalb qilmoqdamiz. Tez kunda ular bilan to'g'ridan-to'g'ri video va chat sessiyalarini band qila olasiz."
      />

      {/* Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 36 }}>
        {SPECS.map(s => (
          <button key={s} onClick={() => setFilter(s)} style={{
            padding: '8px 18px', borderRadius: 10, fontSize: 13.5, fontWeight: 500, cursor: 'pointer', border: '1px solid #FECDD3', transition: 'all 0.15s',
            background: filter === s ? 'linear-gradient(135deg,#FB7185,#A78BFA)' : 'rgba(255,255,255,0.85)',
            color: filter === s ? 'white' : '#BE185D',
          }}>{s}</button>
        ))}
      </div>

      {/* Grid */}
      <div className="psych-grid">
        {filtered.map(p => (
          <div key={p.id} style={{ background: 'rgba(255,255,255,0.82)', border: '1px solid #FECDD3', borderRadius: 22, padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: 12, transition: 'transform 0.2s, box-shadow 0.2s' }}
            className="psych-card">
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 60, height: 60, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, background: 'linear-gradient(135deg,#FFE4E6,#EDE9FE)', flexShrink: 0 }}>{p.avatar}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p className="font-display" style={{ fontWeight: 600, fontSize: 15, color: '#BE185D', marginBottom: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</p>
                <p style={{ fontSize: 12, color: '#9F4F6B', marginBottom: 4 }}>{p.title}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ color: '#F59E0B', fontSize: 13 }}>★</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#3D1A28' }}>{p.rating}</span>
                  <span style={{ fontSize: 12, color: '#C4899E' }}>({p.reviews})</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {p.spec.map((s, i) => <span key={i} style={{ padding: '3px 10px', borderRadius: 8, fontSize: 11.5, fontWeight: 500, background: '#FFE4E6', color: '#BE185D' }}>{s}</span>)}
            </div>

            <p style={{ fontSize: 13.5, lineHeight: 1.5, color: '#6B3A4E' }}>{p.about}</p>
            <p style={{ fontSize: 12, color: '#C4899E' }}>🌐 {p.langs.join(', ')}</p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid #FFE4E6', marginTop: 'auto' }}>
              <div>
                <p style={{ fontWeight: 700, fontSize: 16, color: '#BE185D', margin: '0 0 2px' }}>{p.price} so'm</p>
                <p style={{ fontSize: 12, color: p.available ? '#22C55E' : '#F59E0B', margin: 0 }}>{p.available ? `✅ ${p.nextSlot}` : `🕐 ${p.nextSlot}`}</p>
              </div>
              <button disabled style={{ padding: '9px 18px', borderRadius: 12, border: '1px solid #FECDD3', fontSize: 13, fontWeight: 600, cursor: 'not-allowed', color: '#BE185D', background: '#FFF1F2' }}>
                ⏳ Tez orada
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {showBooking && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, background: 'rgba(190,24,93,0.14)', backdropFilter: 'blur(8px)' }}>
          <div style={{ background: 'rgba(255,255,255,0.97)', borderRadius: 24, padding: 28, maxWidth: 420, width: '100%', border: '1px solid #FECDD3', boxShadow: '0 12px 48px rgba(190,24,93,0.15)', maxHeight: '90vh', overflowY: 'auto' }}>
            {done ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: 56, marginBottom: 12 }}>🎉</div>
                <h3 className="font-display" style={{ fontSize: 22, color: '#BE185D', marginBottom: 8 }}>Muvaffaqiyatli!</h3>
                <p style={{ color: '#9F4F6B', fontSize: 14 }}>{showBooking.name} siz bilan tez orada bog'lanadi.</p>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <span style={{ fontSize: 28 }}>{showBooking.avatar}</span>
                  <div style={{ flex: 1 }}>
                    <p className="font-display" style={{ fontWeight: 600, color: '#BE185D', fontSize: 16, margin: '0 0 2px' }}>{showBooking.name}</p>
                    <p style={{ fontSize: 12, color: '#9F4F6B', margin: 0 }}>{showBooking.nextSlot}</p>
                  </div>
                  <button onClick={() => setShowBooking(null)} style={{ background: 'none', border: 'none', fontSize: 20, color: '#C4899E', cursor: 'pointer', lineHeight: 1 }}>✕</button>
                </div>
                <form onSubmit={handleBook} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[['name', 'Ismingiz'], ['phone', 'Telefon raqamingiz']].map(([field, ph]) => (
                    <input key={field} required value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} placeholder={ph}
                      style={{ padding: '11px 14px', borderRadius: 12, border: '1.5px solid #FECDD3', fontSize: 14, outline: 'none', background: '#FFF1F2', color: '#3D1A28', width: '100%', boxSizing: 'border-box' }} />
                  ))}
                  <textarea value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} placeholder="Muammoingizni qisqacha yozing (ixtiyoriy)" rows={3}
                    style={{ padding: '11px 14px', borderRadius: 12, border: '1.5px solid #FECDD3', fontSize: 14, outline: 'none', resize: 'none', background: '#FFF1F2', color: '#3D1A28', fontFamily: 'inherit', boxSizing: 'border-box' }} />
                  <button type="submit" style={{ padding: '13px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg,#E11D48,#A78BFA)', color: 'white', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>
                    Sessiya band qilish — {showBooking.price} so'm
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        .psych-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .psych-card:hover { transform: translateY(-3px); box-shadow: 0 8px 32px rgba(190,24,93,0.1); }
        @media (max-width: 900px) { .psych-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .psych-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  )
}
