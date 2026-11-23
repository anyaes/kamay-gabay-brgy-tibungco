import { useScroll, useTransform, motion } from 'motion/react'
import heroImg from '../assets/hero-2.png'

export default function ScrollZoomHero() {
  const { scrollYProgress } = useScroll()

  // Zoom scale from 1 → 2.2 as the user scrolls through the hero
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 2.2])

  // Slight vertical pan for depth
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])

  // Parallax layer: clouds move slower (less transform)
  const cloudX = useTransform(scrollYProgress, [0, 1], ['0%', '-15%'])

  // Overlay text fades out as we zoom in
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])

  return (
    <header
      id="hero"
      className="relative w-full min-h-screen pt-20 flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Sticky viewport for the zoom effect */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ scale, y }}
          className="absolute inset-0 origin-center will-change-transform"
        >
          <img
            src={heroImg}
            alt="Kamay-Gabay community map"
            className="w-full h-full object-cover object-center brightness-90"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </motion.div>

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

        {/* Parallax cloud layer (decorative) */}
        <motion.div
          style={{ x: cloudX }}
          className="absolute top-10 left-0 w-full pointer-events-none select-none"
          aria-hidden="true"
        >
          <div className="mx-auto w-[80%] max-w-4xl opacity-20">
            <svg viewBox="0 0 400 80" fill="none" stroke="white" strokeWidth="2">
              <path d="M40 60c0-10 8-18 18-18 2-8 9-14 18-14 10 0 18 8 18 18 8 0 14 6 14 14s-6 14-14 14H58c-10 0-18-8-18-14Z" />
              <path d="M200 60c0-8 6-14 14-14 2-6 7-10 14-10 8 0 14 6 14 14 6 0 10 4 10 10s-4 10-10 10h-28c-8 0-14-6-14-10Z" />
              <path d="M300 60c0-10 8-18 18-18 2-8 9-14 18-14 10 0 18 8 18 18 8 0 14 6 14 14s-6 14-14 14h-36c-10 0-18-8-18-14Z" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Foreground content (stays put while background zooms) */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="relative z-10 mt-auto mb-16 sm:mb-24 flex flex-col items-center gap-6 px-6 text-center"
      >
        <span className="text-xs font-bold tracking-widest uppercase text-[#F5C253] drop-shadow">
          Barangay Tibungco, Davao City
        </span>
        <a
          href="#who"
          className="bg-white hover:bg-slate-100 text-slate-900 font-bold px-8 py-3.5 rounded-full shadow-2xl transition hover:scale-105 active:scale-95 uppercase tracking-wider text-sm block"
        >
          Join Now!
        </a>
      </motion.div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/70 text-xs tracking-widest uppercase animate-pulse">
        Scroll to explore
      </div>
    </header>
  )
}