import React, { useEffect, useState } from 'react'
import { Eye, EyeOff, Pencil, Trash2, Plus } from 'lucide-react'
import { api } from '../lib/api'

export function Passwords() {
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  async function load() {
    const data = await api.passwords.list()
    setItems(data)
  }
  useEffect(() => { load() }, [])

  function onAdd() { setEditing(null); setOpen(true) }
  function onEdit(item) { setEditing(item); setOpen(true) }

  async function onDelete(id) {
    if (!confirm('Delete this password?')) return
    await api.passwords.remove(id)
    await load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-text">Saved Passwords</h2>
        <button 
          onClick={onAdd} 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary-500 text-white hover:bg-primary-600 transition-colors active:scale-95 shadow-sm"
        >
          <Plus size={18} /> Add Password
        </button>
      </div>

      {items.length === 0 ? (
        <Empty icon="🔑" title="No passwords saved yet" subtitle="Click 'Add Password' to create your first entry" />
      ) : (
        <div className="grid gap-4">
          {items.map(item => <PasswordCard key={item._id} item={item} onEdit={() => onEdit(item)} onDelete={() => onDelete(item._id)} />)}
        </div>
      )}

      {open && <PasswordModal initial={editing} onClose={() => setOpen(false)} onSaved={async () => { setOpen(false); await load() }} />}
    </div>
  )
}

function PasswordCard({ item, onEdit, onDelete }) {
  const [show, setShow] = useState(false)
  return (
    <div className="bg-bg-light rounded-xl shadow-card hover:shadow-cardHover transition-shadow p-4">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-text">{item.title}</h3>
        <div className="flex gap-2">
          <button onClick={onEdit} className="px-2 py-1 rounded-md bg-secondary-100 hover:bg-secondary-200 transition-colors"><Pencil size={16} className="text-secondary-600" /></button>
          <button onClick={onDelete} className="px-2 py-1 rounded-md bg-danger-50 text-danger-600 hover:bg-danger-100 transition-colors"><Trash2 size={16} /></button>
        </div>
      </div>
      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between bg-secondary-50 rounded-md px-3 py-2 font-mono">
          <span>{show ? item.password : '••••••••'}</span>
          <div className="flex gap-2">
            <button 
              onClick={() => { navigator.clipboard.writeText(item.password); alert('Password copied!') }}
              className="px-2 py-1 rounded-md bg-bg-light border border-secondary-200 hover:bg-secondary-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary-500">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
              </svg>
            </button>
            <button 
              onClick={() => setShow(s => !s)} 
              className="px-2 py-1 rounded-md bg-bg-light border border-secondary-200 hover:bg-secondary-50 transition-colors"
            >
              {show ? <EyeOff size={16} className="text-secondary-500" /> : <Eye size={16} className="text-secondary-500" />}
            </button>
          </div>
        </div>
        {item.url && (
          <a 
            href={item.url.startsWith('http') ? item.url : `https://${item.url}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
            {item.url}
          </a>
        )}
      </div>
      {item.description && <p className="text-sm text-secondary-600 mt-2 whitespace-pre-wrap">{item.description}</p>}
      <p className="text-xs text-secondary-500 mt-2">Created: {new Date(item.createdAt).toLocaleString()}</p>
    </div>
  )
}

function PasswordModal({ initial, onClose, onSaved }) {
  async function onSubmit(e) {
    e.preventDefault()
    const payload = {
      title: e.target.title.value,
      password: e.target.password.value,
      url: e.target.url.value,
      description: e.target.description.value,
    }
    if (initial?._id) await api.passwords.update(initial._id, payload)
    else await api.passwords.create(payload)
    onSaved()
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-start justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-cardLg w-full max-w-lg p-6 my-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text flex items-center gap-2">
            {initial ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500">
                  <path d="M12 20h9"/>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
                Edit Password
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
                Add Password
              </>
            )}
          </h3>
          <button 
            onClick={onClose} 
            className="text-secondary-400 hover:text-secondary-600 transition-colors p-1 hover:bg-secondary-50 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-text">Title *</label>
            <input name="title" defaultValue={initial?.title} required className="w-full border-2 border-secondary-200 rounded-md p-2 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 bg-white" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-text">Password *</label>
            <input name="password" type="text" defaultValue={initial?.password} required className="w-full border-2 border-secondary-200 rounded-md p-2 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 bg-white font-mono" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-text">Website URL</label>
            <input 
              name="url" 
              type="url" 
              placeholder="https://example.com" 
              defaultValue={initial?.url} 
              className="w-full border-2 border-secondary-200 rounded-md p-2 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 bg-white" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-text">Description</label>
            <textarea name="description" defaultValue={initial?.description} rows={3} className="w-full border-2 border-secondary-200 rounded-md p-2 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 bg-white"></textarea>
          </div>
          <div className="flex gap-2 pt-4 border-t border-secondary-100">
            <button type="button" onClick={onClose} className="flex-1 py-2 rounded-md bg-secondary-100 text-secondary-700 hover:bg-secondary-200 transition-colors active:scale-95">
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 py-2 rounded-md bg-primary-500 text-white hover:bg-primary-600 transition-colors active:scale-95 inline-flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                <polyline points="17 21 17 13 7 13 7 21"/>
                <polyline points="7 3 7 8 15 8"/>
              </svg>
              {initial ? 'Update Password' : 'Save Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Empty({ icon, title, subtitle }) {
  return (
    <div className="text-center py-16 text-secondary">
      <div className="text-5xl mb-3">{icon}</div>
      <h4 className="text-lg font-semibold text-text mb-1">{title}</h4>
      <p className="text-sm">{subtitle}</p>
    </div>
  )
}
