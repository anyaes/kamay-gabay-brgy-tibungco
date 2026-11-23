import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/admin/activities')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#173022] px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-[#FAF4DE] rounded-3xl p-8 w-full max-w-sm shadow-2xl"
      >
        <h1 className="text-2xl font-extrabold text-[#23351C] mb-1">Admin Login</h1>
        <p className="text-xs text-slate-500 mb-6">Kamay-Gabay</p>

        <label className="block text-xs font-bold text-slate-600 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-700"
        />

        <label className="block text-xs font-bold text-slate-600 mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-700"
        />

        {error && <p className="text-xs text-red-600 mb-3">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#173022] text-white font-bold py-2.5 rounded-lg text-sm hover:bg-[#1b3d2b] transition disabled:opacity-60"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>

        <a href="/" className="block text-center text-xs text-slate-500 mt-4 hover:underline">
          ← Back to site
        </a>
      </form>
    </div>
  )
}