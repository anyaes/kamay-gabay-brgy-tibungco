import { useEffect, useMemo, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../utils/supabase.js'
import PageHero from '../components/PageHero.jsx'

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

  // Featured lead = the highest-priority (lowest sort_order) officer overall
  const lead = useMemo(() => {
    if (!visible.length) return null
    return visible.reduce((a, b) => (a.sort_order <= b.sort_order ? a : b))
  }, [visible])

return (
    <section className="pb-12">
      <PageHero
        eyebrow="Our team"
        title="The people behind Kamay-Gabay"
        description="Meet the youth leaders and volunteers driving inclusion, advocacy, and community service across Barangay Tibungco."
        image="/officers/officers-team.png"
        imageAlt="Kamay-Gabay officers and volunteers"
      >
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F5C253]">
          See. Hear. Understand. Include.
        </p>
      </PageHero>

      <div className="mx-auto max-w-6xl px-6">
        {/* Year filter */}
      {years.length > 0 && (
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Term
          </span>
          <div className="flex flex-wrap gap-2">
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setSelectedYear(y)}
                className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
                  selectedYear === y
                    ? 'bg-[#173022] text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300 hover:text-emerald-800'
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading ? (
        <p className="mt-12 text-sm text-slate-500">Loading officers…</p>
      ) : visible.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
          <p className="font-bold text-[#23351C]">
            No officers listed for {selectedYear ?? 'this year'}.
          </p>
        </div>
      ) : (
        <div className="mt-10 space-y-14">
          {/* Featured lead officer */}
          {lead && (
            <article className="overflow-hidden rounded-3xl border border-emerald-900/10 bg-white shadow-sm">
              <div className="grid gap-6 p-6 sm:grid-cols-[auto_1fr] sm:items-center sm:p-8">
                <div className="relative mx-auto sm:mx-0">
                  <div
                    className="absolute inset-0 rounded-full bg-[#F5C253]/30 blur-md"
                    aria-hidden="true"
                  />
                  {lead.photo_url ? (
                    <img
                      src={lead.photo_url}
                      alt={lead.name}
                      className="relative h-28 w-28 rounded-full object-cover ring-4 ring-[#F5C253] sm:h-32 sm:w-32"
                    />
                  ) : (
                    <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-lg font-bold ring-4 ring-[#F5C253] sm:h-32 sm:w-32">
                      {lead.name?.[0] || 'K'}
                    </div>
                  )}
                </div>
                <div className="text-center sm:text-left">
                  <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#F5C253]">
                    <span className="h-px w-6 bg-[#F5C253]" />
                    ★ Lead
                  </span>
                  <h2 className="mt-2 font-serif text-3xl font-extrabold text-[#23351C]">
                    {lead.name}
                  </h2>
                  <p className="text-sm font-bold text-emerald-800">
                    {lead.role_title}
                  </p>
                  {lead.department && (
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      {lead.department}
                    </p>
                  )}
                  {lead.bio && (
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {lead.bio}
                    </p>
                  )}
                </div>
              </div>
            </article>
          )}

          {/* Department sections */}
          {departments.map(([dept, members]) => {
            // Skip the lead inside its department section to avoid duplication
            const rest = members.filter((m) => m.id !== lead?.id)
            if (rest.length === 0) return null
            return (
              <div key={dept}>
                <div className="mb-6 flex items-center gap-3">
                  <h2 className="text-xl font-extrabold text-[#23351C]">
                    {dept}
                  </h2>
                  <div className="h-px flex-1 bg-gradient-to-r from-emerald-800/20 to-transparent" />
                  <span className="text-xs font-bold text-slate-400">
                    {rest.length}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
                  {rest.map((o) => (
                    <article
                      key={o.id}
                      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md"
                    >
                      <div
                        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#173022] to-[#F5C253] opacity-0 transition group-hover:opacity-100"
                        aria-hidden="true"
                      />
                      {o.photo_url ? (
                        <img
                          src={o.photo_url}
                          alt={o.name}
                          className="mx-auto mb-3 h-20 w-20 rounded-full object-cover ring-2 ring-[#FAF4DE] transition group-hover:ring-[#F5C253]"
                        />
                      ) : (
                        <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold">
                          {o.name?.[0] || 'K'}
                        </div>
                      )}
                      <h3 className="truncate font-bold text-[#23351C]">
                        {o.name}
                      </h3>
                      <p className="truncate text-xs font-bold text-emerald-800">
                        {o.role_title}
                      </p>
                      {o.bio && (
                        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-500">
                          {o.bio}
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
      </div>
    </section>
  )
}