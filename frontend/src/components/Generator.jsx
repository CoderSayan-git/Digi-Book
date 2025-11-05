import React, { useState } from 'react'
import { api } from '../lib/api'

export function Generator() {
  const [length, setLength] = useState(12)
  const [opts, setOpts] = useState({ u: true, l: true, n: true, s: true })
  const [pwd, setPwd] = useState('')

  function generate() {
    let charset = ''
    if (opts.u) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (opts.l) charset += 'abcdefghijklmnopqrstuvwxyz'
    if (opts.n) charset += '0123456789'
    if (opts.s) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?'
    if (!charset) return alert('Select at least one character type')
    let out = ''
    for (let i=0;i<length;i++) out += charset.charAt(Math.floor(Math.random()*charset.length))
    setPwd(out)
  }

  async function save() {
    if (!pwd) return alert('Generate a password first')
    const title = prompt('Enter a title for this password:')
    if (!title) return
    await api.passwords.create({ title, password: pwd, description: '' })
    alert('Saved to passwords!')
  }

  return (
    <div className="flex justify-center w-full">
      <div className="bg-bg-light rounded-xl shadow-card hover:shadow-cardHover transition-shadow p-6 max-w-2xl w-full mx-4">
      <h2 className="text-xl font-semibold mb-4 text-text">Password Generator</h2>

      <div className="flex gap-2 mb-4">
        <input readOnly value={pwd} placeholder="Generated password will appear here" className="flex-1 border-2 border-secondary-200 rounded-md p-2 font-mono focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 bg-white" />
        <button onClick={() => { navigator.clipboard.writeText(pwd); if (pwd) alert('Copied!') }} className="px-3 py-2 rounded-md bg-secondary-100 text-secondary-700 hover:bg-secondary-200 transition-colors">Copy</button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-text">Password Length: <span className="font-semibold text-primary-600">{length}</span></label>
          <input type="range" min={6} max={20} value={length} onChange={e => setLength(parseInt(e.target.value))} className="w-full accent-primary-500" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex items-center gap-2 text-text"><input type="checkbox" checked={opts.u} onChange={e => setOpts({ ...opts, u: e.target.checked })} className="accent-primary-500" /> Uppercase (A-Z)</label>
          <label className="flex items-center gap-2 text-text"><input type="checkbox" checked={opts.l} onChange={e => setOpts({ ...opts, l: e.target.checked })} className="accent-primary-500" /> Lowercase (a-z)</label>
          <label className="flex items-center gap-2 text-text"><input type="checkbox" checked={opts.n} onChange={e => setOpts({ ...opts, n: e.target.checked })} className="accent-primary-500" /> Numbers (0-9)</label>
          <label className="flex items-center gap-2 text-text"><input type="checkbox" checked={opts.s} onChange={e => setOpts({ ...opts, s: e.target.checked })} className="accent-primary-500" /> Symbols (!@#$%^&*)</label>
        </div>
      </div>

      <div className="flex gap-2 mt-6">
        <button onClick={generate} className="flex-1 py-2 rounded-md bg-primary-500 text-text-inverted hover:bg-primary-600 transition-colors">Generate</button>
        <button onClick={save} className="flex-1 py-2 rounded-md bg-success-500 text-text-inverted hover:bg-success-600 transition-colors">Save to Passwords</button>
      </div>
    </div>
    </div>
  )
}
