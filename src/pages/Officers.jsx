import { useEffect, useMemo, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../utils/supabase.js'

export default function Officers() {
  const [officers, setOfficers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedYear, setSelectedYear] = useState(null)

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false)
      return
    }
    async function load() {
      const { data } = await supabase
        .from('officers')
        .select('*')
        .eq('active', true)
        .order('sort_order', { ascending: true })
      setOfficers(data || [])
      setLoading(false)
    }
    load()
  }, [])

  // Available years (distinct), newest first
  const years = useMemo(() => {
    const set = new Set(officers.map((o) => o.year).filter(Boolean))
    return Array.from(set).sort((a, b) => b - a)
  }, [officers])

  // Default to the most recent year once data loads
  useEffect(() => {
    if (!selectedYear && years.length) setSelectedYear(years[0])
  }, [years, selectedYear])

  // Filter by year
  const visible = useMemo(() => {
    if (!selectedYear) return officers
    return officers.filter((o) => o.year === selectedYear)
  }, [officers, selectedYear])

  // Group by department
  const departments = useMemo(() => {
    const map = new Map()
    visible.forEach((o) => {
      const dept = o.department || 'Unassigned'
      if (!map.has(dept)) map.set(dept, [])
      map.get(dept).push(o)
    })
    return Array.from(map.entries())
  }, [visible])

  return (
    <section className="max-w-6xl mx-auto py-12 px-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <div>
          <span className="text-xs font-bold text-emerald-800 tracking-widest uppercase">
            Our team
          </span>
          <h1 className="text-4xl font-serif sm:text-5xl font-extrabold text-[#23351C] mt-1">
            Officers
          </h1>
        </div>

        {years.length > 0 && (
          <label className="text-sm text-slate-600">
            <span className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">
              Year
            </span>
            <select
              value={selectedYear ?? ''}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      {loading ? (
        <p className="text-slate-500 text-sm">Loading officers…</p>
      ) : visible.length === 0 ? (
        <p className="text-slate-500 text-sm">
          No officers listed for {selectedYear ?? 'this year'}.
        </p>
      ) : (
        <div className="space-y-12">
          {departments.map(([dept, members]) => (
            <div key={dept}>
              {/* Department header */}
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-extrabold text-[#23351C]">
                  {dept}
                </h2>
                <div className="flex-1 h-px bg-emerald-800/15" />
                <span className="text-xs text-slate-400">
                  {members.length}
                </span>
              </div>

              {/* Org chart row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {members.map((o) => (
                  <article
                    key={o.id}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 text-center hover:shadow-md transition"
                  >
                    {o.photo_url ? (
                      <img
                        src={o.photo_url}
                        alt={o.name}
                        className="w-24 h-24 rounded-full object-cover mx-auto mb-3 border-4 border-[#FAF4DE] shadow"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-emerald-100 mx-auto mb-3" />
                    )}
                    <h3 className="font-bold text-[#23351C]">{o.name}</h3>
                    <p className="text-xs font-medium text-emerald-800">
                      {o.role_title}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}