import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import PageHero from '../components/PageHero.jsx'

const timeline = [
  {
    year: '2023',
    title: 'The Beginning',
    body: 'Kamay-Gabay began following the Hiyas ng Tibungco 2023 pageant, where its advocacy promoted sign language learning under the theme: “Empowering Voices, Embracing Inclusion.” This opened the doors for the first Kamay-Gabay workshop and introduced its mission of encouraging communication and understanding between Deaf and hearing communities.',
  },
  {
    year: '2024',
    title: 'The First Workshop',
    body: 'The first documented workshop was conducted over two days under the guidance of adviser Sir Ar Spencer Lopez. The workshop introduced sign language as a bridge for communication, helping participants understand the importance of accessibility and inclusion.',
  },
  {
    year: '2024',
    title: 'Extending Helping Hands',
    body: 'Kamay-Gabay participated in Happy Walk 2024, extending its advocacy to support individuals with Down Syndrome and the wider disability community. The activity emphasized unity, compassion, and acceptance.',
  },
  {
    year: '2024–2025',
    title: 'Kamay-Gabay 2.0',
    body: 'Kamay-Gabay 2.0 developed through a five-day workshop that welcomed three Deaf guests: Ate Merel, Kuya Renz, and Ate Ruth. Their participation and shared experiences helped deepen participants’ understanding of inclusion, accessibility, and communication.',
  },
  {
    year: '2025',
    title: 'Leadership and Recognition',
    body: 'Before the end of 2025, the organization’s founder was named a finalist for Most Outstanding Leader. This recognition marked an important milestone in the growth of the advocacy.',
  },
  {
    year: '2026',
    title: 'Becoming an Official Organization',
    body: 'With the support of the Sangguniang Kabataan, Kamay-Gabay established its officers and became a recognized organization. Its mission also expanded beyond sign language learning to include broader efforts in disability inclusion, accessibility, and youth empowerment.',
  },
  {
    year: '2026',
    title: 'A Milestone of Recognition',
    featured: true,
    body: 'During the KK Assembly 2026, Kamay-Gabay made its first public appearance as a recognized organization. Its members led and signed the opening prayer and Lupang Hinirang, took their oath of office, and were formally recognized by Ate Kap.',
  },
  {
    year: '2026',
    title: 'Summer Fun Day for Children with Disabilities',
    body: 'Kamay-Gabay and its officers presented the proposal for Summer Fun Day for Children with Disabilities during a barangay session. With the support of the Barangay and SK Council, the project was successfully conducted, creating opportunities for children with disabilities to experience inclusive activities and meaningful interaction.',
  },
  {
    year: '2026',
    title: 'Serving Beyond the Organization',
    body: 'Kamay-Gabay also participated in community initiatives in Barangay Tibungco, including Brigada Eskwela, Education on Wheels, Leadership Conference, community culmination activities, and prayer and singing of the Lupang Hinirang. These engagements demonstrate the organization’s involvement in community service beyond its central advocacy.',
  },
  {
    year: '2026',
    title: 'Kamay-Gabay 3.0',
    body: 'Kamay-Gabay 3.0 marked another stage of organizational growth through a five-day workshop. For the first time, Kamay-Gabay conducted an independent workshop separate from the SK Academy, with its own program, activities, prizes, and participant tokens. This milestone reflected its growing capacity to independently organize educational and advocacy initiatives.',
  },
]

const galleryTiles = [
  { src: '/history/first-workshop.png', label: 'The First Workshop', date: '2024', alt: 'First Kamay-Gabay workshop' },
  { src: '/history/happy-walk.png', label: 'Happy Walk 2024', date: '2024', alt: 'Happy Walk 2024' },
  { src: '/history/kg2.png', label: 'Kamay Gabay 2.0', date: '2024–2025', alt: 'Kamay Gabay 2.0 workshop' },
  { src: '/history/summer-fun-day.png', label: 'Summer Fun Day', date: '2026', alt: 'Summer Fun Day for Children with Disabilities' },
]

export default function History() {
  return (
    <div className="bg-[#FAF4DE] font-sans text-slate-800">
      <PageHero
        eyebrow="From Advocacy to Organization"
        title="Our History"
        description="From a single advocacy in 2023 to an independent five-day workshop in 2026 — the story of Kamay-Gabay."
        image="/history/history-hero.png"
        imageAlt="Kamay-Gabay history"
      />

      {/* Timeline */}
      <section className="bg-gradient-to-b from-[#FAF4DE] via-[#F0EBDD] to-[#FAF4DE] px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-emerald-800/20" />

            <div className="space-y-12">
              {timeline.map((item, idx) => (
                <motion.div
                  key={`${item.year}-${item.title}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: idx * 0.03 }}
                  className={`relative pl-14 ${
                    item.featured
                      ? 'rounded-3xl border-2 border-[#F5C253] bg-[#173022] p-8 sm:p-10 text-white shadow-xl'
                      : ''
                  }`}
                >
                  {/* Timeline dot — bigger for featured */}
                  <div
                    className={`absolute left-2 top-1 rounded-full border-4 border-[#173022] ${
                      item.featured
                        ? 'h-6 w-6 bg-[#F5C253]'
                        : 'h-4 w-4 bg-[#F5C253]'
                    }`}
                  />

                  {item.featured && (
                    <div className="mb-4 flex items-center gap-3">
                      <span className="h-px w-8 bg-[#F5C253]" />
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#F5C253]">
                        Major Milestone
                      </span>
                    </div>
                  )}

                  <span
                    className={`text-xs font-bold tracking-widest uppercase ${
                      item.featured ? 'text-[#F5C253]' : 'text-emerald-800'
                    }`}
                  >
                    {item.year}
                  </span>
                  <h2
                    className={`font-extrabold font-serif mt-1 mb-2 ${
                      item.featured
                        ? 'text-2xl sm:text-3xl text-white'
                        : 'text-2xl sm:text-3xl text-[#23351C]'
                    }`}
                  >
                    {item.title}
                  </h2>
                  <p
                    className={`text-sm sm:text-base leading-relaxed max-w-2xl ${
                      item.featured ? 'text-emerald-50/85' : 'text-slate-700'
                    }`}
                  >
                    {item.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-800">
                Moments from the journey
              </p>
              <h2 className="mt-2 font-serif text-3xl font-extrabold text-[#23351C] sm:text-4xl">
                Glimpses of Kamay-Gabay
              </h2>
            </div>
            <Link
              to="/activities"
              className="shrink-0 text-sm font-bold text-emerald-800 underline-offset-4 hover:underline"
            >
              View all activities →
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {galleryTiles.map((tile) => (
              <Link
                key={tile.src}
                to="/activities"
                className="group relative block aspect-[4/3] overflow-hidden rounded-md bg-[#F2EBD7]"
              >
                {tile.src ? (
                  <img
                    src={tile.src}
                    alt={tile.alt}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-[#173022]/70 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <p className="text-xs font-bold text-white">{tile.label}</p>
                  {tile.date && (
                    <p className="text-[10px] text-white/70">{tile.date}</p>
                  )}
                </div>
                <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-emerald-800 opacity-0 transition group-hover:opacity-100">
                  View →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}