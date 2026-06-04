import { useState } from 'react'

const posts = [
  { id: 1, title: "Gottman metodasi: Baxtli nikohning 7 tamoyili", author: "Dr. Nilufar Rashidova", avatar: "👩‍⚕️", date: "15 Noyabr 2024", readTime: "8 daqiqa", category: "Ilmiy", cover: "💒", excerpt: "Dunyoning eng mashhur munosabat tadqiqotchisi John Gottman 40 yillik tadqiqotlari asosida baxtli nikohning asosiy tamoyillarini aniqladi.", content: "John Gottman va uning xotini Julie Gottman juftliklarni onlab yillar kuzatib, nima uchun ayrim nikohlar muvaffaqiyatli bo'lishini o'rgandi.\n\nDo'stlik va ishoralar\nBaxtli juftliklar bir-birini chuqur biladi va bir-biriga ishoralar beradi. Bu ishoralarga ijobiy javob berish muhim.\n\nHurmat va mehr\nBir-biringizga mehribon bo'ling. Kichik e'tiborlar, minnatdorlik — bular katta ahamiyat kasb etadi.\n\nTashqaridan keladigan ta'sirlarni boshqarish\nStress, ish muammolari — bularni birgalikda engishni o'rganing.", tags: ["Gottman", "Nikoh", "Ilmiy"], featured: true },
  { id: 2, title: "Sevgi tillari: Siz qaysi tilda gaplashasiz?", author: "Dr. Kamola Yusupova", avatar: "🧑‍⚕️", date: "10 Noyabr 2024", readTime: "6 daqiqa", category: "Amaliy", cover: "💕", excerpt: "Gary Chapman'ning 5 ta Sevgi Tili kitobi dunyoda eng ko'p o'qilgan munosabat kitoblaridan biri.", content: "Gary Chapman 5 ta asosiy sevgi tilini aniqladi:\n\nTasdiqlash so'zlari\n'Seni sevaman' kabi so'zlar ushbu tildagilar uchun eng muhim.\n\nBirga o'tkazilgan vaqt\nTelefonlarni qo'yib, to'liq e'tibor bilan birga bo'lish.\n\nSovg'alar\nBu moddiyat haqida emas — e'tibor haqida.\n\nXizmat ko'rsatish harakatlari\nUy ishlarida yordam, qiyinchilikda ko'mak.\n\nJismoniy teginish\nQuchoqlash, qo'l ushlab yurish.", tags: ["Sevgi Tili", "Amaliy"], featured: false },
  { id: 3, title: "Janjal paytida miyamiz nima qiladi?", author: "Dr. Sabohat Mirova", avatar: "👩‍🏫", date: "5 Noyabr 2024", readTime: "7 daqiqa", category: "Neyrologiya", cover: "🧠", excerpt: "Janjal paytida miyamiz amigdala deb ataladigan tahdid detektorini ishga soladi. Bu holat bizni mantiqiy fikrlashdan mahrum qiladi.", content: "Janjal paytida tanangizda nima sodir bo'ladi?\n\nStres gormonlari oshadi\nKortizol va adrenalin qonga quyiladi. Kurash yoki qochish reaksiyasini keltirib chiqaradi.\n\nPrefrontal korteks o'chadi\nMantiqiy fikrlash uchun mas'ul bo'lgan oldingi miyangiz deyarli o'chib qoladi.\n\nNima qilish kerak?\n20 daqiqa tanaffus oling. Bu vaqt davomida miya normal holatga qaytadi.", tags: ["Miya", "Janjal"], featured: false },
  { id: 4, title: "Xiyonatdan keyin ishonch qayta qurilishi mumkinmi?", author: "Dr. Mohira Toshmatova", avatar: "🧕", date: "1 Noyabr 2024", readTime: "10 daqiqa", category: "Terapiya", cover: "🔐", excerpt: "Xiyonat — munosabatdagi eng og'ir sinovlardan biri. Lekin tajribali psixologlar shuni tasdiqlaydi: ishonch qayta qurilishi mumkin.", content: "Xiyonatdan keyin tiklash mumkinmi?\n\nHaqiqiy tavba va javobgarlik\nXiyonat qilgan tomon to'liq javobgarlikni qabul qilishi kerak.\n\nShaffoflik\nQayta ishonch qurish uchun vaqtincha to'liq shaffoflik talab etiladi.\n\nSabr va vaqt\nIlmiy ma'lumotlarga ko'ra, ishonchni tiklash 2-5 yil olishi mumkin.", tags: ["Xiyonat", "Ishonch"], featured: false },
  { id: 5, title: "Munosabatda muvozanat: Men va Biz", author: "Aziz Holmatov", avatar: "👨‍⚕️", date: "28 Oktyabr 2024", readTime: "5 daqiqa", category: "Rivojlanish", cover: "⚖️", excerpt: "Sog'lom munosabatda har ikki kishi ham o'z shaxsiyatini saqlashi kerak. Juda ko'p biz — bu ham xavfli.", content: "Sog'lom munosabatda muvozanat muhim.\n\nShaxsiyatni saqlab qolish\nHar biringizning o'z do'stlari, sevimli mashg'ulotlari va maqsadlari bo'lishi kerak.\n\nBirgalikda rivojlanish\nHar ikkingiz birgalikda ham o'sib borish muhim.", tags: ["Shaxsiyat", "Muvozanat"], featured: false },
  { id: 6, title: "Farzand tug'ilgandan keyin munosabat qanday o'zgaradi?", author: "Dr. Gulnora Hasanova", avatar: "👩‍🔬", date: "22 Oktyabr 2024", readTime: "9 daqiqa", category: "Oila", cover: "👶", excerpt: "Ko'pgina juftliklar farzand tug'ilgandan keyin munosabatida keskin o'zgarishlarni his qiladi. Bu normal.", content: "Farzand tug'ilgandan keyin...\n\nUyqu va charchoq\nBirinchi yillarda ikkingiz ham charchaysiz — bu jarayonda bir-biringizga sabr ko'rsating.\n\nRollar o'zgarishi\nOta-ona bo'lish bilan birga, juftlik bo'lib qolish uchun ongli harakat kerak.", tags: ["Farzand", "Oila"], featured: false },
]

