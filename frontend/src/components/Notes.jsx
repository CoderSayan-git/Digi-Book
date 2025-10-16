import React, { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { api } from '../lib/api'

export function Notes() {
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  async function load() {
    const data = await api.notes.list()
    setItems(data)
  }
  useEffect(() => { load() }, [])

  function onAdd() { setEditing(null); setOpen(true) }
  function onEdit(item) { setEditing(item); setOpen(true) }

  async function onDelete(id) {
    if (!confirm('Delete this note?')) return
    await api.notes.remove(id)
    await load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-text">My Notes</h2>
        <button onClick={onAdd} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-primary-500 text-white hover:bg-primary-600 transition-colors active:scale-95">
          <Plus size={18} /> Add Note
        </button>
      </div>

      {items.length === 0 ? (
        <Empty icon="📝" title="No notes yet" subtitle="Click 'Add Note' to create your first note" />
      ) : (
        <div className="grid gap-4">
          {items.map(item => <NoteCard key={item._id} item={item} onEdit={() => onEdit(item)} onDelete={() => onDelete(item._id)} />)}
        </div>
      )}

      {open && <NoteModal initial={editing} onClose={() => setOpen(false)} onSaved={async () => { setOpen(false); await load() }} />}
    </div>
  )
}

function NoteCard({ item, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-card hover:shadow-cardHover transition-shadow p-4">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-text">{item.title}</h3>
        <div className="flex gap-2">
          <button onClick={onEdit} className="px-2 py-1 rounded-md bg-secondary-100 hover:bg-secondary-200 transition-colors text-secondary-600"><Pencil size={16} /></button>
          <button onClick={onDelete} className="px-2 py-1 rounded-md bg-danger-50 hover:bg-danger-100 transition-colors text-danger-600"><Trash2 size={16} /></button>
        </div>
      </div>
      <p className="mt-2 whitespace-pre-wrap text-secondary-600">{item.content}</p>
      <p className="text-xs text-secondary-500 mt-2">Updated: {new Date(item.updatedAt).toLocaleString()}</p>
    </div>
  )
}

function NoteModal({ initial, onClose, onSaved }) {
  async function onSubmit(e) {
    e.preventDefault()
    const payload = {
      title: e.target.title.value,
      content: e.target.content.value,
    }
    if (initial?._id) await api.notes.update(initial._id, payload)
    else await api.notes.create(payload)
    onSaved()
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 mt-0">
      <div className="bg-white rounded-xl shadow-cardLg w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text">{initial ? 'Edit Note' : 'Add Note'}</h3>
          <button onClick={onClose} className="text-secondary-500 hover:text-secondary-700 transition-colors">✕</button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-text">Title *</label>
            <input 
              name="title" 
              defaultValue={initial?.title} 
              placeholder="Enter note title..." 
              required 
              className="w-full border-2 border-secondary-200 rounded-md p-2 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 bg-white" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-text">Content *</label>
            <textarea 
              name="content" 
              rows={8} 
              defaultValue={initial?.content} 
              placeholder="Enter your note content..." 
              required 
              className="w-full border-2 border-secondary-200 rounded-md p-2 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 bg-white"
            ></textarea>
          </div>
          <div className="flex gap-2 pt-2">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 py-2 rounded-md bg-secondary-100 text-secondary-700 hover:bg-secondary-200 transition-colors active:scale-95"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 py-2 rounded-md bg-primary-500 text-white hover:bg-primary-600 transition-colors active:scale-95"
            >
              Save Note
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
