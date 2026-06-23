import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))

  return (
    <>
      <Toaster position="top-right" />
      {!token 
        ? <Login setToken={setToken} /> 
        : <Dashboard setToken={setToken} />}
    </>
  )
}

export default App