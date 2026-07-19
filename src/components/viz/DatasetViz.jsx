import { motion } from 'framer-motion'
import { datasets } from '../../data'

function formatObs(n) {
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + 'k'
  return n.toString()
}

export default function DatasetViz() {
  return (
    <div className="w-full">
      <p className="text-xs uppercase tracking-widest font-semibold mb-5"
        style={{ color: 'var(--muted)' }}>
        Study datasets · Table 1
      </p>
      <div className="grid grid-cols-2 gap-3">
        {datasets.map((ds, i) => (
          <motion.div
            key={ds.id}
            className="rounded-xl p-4 relative overflow-hidden"
            style={{
              backgroundColor: 'var(--elevated)',
              border: '1px solid var(--border)',
            }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Colored top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl"
              style={{ backgroundColor: ds.color }} />

            {/* Dataset ID badge */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded"
                style={{
                  backgroundColor: ds.color + '22',
                  color: ds.color,
                  border: `1px solid ${ds.color}44`,
                }}>
                {ds.id}
              </span>
              <span className="text-xl" role="img" aria-hidden>{ds.icon}</span>
            </div>

            <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--text)' }}>
              {ds.name}
            </h3>
            <p className="text-[10px] mb-3" style={{ color: 'var(--muted)' }}>
              {ds.task}
            </p>

            {/* Stats */}
            <div className="space-y-1.5">
              <Stat label="Observations" value={formatObs(ds.obs)} color={ds.color} />
              <Stat label="Features" value={ds.features ?? 'Images'} color={ds.color} />
              <Stat label="Data type" value={ds.dataType} color={ds.color} />
              <Stat label="Best model" value={ds.bestModel} color={ds.color} />
              <Stat label="Performance" value={ds.bestMetric} color={ds.color} highlight />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="text-[10px] mt-4 text-center"
        style={{ color: 'var(--muted)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        All datasets are publicly available and well-established in the ML community.
      </motion.p>
    </div>
  )
}

function Stat({ label, value, color, highlight }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-[10px]" style={{ color: 'var(--muted)' }}>{label}</span>
      <span
        className="text-[10px] font-semibold"
        style={{ color: highlight ? color : 'var(--text)' }}
      >
        {value}
      </span>
    </div>
  )
}
