export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = '',
  align = 'left',
  children,
}) {
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-center text-left'
  const innerMax = align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl'

  return (
    <div className="relative -mt-10 h-64 w-full sm:h-96">
      {image && (
        <img
          src={image}
          alt={imageAlt}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      )}
      <div className="absolute inset-0 bg-[#173022]/70" aria-hidden="true" />
      <div className={`absolute inset-0 flex ${alignClass}`}>
        <div className={`mx-auto w-full max-w-6xl px-6 py-10 ${innerMax}`}>
          {eyebrow && (
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#F5C253]">
              {eyebrow}
            </p>
          )}
          {title && (
            <h1 className="mt-2 font-serif text-3xl font-extrabold text-white sm:text-5xl">
              {title}
            </h1>
          )}
          {description && (
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
              {description}
            </p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </div>
    </div>
  )
}