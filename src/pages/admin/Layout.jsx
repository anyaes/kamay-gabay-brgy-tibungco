import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'

const navItems = [
  { to: '/admin/activities', label: 'Activities', icon: '📅' },
  { to: '/admin/officers', label: 'Officers', icon: '👥' },
  { to: '/admin/departments', label: 'Departments', icon: '🏷️' },
]

export default function AdminLayout() {
  const { profile, signOut } = useAuth()

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
      isActive
        ? 'bg-[#F5C253] text-[#173022] shadow-sm'
        : 'text-slate-200 hover:bg-white/10 hover:text-[#F5C253]'
    }`

  return (
    <div className="flex min-h-screen bg-[#F4EFE4]">
      {/* Sidebar */}
      <aside className="flex w-64 shrink-0 flex-col bg-[#173022] p-6 text-white">
        <a href="/" className="mb-2 text-lg font-extrabold text-[#F5C253]">
          Kamay-Gabay
        </a>
        <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
          Admin panel
        </p>

        <nav className="flex flex-col gap-1.5">
          {navItems.map((n) => (
            <NavLink key={n.to} to={n.to} className={linkClass}>
              <span className="text-base">{n.icon}</span>
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-3 border-t border-white/10 pt-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5C253]/20 text-sm font-bold text-[#F5C253]">
              {profile?.email?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {profile?.email || 'Admin'}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {profile?.role || 'admin'}
              </p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/20 hover:text-white"
          >
            Sign out
          </button>
          <a
            href="/"
            className="text-center text-xs text-slate-400 hover:text-[#F5C253]"
          >
            ← Back to website
          </a>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto p-6 lg:p-10">
        <div className="mx-auto max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  )
}