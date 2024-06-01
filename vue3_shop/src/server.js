import axios from 'axios'

const api = axios.create(
   {
      baseURL: '/api',
      timeout: 50000
   }
)

api.interceptors.request.use((config) => {
   config.headers.Authorization = window.sessionStorage.getItem('token')
   return config
})

export default api