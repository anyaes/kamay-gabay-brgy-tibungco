import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../utils/supabase.js'

function formatDate(date) {
  if (!date) return null
  try {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return date
  }
}

export default function ActivityDetail() {
  const { id } = useParams()
  const [activity, setActivity] = useState(null)
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
        .eq('id', id)
        .single()
      setActivity(data)
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-sm text-slate-500">Loading…</p>
      </div>
    )
  }

  if (!activity) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-sm text-slate-500">Activity not found.</p>
        <Link
          to="/activities"
          className="mt-2 inline-block text-sm text-emerald-800 hover:underline"
        >
          ← Back to activities
        </Link>
      </div>
    )
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <Link
        to="/activities"
        className="text-sm text-emerald-800 hover:underline"
      >
        ← Back to activities
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {activity.priority === 'key' && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#F5C253] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#173022] shadow">
            ★ Key activity
          </span>
        )}
        {activity.category && (
          <span className="rounded-full bg-sky-50 px-2.5 py-1 text-[10px] font-bold text-sky-700">
            {activity.category}
          </span>
        )}
      </div>

      <h1 className="mt-3 font-serif text-4xl font-extrabold text-[#23351C] sm:text-5xl">
        {activity.title}
      </h1>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-slate-600">
        {activity.date && (
          <span className="inline-flex items-center gap-1.5 text-emerald-800">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            {formatDate(activity.date)}
          </span>
        )}
        {activity.location && (
          <span className="inline-flex items-center gap-1.5">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            {activity.location}
          </span>
        )}
      </div>

      {activity.image_url && (
        <img
          src={activity.image_url}
          alt={activity.title}
          className="mt-6 h-72 w-full rounded-2xl object-cover shadow-sm sm:h-96"
        />
      )}

      {activity.description && (
        <p className="mt-8 text-lg font-medium leading-relaxed text-slate-800">
          {activity.description}
        </p>
      )}

      {activity.content && (
        <div className="mt-6 whitespace-pre-wrap text-slate-700 leading-relaxed">
          {activity.content}
        </div>
      )}

      {activity.objectives && (
        <section className="mt-8">
          <h2 className="font-serif text-xl font-extrabold text-[#23351C]">
            Objectives
          </h2>
          <p className="mt-2 whitespace-pre-wrap text-slate-700 leading-relaxed">
            {activity.objectives}
          </p>
        </section>
      )}

      {activity.highlights && (
        <section className="mt-8">
          <h2 className="font-serif text-xl font-extrabold text-[#23351C]">
            Highlights
          </h2>
          <p className="mt-2 whitespace-pre-wrap text-slate-700 leading-relaxed">
            {activity.highlights}
          </p>
        </section>
      )}

      {activity.tags?.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2 border-t border-slate-200 pt-6">
          {activity.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
            >
              #{t}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}