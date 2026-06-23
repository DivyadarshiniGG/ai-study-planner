import axios from 'axios'

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
})

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const refresh = localStorage.getItem('refresh_token')
        if (refresh) {
          const res = await axios.post('http://127.0.0.1:8000/api/auth/refresh/', { refresh })
          localStorage.setItem('token', res.data.access)
          error.config.headers.Authorization = `Bearer ${res.data.access}`
          return axios(error.config)
        }
      } catch {
        localStorage.removeItem('token')
        localStorage.removeItem('refresh_token')
        window.location.reload()
      }
    }
    return Promise.reject(error)
  }
)

export default API