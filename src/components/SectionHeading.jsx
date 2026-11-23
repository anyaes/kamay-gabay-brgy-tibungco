export default function SectionHeading({ eyebrow, title, description, light = false }) {
  return (
    <div className="max-w-2xl">
      <p
        className={`text-xs font-bold uppercase tracking-[0.22em] ${
          light ? 'text-[#F5C253]' : 'text-emerald-800'
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-3 font-serif text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl ${
          light ? 'text-white' : 'text-[#23351C]'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-sm leading-7 sm:text-base ${
            light ? 'text-emerald-50/80' : 'text-slate-600'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  )
}