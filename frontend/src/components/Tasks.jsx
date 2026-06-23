import { useState, useEffect } from 'react'
import API from '../api'
import toast from 'react-hot-toast'

export default function Tasks({ onUpdate}) {
  const [tasks, setTasks] = useState([])
  const [form, setForm] = useState({ title: '', description: '', priority: 'medium', subject: '', due_date: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks/')
      setTasks(res.data)
    } catch { toast.error('Failed to fetch tasks') }
  }

  const addTask = async () => {
    if (!form.title) return toast.error('Title required!')
    setLoading(true)
    try {
      await API.post('/tasks/', form)
      toast.success('Task added!')
      setForm({ title: '', description: '', priority: 'medium', subject: '', due_date: '' })
      fetchTasks()
      if (onUpdate) onUpdate()
    } catch { toast.error('Failed to add task') }
    setLoading(false)
  }

  const updateStatus = async (id, status) => {
    try {
      await API.patch(`/tasks/${id}/`, { status })
      fetchTasks()
      if (onUpdate) onUpdate()
      toast.success('Status updated!')
    } catch { toast.error('Failed to update') }
  }

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}/`)
      fetchTasks()
      if (onUpdate) onUpdate()
      toast.success('Task deleted!')
    } catch { toast.error('Failed to delete') }
  }

  return (
    <div>
      <div className="card">
        <h3 style={{ marginBottom: '16px', color: '#6366f1' }}>➕ Add New Task</h3>
        <div className="grid-2">
          <input placeholder="Task title *" value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })} />
          <input placeholder="Subject" value={form.subject}
            onChange={e => setForm({ ...form, subject: e.target.value })} />
        </div>
        <textarea placeholder="Description" value={form.description} rows={2}
          onChange={e => setForm({ ...form, description: e.target.value })} />
        <div className="grid-2">
          <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
            <option value="high">🔴 High Priority</option>
            <option value="medium">🟡 Medium Priority</option>
            <option value="low">🟢 Low Priority</option>
          </select>
          <input type="date" value={form.due_date}
            onChange={e => setForm({ ...form, due_date: e.target.value })} />
        </div>
        <button className="btn btn-primary" onClick={addTask} disabled={loading}>
          {loading ? 'Adding...' : '➕ Add Task'}
        </button>
      </div>

      <h3 style={{ marginBottom: '16px', color: '#94a3b8' }}>📋 Your Tasks ({tasks.length})</h3>
      {tasks.length === 0 && <div className="card" style={{ textAlign: 'center', color: '#64748b' }}>No tasks yet! Add one above.</div>}
      {tasks.map(task => (
        <div key={task.id} className="card" style={{ borderLeft: `4px solid ${task.priority === 'high' ? '#ef4444' : task.priority === 'medium' ? '#f59e0b' : '#22c55e'}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h4 style={{ marginBottom: '6px' }}>{task.title}</h4>
              {task.subject && <p style={{ color: '#94a3b8', fontSize: '13px' }}>📚 {task.subject}</p>}
              {task.description && <p style={{ color: '#64748b', fontSize: '13px', marginTop: '4px' }}>{task.description}</p>}
              {task.due_date && <p style={{ color: '#f59e0b', fontSize: '12px', marginTop: '4px' }}>📅 Due: {task.due_date}</p>}
              <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                <span className={`badge badge-${task.priority}`}>{task.priority}</span>
                <span className={`badge badge-${task.status}`}>{task.status}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
              {task.status !== 'completed' && (
                <button className="btn btn-success" style={{ fontSize: '12px', padding: '6px 12px' }}
                  onClick={() => updateStatus(task.id, 'completed')}>✅ Done</button>
              )}
              {task.status === 'pending' && (
                <button className="btn btn-warning" style={{ fontSize: '12px', padding: '6px 12px' }}
                  onClick={() => updateStatus(task.id, 'in_progress')}>▶ Start</button>
              )}
              <button className="btn btn-danger" style={{ fontSize: '12px', padding: '6px 12px' }}
                onClick={() => deleteTask(task.id)}>🗑 Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}