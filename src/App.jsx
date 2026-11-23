import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import PublicLayout from './components/PublicLayout.jsx'
import Activities from './pages/Activities.jsx'
import ActivityDetail from './pages/ActivityDetail.jsx'
import Officers from './pages/Officers.jsx'
import History from './pages/History.jsx'
import Login from './pages/admin/Login.jsx'
import AdminLayout from './pages/admin/Layout.jsx'
import AdminActivities from './pages/admin/Activities.jsx'
import AdminOfficers from './pages/admin/Officers.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route element={<PublicLayout />}>
        <Route path="/activities" element={<Activities />} />
        <Route path="/activities/:id" element={<ActivityDetail />} />
        <Route path="/officers" element={<Officers />} />
        <Route path="/history" element={<History />} />
      </Route>
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="activities" replace />} />
          <Route path="activities" element={<AdminActivities />} />
          <Route path="officers" element={<AdminOfficers />} />
          <Route path="*" element={<Navigate to="activities" replace />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}