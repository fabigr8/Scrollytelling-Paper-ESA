import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ScrollSection({ section, onEnter }) {
  const ref = useRef(null)

  // Intersection Observer to detect when section enters viewport
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            onEnter(section.id)
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: '-10% 0px -40% 0px',
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [section.id, onEnter])

  return (
    <section
      ref={ref}
      className="min-h-[150vh] py-24 lg:py-32 flex flex-col justify-center"
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      <TextBlock section={section} />
    </section>
  )
}

function TextBlock({ section }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Section label */}
      <p className="text-xs font-semibold uppercase tracking-widest mb-5"
        style={{ color: 'var(--primary)' }}>
        {section.label}
      </p>

      {/* Headline */}
      <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight mb-8"
        style={{ color: 'var(--text)' }}>
        {section.headline}
      </h2>

      {/* Body paragraphs */}
      <div className="space-y-5">
        {section.body.map((para, i) => (
          <motion.p
            key={i}
            className="text-base lg:text-lg leading-relaxed"
            style={{ color: i === 0 ? '#CBD5E1' : 'var(--muted)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: 'easeOut' }}
          >
            {para}
          </motion.p>
        ))}
      </div>

      {/* Stat callout */}
      {section.stat && (
        <motion.div
          className="mt-10 p-5 rounded-xl"
          style={{
            backgroundColor: 'var(--elevated)',
            border: '1px solid var(--border)',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-baseline gap-4 flex-wrap">
            <span
              className="text-4xl lg:text-5xl font-black tabular-nums"
              style={{
                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {section.stat.value}
            </span>
            <div>
              <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
                {section.stat.label}
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                {section.stat.sub}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
