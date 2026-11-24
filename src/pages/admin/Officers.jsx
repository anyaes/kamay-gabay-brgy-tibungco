import { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabase.js'
import { uploadImage } from '../../utils/uploadImage.js'

const empty = {
  name: '',
  role_title: '',
  department: '',
  bio: '',
  year: new Date().getFullYear(),
  sort_order: 0,
  active: true,
  photo_url: '',
}

const inputClass =
  'w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#F5C253]/60'

export default function Officers() {
  const [items, setItems] = useState([])
  const [departments, setDepartments] = useState([])
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

  async function loadDepartments() {
    const { data } = await supabase
      .from('departments')
      .select('*')
      .order('sort_order', { ascending: true })
    setDepartments(data || [])
  }

  useEffect(() => {
    load()
    loadDepartments()
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
      department: item.department || '',
      bio: item.bio || '',
      year: item.year || new Date().getFullYear(),
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

  const stats = {
    total: items.length,
    active: items.filter((i) => i.active).length,
    years: [...new Set(items.map((i) => i.year))].length,
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-800">
            Content management
          </p>
          <h1 className="mt-1 text-3xl font-extrabold text-[#23351C]">Officers</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage the people and leadership behind Kamay-Gabay.
          </p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-xl bg-[#173022] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#1b3d2b] hover:shadow-md active:scale-95"
        >
          <span className="text-lg leading-none">+</span>
          Add officer
        </button>
      </div>

      {/* How it works */}
      <div className="mb-8 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
        <h2 className="text-sm font-bold text-[#23351C]">How officer ordering works</h2>
        <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-slate-600">
          <li>
            <span className="font-bold text-emerald-800">Position / Role</span> —
            the title shown on the public page (e.g. President, Secretary, FSL
            Head).
          </li>
          <li>
            <span className="font-bold text-emerald-800">Department</span> —
            groups officers into sections on the public page (Executive, FSL /
            Education, Community, Outreach, Creative). Leave blank for
            Unassigned.
          </li>
          <li>
            <span className="font-bold text-emerald-800">Sort order</span> —
            controls who appears first. The officer with the <strong>lowest</strong>{' '}
            sort order is featured as the <strong>★ Lead</strong> on the public
            page. Use 0 for the president, 1 for VP, 2 for secretary, and so on.
          </li>
          <li>
            <span className="font-bold text-emerald-800">Year</span> — the term
            the officer served. Officers are grouped by year on the public page.
          </li>
          <li>
            <span className="font-bold text-emerald-800">Active</span> — only
            active officers appear publicly. Turn off for past terms.
          </li>
        </ul>
      </div>

      {/* Stats */}
      <div className="grid gap-3 sm:grid-cols-3 mb-6">
        {[
          { label: 'Total officers', value: stats.total, color: 'text-slate-500' },
          { label: 'Active', value: stats.active, color: 'text-emerald-700' },
          { label: 'Terms / years', value: stats.years, color: 'text-amber-700' },
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
          <p className="font-bold text-[#23351C]">No officers yet</p>
          <p className="mt-1 text-sm text-slate-500">
            Add your first officer to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                {item.photo_url ? (
                  <img
                    src={item.photo_url}
                    alt=""
                    className="h-16 w-16 rounded-full object-cover ring-2 ring-[#F5C253]/40"
                  />
                ) : (
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400 text-xs">
                    No photo
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-bold text-[#23351C]">{item.name}</h3>
                  <p className="truncate text-sm text-slate-600">{item.role_title}</p>
                  <p className="truncate text-xs text-slate-500">
                    {[item.department, item.year].filter(Boolean).join(' · ')}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                <span
                  className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.active
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {item.active ? 'Active' : 'Inactive'}
                </span>
                <div className="flex gap-2">
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
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-lg overflow-auto rounded-2xl bg-[#FAF4DE] p-6 shadow-2xl sm:p-8">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-800">
                  {editing ? 'Edit officer' : 'New officer'}
                </p>
                <h2 className="mt-1 text-2xl font-extrabold text-[#23351C]">
                  {editing ? 'Update officer' : 'Create officer'}
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
                  Name *
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  placeholder="e.g. Juan dela Cruz"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Role / Title *
                </label>
                <input
                  value={form.role_title}
                  onChange={(e) =>
                    setForm({ ...form, role_title: e.target.value })
                  }
                  required
                  placeholder="e.g. President"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Department
                </label>
                <select
                  value={form.department}
                  onChange={(e) =>
                    setForm({ ...form, department: e.target.value })
                  }
                  className={inputClass}
                >
                  <option value="">— Unassigned —</option>
                  {departments.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-[11px] text-slate-400">
                  Manage departments in the{' '}
                  <span className="font-semibold text-emerald-800">
                    Departments
                  </span>{' '}
                  page.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Year
                  </label>
                  <input
                    type="number"
                    value={form.year}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        year:
                          parseInt(e.target.value) ||
                          new Date().getFullYear(),
                      })
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Sort order
                  </label>
                  <input
                    type="number"
                    value={form.sort_order}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        sort_order: parseInt(e.target.value) || 0,
                      })
                    }
                    className={inputClass}
                  />
                  <p className="mt-1 text-[11px] text-slate-400">
                    Lowest value = featured as ★ Lead. Use 0 for president, 1 for
                    VP, 2 for secretary…
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Biography
                </label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  rows={3}
                  placeholder="Short biography or description…"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-[#173022] file:px-3 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-[#1b3d2b]"
                />
              </div>

              <label className="flex items-center gap-2 rounded-lg bg-white p-3 border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) =>
                    setForm({ ...form, active: e.target.checked })
                  }
                  className="h-4 w-4 rounded accent-[#173022]"
                />
                <span className="text-sm font-semibold text-slate-700">
                  Active — visible on the public site
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
                  {loading ? 'Saving…' : editing ? 'Save changes' : 'Create officer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}