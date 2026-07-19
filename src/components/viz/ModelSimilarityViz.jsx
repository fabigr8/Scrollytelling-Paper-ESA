import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, Cell, ResponsiveContainer, Legend,
} from 'recharts'
import { modelSimilarity, DATASET_COLORS, METRIC_COLORS } from '../../data'

const ANOMALY_PAIR = 'MLP vs RF'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg px-3 py-2 text-xs"
      style={{
        backgroundColor: 'var(--elevated)',
        border: '1px solid var(--border)',
        color: 'var(--text)',
      }}>
      <p className="font-semibold mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.fill }}>
          {p.name}: {p.value.toFixed(3)}
        </p>
      ))}
    </div>
  )
}

const METRICS = [
  { key: 'cosine',  label: 'Cosine',      color: METRIC_COLORS.cosine },
  { key: 'tau',     label: "Kendall's τ", color: METRIC_COLORS.tau },
  { key: 'pearson', label: 'Pearson',     color: METRIC_COLORS.pearson },
]

export default function ModelSimilarityViz() {
  const data = modelSimilarity.map(d => ({
    ...d,
    label: d.pair,
    isAnomaly: d.pair === ANOMALY_PAIR,
    datasetColor: DATASET_COLORS[d.dataset],
  }))

  // Only the datasets actually shown in this chart (DS4/COVID CXR isn't part of Table 3)
  const datasetsShown = [...new Set(data.map(d => d.dataset))]

  return (
    <div className="w-full">
      <p className="text-xs uppercase tracking-widest font-semibold mb-1"
        style={{ color: 'var(--muted)' }}>
        Explanation similarity by model pair · Table 3
      </p>

      {/* Two separate legends: dot color = dataset, bar color = metric */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mb-4">
        <span className="text-[9px] uppercase tracking-wider font-semibold" style={{ color: 'var(--muted)' }}>
          Dataset
        </span>
        {datasetsShown.map(ds => (
          <div key={ds} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: DATASET_COLORS[ds] }} />
            <span className="text-[10px]" style={{ color: 'var(--muted)' }}>{ds}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mb-4 pb-3"
        style={{ borderBottom: '1px solid var(--border)' }}>
        <span className="text-[9px] uppercase tracking-wider font-semibold" style={{ color: 'var(--muted)' }}>
          Metric
        </span>
        {METRICS.map(m => (
          <div key={m.key} className="flex items-center gap-1.5">
            <div className="w-4 h-[3px] rounded-full" style={{ backgroundColor: m.color }} />
            <span className="text-[10px]" style={{ color: 'var(--muted)' }}>{m.label}</span>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="space-y-3">
        {data.map((row, i) => (
          <motion.div
            key={row.pair + row.dataset}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            {/* Dataset separator */}
            {i > 0 && data[i - 1].dataset !== row.dataset && (
              <div className="h-[1px] my-2" style={{ backgroundColor: 'var(--border)' }} />
            )}

            <div className={`rounded-lg px-3 py-2 ${row.isAnomaly ? 'ring-1' : ''}`}
              style={{
                backgroundColor: row.isAnomaly ? '#F8717111' : 'var(--elevated)',
                ringColor: row.isAnomaly ? 'var(--danger)' : 'transparent',
                border: row.isAnomaly ? '1px solid #F8717155' : '1px solid var(--border)',
              }}>

              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: row.datasetColor }} />
                  <span className="text-[11px] font-semibold" style={{ color: 'var(--text)' }}>
                    {row.pair}
                  </span>
                  {row.isAnomaly && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-bold"
                      style={{ backgroundColor: '#F8717122', color: 'var(--danger)' }}>
                      ANOMALY
                    </span>
                  )}
                </div>
                <span className="text-[10px]" style={{ color: 'var(--muted)' }}>
                  {row.dataset}
                </span>
              </div>

              <div className="space-y-1.5">
                {METRICS.map(m => (
                  <div key={m.key} className="flex items-center gap-2">
                    <span className="text-[9px] w-14 flex-shrink-0" style={{ color: 'var(--muted)' }}>
                      {m.label}
                    </span>
                    <div className="flex-1 relative h-3 rounded overflow-hidden"
                      style={{ backgroundColor: 'var(--surface)' }}>
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 rounded"
                        style={{ backgroundColor: m.color, opacity: 0.85 }}
                        initial={{ width: 0 }}
                        animate={{ width: `${row[m.key] * 100}%` }}
                        transition={{ duration: 0.7, delay: i * 0.06 + 0.2, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                    <span className="text-[9px] w-8 text-right font-mono tabular-nums"
                      style={{ color: m.color }}>
                      {row[m.key].toFixed(3)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="text-[10px] mt-3"
        style={{ color: 'var(--muted)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        MLP vs Random Forest on Jannis: cosine = 0.022 — near-zero alignment.
      </motion.p>
    </div>
  )
}
