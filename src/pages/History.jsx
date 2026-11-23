import { Link } from 'react-router-dom'
import { motion } from 'motion/react'

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

export default function History() {
  return (
    <div className="bg-[#FAF4DE] font-sans text-slate-800">
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-800">
              From Advocacy to Organization
            </p>
            <h1 className="mt-3 font-serif text-4xl font-extrabold leading-tight text-[#23351C] sm:text-5xl">
              Our History
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              From a single advocacy in 2023 to an independent five-day workshop
              in 2026 — the story of Kamay-Gabay.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#F0EBDD] px-6 py-16 sm:py-20">
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
                    <span className="mb-3 inline-block rounded-full bg-[#F5C253] px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[#173022]">
                      Major Milestone
                    </span>
                  )}

                  <span
                    className={`text-xs font-bold tracking-widest uppercase ${
                      item.featured ? 'text-[#F5C253]' : 'text-emerald-800'
                    }`}
                  >
                    {item.year}
                  </span>
                  <h2
                    className={`font-extrabold mt-1 mb-2 ${
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

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl bg-[#173022] px-8 py-14 text-center text-white shadow-xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#F5C253]">
              Be Part of the Story
            </p>
            <h2 className="mt-3 font-serif text-3xl font-extrabold sm:text-4xl">
              Every Step Is Part of a Bigger Story.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-emerald-50/80">
              Join a workshop or activity and become part of our growing
              community.
            </p>
            <Link
              to="/activities"
              className="mt-8 inline-block rounded-full bg-[#F5C253] px-8 py-3 text-sm font-extrabold text-[#173022] transition hover:bg-[#e6b24a]"
            >
              See Activities
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}