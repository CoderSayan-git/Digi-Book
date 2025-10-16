const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

async function request(path, options = {}) {
  const res = await fetch(path.startsWith('/api') ? path : BASE + path, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options.headers||{}) },
    ...options,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data?.error || 'Request failed')
  return data
}

export const api = {
  auth: {
    status: () => request('/api/auth/status'),
    login: (body) => request('/api/auth/login', { method: 'POST', body: JSON.stringify(body) }),
    register: (body) => request('/api/auth/register', { method: 'POST', body: JSON.stringify(body) }),
    logout: () => request('/api/auth/logout', { method: 'POST' }),
  },
  passwords: {
    list: () => request('/api/passwords'),
    create: (body) => request('/api/passwords', { method: 'POST', body: JSON.stringify(body) }),
    update: (id, body) => request(`/api/passwords/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
    remove: (id) => request(`/api/passwords/${id}`, { method: 'DELETE' }),
  },
  notes: {
    list: () => request('/api/notes'),
    create: (body) => request('/api/notes', { method: 'POST', body: JSON.stringify(body) }),
    update: (id, body) => request(`/api/notes/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
    remove: (id) => request(`/api/notes/${id}`, { method: 'DELETE' }),
  }
}
