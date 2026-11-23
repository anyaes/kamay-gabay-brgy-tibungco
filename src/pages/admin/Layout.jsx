import { NavLink, Outlet, Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'
import Activities from './Activities.jsx'
import Officers from './Officers.jsx'

export default function AdminLayout() {
  const { profile, signOut } = useAuth()

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition ${
      isActive
        ? 'bg-[#F5C253] text-[#173022]'
        : 'text-slate-200 hover:text-[#F5C253]'
    }`

  return (
    <div className="min-h-screen flex bg-slate-100">
      <aside className="w-60 bg-[#173022] text-white p-6 flex flex-col gap-2 shrink-0">
        <a href="/" className="font-extrabold text-lg text-[#F5C253] mb-4">
          Kamay-Gabay
        </a>
        <span className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">
          Admin
        </span>
        <NavLink to="/admin/activities" className={linkClass}>
          Activities
        </NavLink>
        <NavLink to="/admin/officers" className={linkClass}>
          Officers
        </NavLink>
        <div className="mt-auto flex flex-col gap-2">
          <span className="text-xs text-slate-400">
            {profile?.email} ({profile?.role})
          </span>
          <button
            onClick={signOut}
            className="text-sm text-slate-300 hover:text-white text-left"
          >
            Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 lg:p-10 overflow-auto">
        <Routes>
          <Route index element={<Navigate to="activities" replace />} />
          <Route path="activities" element={<Activities />} />
          <Route path="officers" element={<Officers />} />
          <Route path="*" element={<Navigate to="activities" replace />} />
        </Routes>
      </main>
    </div>
  )
}