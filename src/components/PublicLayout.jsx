import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#FAF4DE] text-slate-800 font-sans selection:bg-emerald-500 selection:text-white">
      <Navbar
        links={[
          { to: '/#about', label: 'About' },
          { to: '/history', label: 'History' },
          { to: '/activities', label: 'Activities' },
          { to: '/officers', label: 'Officers' },
          { to: '/admin/login', label: 'Admin' },
        ]}
      />

      <main className="pt-10">
        <Outlet />
      </main>

      <footer className="bg-[#173022] text-slate-200 pt-16 pb-8 px-6 sm:px-12 lg:px-24 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-slate-300 rounded-lg shrink-0" />
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Kamay-Gabay
              </h3>
              <p className="text-xs text-slate-400">
                Empowering Voices, Embracing Inclusion
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-white/10 text-xs">
            <div>
              <h4 className="font-bold text-white mb-3">Address</h4>
              <p className="text-slate-300 leading-relaxed">
                Barangay Tibungco, Davao City
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">Contact</h4>
              <p className="text-slate-300">+63 993 902 3168</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">Email</h4>
              <p className="text-slate-300">kamaygabay@gmail.com</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">Socials</h4>
              <div className="flex gap-3 text-slate-300 font-bold text-xs">
                <a href="#" className="hover:text-white">
                  FB
                </a>
                <a href="#" className="hover:text-white">
                  IG
                </a>
                <a href="#" className="hover:text-white">
                  X
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center pt-6 text-[11px] text-slate-400 gap-2">
            <p>Kamay-Gabay. All rights reserved.</p>
            <p>© 2026 Kamay-Gabay.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}