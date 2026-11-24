import { useState } from 'react'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading.jsx'
import PageHero from '../components/PageHero.jsx'

const advocacyAreas = [
  {
    number: '01',
    title: 'Filipino Sign Language and Deaf Awareness',
    description:
      'Promoting understanding of the Deaf community and encouraging communication through Filipino Sign Language.',
    topics: [
      'Introduction to sign language',
      'Deaf awareness and understanding',
      'Communication between Deaf and hearing individuals',
      'Learning directly from Deaf individuals and their experiences',
      'Creating more accessible communication environments',
    ],
  },
  {
    number: '02',
    title: 'Disability Inclusion',
    description:
      'Promoting the participation, acceptance, and inclusion of children with disabilities and individuals with special needs.',
    topics: [
      'Equal opportunities for participation',
      'Inclusive community activities',
      'Disability awareness',
      'Accessible and welcoming environments',
      'Opportunities for children to connect, interact, and build confidence',
    ],
  },
  {
    number: '03',
    title: 'Youth Empowerment',
    description:
      'Encouraging young people to become active contributors to inclusive community development.',
    topics: [
      'Youth-led advocacy',
      'Volunteerism and leadership',
      'Community service',
      'Collaborative learning',
      'Compassionate action',
    ],
  },
  {
    number: '04',
    title: 'Community Engagement',
    description:
      'Participating in initiatives that strengthen the community beyond the organization’s primary advocacy.',
    topics: [
      'Educational outreach',
      'Barangay initiatives',
      'Community partnerships',
      'Volunteer participation',
      'Collective responsibility and service',
    ],
  },
]

const values = [
  {
    title: 'Inclusion',
    body: 'Everyone deserves opportunities to participate and belong.',
  },
  {
    title: 'Accessibility',
    body: 'Communication and participation should be made more accessible.',
  },
  {
    title: 'Empathy',
    body: 'Understanding others begins with listening and learning.',
  },
  {
    title: 'Empowerment',
    body: 'Young people can create meaningful change through action.',
  },
  {
    title: 'Community',
    body: 'A more inclusive society is built through collective effort.',
  },
]

export default function About() {
  const [activeTab, setActiveTab] = useState('Vision')
  return (
<div className="bg-[#FAF4DE] font-sans text-slate-800">
      <PageHero
        eyebrow="About Kamay-Gabay"
        title="A Community Built on Understanding and Inclusion."
        description="Kamay-Gabay is a youth-led organization that promotes inclusion, understanding, and empowerment within the community."
        image="/about/about-hero.png"
        imageAlt="Kamay-Gabay community"
      />

      {/* About intro */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="About Kamay-Gabay"
            title="A Community Built on Understanding and Inclusion."
            description="Kamay-Gabay is a youth-led organization that promotes inclusion, understanding, and empowerment within the community. What began in 2023 as an advocacy for sign language learning has grown into a broader movement championing accessibility, disability awareness, and equal opportunities for children with special needs and the Deaf community."
          />
          <p className="mt-6 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            Through educational workshops, advocacy campaigns, hands-on learning
            initiatives, and community engagement, Kamay-Gabay creates
            opportunities for individuals to connect, participate, and contribute
            to a more inclusive society.
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            Rooted in Barangay Tibungco, Davao City, the organization believes
            that everyone deserves to be seen, heard, understood, and valued.
          </p>
        </div>
      </section>

{/* Vision & Mission */}
      <div className="w-full bg-gradient-to-br from-[#173022] to-[#1b3d2b]">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          {/* Toggle buttons */}
          <div className="flex gap-3">
            {['Vision', 'Mission'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-8 py-3 text-sm font-extrabold uppercase tracking-wider transition ${
                  activeTab === tab
                    ? 'bg-[#F5C253] text-[#173022] shadow-lg'
                    : 'border border-white/30 text-white/70 hover:border-white/50 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content */}
          <p className="mt-10 max-w-4xl font-serif text-2xl font-bold leading-relaxed text-white sm:text-3xl lg:text-4xl">
            {activeTab === 'Vision'
              ? 'To build an inclusive, barrier-free society where disability awareness, equal opportunities, and the active integration of children with special needs and the Deaf community are fully embraced, driven by empowered youth leading compassionate community action.'
              : 'Kamay-Gabay is committed to fostering holistic community inclusion and youth empowerment through accessible educational workshops, advocacy campaigns, and hands-on learning initiatives. By making it free and open to everyone who wants to join our growing network, we create safe, active, and collaborative spaces that champion diversity, accessibility, and equal care for every child and youth.'}
          </p>
        </div>
      </div>

      {/* Advocacy */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="What We Stand For"
            title="Inclusion Begins With Understanding."
            description="Kamay-Gabay brings people together through advocacy, accessible learning, and youth-led community action. These are the key areas reflected in its mission and purpose."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {advocacyAreas.map((area) => (
              <article
                key={area.number}
                className="rounded-2xl border border-[#e3dcc8] bg-[#FAF4DE] p-6 sm:p-8"
              >
                <p className="text-xs font-bold tracking-[0.2em] text-emerald-800">
                  {area.number}
                </p>
                <h3 className="mt-4 text-xl font-extrabold text-[#23351C]">
                  {area.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {area.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {area.topics.map((topic) => (
                    <li
                      key={topic}
                      className="flex items-start gap-2 text-sm text-slate-600"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-700" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gradient-to-b from-[#FAF4DE] via-[#F0EBDD] to-[#FAF4DE] px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Our Values"
            title="What We Believe In."
            description="These values guide how Kamay-Gabay approaches its work and community."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-[#e3dcc8] bg-[#FAF4DE] p-6"
              >
                <h3 className="font-bold text-[#23351C] text-lg">{v.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl bg-[#173022] px-8 py-14 text-center text-white shadow-xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#F5C253]">
              Be Part of the Movement
            </p>
            <h2 className="mt-3 font-serif text-3xl font-extrabold sm:text-4xl">
              You Don’t Have to Do Everything.
              <br />
              You Just Have to Do Something.
            </h2>
            <p className="mt-4 text-m text-white leading-relaxed">
             Kamay Gabay welcomes volunteers of any kind. Come and join us on our journey of furthering inclusion.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Link
                to="/get-involved"
                className="rounded-full bg-[#F5C253] px-7 py-3 text-sm font-extrabold text-[#173022] transition hover:bg-[#e6b24a]"
              >
                Get Involved
              </Link>
            
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}