import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export default function Carousel({ images = [] }) {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(0)

  const go = useCallback((next) => {
    setDir(next > index ? 1 : -1)
    setIndex((next + images.length) % images.length)
  }, [index, images.length])

  useEffect(() => {
    if (images.length <= 1) return
    const t = setInterval(() => go(index + 1), 4000)
    return () => clearInterval(t)
  }, [index, go, images.length])

  if (!images.length) return null

  return (
    <section className="max-w-5xl mx-auto py-12 px-6">
      <div className="relative w-full h-56 sm:h-80 overflow-hidden rounded-2xl bg-slate-100 shadow-md">
        <AnimatePresence initial={false} custom={dir}>
          <motion.img
            key={index}
            src={images[index]}
            alt=""
            custom={dir}
            initial={{ opacity: 0, x: dir > 0 ? 60 : -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir > 0 ? -60 : 60 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        <button
          onClick={() => go(index - 1)}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full px-3 py-1 hover:bg-white"
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          onClick={() => go(index + 1)}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full px-3 py-1 hover:bg-white"
          aria-label="Next"
        >
          ›
        </button>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`w-2.5 h-2.5 rounded-full transition ${
                i === index ? 'bg-[#F5C253]' : 'bg-white/60'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}