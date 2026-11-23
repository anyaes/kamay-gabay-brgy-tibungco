import { Link } from 'react-router-dom'

const FACEBOOK_URL = 'https://www.facebook.com/p/Kamay-Gabay-61570749000594/'

export default function Footer() {
  return (
    <footer className="bg-[#10251A] px-6 pb-8 pt-14 text-emerald-50 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 border-b border-white/10 pb-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#F5C253]">
              Kamay-Gabay
            </h2>
            <p className="mt-3 max-w-xs text-sm leading-6 text-emerald-50/65">
              Empowering voices. Embracing inclusion. A youth-led initiative
              based in Barangay Tibungco, Davao City.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white">Explore</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-emerald-50/70">
              <Link to="/about" className="hover:text-[#F5C253]">About</Link>
              <Link to="/history" className="hover:text-[#F5C253]">History</Link>
              <Link to="/activities" className="hover:text-[#F5C253]">Activities</Link>
              <Link to="/officers" className="hover:text-[#F5C253]">Officers</Link>
              <Link to="/get-involved" className="hover:text-[#F5C253]">Get Involved</Link>
              <Link to="/contact" className="hover:text-[#F5C253]">Contact</Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white">Contact</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-emerald-50/70">
              <a href="tel:+639939023168" className="hover:text-[#F5C253]">
                +63 993 902 3168
              </a>
              <a href="mailto:kamaygabay@gmail.com" className="break-all hover:text-[#F5C253]">
                kamaygabay@gmail.com
              </a>
              <p>Barangay Tibungco, Davao City</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white">Follow our work</h3>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex text-sm text-emerald-50/70 underline underline-offset-4 hover:text-[#F5C253]"
            >
              Official Facebook page →
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-6 text-xs text-emerald-50/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Kamay-Gabay. All rights reserved.</p>
          <a href="#top" className="hover:text-[#F5C253]">Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}