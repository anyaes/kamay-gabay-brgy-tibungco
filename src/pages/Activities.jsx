import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../utils/supabase.js'
import PageHero from '../components/PageHero.jsx'

function formatDate(date) {
  if (!date) return null
  try {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return date
  }
}

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false)
      return
    }
    async function load() {
      const { data } = await supabase
        .from('activities')
        .select('*')
        .eq('published', true)
        .order('priority', { ascending: false })
        .order('date', { ascending: false })
      setActivities(data || [])
      setLoading(false)
    }
    load()
  }, [])

  return (
    <section className="pb-12">
      <PageHero
        eyebrow="Looking back"
        title="Activities"
        description="Workshops, community initiatives, and milestones by Kamay-Gabay — all in one place."
        image="/activities/activities-hero.png"
        imageAlt="Kamay-Gabay community activities"
      />

      <div className="mx-auto max-w-6xl px-6 pt-10">
      {loading ? (
        <p className="text-sm text-slate-500">Loading activities…</p>
      ) : activities.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
          <p className="font-bold text-[#23351C]">No activities yet</p>
          <p className="mt-1 text-sm text-slate-500">Check back soon.</p>
        </div>
      ) : (
        <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2">
          {activities.map((a) => (
            <article key={a.id} className="group flex flex-col">
              <div className="relative overflow-hidden rounded-2xl">
                {a.image_url ? (
                  <img
                    src={a.image_url}
                    alt={a.title}
                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-56 items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 text-sm text-emerald-900/60">
                    Kamay-Gabay activity
                  </div>
                )}
                {a.priority === 'key' && (
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#F5C253] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#173022] shadow">
                    ★ Key
                  </span>
                )}
                {a.category && (
                  <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-emerald-800 shadow">
                    {a.category}
                  </span>
                )}
              </div>
              <div className="mt-5 flex flex-1 flex-col">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-slate-500">
                  {a.date && (
                    <span className="text-emerald-800">{formatDate(a.date)}</span>
                  )}
                  {a.location && (
                    <span className="inline-flex items-center gap-1">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11Z" />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>
                      {a.location}
                    </span>
                  )}
                </div>
                <h2 className="mt-2 font-serif text-2xl font-extrabold text-[#23351C]">
                  <Link
                    to={`/activities/${a.id}`}
                    className="transition hover:text-emerald-800"
                  >
                    {a.title}
                  </Link>
                </h2>
                {a.description && (
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
                    {a.description}
                  </p>
                )}
                {a.tags?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {a.tags.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600"
                      >
                        #{t}
                      </span>
                    ))}
                    {a.tags.length > 4 && (
                      <span className="text-[10px] text-slate-400">
                        +{a.tags.length - 4}
                      </span>
                    )}
                  </div>
                )}
                <Link
                  to={`/activities/${a.id}`}
                  className="mt-4 inline-block text-sm font-medium text-emerald-800 hover:underline"
                >
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
      </div>
    </section>
  )
}