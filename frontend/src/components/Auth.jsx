import React, { useState } from 'react'
import { api } from '../lib/api'

export function Auth({ onAuthenticated }) {
  const [tab, setTab] = useState('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true); setError('')
    const username = e.target.username.value
    const password = e.target.password.value
    try {
      const res = await api.auth.login({ username, password })
      onAuthenticated(res.username)
    } catch (err) {
      setError(err.message || 'Login failed.')
    } finally { setLoading(false) }
  }

  async function handleRegister(e) {
    e.preventDefault()
    setLoading(true); setError('')
    const username = e.target.username.value
    const password = e.target.password.value
    const confirm = e.target.confirm.value
    if (password !== confirm) { setError('Passwords do not match'); setLoading(false); return }
    try {
      const res = await api.auth.register({ username, password })
      onAuthenticated(res.username)
    } catch (err) {
      setError(err.message || 'Registration failed.')
    } finally { setLoading(false) }
  }

  return (
    <div className="w-full max-w-md bg-bg-light rounded-xl shadow-cardLg hover:shadow-cardLgHover transition-shadow p-6">
      <h2 className="text-2xl font-semibold text-center text-primary-600 mb-2">DigiBook</h2>
      <p className="text-center text-text-light mb-6">Your digital vault for passwords and notes</p>

      <div className="flex gap-2 mb-6">
        <button onClick={() => setTab('login')} className={`flex-1 py-2 rounded-md border transition-colors ${tab==='login' ? 'bg-primary-500 text-text-inverted border-primary-500 hover:bg-primary-600' : 'border-secondary-200 text-text hover:bg-secondary-50'}`}>Login</button>
        <button onClick={() => setTab('register')} className={`flex-1 py-2 rounded-md border transition-colors ${tab==='register' ? 'bg-primary-500 text-text-inverted border-primary-500 hover:bg-primary-600' : 'border-secondary-200 text-text hover:bg-secondary-50'}`}>Register</button>
      </div>

      {error && <div className="bg-red-50 text-red-700 text-sm p-2 rounded mb-4">{error}</div>}

      {tab === 'login' ? (
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-text">Username</label>
            <input name="username" className="w-full border-2 border-secondary-200 rounded-md p-2 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 bg-white" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-text">Password</label>
            <input type="password" name="password" className="w-full border-2 border-secondary-200 rounded-md p-2 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 bg-white" required />
          </div>
          <button disabled={loading} className="w-full py-2 rounded-md bg-primary-500 text-white hover:bg-primary-600 disabled:bg-secondary-300 relative z-10">{loading ? 'Please wait...' : 'Login'}</button>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="space-y-4 relative z-10">
          <div>
            <label className="block text-sm font-medium mb-1 text-text">Username</label>
            <input name="username" minLength={3} className="w-full border-2 border-secondary-200 rounded-md p-2 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 bg-white" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-text">Password</label>
            <input type="password" name="password" minLength={6} className="w-full border-2 border-secondary-200 rounded-md p-2 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 bg-white" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-text">Confirm Password</label>
            <input type="password" name="confirm" minLength={6} className="w-full border-2 border-secondary-200 rounded-md p-2 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 bg-white" required />
          </div>
          <button disabled={loading} className="w-full py-2 rounded-md bg-primary-500 text-white hover:bg-primary-600 disabled:bg-secondary-300 relative z-10">{loading ? 'Please wait...' : 'Create Account'}</button>
        </form>
      )}
    </div>
  )
}
