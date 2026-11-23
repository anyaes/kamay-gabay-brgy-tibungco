import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import ScrollZoomHero from '../components/ScrollZoomHero.jsx'
import Carousel from '../components/Carousel.jsx'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { supabase, isSupabaseConfigured } from '../utils/supabase.js'

const FACEBOOK_URL = 'https://www.facebook.com/p/Kamay-Gabay-61570749000594/'

const advocacyAreas = [
  {
    number: '01',
    title: 'Inclusive communities',
    description:
      'Promoting understanding, accessibility, and meaningful participation for children with special needs.',
  },
  {
    number: '02',
    title: 'Deaf awareness and Filipino Sign Language',
    description:
      'Encouraging awareness of the Deaf community and the value of Filipino Sign Language.',
  },
  {
    number: '03',
    title: 'Youth empowerment',
    description:
      'Encouraging young people to take an active role in compassionate and meaningful community action.',
  },
  {
    number: '04',
    title: 'Community engagement',
    description:
      'Creating accessible learning opportunities and collaborative spaces for people who want to take part.',
  },
]

export default function Landing() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [activityError, setActivityError] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function loadActivities() {
      if (!isSupabaseConfigured || !supabase) {
        if (isMounted) setLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('activities')
          .select('*')
          .eq('published', true)
          .order('date', { ascending: false })
          .limit(3)

        if (error) throw error
        if (isMounted) setActivities(data || [])
      } catch (error) {
        console.error('Unable to load featured activities:', error)
        if (isMounted) setActivityError(true)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadActivities()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#FAF4DE] font-sans text-slate-800 selection:bg-emerald-700 selection:text-white">
      {/* Navigation */}
      <Navbar
        fixed
        links={[
          { to: '/about', label: 'About' },
          { to: '/history', label: 'History' },
          { to: '/activities', label: 'Activities' },
          { to: '/officers', label: 'Officers' },
          { to: '/contact', label: 'Contact' },
        ]}
        cta={{ label: 'Get involved', to: '#get-involved' }}
      />

      {/* Existing scroll-zoom hero */}
      <div id="top" className="scroll-mt-20">
        <ScrollZoomHero />
      </div>

      <main className="relative z-20">
        {/* About / introduction */}
        <section id="about" className="scroll-mt-24 px-6 pb-20 pt-24 sm:pt-28">
          <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-800">
                Who we are
              </p>
              <h1 className="mt-3 max-w-3xl font-serif text-3xl font-extrabold leading-tight text-[#23351C] sm:text-4xl lg:text-5xl">
                Empowering voices. Embracing inclusion.
              </h1>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-700 sm:text-base">
                Kamay-Gabay is a youth-led initiative based in Barangay Tibungco,
                Davao City. Founded in 2023, it promotes inclusion for children
                with special needs, Deaf awareness, Filipino Sign Language, and
                youth empowerment. Through advocacy, learning, and meaningful
                participation, Kamay-Gabay works toward a community where
                everyone is seen, heard, understood, and valued.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/history"
                  className="rounded-full bg-[#173022] px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-900"
                >
                  Discover our story
                </Link>
                <a
                  href="#advocacy"
                  className="rounded-full border border-emerald-900/30 px-6 py-3 text-sm font-bold text-[#173022] transition hover:bg-white/70"
                >
                  What we stand for
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-[#e7dfc7] bg-[#F2EBD7] p-7 sm:p-9">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">
                Our purpose
              </p>
              <p className="mt-4 font-serif text-2xl font-bold leading-snug text-[#23351C] sm:text-3xl">
                A community where everyone belongs, participates, and is valued.
              </p>
              <div className="mt-7 grid grid-cols-2 gap-4 border-t border-emerald-900/15 pt-6">
                <div>
                  <p className="text-3xl font-black text-[#173022]">2023</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Year established
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-black text-[#173022]">Youth-led</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Community initiative
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advocacy areas */}
        <section id="advocacy" className="scroll-mt-24 bg-[#F0EBDD] px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="What we stand for"
              title="Inclusion is something we build together."
              description="Kamay-Gabay brings people together through advocacy, accessible learning, and youth-led community action. These are the key areas reflected in its mission and purpose."
            />

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {advocacyAreas.map((area) => (
                <article
                  key={area.number}
                  className="group rounded-2xl border border-[#e3dcc8] bg-[#FAF4DE] p-6 transition hover:-translate-y-1 hover:shadow-md sm:p-8"
                >
                  <p className="text-xs font-bold tracking-[0.2em] text-emerald-800">
                    {area.number}
                  </p>
                  <h3 className="mt-4 text-2xl font-serif font-extrabold text-[#23351C]">
                    <span className="relative inline-block">
                      {area.title}
                      <svg
                        viewBox="0 0 200 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        preserveAspectRatio="none"
                        className="pointer-events-none absolute -bottom-1 left-0 h-2.5 w-full text-[#F5C253] [stroke-dasharray:220] [stroke-dashoffset:220] transition-[stroke-dashoffset] duration-500 ease-out group-hover:[stroke-dashoffset:0]"
                        aria-hidden="true"
                      >
                        <path d="M2 8 Q 30 2, 60 7 T 120 6 T 200 5" />
                      </svg>
                    </span>
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {area.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Photo carousel */}
        <section className="px-0 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading
              eyebrow="The people behind the purpose"
              title="Inclusion comes to life through participation."
              description="A glimpse into the people, learning experiences, and community moments that shape Kamay-Gabay. Use photographs from actual organizational activities here."
            />
          </div>
          <div className="mt-10">
            <Carousel
              images={[
                '/carousel/1.jpg',
                '/carousel/2.jpg',
                '/carousel/3.jpg',
              ]}
            />
          </div>
        </section>

        {/* Featured activities */}
        <section id="activities" className="scroll-mt-24 bg-white/65 px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="Our work in action"
                title="Activities and community initiatives"
                description="Key community activities and initiatives by Kamay Gabay. Each one is an opportunity to learn, connect, and take part in building a more inclusive community."
              />
              <Link
                to="/activities"
                className="shrink-0 text-sm font-bold text-emerald-800 underline-offset-4 hover:underline"
              >
                View all activities →
              </Link>
            </div>

            <div className="mt-10">
              {loading ? (
                <p className="text-sm text-slate-500">Loading activities…</p>
              ) : activityError ? (
                <p className="rounded-xl bg-amber-50 p-5 text-sm text-amber-900">
                  Activities are temporarily unavailable. Please visit the
                  Activities page or check back later.
                </p>
              ) : activities.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-emerald-900/20 bg-[#FAF4DE] px-6 py-10 text-center">
                  <h3 className="font-bold text-[#23351C]">Activities will appear here</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Check back for published workshops and community initiatives.
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {activities.map((activity) => (
                    <article
                      key={activity.id}
                      className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      {activity.image_url ? (
                        <img
                          src={activity.image_url}
                          alt={activity.title || 'Kamay-Gabay activity'}
                          className="h-52 w-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-52 items-center justify-center bg-emerald-50 text-sm text-emerald-900/60">
                          Kamay-Gabay activity
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-6">
                        {activity.date && (
                          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                            {activity.date}
                          </p>
                        )}
                        <h3 className="mt-2 font-serif text-2xl font-extrabold text-[#23351C]">
                          {activity.title}
                        </h3>
                        {activity.description && (
                          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                            {activity.description}
                          </p>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* History teaser */}
        <section className="px-6 py-20 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-8 rounded-3xl bg-[#E9E2CC] p-8 sm:p-12 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">
                Our journey
              </p>
              <h2 className="mt-3 max-w-2xl font-serif text-3xl font-extrabold text-[#23351C] sm:text-4xl">
                Every initiative is part of a bigger story.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                From its beginnings in 2023 to its continuing work today,
                discover the milestones and experiences that have shaped
                Kamay-Gabay. Visit the History page for the organization's
                documented story.
              </p>
            </div>
            <Link
              to="/history"
              className="inline-flex items-center justify-center rounded-full bg-[#173022] px-7 py-3 text-sm font-bold text-white transition hover:bg-emerald-900"
            >
              Explore our history →
            </Link>
          </div>
        </section>

        {/* Get involved */}
        <section id="get-involved" className="scroll-mt-24 px-6 pb-20 sm:pb-24">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-[#173022] px-7 py-14 text-center text-white shadow-xl sm:px-12 sm:py-16">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#F5C253]">
              Be part of the community
            </p>
            <h2 className="mx-auto mt-4 max-w-3xl font-serif text-3xl font-extrabold sm:text-4xl lg:text-5xl">
              There is a place for you in building inclusion.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-emerald-50/80 sm:text-base">
              Kamay-Gabay is free and open to everyone who wants to participate.
              Anyone who joins a registered workshop or activity becomes part
              of the community. Registration is required before participating,
              and there is no membership or registration fee.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/activities"
                className="rounded-full bg-[#F5C253] px-7 py-3 text-sm font-extrabold text-[#173022] transition hover:bg-[#e6b24a]"
              >
                Find an activity
              </Link>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/40 px-7 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Message us on Facebook
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}