import { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabase.js'

const inputClass =
  'w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#F5C253]/60'

export default function Departments() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ name: '', sort_order: 0 })
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  async function load() {
    const { data } = await supabase
      .from('departments')
      .select('*')
      .order('sort_order', { ascending: true })
    setItems(data || [])
  }

  useEffect(() => {
    load()
  }, [])

  function openNew() {
    setEditing(null)
    setForm({ name: '', sort_order: items.length })
    setShowForm(true)
  }

  function openEdit(item) {
    setEditing(item.id)
    setForm({ name: item.name, sort_order: item.sort_order })
    setShowForm(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      if (editing) {
        await supabase
          .from('departments')
          .update(form)
          .eq('id', editing)
      } else {
        await supabase.from('departments').insert(form)
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
    if (!confirm('Delete this department? Officers assigned to it will become Unassigned.')) return
    await supabase.from('departments').delete().eq('id', id)
    await load()
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-800">
            Content management
          </p>
          <h1 className="mt-1 text-3xl font-extrabold text-[#23351C]">Departments</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage the departments that group officers on the public Officers page.
          </p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-xl bg-[#173022] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#1b3d2b] hover:shadow-md active:scale-95"
        >
          <span className="text-lg leading-none">+</span>
          Add department
        </button>
      </div>

      {/* How it works */}
      <div className="mb-8 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
        <h2 className="text-sm font-bold text-[#23351C]">How departments work</h2>
        <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-slate-600">
          <li>
            Each department appears as a <strong>section header</strong> on the
            public Officers page.
          </li>
          <li>
            <strong>Sort order</strong> controls the order departments appear.
            Lower numbers appear first.
          </li>
          <li>
            Assign officers to a department via the Officers page. Officers with
            no department appear under <strong>Unassigned</strong>.
          </li>
        </ul>
      </div>

      {/* List */}
      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
          <p className="font-bold text-[#23351C]">No departments yet</p>
          <p className="mt-1 text-sm text-slate-500">
            Add your first department to get started.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3 w-32">Sort order</th>
                <th className="px-4 py-3 w-32 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-semibold text-[#23351C]">
                    {item.name}
                  </td>
                  <td className="px-4 py-3 text-slate-500">{item.sort_order}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex gap-3">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-[#FAF4DE] p-6 shadow-2xl sm:p-8">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-800">
                  {editing ? 'Edit department' : 'New department'}
                </p>
                <h2 className="mt-1 text-2xl font-extrabold text-[#23351C]">
                  {editing ? 'Update department' : 'Create department'}
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
                  Department name *
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  placeholder="e.g. FSL / Education"
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
                  Lower numbers appear first on the public page.
                </p>
              </div>

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
                  {loading ? 'Saving…' : editing ? 'Save changes' : 'Create department'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}