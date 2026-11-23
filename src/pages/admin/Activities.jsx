import { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabase.js'
import { uploadImage } from '../../utils/uploadImage.js'

const empty = {
  title: '',
  description: '',
  content: '',
  date: '',
  published: true,
  image_url: '',
}

export default function Activities() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(empty)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  async function load() {
    const { data } = await supabase
      .from('activities')
      .select('*')
      .order('date', { ascending: false })
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
      title: item.title,
      description: item.description || '',
      content: item.content || '',
      date: item.date || '',
      published: item.published,
      image_url: item.image_url || '',
    })
    setFile(null)
    setShowForm(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      let imageUrl = form.image_url
      if (file) imageUrl = await uploadImage(file, 'activities')

      if (editing) {
        await supabase
          .from('activities')
          .update({ ...form, image_url: imageUrl })
          .eq('id', editing)
      } else {
        const { data: { user } } = await supabase.auth.getUser()
        await supabase
          .from('activities')
          .insert({ ...form, image_url: imageUrl, created_by: user?.id })
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
    if (!confirm('Delete this activity?')) return
    await supabase.from('activities').delete().eq('id', id)
    await load()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-extrabold text-[#23351C]">Activities</h1>
        <button
          onClick={openNew}
          className="bg-[#173022] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#1b3d2b]"
        >
          + Add activity
        </button>
      </div>

      <div className="grid gap-4">
        {items.length === 0 && (
          <p className="text-slate-500 text-sm">No activities yet.</p>
        )}
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-4 flex gap-4 items-start shadow-sm border border-slate-200"
          >
            {item.image_url && (
              <img
                src={item.image_url}
                alt=""
                className="w-24 h-24 object-cover rounded-lg"
              />
            )}
            <div className="flex-1">
              <h3 className="font-bold text-[#23351C]">{item.title}</h3>
              {item.date && (
                <p className="text-xs text-slate-500">{item.date}</p>
              )}
              {item.description && (
                <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                  {item.description}
                </p>
              )}
              <span
                className={`inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  item.published
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {item.published ? 'Published' : 'Draft'}
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
              {editing ? 'Edit activity' : 'New activity'}
            </h2>

            <label className="block text-xs font-bold text-slate-600 mb-1">
              Title
            </label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm mb-3"
            />

            <label className="block text-xs font-bold text-slate-600 mb-1">
              Date
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm mb-3"
            />

            <label className="block text-xs font-bold text-slate-600 mb-1">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows={2}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm mb-3"
            />

            <label className="block text-xs font-bold text-slate-600 mb-1">
              Content
            </label>
            <textarea
              value={form.content}
              onChange={(e) =>
                setForm({ ...form, content: e.target.value })
              }
              rows={10}
              placeholder="Full blog post body…"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm mb-3 font-mono"
            />

            <label className="block text-xs font-bold text-slate-600 mb-1">
              Image
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
                checked={form.published}
                onChange={(e) =>
                  setForm({ ...form, published: e.target.checked })
                }
              />
              Published (visible on site)
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