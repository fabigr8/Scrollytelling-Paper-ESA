import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// Fixed node positions for deterministic layout
const NODES = [
  { x: 15, y: 20 }, { x: 30, y: 10 }, { x: 50, y: 15 }, { x: 70, y: 8 },  { x: 85, y: 22 },
  { x: 10, y: 40 }, { x: 25, y: 50 }, { x: 42, y: 38 }, { x: 58, y: 45 }, { x: 75, y: 35 },
  { x: 90, y: 48 }, { x: 20, y: 65 }, { x: 38, y: 70 }, { x: 55, y: 62 }, { x: 72, y: 72 },
  { x: 88, y: 65 }, { x: 12, y: 82 }, { x: 30, y: 85 }, { x: 48, y: 88 }, { x: 65, y: 80 },
  { x: 82, y: 85 }, { x: 95, y: 30 }, { x: 5,  y: 58 }, { x: 60, y: 25 }, { x: 35, y: 30 },
]

const EDGES = [
  [0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[8,9],[9,10],
  [5,11],[11,12],[12,13],[13,14],[14,15],[11,16],[16,17],[17,18],[18,19],[19,20],
  [1,6],[2,7],[3,8],[4,9],[6,12],[7,13],[8,14],[9,19],[21,4],[22,5],
  [23,2],[24,6],[0,24],[24,7],[3,21],
]

const HIGHLIGHT_NODES = [2, 7, 13, 18] // "explanation" nodes shown in gold

export default function Hero() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 2000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: 'var(--bg)' }}>

      {/* Animated network background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-25"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4F72FF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#4F72FF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Edges */}
        {EDGES.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={NODES[a].x} y1={NODES[a].y}
            x2={NODES[b].x} y2={NODES[b].y}
            stroke="#1E2A45"
            strokeWidth="0.3"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, delay: i * 0.08, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* Regular nodes */}
        {NODES.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x} cy={n.y} r="0.8"
            fill={HIGHLIGHT_NODES.includes(i) ? '#F59E0B' : '#4F72FF'}
            animate={{
              r: HIGHLIGHT_NODES.includes(i)
                ? [0.8, 1.4, 0.8]
                : [0.6, 1.0, 0.6],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2.5,
              delay: i * 0.15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Glowing highlight on "explanation" nodes */}
        {HIGHLIGHT_NODES.map(i => (
          <motion.circle
            key={`glow-${i}`}
            cx={NODES[i].x} cy={NODES[i].y} r="2.5"
            fill="#F59E0B"
            opacity={0}
            animate={{ opacity: [0, 0.15, 0], r: [2, 4, 2] }}
            transition={{ duration: 2.5, delay: i * 0.15, repeat: Infinity }}
          />
        ))}
      </svg>

      {/* Gradient overlay: bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--bg))' }} />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12">
        <motion.p
          className="text-xs uppercase tracking-widest mb-6 font-medium"
          style={{ color: 'var(--primary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          A Data Story · Gwinner, Tomitza & Winkelmann, 2024
        </motion.p>

        <motion.h1
          className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight mb-6"
          style={{ color: 'var(--text)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          When AI explains{' '}
          <span style={{
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            itself,
          </span>
          <br />
          can you trust the story?
        </motion.h1>

        <motion.p
          className="text-lg lg:text-xl max-w-2xl leading-relaxed mb-10"
          style={{ color: 'var(--muted)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          AI systems now advise doctors, approve loans, and predict disease.
          Tools called "post-hoc explainers" translate their black-box decisions
          into human-readable reasons. But how stable are those reasons — and can
          we measure when they drift?
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          {['XAI', 'Representational Similarity Analysis', 'Explanation Drift', 'MLOps'].map(tag => (
            <span
              key={tag}
              className="text-xs px-3 py-1.5 rounded-full font-medium"
              style={{
                backgroundColor: 'var(--elevated)',
                border: '1px solid var(--border)',
                color: 'var(--muted)',
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

      </div>

      {/* Scroll cue — centered pill, hopping */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className="flex items-center gap-2 pl-5 pr-4 py-2.5 rounded-full cursor-pointer select-none"
          style={{
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            boxShadow: '0 4px 24px rgba(0, 212, 255, 0.35)',
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-xs font-bold uppercase tracking-widest whitespace-nowrap" style={{ color: 'var(--bg)' }}>
            Scroll to explore
          </span>
          <motion.svg
            width="14" height="14" viewBox="0 0 14 14" fill="none"
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M2 5L7 10L12 5" stroke="var(--bg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </motion.div>
      </motion.div>
    </div>
  )
}
