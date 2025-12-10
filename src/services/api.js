import axios from 'axios'

const API_URL = 'https://hr-management-inky.vercel.app'

const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const auth = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
}

export const employees = {
  getAll: () => api.get('/employees'),
  create: (data) => api.post('/employees', data),
  update: (id, data) => api.put(`/employees/${id}`, data),
  delete: (id) => api.delete(`/employees/${id}`),
}

export const attendance = {
  getAll: () => api.get('/attendance'),
  create: (data) => api.post('/attendance', data),
}

export const leaves = {
  getAll: () => api.get('/leaves'),
  create: (data) => api.post('/leaves', data),
  updateStatus: (id, status) => api.patch(`/leaves/${id}`, { status }),
}

export const payroll = {
  getAll: () => api.get('/payroll'),
  create: (data) => api.post('/payroll', data),
}

export const jobs = {
  getAll: () => api.get('/jobs'),
  create: (data) => api.post('/jobs', data),
}

export default api
