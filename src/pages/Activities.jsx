import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../utils/supabase.js'

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
        .order('date', { ascending: false })
      setActivities(data || [])
      setLoading(false)
    }
    load()
  }, [])

  return (
    <section className="max-w-3xl mx-auto py-12 px-6">
      <div className="mb-10">
        <span className="text-xs font-bold text-emerald-800 tracking-widest uppercase">
          Looking back
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#23351C] mt-1">
          Activities
        </h1>
        <p className="text-slate-700 text-sm my-6 sm:text-base leading-relaxed">
          Recent activities of Kamay-Gabay. All in one place.
        </p>
      </div>

      {loading ? (
        <p className="text-slate-500 text-sm">Loading activities…</p>
      ) : activities.length === 0 ? (
        <p className="text-slate-500 text-sm">
          No activities yet. Check back soon.
        </p>
      ) : (
        <div className="space-y-10">
          {activities.map((a) => (
            <article key={a.id}>
              {a.image_url && (
                <img
                  src={a.image_url}
                  alt={a.title}
                  className="w-full h-56 object-cover rounded-2xl mb-4"
                />
              )}
              {a.date && (
                <p className="text-xs text-slate-500 mb-1">{a.date}</p>
              )}
              <h2 className="text-2xl font-extrabold text-[#23351C]">
                <Link
                  to={`/activities/${a.id}`}
                  className="hover:text-emerald-800 transition"
                >
                  {a.title}
                </Link>
              </h2>
              {a.description && (
                <p className="text-sm text-slate-600 mt-2 leading-relaxed line-clamp-2">
                  {a.description}
                </p>
              )}
              <Link
                to={`/activities/${a.id}`}
                className="text-sm text-emerald-800 mt-3 inline-block hover:underline font-medium"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}