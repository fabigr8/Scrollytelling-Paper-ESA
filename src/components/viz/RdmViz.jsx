import { motion } from 'framer-motion'
import { METRIC_COLORS } from '../../data'

const GRID_SIZE = 8

// Generate a seeded pseudo-random matrix for visual demonstration
function makeMatrix(seed, pattern) {
  const m = []
  for (let r = 0; r < GRID_SIZE; r++) {
    const row = []
    for (let c = 0; c < GRID_SIZE; c++) {
      if (r === c) { row.push(0); continue }
      // Block-diagonal structure with some noise — mimics real RDMs
      const blockR = Math.floor(r / 3)
      const blockC = Math.floor(c / 3)
      const sameBlock = blockR === blockC ? 0 : 1
      const noise = ((r * 7 + c * 13 + seed * 31) % 100) / 300
      row.push(Math.min(1, sameBlock * 0.6 + noise + pattern * 0.1))
    }
    m.push(row)
  }
  return m
}

const MATRIX_1 = makeMatrix(1, 0)
const MATRIX_2 = makeMatrix(3, 1.5)

function colorForValue(v) {
  // White (low dissimilarity) → indigo → dark red (high dissimilarity)
  const r = Math.round(10 + v * 200)
  const g = Math.round(10 + v * 30)
  const b = Math.round(30 + (1 - v) * 180)
  return `rgb(${r},${g},${b})`
}

function RdmGrid({ matrix, label, delay = 0 }) {
  const cells = GRID_SIZE * GRID_SIZE
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest font-semibold mb-2 text-center"
        style={{ color: 'var(--muted)' }}>
        {label}
      </p>
      <div
        className="rounded-lg overflow-hidden"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gap: '1px',
          backgroundColor: 'var(--border)',
        }}
      >
        {matrix.flat().map((val, i) => (
          <motion.div
            key={i}
            style={{ aspectRatio: '1', backgroundColor: colorForValue(val) }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.04, delay: delay + i * (0.6 / cells) }}
          />
        ))}
      </div>
    </div>
  )
}

export default function RdmViz() {
  return (
    <div className="w-full">
      <p className="text-xs uppercase tracking-widest font-semibold mb-6 text-center"
        style={{ color: 'var(--muted)' }}>
        Representational Dissimilarity Matrices
      </p>

      {/* Step 1: Two RDMs */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <RdmGrid matrix={MATRIX_1} label="Model A · RDM" delay={0.1} />
        <RdmGrid matrix={MATRIX_2} label="Model B · RDM" delay={0.8} />
      </div>

      {/* Arrow → RSA score */}
      <motion.div
        className="flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.5 }}
      >
        <div className="flex items-center gap-4 w-full">
          <div className="flex-1 h-[1px]" style={{ backgroundColor: 'var(--border)' }} />
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L10 18M10 18L4 12M10 18L16 12"
                stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
          <div className="flex-1 h-[1px]" style={{ backgroundColor: 'var(--border)' }} />
        </div>

        <div className="rounded-xl px-6 py-4 text-center w-full"
          style={{ backgroundColor: 'var(--elevated)', border: '1px solid var(--border)' }}>
          <p className="text-[10px] uppercase tracking-widest font-semibold mb-2"
            style={{ color: 'var(--muted)' }}>
            RSA Similarity Score
          </p>
          <div className="flex justify-center gap-6">
            {[
              { label: 'Cosine', value: '0.757', color: METRIC_COLORS.cosine },
              { label: "Kendall's τ", value: '0.986', color: METRIC_COLORS.tau },
              { label: 'Pearson', value: '0.927', color: METRIC_COLORS.pearson },
            ].map(m => (
              <motion.div key={m.label} className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.9, duration: 0.4 }}>
                <p className="text-xl font-black" style={{ color: m.color }}>{m.value}</p>
                <p className="text-[9px] mt-0.5" style={{ color: 'var(--muted)' }}>{m.label}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-[10px] mt-3" style={{ color: 'var(--muted)' }}>
            CatBoost vs Random Forest · Heart Disease dataset
          </p>
        </div>
      </motion.div>

      {/* Legend */}
      <motion.div
        className="flex items-center justify-between mt-4 px-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <span className="text-[9px]" style={{ color: 'var(--muted)' }}>Very similar</span>
        <div className="flex-1 mx-3 h-2 rounded"
          style={{
            background: 'linear-gradient(to right, rgb(10,10,190), rgb(120,20,40), rgb(210,40,30))',
          }} />
        <span className="text-[9px]" style={{ color: 'var(--muted)' }}>Very different</span>
      </motion.div>
    </div>
  )
}
