import { useState, useEffect } from 'react'
import Tasks from './Tasks'
import AIAssistant from './AIAssistant'
import PomodoroTimer from './PomodoroTimer'
import API from '../api'

export default function Dashboard({ setToken }) {
  const [tab, setTab] = useState('tasks')
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, in_progress: 0 })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await API.get('/tasks/')
      const tasks = res.data
      setStats({
        total: tasks.length,
        completed: tasks.filter(t => t.status === 'completed').length,
        pending: tasks.filter(t => t.status === 'pending').length,
        in_progress: tasks.filter(t => t.status === 'in_progress').length,
      })
    } catch {}
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  return (
    <>
      <div className="navbar">
        <h1>🧠 AI Study Planner</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          {['tasks', 'ai', 'timer'].map(t => (
            <button key={t} className="btn"
              onClick={() => setTab(t)}
              style={{ background: tab === t ? '#6366f1' : '#e0e7ff', color: tab === t ? 'white' : '#4338ca' }}>
              {t === 'tasks' ? '📋 Tasks' : t === 'ai' ? '🤖 AI Assistant' : '⏱ Pomodoro'}
            </button>
          ))}
          <button className="btn btn-danger" onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="container">
        {/* Stats Bar */}
        <div className="grid-3" style={{ marginBottom: '24px' }}>
          {[
            { label: 'Total Tasks', value: stats.total, color: '#6366f1', bg: '#e0e7ff' },
            { label: '✅ Completed', value: stats.completed, color: '#16a34a', bg: '#dcfce7' },
            { label: '⏳ Pending', value: stats.pending, color: '#d97706', bg: '#fef3c7' },
          ].map((s, i) => (
            <div key={i} className="card" style={{ textAlign: 'center', border: `2px solid ${s.bg}` }}>
              <div style={{ fontSize: '32px', fontWeight: 700, color: s.color }}>{s.value}</div>
              <div style={{ color: '#64748b', fontSize: '14px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {tab === 'tasks' && <Tasks onUpdate={fetchStats} />}
        {tab === 'ai' && <AIAssistant />}
        {tab === 'timer' && <PomodoroTimer />}
      </div>
    </>
  )
}