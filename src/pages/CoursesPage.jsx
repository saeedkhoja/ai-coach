import { useState } from 'react'

const courses = [
  { id: 1, title: 'Sevgi Tillari: 5 ta muhim til', instructor: 'Dr. Nilufar Rashidova', duration: '4 soat 30 min', lessons: 18, level: "Boshlang'ich", price: '89 000', oldPrice: '150 000', rating: 4.9, students: 1240, cover: '❤️', tags: ['Sevgi', 'Asoslar'], desc: "Gary Chapman'ning 5 ta Sevgi Tili asosida o'z sevgi tilingizni va sheringingizning tilini aniqlang.", includes: ['18 ta video dars', 'Amaliy mashqlar', 'Sertifikat', 'Umrbod kirish'], bestseller: true },
  { id: 2, title: "Janjal Nafi's Boshqarish", instructor: 'Dr. Kamola Yusupova', duration: '3 soat 15 min', lessons: 14, level: "O'rta", price: '79 000', oldPrice: '130 000', rating: 4.8, students: 876, cover: '🕊️', tags: ['Janjal', 'Emosiyalar'], desc: "Janjallarni munosabatni kuchaytiruvchi imkoniyatga aylantirish usullarini o'rganing.", includes: ['14 ta video dars', "Rol o'yin mashqlari", 'Sertifikat'], bestseller: false },
  { id: 3, title: 'Ishonch Qayta Qurish', instructor: 'Dr. Sabohat Mirova', duration: '5 soat', lessons: 22, level: "Ilg'or", price: '120 000', oldPrice: '200 000', rating: 5.0, students: 543, cover: '🔐', tags: ['Ishonch', 'Terapiya'], desc: "Xiyonat yoki boshqa sabablar bilan buzilgan ishonchni qayta tiklash uchun ilmiy asoslangan dastur.", includes: ['22 ta video dars', '1 soatlik psixolog sessiyasi', 'Umrbod kirish'], bestseller: false },
  { id: 4, title: 'Muloqot Sanati: Tingla va Gapir', instructor: 'Aziz Holmatov', duration: '2 soat 45 min', lessons: 12, level: "Boshlang'ich", price: '59 000', oldPrice: '90 000', rating: 4.7, students: 1890, cover: '💬', tags: ['Kommunikatsiya', 'Asoslar'], desc: 'Faol tinglash va samimiy muloqot qilish ko\'nikmalarini rivojlantiring.', includes: ['12 ta video dars', 'Amaliy vazifalar', 'Sertifikat'], bestseller: true },
  { id: 5, title: 'Nikoh Hayotini Jonlantirish', instructor: 'Dr. Gulnora Hasanova', duration: '6 soat', lessons: 26, level: "O'rta", price: '150 000', oldPrice: '250 000', rating: 4.9, students: 432, cover: '💑', tags: ['Nikoh', 'Hayot'], desc: "Ko'p yillik nikoh hayotiga yangi nafas bering.", includes: ['26 ta video dars', 'Juftlik mashqlari', 'Umrbod kirish'], bestseller: false },
  { id: 6, title: 'Emotsional Intellekt va Munosabat', instructor: 'Dr. Mohira Toshmatova', duration: '4 soat', lessons: 16, level: "O'rta", price: '99 000', oldPrice: '160 000', rating: 4.8, students: 678, cover: '🧠', tags: ['EI', 'Rivojlanish'], desc: 'Emotsional intellektingizni rivojlantiring va munosabatingizni yaxshilang.', includes: ['16 ta video dars', 'EI testi', 'Sertifikat'], bestseller: false },
]

const LEVELS = ["Hammasi", "Boshlang'ich", "O'rta", "Ilg'or"]

