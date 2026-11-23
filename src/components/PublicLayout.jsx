import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#FAF4DE] text-slate-800 font-sans selection:bg-emerald-500 selection:text-white">
      <Navbar
        links={[
          { to: '/about', label: 'About' },
          { to: '/history', label: 'History' },
          { to: '/activities', label: 'Activities' },
          { to: '/officers', label: 'Officers' },
          { to: '/contact', label: 'Contact' },
        ]}
        cta={{ label: 'Get involved', to: '/get-involved' }}
      />

      <main className="pt-10">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}