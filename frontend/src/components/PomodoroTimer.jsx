import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

export default function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [mode, setMode] = useState('work')
  const [cycles, setCycles] = useState(0)

  useEffect(() => {
    let interval = null
    if (isRunning) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(s => s - 1)
        } else if (minutes > 0) {
          setMinutes(m => m - 1)
          setSeconds(59)
        } else {
          clearInterval(interval)
          setIsRunning(false)
          if (mode === 'work') {
            toast.success('🎉 Work session done! Take a break!')
            setMode('break')
            setMinutes(5)
            setCycles(c => c + 1)
          } else {
            toast.success('⚡ Break over! Back to work!')
            setMode('work')
            setMinutes(25)
          }
          setSeconds(0)
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, minutes, seconds, mode])

  const reset = () => {
    setIsRunning(false)
    setMinutes(mode === 'work' ? 25 : 5)
    setSeconds(0)
  }

  const switchMode = (m) => {
    setIsRunning(false)
    setMode(m)
    setMinutes(m === 'work' ? 25 : 5)
    setSeconds(0)
  }

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <div className="card" style={{ textAlign: 'center' }}>
        <h3 style={{ marginBottom: '20px', color: '#6366f1' }}>⏱ Pomodoro Timer</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '30px' }}>
          <button className="btn" onClick={() => switchMode('work')}
            style={{ background: mode === 'work' ? '#6366f1' : '#334155', color: 'white' }}>
            💼 Work (25m)
          </button>
          <button className="btn" onClick={() => switchMode('break')}
            style={{ background: mode === 'break' ? '#22c55e' : '#334155', color: 'white' }}>
            ☕ Break (5m)
          </button>
        </div>
        <div className="timer">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <div className="timer-label">{mode === 'work' ? '💼 Focus Time!' : '☕ Break Time!'}</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '20px' }}>
          <button className="btn btn-primary" style={{ fontSize: '18px', padding: '12px 32px' }}
            onClick={() => setIsRunning(!isRunning)}>
            {isRunning ? '⏸ Pause' : '▶ Start'}
          </button>
          <button className="btn" onClick={reset}
            style={{ background: '#334155', color: 'white', fontSize: '18px', padding: '12px 32px' }}>
            🔄 Reset
          </button>
        </div>
        <div style={{ marginTop: '24px', color: '#94a3b8' }}>
          ✅ Completed Cycles: <strong style={{ color: '#6366f1' }}>{cycles}</strong>
        </div>
      </div>
    </div>
  )
}