import { motion } from 'framer-motion'
import {
  Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Area, ComposedChart, Legend,
} from 'recharts'
import { featureReduction, METRIC_COLORS } from '../../data'

const MEASURES = [
  { key: 'tau',     label: "Kendall's τ", color: METRIC_COLORS.tau,     dashed: false },
  { key: 'pearson', label: 'Pearson',     color: METRIC_COLORS.pearson, dashed: true  },
  { key: 'cosine',  label: 'Cosine',      color: METRIC_COLORS.cosine,  dashed: true  },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg px-3 py-2 text-xs"
      style={{ backgroundColor: 'var(--elevated)', border: '1px solid var(--border)', color: 'var(--text)' }}>
      <p className="font-semibold mb-1">Features removed: {label}</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.stroke || p.fill }}>
          {p.name}: {Number(p.value).toFixed(3)}
        </p>
      ))}
    </div>
  )
}

const CustomDot = ({ cx, cy, index, dataKey }) => {
  if (dataKey !== 'tau') return null
  return (
    <circle cx={cx} cy={cy} r={4}
      fill={METRIC_COLORS.tau} stroke="var(--bg)" strokeWidth={2} />
  )
}

// Drop (%) from the full-feature baseline (removed=0) to 8 features removed,
// for each of the three similarity measures.
function dropPct(key) {
  const last = featureReduction[featureReduction.length - 1]
  return Math.round((1 - last[key]) * 100)
}

export default function FeatureViz() {

  return (
    <div className="w-full">
      <p className="text-xs uppercase tracking-widest font-semibold mb-1"
        style={{ color: 'var(--muted)' }}>
        Similarity as features are removed · Figure 8 · CatBoost on DS2
      </p>
      <p className="text-[10px] mb-4" style={{ color: 'var(--muted)' }}>
        Starting from the full feature set, features are removed one by one
        (least important first). All three similarity measures decline.
      </p>

      <motion.div
        className="rounded-xl p-4"
        style={{ backgroundColor: 'var(--elevated)', border: '1px solid var(--border)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={featureReduction} margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
            <defs>
              <linearGradient id="tauGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={METRIC_COLORS.tau} stopOpacity={0.25} />
                <stop offset="95%" stopColor={METRIC_COLORS.tau} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E2A45" />
            <XAxis
              dataKey="removed"
              label={{ value: 'Features removed', position: 'insideBottom', offset: -12, fontSize: 10, fill: '#64748B' }}
              tick={{ fontSize: 10, fill: '#64748B' }}
            />
            <YAxis
              domain={[0.80, 1.01]}
              tick={{ fontSize: 10, fill: '#64748B' }}
              tickFormatter={v => v.toFixed(2)}
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Tau gradient fill */}
            <Area
              type="monotone"
              dataKey="tau"
              stroke={METRIC_COLORS.tau}
              strokeWidth={2.5}
              fill="url(#tauGrad)"
              dot={<CustomDot dataKey="tau" />}
              name="Kendall's τ"
            />
            <Line
              type="monotone"
              dataKey="pearson"
              stroke={METRIC_COLORS.pearson}
              strokeWidth={2}
              strokeDasharray="6 3"
              dot={false}
              name="Pearson"
            />
            <Line
              type="monotone"
              dataKey="cosine"
              stroke={METRIC_COLORS.cosine}
              strokeWidth={2}
              strokeDasharray="6 3"
              dot={false}
              name="Cosine"
            />

            <ReferenceLine y={0.90}
              stroke="var(--danger)" strokeDasharray="4 2" strokeWidth={1}
              label={{ value: 'τ < 0.90 threshold', position: 'right', fontSize: 9, fill: 'var(--danger)' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Legend */}
      <div className="flex gap-5 justify-center mt-3">
        {MEASURES.map(m => (
          <div key={m.key} className="flex items-center gap-1.5">
            <div className="w-4 h-[2px] rounded"
              style={{
                backgroundColor: m.color,
                backgroundImage: m.dashed ? `repeating-linear-gradient(to right, ${m.color} 0, ${m.color} 4px, transparent 4px, transparent 7px)` : 'none',
              }}
            />
            <span className="text-[10px]" style={{ color: 'var(--muted)' }}>{m.label}</span>
          </div>
        ))}
      </div>

      {/* Callout — one box per measure, so none of the three go unreported */}
      <motion.div
        className="mt-4 grid grid-cols-3 gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {[
          { key: 'tau',     note: 'drops fastest — rank order shifts most' },
          { key: 'pearson', note: 'drops moderately' },
          { key: 'cosine',  note: 'most robust — pattern holds' },
        ].map(({ key, note }) => {
          const m = MEASURES.find(mm => mm.key === key)
          return (
            <div key={key} className="rounded-lg p-2.5 text-center"
              style={{ backgroundColor: `${m.color}18`, border: `1px solid ${m.color}44` }}>
              <p className="text-xl font-black" style={{ color: m.color }}>−{dropPct(key)}%</p>
              <p className="text-[9px] mt-1 leading-snug" style={{ color: 'var(--muted)' }}>
                {m.label}<br />{note}
              </p>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}
