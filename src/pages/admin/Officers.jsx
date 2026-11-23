import { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabase.js'
import { uploadImage } from '../../utils/uploadImage.js'

const empty = {
  name: '',
  role_title: '',
  sort_order: 0,
  active: true,
  photo_url: '',
}

export default function Officers() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(empty)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  async function load() {
    const { data } = await supabase
      .from('officers')
      .select('*')
      .order('sort_order', { ascending: true })
    setItems(data || [])
  }

  useEffect(() => {
    load()
  }, [])

  function openNew() {
    setEditing(null)
    setForm(empty)
    setFile(null)
    setShowForm(true)
  }

  function openEdit(item) {
    setEditing(item.id)
    setForm({
      name: item.name,
      role_title: item.role_title,
      sort_order: item.sort_order,
      active: item.active,
      photo_url: item.photo_url || '',
    })
    setFile(null)
    setShowForm(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      let photoUrl = form.photo_url
      if (file) photoUrl = await uploadImage(file, 'officers')

      if (editing) {
        await supabase
          .from('officers')
          .update({ ...form, photo_url: photoUrl })
          .eq('id', editing)
      } else {
        await supabase.from('officers').insert({ ...form, photo_url: photoUrl })
      }
      setShowForm(false)
      await load()
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this officer?')) return
    await supabase.from('officers').delete().eq('id', id)
    await load()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-extrabold text-[#23351C]">Officers</h1>
        <button
          onClick={openNew}
          className="bg-[#173022] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#1b3d2b]"
        >
          + Add officer
        </button>
      </div>

      <div className="grid gap-4">
        {items.length === 0 && (
          <p className="text-slate-500 text-sm">No officers yet.</p>
        )}
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-4 flex gap-4 items-center shadow-sm border border-slate-200"
          >
            {item.photo_url ? (
              <img
                src={item.photo_url}
                alt=""
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-slate-200 shrink-0" />
            )}
            <div className="flex-1">
              <h3 className="font-bold text-[#23351C]">{item.name}</h3>
              <p className="text-sm text-slate-600">{item.role_title}</p>
              <span
                className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  item.active
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {item.active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => openEdit(item)}
                className="text-xs text-emerald-800 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-xs text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-[#FAF4DE] rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-auto"
          >
            <h2 className="text-xl font-extrabold text-[#23351C] mb-4">
              {editing ? 'Edit officer' : 'New officer'}
            </h2>

            <label className="block text-xs font-bold text-slate-600 mb-1">
              Name
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm mb-3"
            />

            <label className="block text-xs font-bold text-slate-600 mb-1">
              Role / Title
            </label>
            <input
              value={form.role_title}
              onChange={(e) =>
                setForm({ ...form, role_title: e.target.value })
              }
              required
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm mb-3"
            />

            <label className="block text-xs font-bold text-slate-600 mb-1">
              Sort order
            </label>
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) =>
                setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })
              }
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm mb-3"
            />

            <label className="block text-xs font-bold text-slate-600 mb-1">
              Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full text-sm mb-3"
            />

            <label className="flex items-center gap-2 text-sm mb-4">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) =>
                  setForm({ ...form, active: e.target.checked })
                }
              />
              Active (visible on site)
            </label>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-sm text-slate-600 px-4 py-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-[#173022] text-white px-4 py-2 rounded-lg text-sm font-bold disabled:opacity-60"
              >
                {loading ? 'Saving…' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}