const CATS = ['Hammasi', 'Ilmiy', 'Amaliy', 'Terapiya', 'Neyrologiya', 'Oila', 'Rivojlanish']

export default function BlogPage() {
  const [cat, setCat] = useState('Hammasi')
  const [open, setOpen] = useState(null)

  const filtered = cat === 'Hammasi' ? posts : posts.filter(p => p.category === cat)
  const featured = posts.find(p => p.featured)

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 20px 56px' }}>

      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <span style={{ display: 'inline-flex', padding: '5px 14px', borderRadius: 99, fontSize: 12, fontWeight: 500, background: '#FFE4E6', color: '#BE185D', marginBottom: 12 }}>✍️ Psixologlar qalamidan</span>
        <h1 className="font-display" style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700, color: '#BE185D', marginBottom: 10 }}>Blog</h1>
        <p style={{ fontSize: 16, color: '#9F4F6B', maxWidth: 480, margin: '0 auto' }}>Munosabat, sevgi va psixologiya haqida mutaxassislarning maqolalari</p>
      </div>

      {/* Featured */}
      {featured && (
        <div onClick={() => setOpen(featured)} style={{ background: 'rgba(255,255,255,0.82)', border: '1px solid #FECDD3', borderRadius: 22, padding: '28px 28px', marginBottom: 36, cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', display: 'grid', gridTemplateColumns: '1fr auto', gap: 28, alignItems: 'center' }} className="featured-card">
          <div>
            <span style={{ display: 'inline-flex', padding: '4px 12px', borderRadius: 99, fontSize: 12, fontWeight: 600, background: 'linear-gradient(135deg,#FB7185,#A78BFA)', color: 'white', marginBottom: 12 }}>🌟 Tanlangan maqola</span>
            <h2 className="font-display" style={{ fontSize: 'clamp(18px, 3vw, 26px)', fontWeight: 700, color: '#BE185D', marginBottom: 10, lineHeight: 1.3 }}>{featured.title}</h2>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: '#9F4F6B', marginBottom: 14 }}>{featured.excerpt}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 12, color: '#C4899E' }}>
              <span>{featured.avatar} {featured.author}</span>
              <span>📅 {featured.date}</span>
              <span>⏱️ {featured.readTime}</span>
            </div>
          </div>
          <div style={{ width: 120, height: 120, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64, background: 'linear-gradient(135deg,#FFE4E6,#EDE9FE)', flexShrink: 0 }} className="featured-icon">
            {featured.cover}
          </div>
        </div>
      )}

      {/* Category filter */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 32 }}>
        {CATS.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{ padding: '7px 16px', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: 'pointer', border: '1px solid #FECDD3', transition: 'all 0.15s', background: cat === c ? 'linear-gradient(135deg,#FB7185,#A78BFA)' : 'rgba(255,255,255,0.85)', color: cat === c ? 'white' : '#BE185D' }}>{c}</button>
        ))}
      </div>

      {/* Grid */}
      <div className="blog-grid">
        {filtered.map(post => (
          <article key={post.id} onClick={() => setOpen(post)} style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid #FECDD3', borderRadius: 22, overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }} className="blog-card">
            <div style={{ height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 58, background: 'linear-gradient(135deg,#FFE4E6,#EDE9FE)' }}>{post.cover}</div>
            <div style={{ padding: '16px 18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ padding: '3px 10px', borderRadius: 8, fontSize: 11.5, fontWeight: 500, background: '#FFE4E6', color: '#BE185D' }}>{post.category}</span>
                <span style={{ fontSize: 11, color: '#C4899E' }}>⏱️ {post.readTime}</span>
              </div>
              <h3 className="font-display" style={{ fontSize: 15.5, fontWeight: 600, color: '#BE185D', marginBottom: 8, lineHeight: 1.35 }}>{post.title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.55, color: '#9F4F6B', marginBottom: 12, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.excerpt}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#C4899E' }}>
                <span>{post.avatar}</span><span>{post.author}</span><span>·</span><span>{post.date}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Post Modal */}
      {open && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '20px 16px', background: 'rgba(190,24,93,0.14)', backdropFilter: 'blur(8px)', overflowY: 'auto' }}>
          <div style={{ background: 'rgba(255,255,255,0.97)', borderRadius: 24, maxWidth: 640, width: '100%', border: '1px solid #FECDD3', boxShadow: '0 12px 48px rgba(190,24,93,0.15)', overflow: 'hidden' }}>
            <div style={{ height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80, background: 'linear-gradient(135deg,#FFE4E6,#EDE9FE)' }}>{open.cover}</div>
            <div style={{ padding: '24px 28px 32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <span style={{ padding: '4px 12px', borderRadius: 8, fontSize: 12, background: '#FFE4E6', color: '#BE185D' }}>{open.category}</span>
                <button onClick={() => setOpen(null)} style={{ background: 'none', border: 'none', fontSize: 20, color: '#C4899E', cursor: 'pointer' }}>✕</button>
              </div>
              <h2 className="font-display" style={{ fontSize: 'clamp(18px, 3vw, 24px)', fontWeight: 700, color: '#BE185D', marginBottom: 10, lineHeight: 1.3 }}>{open.title}</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, fontSize: 13, color: '#C4899E', marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid #FFE4E6' }}>
                <span>{open.avatar} {open.author}</span><span>·</span><span>{open.date}</span><span>·</span><span>⏱️ {open.readTime}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {open.content.split('\n\n').map((p, i) => (
                  <p key={i} style={{ fontSize: 14, lineHeight: 1.7, color: p.length < 40 ? '#BE185D' : '#4B2A3A', fontWeight: p.length < 40 ? 600 : 400, margin: 0 }}>{p}</p>
                ))}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 20 }}>
                {open.tags.map((t, i) => <span key={i} style={{ padding: '4px 12px', borderRadius: 99, fontSize: 12, background: '#EDE9FE', color: '#7C3AED' }}>#{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .blog-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .blog-card:hover { transform: translateY(-3px); box-shadow: 0 8px 32px rgba(190,24,93,0.1); }
        .featured-card:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(190,24,93,0.1); }
        @media (max-width: 900px) { .blog-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) {
          .blog-grid { grid-template-columns: 1fr; }
          .featured-card { grid-template-columns: 1fr !important; }
          .featured-icon { display: none; }
        }
      `}</style>
    </div>
  )
}
