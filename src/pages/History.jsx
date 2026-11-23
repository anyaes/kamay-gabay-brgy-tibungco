import { Link } from 'react-router-dom'
import { motion } from 'motion/react'

const timeline = [
  {
    year: '2023',
    title: 'Hiyas ng Tibungco 2023',
    body: 'Kamay-Gabay began after winning Hiyas ng Tibungco 2023, carrying the advocacy: “Empowering Voices, Embracing Inclusion.” This opened the doors for the very first Kamay-Gabay Workshop.',
  },
  {
    year: '2024',
    title: 'Building momentum',
    body: 'Follow-up workshops and community activities deepened engagement with children with special needs, the Deaf community, and Filipino Sign Language learners across Barangay Tibungco.',
  },
  {
    year: '2025',
    title: 'Fun Day & growing network',
    body: 'The organization held its first Fun Day alongside continued FSL workshops, expanding its volunteer base and participant reach.',
  },
  {
    year: '2026',
    title: 'Kamay-Gabay 3.0',
    body: 'A five-day workshop that was bigger, more engaging, and more meaningful. For the first time, Kamay-Gabay ran its own independent workshop — with its own program, activities, prizes, and tokens for participants. A new chapter as an organization, a community, and a movement for inclusion.',
  },
]

const values = [
  {
    title: 'Inclusion',
    body: 'Children with special needs and the Deaf community are seen, heard, understood, and valued in every activity we run.',
  },
  {
    title: 'Youth empowerment',
    body: 'Built and run by the youth — giving young people the space to lead, organize, and advocate.',
  },
  {
    title: 'Accessibility',
    body: 'Free and open to everyone. No registration or membership fees — participation is the only requirement.',
  },
]

export default function History() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-xs font-bold text-emerald-800 tracking-widest uppercase">
          Our story
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-extrabold text-[#23351C] mt-2 mb-4">
          History
        </h1>
        <p className="max-w-2xl mx-auto text-slate-700 text-sm sm:text-base leading-relaxed">
          From a single advocacy in 2023 to an independent five-day workshop in
          2026 — the story of Kamay-Gabay.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative mb-20">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-emerald-800/20" />

        <div className="space-y-12">
          {timeline.map((item, idx) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="relative pl-14"
            >
              <div className="absolute left-2 top-1 w-4 h-4 rounded-full bg-[#F5C253] border-4 border-[#173022]" />

              <span className="text-xs font-bold text-emerald-800 tracking-widest uppercase">
                {item.year}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#23351C] mt-1 mb-2">
                {item.title}
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-2xl">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Values */}
      <section className="mb-20">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-emerald-800 tracking-widest uppercase">
            What drives us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#23351C] mt-1">
            Our values
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
            >
              <h3 className="font-bold text-[#23351C] text-lg mb-2">
                {v.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-[#173022] rounded-3xl py-12 px-8 text-center text-white shadow-xl">
        <h2 className="text-3xl font-extrabold mb-3">Be part of the story</h2>
        <p className="text-sm text-emerald-100/80 max-w-md mx-auto mb-6">
          Join a workshop or activity and become part of our growing community.
        </p>
        <Link
          to="/activities"
          className="inline-block bg-[#F5C253] text-[#173022] font-bold px-8 py-3 rounded-full hover:bg-[#e6b24a] transition uppercase tracking-wider text-sm"
        >
          See activities
        </Link>
      </div>
    </div>
  )
}