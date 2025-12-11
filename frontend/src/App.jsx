import React, { useEffect, useState } from 'react'
import { LogOut, KeyRound, NotebookPen, Cog, Eye, EyeOff, Plus, Pencil, Trash2, Copy } from 'lucide-react'
import { api } from './lib/api'
import { Auth } from './components/Auth'
import { Passwords } from './components/Passwords'
import { Notes } from './components/Notes'
import { Generator } from './components/Generator'
import { Logo } from './components/Logo'

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
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-gradient-xy flex items-center justify-center relative overflow-hidden">
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
      {/* Header & Nav Combined */}
      <div className="sticky top-0 z-40">
        <header className="bg-white/80 backdrop-blur-md shadow-sm px-6 py-4 border-b border-white/20">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary-600 flex items-center gap-2">
              <Logo className="w-10 h-10" variant="light" />
              Digi-Book
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary-50 to-primary-100/50 text-primary-700 border border-primary-200 shadow-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-primary-400 to-primary-500 animate-pulse shadow-sm" />
                <span className="text-sm font-semibold">Welcome, {auth.username}</span>
              </div>
              <button 
                onClick={async () => { await api.auth.logout(); location.reload() }} 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/80 text-secondary-700 border border-secondary-200 hover:bg-secondary-50 hover:text-secondary-800 hover:border-secondary-300 transition-all active:scale-95 shadow-sm hover:shadow-md"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          </div>
        </header>

        {/* Nav */}
        <nav className="bg-white/90 backdrop-blur-md px-6 py-1 shadow-sm">
          <div className="max-w-7xl mx-auto flex gap-1">
            <Tab icon={<Cog size={18} />} active={view==='generator'} onClick={() => setView('generator')}>Generator</Tab>
            <Tab icon={<NotebookPen size={18} />} active={view==='notes'} onClick={() => setView('notes')}>Notes</Tab>
            <Tab icon={<KeyRound size={18} />} active={view==='passwords'} onClick={() => setView('passwords')}>Passwords</Tab>
          </div>
        </nav>
      </div>

      <main className="max-w-3xl mx-auto p-6">
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
      className={`px-4 py-3 text-sm font-medium flex items-center gap-2 transition-all rounded-lg my-2 ${
        active 
          ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md' 
          : 'text-secondary-600 hover:bg-primary-50/50 hover:text-primary-700'
      }`}
    >
      {icon}{children}
    </button>
  )
}
