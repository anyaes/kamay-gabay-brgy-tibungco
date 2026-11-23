import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function ProtectedRoute() {
  const { session, profile, loading } = useAuth()
  if (loading) return <div className="p-8 text-center">Loading…</div>
  if (!session) return <Navigate to="/admin/login" replace />
  if (!profile || !['admin', 'editor'].includes(profile.role)) {
    return <Navigate to="/" replace />
  }
  return <Outlet />
}