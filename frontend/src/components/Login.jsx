import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function Login({ setToken }) {
  const [isRegister, setIsRegister] = useState(false)
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handle = async () => {
    setLoading(true)
    try {
      if (isRegister) {
        await axios.post('http://127.0.0.1:8000/api/auth/register/', form)
        toast.success('Account created! Please login.')
        setIsRegister(false)
      } else {
        const res = await axios.post('http://127.0.0.1:8000/api/auth/login/', form)
        localStorage.setItem('token', res.data.access)
        localStorage.setItem('refresh_token', res.data.refresh)
        setToken(res.data.access)
        toast.success('Welcome back!')
      }
    } catch {
      toast.error(isRegister ? 'Registration failed!' : 'Invalid credentials!')
    }
    setLoading(false)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div className="card" style={{ width: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ color: '#6366f1', fontSize: '28px' }}>🧠 AI Study Planner</h2>
          <p style={{ color: '#64748b', marginTop: '6px' }}>Your intelligent study companion</p>
        </div>

        <div style={{ display: 'flex', marginBottom: '24px', background: '#f0f4ff', borderRadius: '8px', padding: '4px' }}>
          <button onClick={() => setIsRegister(false)} style={{ flex: 1, padding: '8px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, background: !isRegister ? '#6366f1' : 'transparent', color: !isRegister ? 'white' : '#64748b' }}>
            Login
          </button>
          <button onClick={() => setIsRegister(true)} style={{ flex: 1, padding: '8px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, background: isRegister ? '#6366f1' : 'transparent', color: isRegister ? 'white' : '#64748b' }}>
            Register
          </button>
        </div>

        <input placeholder="Username" value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })} />
        {isRegister && <input placeholder="Email" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })} />}
        <input placeholder="Password" type="password" value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })} />

        <button className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: '16px' }}
          onClick={handle} disabled={loading}>
          {loading ? '⏳ Please wait...' : isRegister ? '🚀 Create Account' : '🔐 Login'}
        </button>
      </div>
    </div>
  )
}