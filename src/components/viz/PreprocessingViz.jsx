import { motion } from 'framer-motion'
import {
  preprocessingScalersGB, preprocessingScalersCatB,
  preprocessingEncodersGB, preprocessingEncodersCatB,
  METRIC_COLORS,
} from '../../data'

// Shared 0.80–1.00 scale for every τ range-bar (same domain as the Figure 8
// slide), so a near-full bar always means "near 1.0" and bar length is
// directly comparable across GB and CatBoost panels.
const DOMAIN = [0.80, 1.00]
const span = DOMAIN[1] - DOMAIN[0]
const toPct = (v) => Math.max(0, Math.min(100, ((v - DOMAIN[0]) / span) * 100))

function TauRangeBar({ tau, tauLow, tauHigh, delay }) {
  return (
    <div className="flex-1 relative h-2.5 rounded overflow-hidden" style={{ backgroundColor: 'var(--surface)' }}>
      {/* whisker range (min–max across k-folds, excluding fliers) */}
      <motion.div
        className="absolute top-0 bottom-0 rounded"
        style={{
          left: `${toPct(tauLow)}%`,
          width: `${toPct(tauHigh) - toPct(tauLow)}%`,
          backgroundColor: METRIC_COLORS.tau,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 0.4, delay }}
      />
      {/* median tick */}
      <motion.div
        className="absolute top-0 bottom-0 w-[2px]"
        style={{ backgroundColor: METRIC_COLORS.tau }}
        initial={{ left: 0, opacity: 0 }}
        animate={{ left: `${toPct(tau)}%`, opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}

function ComparisonRow({ row, delay }) {
  return (
    <div className="mb-2 last:mb-0">
      <p className="text-[8px] mb-1" style={{ color: 'var(--muted)' }}>{row.comparison}</p>
      <div className="flex items-center gap-2">
        <TauRangeBar tau={row.tau} tauLow={row.tauLow} tauHigh={row.tauHigh} delay={delay} />
        <span className="text-[8px] w-9 text-right font-mono tabular-nums" style={{ color: METRIC_COLORS.tau }}>
          {row.tau.toFixed(2)}
        </span>
        <span className="text-[8px] w-9 text-right font-mono tabular-nums" style={{ color: METRIC_COLORS.cosine }}>
          {row.cosine.toFixed(2)}
        </span>
        <span className="text-[8px] w-9 text-right font-mono tabular-nums" style={{ color: METRIC_COLORS.pearson }}>
          {row.pearson.toFixed(2)}
        </span>
      </div>
    </div>
  )
}

function ModelColumn({ title, data, delayBase }) {
  return (
    <div className="flex-1 min-w-0">
      <p className="text-[9px] font-semibold mb-2" style={{ color: 'var(--text)' }}>{title}</p>
      {data.map((row, i) => (
        <ComparisonRow key={row.comparison} row={row} delay={delayBase + i * 0.08} />
      ))}
    </div>
  )
}

function Section({ title, gbData, catbData, delayBase, note }) {
  return (
    <motion.div
      className="rounded-xl p-3 mb-3"
      style={{ backgroundColor: 'var(--elevated)', border: '1px solid var(--border)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: delayBase }}
    >
      <p className="text-[10px] font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--muted)' }}>
        {title}
      </p>
      <div className="flex gap-4">
        <ModelColumn title="GB" data={gbData} delayBase={delayBase + 0.1} />
        <div className="w-px self-stretch" style={{ backgroundColor: 'var(--border)' }} />
        <ModelColumn title="CatBoost" data={catbData} delayBase={delayBase + 0.2} />
      </div>
      {note && (
        <p className="text-[9px] mt-3 pt-2" style={{ color: 'var(--muted)', borderTop: '1px solid var(--border)' }}>
          {note}
        </p>
      )}
    </motion.div>
  )
}

export default function PreprocessingViz() {
  return (
    <div className="w-full">
      <p className="text-xs uppercase tracking-widest font-semibold mb-1"
        style={{ color: 'var(--muted)' }}>
        Explanation similarity under preprocessing changes · Figure 7
      </p>
      <p className="text-[10px] mb-4" style={{ color: 'var(--muted)' }}>
        Bar + tick = Kendall's τ (median, whisker range) · numbers = τ · cosine · Pearson
      </p>

      {/* Legend */}
      <div className="flex gap-4 mb-3">
        {[
          { key: 'tau',     label: "Kendall's τ" },
          { key: 'cosine',  label: 'Cosine' },
          { key: 'pearson', label: 'Pearson' },
        ].map(m => (
          <div key={m.key} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: METRIC_COLORS[m.key] }} />
            <span className="text-[9px]" style={{ color: 'var(--muted)' }}>{m.label}</span>
          </div>
        ))}
      </div>

      <Section
        title="Numerical scalers"
        gbData={preprocessingScalersGB}
        catbData={preprocessingScalersCatB}
        delayBase={0}
        note="CatBoost is essentially scale-invariant (τ ≥ 0.9998); GB shows a real but modest dip whenever Standard Scaling is involved."
      />
      <Section
        title="Categorical encoders"
        gbData={preprocessingEncodersGB}
        catbData={preprocessingEncodersCatB}
        delayBase={0.2}
        note="Label encoding is the sensitive case for both models — τ drops to ~0.86–0.88 since tree models read its integers as a false ordering. Cosine & Pearson barely move (≥ 0.97)."
      />
    </div>
  )
}
