import { useState } from 'react'
import ScrollZoomHero from '../components/ScrollZoomHero.jsx'

export default function Landing() {
  const [openFaq, setOpenFaq] = useState(null)
  const [activeTab, setActiveTab] = useState(0)

  const aboutTabs = [
    {
      id: 'mission',
      label: 'Mission',
      content:
        'Kamay-Gabay is committed to fostering holistic community inclusion and youth empowerment through accessible educational workshops, advocacy campaigns, and hands-on learning initiatives. By making it free and open to everyone who wants to join our growing network, we create safe, active, and collaborative spaces that champion diversity, accessibility, and equal care for every child and youth.',
    },
    {
      id: 'vision',
      label: 'Vision',
      content:
        'To build an inclusive, barrier-free society where disability awareness, equal opportunities, and the active integration of children with special needs and the Deaf community are fully embraced, driven by empowered youth leading compassionate community action.',
    },
  ]

  const faqList = [
    {
      q: 'Who can be a member?',
      a: 'Anyone who participates in any workshop or activity conducted by Kamay Gabay becomes a member of the organization.',
    },
    {
      q: 'How does membership work?',
      a: 'All Kamay Gabay activities have a registration process. Participants register before joining an activity or workshop. There is no registration or membership fee. Participation in a registered Kamay Gabay activity qualifies an individual for membership.',
    },
    { q: 'More questions' },
  ]

  const glanceData = [
    { stat: '3', title: 'Projects', desc: 'FSL Workshops and Fun Days' },
    { stat: 'Youth-led', title: 'Organization Nature', desc: 'Built and run by the youth' },
    { stat: '2023', title: 'Year Started', desc: 'When we started' },
    { stat: '2026', title: 'Current Year', desc: 'Where we are now' },
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-slate-800 font-sans selection:bg-emerald-500 selection:text-white">
      {/* 1. TOP NAVBAR */}
      <nav className="w-full bg-[#173022]/90 backdrop-blur-md text-white py-4 px-6 sm:px-12 flex justify-between items-center fixed top-0 left-0 z-50 border-b border-emerald-900/50 shadow-md">
        <div className="font-extrabold text-xl tracking-tight text-[#F5C253]">
          Kamay-Gabay
        </div>
        <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-200">
          <a href="#glance" className="hover:text-[#F5C253] transition">
            At a Glance
          </a>
          <a href="#about" className="hover:text-[#F5C253] transition">
            About
          </a>
          <a href="#faq" className="hover:text-[#F5C253] transition">
            FAQ
          </a>
          <a href="#activities" className="hover:text-[#F5C253] transition">
            Projects
          </a>
          <a href="/admin/login" className="hover:text-[#F5C253] transition">
            Admin
          </a>
        </div>
      </nav>

      {/* 2. HERO — scroll-zoom stylized map */}
      <ScrollZoomHero />

      {/* 3. MAIN CREAM CONTAINER */}
      <main className="bg-[#FAF4DE] rounded-t-[2.5rem] sm:rounded-t-[4rem] relative z-20 -mt-8 pt-16 pb-20 px-6 sm:px-12 lg:px-24 shadow-2xl">
        <section id="who" className="max-w-6xl mx-auto py-16 text-center">
          <h1 className="text-4xl sm:text-4xl font-extrabold text-[#23351C] mb-4">
            Who are we?
          </h1>
          <p className="max-w-3xl mx-auto text-slate-700 text-sm sm:text-base leading-relaxed mb-12">
            Kamay Gabay is a youth-led initiative in Barangay Tibungco that promotes inclusion
            particularly on children with special needs, Deaf awareness, and Filipino Sign
            Language, and youth empowerment. Founded in 2023, it continues to engage the
            community through advocacy, learning, and meaningful participation. Kamay Gabay
            envisions a community where everyone is seen, heard, understood, and valued.
          </p>
        </section>

        <section id="about" className="max-w-6xl mx-auto items-center">
          <div className="lg:col-span-7 flex flex-col gap-5">
            <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase">
              ABOUT US
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#23351C] tracking-tight">
              {aboutTabs[activeTab].label}
            </h2>

            <div className="flex flex-wrap gap-3 my-1">
              {aboutTabs.map((tab, idx) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(idx)}
                  className={`px-5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                    activeTab === idx
                      ? 'bg-[#173022] text-white shadow-md scale-105'
                      : 'bg-slate-200/80 hover:bg-slate-300 text-slate-700'
                  }`}
                >
                  {tab.label.toUpperCase()}
                </button>
              ))}
            </div>

            <p className="text-slate-700 leading-relaxed text-sm sm:text-base min-h-[70px] transition-all duration-300">
              {aboutTabs[activeTab].content}
            </p>
          </div>
        </section>

        <section id="glance" className="max-w-6xl mt-16 mx-auto mb-16">
          <div className="bg-[#173022] text-white rounded-3xl py-8 px-4 sm:px-6 md:py-10 shadow-xl border border-emerald-900/40">
            <div className="text-center mb-6">
              <span className="text-xs font-bold text-[#F5C253] tracking-widest uppercase">
                AT A GLANCE
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-0">
              {glanceData.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center px-4 md:border-r border-emerald-800/60 last:border-r-0"
                >
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F5C253] tracking-tight mb-2">
                    {item.stat}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white tracking-wider uppercase mb-1">
                    {item.title}
                  </span>
                  <span className="text-xs text-emerald-100/70 max-w-[180px] leading-relaxed">
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: ALTERNATING CONTENT LEFT */}
        <section className="max-w-6xl mx-auto py-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 flex flex-col gap-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#23351C]">
              How we started.
            </h3>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Kamay Gabay began in 2023 after winning Hiyas ng Tibungco 2023, with the advocacy
              of promoting sign language learning. The advocacy carried the theme: “Empowering
              Voices, Embracing Inclusion.” This opportunity opened the doors for the very first
              Kamay Gabay Workshop in 2023.
            </p>
          </div>
        </section>

        {/* SECTION 4: ALTERNATING CONTENT RIGHT */}
        <section className="max-w-6xl mx-auto py-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-start-5 md:col-span-8 flex flex-col gap-3 text-left md:text-right">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#23351C]">
              Where we are now.
            </h3>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              After two successful workshops and one fun day, Kamay Gabay in 2026, Kamay Gabay
              3.0, marked a new chapter for the organization through a five-day workshop that was
              bigger, more engaging, and more meaningful. For the first time, Kamay Gabay
              conducted its own independent workshop, separate from the SK Academy, with its own
              program, activities, prizes, and tokens for participants. More than just a
              workshop, it reflected how far Kamay Gabay has grown—as an organization, a
              community, and a movement for inclusion.
            </p>
          </div>
        </section>

        {/* SECTION 5: PROJECT IMPLEMENTATION SLIDER */}
        <section id="activities" className="max-w-5xl mx-auto py-16 text-center">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            LOOKING BACK
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#23351C] mt-1 mb-8">
            Project Implementation
          </h2>

          <div className="relative flex items-center justify-center gap-4">
            <button
              className="p-2 rounded-full hover:bg-slate-200/80 transition text-slate-700"
              aria-label="Previous"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="w-full max-w-3xl h-64 sm:h-96 bg-white/70 border border-slate-300 rounded-2xl shadow-inner flex items-center justify-center text-slate-400 font-medium">
              Implementation Carousel / Slide Frame
            </div>

            <button
              className="p-2 rounded-full hover:bg-slate-200/80 transition text-slate-700"
              aria-label="Next"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="flex justify-center items-center gap-2 mt-6">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            <span className="w-2 h-2 rounded-full bg-slate-400" />
          </div>
        </section>

        {/* SECTION 6: FREQUENTLY ASKED QUESTIONS */}
        <section id="faq" className="max-w-4xl mx-auto py-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#23351C] mb-10 text-center lg:text-left">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            {faqList.map((item, idx) => {
              const isOpen = openFaq === idx
              return (
                <div
                  key={idx}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className={`bg-[#FFFDF6] hover:bg-white border border-slate-200/80 py-3.5 px-6 flex flex-col justify-center cursor-pointer transition-all duration-200 shadow-sm ${
                    isOpen ? 'rounded-2xl' : 'rounded-full'
                  }`}
                >
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">
                      {item.q}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-[#1b3d2b] text-white flex items-center justify-center shrink-0">
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isOpen ? 'rotate-45' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </div>
                  </div>

                  {isOpen && item.a && (
                    <p className="mt-3 text-xs text-slate-600 border-t border-slate-200/60 pt-2 leading-relaxed">
                      {item.a}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      </main>

      {/* 4. FOOTER */}
      <footer className="bg-[#173022] text-slate-200 pt-16 pb-8 px-6 sm:px-12 lg:px-24 rounded-t-[2.5rem] relative z-30 -mt-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-slate-300 rounded-lg shrink-0" />
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Kamay-Gabay</h3>
              <p className="text-xs text-slate-400">Empowering Voices, Embracing Inclusion</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-7 gap-8 pb-12 border-b border-white/10 text-xs">
            <div>
              <h4 className="font-bold text-white mb-3">Quick Links</h4>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <a href="#" className="hover:underline">
                    Volunteers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    About us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3">Policies</h4>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3">Address</h4>
              <p className="text-slate-300 leading-relaxed">Barangay Tibungco, Davao City</p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3">Contact Number</h4>
              <p className="text-slate-300">+63 993 902 3168</p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3">Email</h4>
              <p className="text-slate-300">kamaygabay@gmail.com</p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3">Socials</h4>
              <div className="flex gap-3 text-slate-300 font-bold text-xs">
                <a href="#" className="hover:text-white">
                  FB
                </a>
                <a href="#" className="hover:text-white">
                  IG
                </a>
                <a href="#" className="hover:text-white">
                  X
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center pt-6 text-[11px] text-slate-400 gap-2">
            <p>Kamay-Gabay. All rights reserved.</p>
            <p>© 2026 Kamay-Gabay.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}