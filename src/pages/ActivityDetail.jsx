import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../utils/supabase.js'

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
      <div className="max-w-3xl mx-auto py-16 px-6">
        <p className="text-slate-500 text-sm">Loading…</p>
      </div>
    )
  }

  if (!activity) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-6">
        <p className="text-slate-500 text-sm">Activity not found.</p>
        <Link to="/activities" className="text-emerald-800 hover:underline text-sm">
          ← Back to activities
        </Link>
      </div>
    )
  }

  return (
    <article className="max-w-3xl mx-auto py-12 px-6">
      <Link
        to="/activities"
        className="text-sm text-emerald-800 hover:underline"
      >
        ← Back to activities
      </Link>

      {activity.date && (
        <p className="text-xs text-slate-500 mt-6 mb-2">{activity.date}</p>
      )}
      <h1 className="text-4xl sm:text-5xl font-extrabold font-serif text-[#23351C]">
        {activity.title}
      </h1>

      {activity.image_url && (
        <img
          src={activity.image_url}
          alt={activity.title}
          className="w-full h-72 object-cover rounded-2xl mt-6 mb-8"
        />
      )}

      <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
        {activity.content || activity.description}
      </div>
    </article>
  )
}