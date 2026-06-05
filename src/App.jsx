import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import PsychologistsPage from './pages/PsychologistsPage'
import CoursesPage from './pages/CoursesPage'
import BlogPage from './pages/BlogPage'
import HowItWorksPage from './pages/HowItWorksPage'
import QuizPage from './pages/QuizPage'
import PremiumPage from './pages/PremiumPage'

function Layout() {
  const { pathname } = useLocation()
  const isChat = pathname === '/chat'

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#FFFAFA' }}>
      {!isChat && <Navbar />}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/psychologists" element={<PsychologistsPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/premium" element={<PremiumPage />} />
        </Routes>
      </main>
      {!isChat && <Footer />}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
