import { useState, useEffect } from 'react'
import AvatarSVG from './AvatarSVG'

const features = [
  {
    icon: '💬',
    title: "Ochiq muloqot",
    desc: "Fikrlaringizni erkin baham ko'ring, muhokama qiling va bir-biringizni yanada yaxshiroq tushuning.",
  },
  {
    icon: '💝',
    title: "Munosabat maslahati",
    desc: "Munosabatingizni mustahkamlash uchun ilmiy asosli maslahatlar va ko'rsatmalar oling.",
  },
  {
    icon: '🌸',
    title: "Shaxsiy yondashuv",
    desc: "Har bir juft o'ziga xos — AI sizning o'ziga xos vaziyatingizni tushunadi.",
  },
  {
    icon: '🔒',
    title: "Maxfiylik",
    desc: "Barcha suhbatlaringiz to'liq maxfiy va himoyalangan saqlanadi.",
  },
]

const tips = [
  "Munosabatingizda kommunikatsiya — eng kuchli ko'prik.",
  "Bir-biringizni tinglash — sevgining eng chuqur ifodasi.",
  "Har bir qiyinchilik juftliklarni kuchaytiradi.",
  "Minnatdorlik — baxtli munosabatning siriga.",
  "Birgalikdagi tush ko'ring va birgalikda qurying.",
]

export default function LandingPage({ onStart }) {
  const [currentTip, setCurrentTip] = useState(0)
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % tips.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const addHeart = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()
    setHearts(prev => [...prev, { id, x, y }])
    setTimeout(() => setHearts(prev => prev.filter(h => h.id !== id)), 2000)
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Decorative blobs */}
      <div
        className="fixed top-0 right-0 w-96 h-96 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FDA4AF, transparent)', transform: 'translate(30%, -30%)' }}
      />
      <div
        className="fixed bottom-0 left-0 w-80 h-80 rounded-full opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #C4B5FD, transparent)', transform: 'translate(-30%, 30%)' }}
      />

      {/* Header */}
      <header className="glass sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #FB7185, #A78BFA)' }}>
              <span className="text-white text-base heartbeat inline-block">♥</span>
            </div>
            <span className="font-display text-xl font-semibold"
              style={{ background: 'linear-gradient(135deg, #E11D48, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Munosabat AI
            </span>
          </div>
          <button
            onClick={onStart}
            className="px-5 py-2 rounded-full text-white text-sm font-medium transition-all hover:scale-105 hover:shadow-lg"
            style={{ background: 'linear-gradient(135deg, #FB7185, #A78BFA)' }}
          >
            Boshlash
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
            style={{ background: 'linear-gradient(135deg, #FFE4E6, #EDE9FE)', color: '#BE185D' }}>
            <span>✨</span> Juftliklar uchun AI maslahatchi
          </div>
        </div>

        <div className="fade-in-up-delay-1">
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6"
            style={{ background: 'linear-gradient(135deg, #BE185D, #7C3AED, #BE185D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Sevginizni<br />
            <em>kuchaytiring</em>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
            style={{ color: '#9F4F6B' }}>
            Er-xotin yoki sevishganlar uchun mo'ljallangan AI maslahatchi. Munosabatingizdagi har qanday muammoga
            nafis, hamdard va professional yondashuv bilan javob oling.
          </p>
        </div>

        <div className="fade-in-up-delay-2 flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={onStart}
            onMouseMove={addHeart}
            className="relative px-8 py-4 rounded-2xl text-white font-semibold text-lg transition-all hover:scale-105 hover:shadow-2xl overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #E11D48, #A78BFA)' }}
          >
            {hearts.map(h => (
              <span
                key={h.id}
                className="float-heart absolute text-xl pointer-events-none select-none"
                style={{ left: h.x, top: h.y, transform: 'translate(-50%, -50%)' }}
              >
                ♥
              </span>
            ))}
            💬 AI bilan suhbat boshlang
          </button>
          <button
            className="px-8 py-4 rounded-2xl font-semibold text-lg transition-all hover:scale-105"
            style={{ background: 'rgba(255,255,255,0.8)', color: '#BE185D', border: '2px solid #FECDD3' }}
          >
            🌸 Qanday ishlaydi?
          </button>
        </div>

        {/* Avatar showcase */}
        <div className="fade-in-up-delay-3 flex justify-center mb-8">
          <div className="relative">
            <div className="w-40 h-40 rounded-full flex items-center justify-center shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #FFE4E6, #EDE9FE)' }}>
              <AvatarSVG size={130} animated />
            </div>
            {/* Speech bubble */}
            <div className="absolute -right-4 -top-4 glass rounded-2xl rounded-bl-none px-4 py-3 shadow-lg max-w-52 text-left"
              style={{ border: '1px solid #FECDD3' }}>
              <p className="text-sm font-medium" style={{ color: '#BE185D' }}>
                Salom! Men sizning shaxsiy AI asistentingizman 💕
              </p>
            </div>
          </div>
        </div>

        {/* Rotating tips */}
        <div className="glass rounded-2xl px-6 py-4 max-w-md mx-auto"
          style={{ border: '1px solid #FECDD3' }}>
          <p className="text-sm font-medium mb-1" style={{ color: '#FB7185' }}>💡 Kunlik maslahat</p>
          <p key={currentTip} className="message-appear italic text-base" style={{ color: '#9F4F6B' }}>
            "{tips[currentTip]}"
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-center mb-12"
          style={{ color: '#BE185D' }}>
          Nima uchun <em>Munosabat AI</em>?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="glass rounded-3xl p-6 text-center transition-all hover:scale-105 hover:shadow-xl cursor-default"
              style={{ border: '1px solid #FECDD3' }}
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="font-display font-semibold text-lg mb-2" style={{ color: '#BE185D' }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#9F4F6B' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div
          className="rounded-3xl p-10 text-center text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #E11D48, #A78BFA, #E11D48)' }}
        >
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 relative">
            Munosabatingizni yangi bosqichga olib chiqing
          </h2>
          <p className="text-lg opacity-90 mb-8 relative max-w-xl mx-auto">
            Minglab juftliklar allaqachon Munosabat AI yordamida munosabatlarini mustahkamlashdi.
          </p>
          <button
            onClick={onStart}
            className="px-8 py-4 rounded-2xl font-semibold text-lg transition-all hover:scale-105 hover:shadow-xl"
            style={{ background: 'white', color: '#E11D48' }}
          >
            🌸 Bepul boshlang
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 px-6" style={{ color: '#C4899E' }}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="heartbeat inline-block">♥</span>
          <span className="font-display font-medium" style={{ color: '#E11D48' }}>Munosabat AI</span>
        </div>
        <p className="text-sm">Sevgi va muruvvat bilan yaratilgan · 2024</p>
      </footer>
    </div>
  )
}
