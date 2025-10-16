import React, { useEffect, useState } from 'react'
import { LogOut, KeyRound, NotebookPen, Cog, Eye, EyeOff, Plus, Pencil, Trash2, Copy, ShieldCheck } from 'lucide-react'
import { api } from './lib/api'
import { Auth } from './components/Auth'
import { Passwords } from './components/Passwords'
import { Notes } from './components/Notes'
import { Generator } from './components/Generator'

export default function App() {
  const [auth, setAuth] = useState({ authenticated: false, username: '' })
  const [view, setView] = useState('passwords')

  useEffect(() => {
    api.auth.status().then((res) => {
      if (res.authenticated) setAuth(res)
    }).catch(() => {})
  }, [])

  if (!auth.authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-gradient-xy flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white opacity-25 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-radial from-white/20 via-transparent to-transparent pointer-events-none" />
        <Auth onAuthenticated={(username) => setAuth({ authenticated: true, username })} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-gradient-xy relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white opacity-25 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-white/20 via-transparent to-transparent pointer-events-none" />
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-md shadow-sm px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold text-primary-600 flex items-center gap-2">
            <ShieldCheck className="text-primary-500 h-6 w-6" /> Digi-Book
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-600 border border-primary-100">
              <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              <span className="text-sm font-medium">Welcome, {auth.username}</span>
            </div>
            <button 
              onClick={async () => { await api.auth.logout(); location.reload() }} 
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-secondary-100 text-secondary-600 hover:bg-secondary-200 hover:text-secondary-700 transition-all active:scale-95"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Nav */}
      <nav className="bg-white/60 backdrop-blur-md border-b border-white/20 px-6 sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto flex gap-2">
          <Tab icon={<KeyRound size={18} />} active={view==='passwords'} onClick={() => setView('passwords')}>Passwords</Tab>
          <Tab icon={<NotebookPen size={18} />} active={view==='notes'} onClick={() => setView('notes')}>Notes</Tab>
          <Tab icon={<Cog size={18} />} active={view==='generator'} onClick={() => setView('generator')}>Generator</Tab>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto p-6">
        <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-6">
          {view === 'passwords' && <Passwords />}
          {view === 'notes' && <Notes />}
          {view === 'generator' && <Generator />}
        </div>
      </main>
    </div>
  )
}

function Tab({ children, icon, active, onClick }) {
  return (
    <button 
      onClick={onClick} 
      className={`px-4 py-3 border-b-2 -mb-px text-sm font-medium flex items-center gap-2 transition-all ${
        active 
          ? 'border-primary-500 text-primary-600 bg-primary-50/50' 
          : 'border-transparent text-secondary-500 hover:text-primary-600 hover:bg-primary-50/30'
      }`}
    >
      {icon}{children}
    </button>
  )
}
