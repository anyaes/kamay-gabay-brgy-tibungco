import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading.jsx'

const supportWays = [
  {
    title: 'In-kind Donations',
    body: 'School supplies, toys, tokens and giveaways, activity materials, games and prizes.',
  },
  {
    title: 'Food Support',
    body: 'Meals, snacks, drinks, and food supplies for activities.',
  },
  {
    title: 'Financial Support',
    body: 'Contributions may help cover activity materials, food and refreshments, transportation, and other program-related expenses.',
  },
  {
    title: 'Volunteer Opportunities',
    body: 'Game facilitators, program support, documentation team, and activity assistants.',
  },
  {
    title: 'Promotion and Communication',
    body: 'Content creation, photography, videography, storytelling, and sharing organizational initiatives.',
  },
]

export default function GetInvolved() {
  return (
<div className="bg-[#FAF4DE] font-sans text-slate-800">
      {/* Become a Member */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Become a Member"
            title="Everyone Has a Place in Kamay-Gabay."
            description="Kamay-Gabay welcomes anyone who wants to learn, participate, and contribute to a more inclusive community."
          />

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* Membership process */}
            <div className="rounded-3xl border border-[#e7dfc7] bg-[#F2EBD7] p-8 sm:p-10">
              <h3 className="text-xl font-extrabold text-[#23351C]">
                How Membership Works
              </h3>
              <ol className="mt-6 space-y-4">
                {[
                  'Register for a Kamay-Gabay workshop or activity.',
                  'Participate in the registered activity.',
                  'Become a member of Kamay-Gabay.',
                ].map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#173022] text-sm font-bold text-[#F5C253]">
                      {i + 1}
                    </span>
                    <p className="pt-1 text-sm leading-7 text-slate-700">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
              <Link
                to="/activities"
                className="mt-8 inline-block rounded-full bg-[#173022] px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-900"
              >
                Find an Activity →
              </Link>
            </div>

            {/* Guidelines */}
            <div className="rounded-3xl border border-[#e7dfc7] bg-[#FAF4DE] p-8 sm:p-10">
              <h3 className="text-xl font-extrabold text-[#23351C]">
                Membership Guidelines
              </h3>
              <ul className="mt-6 space-y-3">
                {[
                  'Membership is open to everyone.',
                  'Registration is required before participating in an activity.',
                  'There is no membership or registration fee.',
                  'Participation in a registered Kamay-Gabay activity qualifies an individual for membership.',
                ].map((g) => (
                  <li
                    key={g}
                    className="flex items-start gap-3 text-sm leading-7 text-slate-700"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-700" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Support Our Initiatives */}
      <section className="bg-[#F0EBDD] px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Support Our Initiatives"
            title="Every Contribution Helps Create Opportunities."
            description="There are many ways to support Kamay-Gabay’s advocacy and community initiatives. Whether through resources, financial assistance, volunteer work, or sharing its message, every contribution can help create more inclusive experiences."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {supportWays.map((way, i) => (
              <div
                key={way.title}
                className="rounded-2xl border border-[#e3dcc8] bg-[#FAF4DE] p-6"
              >
                <span className="text-xs font-bold tracking-[0.2em] text-emerald-800">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-lg font-extrabold text-[#23351C]">
                  {way.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {way.body}
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
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-emerald-50/80">
              Bring your skills, time, resources, creativity, or voice. Help
              Kamay-Gabay create spaces where children and youth can play,
              connect, participate, and feel that they belong.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-block rounded-full bg-[#F5C253] px-8 py-3 text-sm font-extrabold text-[#173022] transition hover:bg-[#e6b24a]"
            >
              Contact Kamay-Gabay
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}