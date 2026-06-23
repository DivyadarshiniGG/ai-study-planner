import { useState } from 'react'
import API from '../api'
import toast from 'react-hot-toast'

export default function AIAssistant() {
  const [subjects, setSubjects] = useState('')
  const [days, setDays] = useState(7)
  const [hours, setHours] = useState(4)
  const [plan, setPlan] = useState('')
  const [tasks, setTasks] = useState('')
  const [priorities, setPriorities] = useState('')
  const [loading1, setLoading1] = useState(false)
  const [loading2, setLoading2] = useState(false)

  const generatePlan = async () => {
    if (!subjects) return toast.error('Enter subjects!')
    setLoading1(true)
    try {
      const res = await API.post('/ai/generate-plan/', { subjects, days, hours_per_day: hours })
      setPlan(res.data.plan)
      toast.success('Plan generated!')
    } catch { toast.error('Failed to generate plan') }
    setLoading1(false)
  }

  const prioritizeTasks = async () => {
    if (!tasks) return toast.error('Enter tasks!')
    setLoading2(true)
    try {
      const res = await API.post('/ai/prioritize/', { tasks })
      setPriorities(res.data.priorities)
      toast.success('Tasks prioritized!')
    } catch { toast.error('Failed to prioritize') }
    setLoading2(false)
  }

  return (
    <div className="grid-2">
      <div>
        <div className="card">
          <h3 style={{ marginBottom: '16px', color: '#6366f1' }}>📅 AI Study Plan Generator</h3>
          <textarea placeholder="Enter subjects (e.g. DSA, DBMS, CN, OS)" rows={3}
            value={subjects} onChange={e => setSubjects(e.target.value)} />
          <div className="grid-2">
            <div>
              <label style={{ fontSize: '13px', color: '#94a3b8' }}>Days</label>
              <input type="number" value={days} min={1} max={30}
                onChange={e => setDays(e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: '13px', color: '#94a3b8' }}>Hours/day</label>
              <input type="number" value={hours} min={1} max={12}
                onChange={e => setHours(e.target.value)} />
            </div>
          </div>
          <button className="btn btn-primary" onClick={generatePlan} disabled={loading1} style={{ width: '100%' }}>
            {loading1 ? '🤖 Generating...' : '🚀 Generate Plan'}
          </button>
        </div>
        {plan && <div className="card"><h4 style={{ marginBottom: '12px', color: '#22c55e' }}>✅ Your Study Plan</h4><div className="ai-response">{plan}</div></div>}
      </div>

      <div>
        <div className="card">
          <h3 style={{ marginBottom: '16px', color: '#6366f1' }}>🎯 AI Task Prioritizer</h3>
          <textarea placeholder="Paste your tasks here, one per line..." rows={6}
            value={tasks} onChange={e => setTasks(e.target.value)} />
          <button className="btn btn-primary" onClick={prioritizeTasks} disabled={loading2} style={{ width: '100%' }}>
            {loading2 ? '🤖 Prioritizing...' : '🎯 Prioritize Tasks'}
          </button>
        </div>
        {priorities && <div className="card"><h4 style={{ marginBottom: '12px', color: '#22c55e' }}>✅ Priority Order</h4><div className="ai-response">{priorities}</div></div>}
      </div>
    </div>
  )
}