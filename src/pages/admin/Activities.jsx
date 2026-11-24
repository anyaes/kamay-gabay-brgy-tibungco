import { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabase.js'
import { uploadImage } from '../../utils/uploadImage.js'

const empty = {
  title: '',
  description: '',
  content: '',
  objectives: '',
  highlights: '',
  date: '',
  location: '',
  category: '',
  priority: 'normal',
  tags: [],
  published: true,
  image_url: '',
}

const CATEGORIES = [
  'Workshops and Educational Initiatives',
  'Disability Inclusion Initiatives',
  'Community Engagement',
  'Organizational Milestones',
]

const inputClass =
  'w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#F5C253]/60'

export default function Activities() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(empty)
  const [tagInput, setTagInput] = useState('')
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
    setTagInput('')
    setFile(null)
    setShowForm(true)
  }

  function openEdit(item) {
    setEditing(item.id)
    setForm({
      title: item.title,
      description: item.description || '',
      content: item.content || '',
      objectives: item.objectives || '',
      highlights: item.highlights || '',
      date: item.date || '',
      location: item.location || '',
      category: item.category || '',
      priority: item.priority || 'normal',
      tags: item.tags || [],
      published: item.published,
      image_url: item.image_url || '',
    })
    setTagInput('')
    setFile(null)
    setShowForm(true)
  }

  function addTag() {
    const t = tagInput.trim()
    if (t && !form.tags.includes(t)) {
      setForm({ ...form, tags: [...form.tags, t] })
    }
    setTagInput('')
  }

  function removeTag(t) {
    setForm({ ...form, tags: form.tags.filter((x) => x !== t) })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = { ...form }
      if (tagInput.trim() && !payload.tags.includes(tagInput.trim())) {
        payload.tags = [...payload.tags, tagInput.trim()]
      }
      let imageUrl = payload.image_url
      if (file) imageUrl = await uploadImage(file, 'activities')
      payload.image_url = imageUrl

      if (editing) {
        await supabase.from('activities').update(payload).eq('id', editing)
      } else {
        const { data: { user } } = await supabase.auth.getUser()
        await supabase
          .from('activities')
          .insert({ ...payload, created_by: user?.id })
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

  const stats = {
    total: items.length,
    published: items.filter((i) => i.published).length,
    key: items.filter((i) => i.priority === 'key').length,
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-800">
            Content management
          </p>
          <h1 className="mt-1 text-3xl font-extrabold text-[#23351C]">Activities</h1>
          <p className="mt-1 text-sm text-slate-500">
            Create and manage community activities, workshops, and initiatives.
          </p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-xl bg-[#173022] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#1b3d2b] hover:shadow-md active:scale-95"
        >
          <span className="text-lg leading-none">+</span>
          Add activity
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-3 sm:grid-cols-3 mb-6">
        {[
          { label: 'Total activities', value: stats.total, color: 'text-slate-500' },
          { label: 'Published', value: stats.published, color: 'text-emerald-700' },
          { label: 'Key / featured', value: stats.key, color: 'text-amber-700' },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className={`text-[10px] font-bold uppercase tracking-[0.18em] ${s.color}`}>
              {s.label}
            </div>
            <p className="mt-2 text-3xl font-black text-[#23351C]">{s.value}</p>
          </div>
        ))}
      </div>

      {/* List */}
      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
          <p className="font-bold text-[#23351C]">No activities yet</p>
          <p className="mt-1 text-sm text-slate-500">
            Add your first activity to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <article
              key={item.id}
              className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex gap-4">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt=""
                    className="h-20 w-20 shrink-0 rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                    <span className="text-xs">No image</span>
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {item.priority === 'key' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F5C253] text-[#173022]">
                        ★ Key
                      </span>
                    )}
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.published
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {item.published ? 'Published' : 'Draft'}
                    </span>
                    {item.category && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700">
                        {item.category}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-1.5 truncate font-bold text-[#23351C]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {[item.date, item.location].filter(Boolean).join(' · ') ||
                      'No date set'}
                  </p>
                  {item.tags?.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {item.tags.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded"
                        >
                          #{t}
                        </span>
                      ))}
                      {item.tags.length > 4 && (
                        <span className="text-[10px] text-slate-400">
                          +{item.tags.length - 4}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-3 flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
                <button
                  onClick={() => openEdit(item)}
                  className="text-xs font-semibold text-emerald-800 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-xs font-semibold text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-2xl bg-[#FAF4DE] p-6 shadow-2xl sm:p-8">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-800">
                  {editing ? 'Edit activity' : 'New activity'}
                </p>
                <h2 className="mt-1 text-2xl font-extrabold text-[#23351C]">
                  {editing ? 'Update activity' : 'Create activity'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg px-2 py-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Title *
                </label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  placeholder="e.g. Basic FSL Workshop — Session 1"
                  className={inputClass}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Location
                  </label>
                  <input
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                    placeholder="e.g. Barangay Tibungco Covered Court"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className={inputClass}
                  >
                    <option value="">— No category —</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Priority
                  </label>
                  <select
                    value={form.priority}
                    onChange={(e) =>
                      setForm({ ...form, priority: e.target.value })
                    }
                    className={inputClass}
                  >
                    <option value="normal">Normal</option>
                    <option value="key">★ Key — featured on landing page</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={2}
                  placeholder="Short summary shown in listings…"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Content
                </label>
                <textarea
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  rows={8}
                  placeholder="Full activity details, outcomes, and notes…"
                  className={`${inputClass} font-mono`}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Objectives
                  </label>
                  <textarea
                    value={form.objectives}
                    onChange={(e) =>
                      setForm({ ...form, objectives: e.target.value })
                    }
                    rows={5}
                    placeholder="What the activity intended to achieve…"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Highlights
                  </label>
                  <textarea
                    value={form.highlights}
                    onChange={(e) =>
                      setForm({ ...form, highlights: e.target.value })
                    }
                    rows={5}
                    placeholder="Key moments, participants, and experiences…"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-[#173022] file:px-3 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-[#1b3d2b]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Tags
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {form.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800"
                    >
                      #{t}
                      <button
                        type="button"
                        onClick={() => removeTag(t)}
                        className="text-emerald-600 hover:text-red-600"
                        aria-label={`Remove ${t}`}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addTag()
                      }
                    }}
                    placeholder="Type a tag and press Enter"
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="shrink-0 rounded-lg border border-slate-300 px-3 text-sm font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Add
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2 rounded-lg bg-white p-3 border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) =>
                    setForm({ ...form, published: e.target.checked })
                  }
                  className="h-4 w-4 rounded accent-[#173022]"
                />
                <span className="text-sm font-semibold text-slate-700">
                  Published — visible on the public site
                </span>
              </label>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-[#173022] px-5 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-[#1b3d2b] disabled:opacity-60 active:scale-95"
                >
                  {loading ? 'Saving…' : editing ? 'Save changes' : 'Create activity'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}