export default function CoursesPage() {
  const [level, setLevel] = useState('Hammasi')
  const [enrolled, setEnrolled] = useState(null)

  const filtered = level === 'Hammasi' ? courses : courses.filter(c => c.level === level)

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 20px 56px' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <span style={{ display: 'inline-flex', padding: '5px 14px', borderRadius: 99, fontSize: 12, fontWeight: 500, background: '#EDE9FE', color: '#7C3AED', marginBottom: 12 }}>📚 30+ kurs mavjud</span>
        <h1 className="font-display" style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700, color: '#BE185D', marginBottom: 10 }}>O'quv Kurslar</h1>
        <p style={{ fontSize: 16, color: '#9F4F6B', maxWidth: 520, margin: '0 auto' }}>Mutaxassis psixologlar tomonidan tayyorlangan kurslar bilan munosabatingizni yaxshilang</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 32, flexWrap: 'wrap' }}>
        {[['30+', 'Kurs'], ['5 000+', 'Talaba'], ['4.8★', 'Baho']].map(([v, l]) => (
          <div key={l} style={{ padding: '14px 28px', borderRadius: 14, background: 'rgba(255,255,255,0.8)', border: '1px solid #FECDD3', textAlign: 'center' }}>
            <p className="font-display" style={{ fontSize: 24, fontWeight: 700, color: '#BE185D', margin: '0 0 2px' }}>{v}</p>
            <p style={{ fontSize: 12, color: '#9F4F6B', margin: 0 }}>{l}</p>
          </div>
        ))}
      </div>

      {/* Level filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 32 }}>
        {LEVELS.map(l => (
          <button key={l} onClick={() => setLevel(l)} style={{ padding: '8px 18px', borderRadius: 10, fontSize: 13.5, fontWeight: 500, cursor: 'pointer', border: '1px solid #FECDD3', transition: 'all 0.15s', background: level === l ? 'linear-gradient(135deg,#FB7185,#A78BFA)' : 'rgba(255,255,255,0.85)', color: level === l ? 'white' : '#BE185D' }}>{l}</button>
        ))}
      </div>

      {/* Grid */}
      <div className="courses-grid">
        {filtered.map(c => (
          <div key={c.id} style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid #FECDD3', borderRadius: 22, overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s, box-shadow 0.2s' }} className="course-card">
            <div style={{ height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', background: 'linear-gradient(135deg,#FFE4E6,#EDE9FE)' }}>
              <span style={{ fontSize: 64 }}>{c.cover}</span>
              {c.bestseller && <span style={{ position: 'absolute', top: 10, left: 10, padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700, color: 'white', background: 'linear-gradient(135deg,#F59E0B,#EF4444)' }}>🔥 Bestseller</span>}
              <span style={{ position: 'absolute', top: 10, right: 10, padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 500, background: 'rgba(255,255,255,0.88)', color: '#7C3AED' }}>{c.level}</span>
            </div>
            <div style={{ padding: '18px 18px 20px', display: 'flex', flexDirection: 'column', flex: 1, gap: 8 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {c.tags.map((t, i) => <span key={i} style={{ padding: '2px 8px', borderRadius: 6, fontSize: 11, background: '#EDE9FE', color: '#7C3AED' }}>{t}</span>)}
              </div>
              <h3 className="font-display" style={{ fontSize: 16, fontWeight: 600, color: '#BE185D', margin: 0, lineHeight: 1.3 }}>{c.title}</h3>
              <p style={{ fontSize: 12, color: '#A0657A', margin: 0 }}>👩‍🏫 {c.instructor}</p>
              <p style={{ fontSize: 13, lineHeight: 1.5, color: '#6B3A4E', margin: 0, flex: 1 }}>{c.desc}</p>
              <div style={{ display: 'flex', gap: 12, fontSize: 12, color: '#C4899E', flexWrap: 'wrap' }}>
                <span>⏱️ {c.duration}</span>
                <span>📖 {c.lessons} dars</span>
                <span>👥 {c.students.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 2 }}>
                {[1,2,3,4,5].map(s => <span key={s} style={{ color: s <= Math.floor(c.rating) ? '#F59E0B' : '#E5E7EB', fontSize: 13 }}>★</span>)}
                <span style={{ fontSize: 12.5, fontWeight: 600, color: '#3D1A28', marginLeft: 4 }}>{c.rating}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 2 }}>
                {c.includes.slice(0, 3).map((inc, i) => <p key={i} style={{ fontSize: 12, color: '#9F4F6B', margin: 0, display: 'flex', gap: 6, alignItems: 'center' }}><span style={{ color: '#22C55E' }}>✓</span>{inc}</p>)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: 17, color: '#BE185D' }}>{c.price} so'm</span>
                  <span style={{ fontSize: 12, color: '#C4899E', textDecoration: 'line-through', marginLeft: 6 }}>{c.oldPrice}</span>
                </div>
                <button onClick={() => setEnrolled(c)} style={{ padding: '9px 16px', borderRadius: 10, border: 'none', fontSize: 13.5, fontWeight: 600, cursor: 'pointer', color: 'white', background: 'linear-gradient(135deg,#E11D48,#A78BFA)', transition: 'transform 0.15s' }}>
                  Sotib olish
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enroll Modal */}
      {enrolled && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, background: 'rgba(190,24,93,0.14)', backdropFilter: 'blur(8px)' }}>
          <div style={{ background: 'rgba(255,255,255,0.97)', borderRadius: 24, padding: 28, maxWidth: 400, width: '100%', border: '1px solid #FECDD3', boxShadow: '0 12px 48px rgba(190,24,93,0.15)' }}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <span style={{ fontSize: 52, display: 'block', marginBottom: 8 }}>{enrolled.cover}</span>
              <h3 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: '#BE185D', marginBottom: 4 }}>{enrolled.title}</h3>
            </div>
            <div style={{ background: '#FFF1F2', borderRadius: 14, padding: '14px 16px', marginBottom: 18 }}>
              {enrolled.includes.map((inc, i) => <p key={i} style={{ fontSize: 13, color: '#4B2A3A', margin: '0 0 6px', display: 'flex', gap: 8 }}><span style={{ color: '#22C55E' }}>✓</span>{inc}</p>)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: 22, fontWeight: 700, color: '#BE185D' }}>{enrolled.price} so'm</span>
              <span style={{ fontSize: 13, color: '#C4899E', textDecoration: 'line-through' }}>{enrolled.oldPrice} so'm</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setEnrolled(null)} style={{ flex: 1, padding: '12px', borderRadius: 12, border: 'none', background: '#FFE4E6', color: '#BE185D', fontWeight: 500, fontSize: 14, cursor: 'pointer' }}>Bekor</button>
              <button onClick={() => setEnrolled(null)} style={{ flex: 1, padding: '12px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg,#E11D48,#A78BFA)', color: 'white', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>💳 To'lash</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .courses-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .course-card:hover { transform: translateY(-3px); box-shadow: 0 8px 32px rgba(190,24,93,0.1); }
        @media (max-width: 900px) { .courses-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .courses-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  )
}
