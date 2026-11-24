import { useState } from 'react'
import SectionHeading from '../components/SectionHeading.jsx'

const FACEBOOK_URL = 'https://www.facebook.com/p/Kamay-Gabay-61570749000594/'

const inquiryTypes = [
  'General inquiries',
  'Membership and activities',
  'Volunteering',
  'Partnerships',
  'Donations and support',
  'Other concerns',
]

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    inquiry: inquiryTypes[0],
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // Placeholder: wire to Supabase or an email service later
    setSubmitted(true)
  }

  return (
<div className="bg-[#FAF4DE] font-sans text-slate-800">
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Get in Touch"
            title="We'd Love to Hear From You."
            description="Whether you're interested in joining, volunteering, partnering, or supporting Kamay-G Gabay, reach out through any of the channels below."
          />

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            {/* Contact info */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-[#e7dfc7] bg-[#F2EBD7] p-8">
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-800">
                  Contact Information
                </h3>
                <div className="mt-6 space-y-5 text-sm">
                  <div>
                    <p className="font-bold text-[#23351C]">Organization</p>
                    <p className="mt-1 text-slate-600">Kamay-Gabay</p>
                  </div>
                  <div>
                    <p className="font-bold text-[#23351C]">Location</p>
                    <p className="mt-1 text-slate-600">
                      Barangay Tibungco, Davao City, Philippines
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-[#23351C]">Email</p>
                    <a
                      href="mailto:kamaygabay@gmail.com"
                      className="mt-1 block break-all text-emerald-800 hover:underline"
                    >
                      kamaygabay@gmail.com
                    </a>
                  </div>
                  <div>
                    <p className="font-bold text-[#23351C]">Phone</p>
                    <a
                      href="tel:+639939023168"
                      className="mt-1 block text-emerald-800 hover:underline"
                    >
                      +63 993 902 3168
                    </a>
                  </div>
                  <div>
                    <p className="font-bold text-[#23351C]">Facebook</p>
                    <a
                      href={FACEBOOK_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-block text-emerald-800 underline underline-offset-4 hover:text-emerald-900"
                    >
                      Official Kamay-Gabay page →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="rounded-3xl border border-[#e7dfc7] bg-[#FAF4DE] p-8 sm:p-10">
              {submitted ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                    <svg
                      className="h-8 w-8 text-emerald-800"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-xl font-extrabold text-[#23351C]">
                    Thank you for reaching out!
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    We’ve received your message and will get back to you soon.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setForm({
                        name: '',
                        email: '',
                        inquiry: inquiryTypes[0],
                        message: '',
                      })
                    }}
                    className="mt-6 rounded-full bg-[#173022] px-6 py-2.5 text-sm font-bold text-white hover:bg-emerald-900"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Inquiry Type
                    </label>
                    <select
                      value={form.inquiry}
                      onChange={(e) =>
                        setForm({ ...form, inquiry: e.target.value })
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    >
                      {inquiryTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Message
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      rows={5}
                      required
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    By submitting this form, you agree that your information will
                    be handled appropriately and used only to respond to your
                    inquiry.
                  </p>

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-[#173022] px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-900"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}