import { motion } from 'framer-motion'
import { transferPreVsPost, transferInterModel, METRIC_COLORS } from '../../data'

// LIME / SHAP identity in panel 2 — one accent hue at two lightness steps
// (not a full second categorical palette), since the explainer is already
// named directly next to each bar. Kept distinct from METRIC_COLORS, which
// panel 1 uses right above it.
const EXPLAINER_ACCENT = '#C2831F'
const EXPLAINER_COLORS = { LIME: EXPLAINER_ACCENT + '99', SHAP: EXPLAINER_ACCENT }

// Shared scale for the "τ & Pearson" range bars, wide enough to fit the
// negative end of the reported range.
const RANGE_DOMAIN = [-0.2, 1.0]
const domainSpan = RANGE_DOMAIN[1] - RANGE_DOMAIN[0]
const toPct = (v) => ((v - RANGE_DOMAIN[0]) / domainSpan) * 100
const zeroPct = toPct(0)

function CosineBar({ value, delay }) {
  return (
    <div className="flex-1 relative h-3 rounded overflow-hidden" style={{ backgroundColor: 'var(--surface)' }}>
      <motion.div
        className="absolute left-0 top-0 bottom-0 rounded"
        style={{ backgroundColor: METRIC_COLORS.cosine, opacity: 0.85 }}
        initial={{ width: 0 }}
        animate={{ width: `${value * 100}%` }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}

function RangeBar({ range, delay }) {
  const [lo, hi] = range
  return (
    <div className="flex-1 relative h-3 rounded overflow-hidden" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="absolute top-0 bottom-0 w-px" style={{ left: `${zeroPct}%`, backgroundColor: 'var(--border)' }} />
      <motion.div
        className="absolute top-0 bottom-0 rounded"
        style={{ left: `${toPct(lo)}%`, width: `${toPct(hi) - toPct(lo)}%`, backgroundColor: METRIC_COLORS.tau }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        transition={{ duration: 0.5, delay }}
      />
    </div>
  )
}

export default function TransferViz() {
  return (
    <div className="w-full space-y-5">
      <p className="text-xs uppercase tracking-widest font-semibold"
        style={{ color: 'var(--muted)' }}>
        Transfer learning · Image data (DS4) · §5.5
      </p>

      {/* Panel 1: Pre-training vs post-fine-tuning, per explainer */}
      <motion.div
        className="rounded-xl p-4"
        style={{ backgroundColor: 'var(--elevated)', border: '1px solid var(--border)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-[10px] uppercase tracking-wider font-semibold mb-1"
          style={{ color: 'var(--muted)' }}>
          Pre-training vs. fine-tuned similarity · Fig. 9(a)
        </p>
        <p className="text-[10px] mb-3" style={{ color: 'var(--muted)' }}>
          MobileNetV2 &amp; ResNet50, pooled — same model, same explainer, compared
          before vs. after fine-tuning on COVID CXR data.
        </p>

        {/* Before → after schematic, so the comparison being made is explicit */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[9px] px-2 py-1 rounded flex-1 text-center"
            style={{ backgroundColor: 'var(--surface)', color: 'var(--muted)' }}>
            Pre-trained · ImageNet
          </span>
          <svg width="18" height="10" viewBox="0 0 18 10" className="flex-shrink-0">
            <path d="M0 5H14M14 5L9 1M14 5L9 9" stroke="var(--muted)" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
          <span className="text-[9px] px-2 py-1 rounded flex-1 text-center"
            style={{ backgroundColor: 'var(--surface)', color: 'var(--muted)' }}>
            Fine-tuned · COVID CXR
          </span>
        </div>

        <div className="space-y-3">
          {transferPreVsPost.map((row, i) => (
            <div key={row.explainer} className="rounded-lg p-2.5"
              style={{ border: '1px solid var(--border)' }}>
              <p className="text-[11px] font-semibold mb-2" style={{ color: 'var(--text)' }}>
                {row.explainer}
              </p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] w-20 flex-shrink-0" style={{ color: 'var(--muted)' }}>
                    Cosine
                  </span>
                  <CosineBar value={row.cosine} delay={i * 0.15 + 0.2} />
                  <span className="text-[9px] w-16 text-right font-mono tabular-nums"
                    style={{ color: METRIC_COLORS.cosine }}>
                    {row.cosine.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] w-20 flex-shrink-0" style={{ color: 'var(--muted)' }}>
                    τ &amp; Pearson
                  </span>
                  <RangeBar range={row.tauPearsonRange} delay={i * 0.15 + 0.35} />
                  <span className="text-[9px] w-16 text-right font-mono tabular-nums"
                    style={{ color: METRIC_COLORS.tau }}>
                    {row.tauPearsonRange[0].toFixed(2)}–{row.tauPearsonRange[1].toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <motion.div
          className="mt-3 p-2 rounded text-center"
          style={{ backgroundColor: '#F8717115', border: '1px solid #F8717140' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-[10px] font-semibold" style={{ color: 'var(--danger)' }}>
            Cosine (directional pattern) partly survives fine-tuning — τ and Pearson
            (rank order &amp; linear structure) collapse to ~0.
          </p>
        </motion.div>
      </motion.div>

      {/* Panel 2: Inter-model comparison */}
      <motion.div
        className="rounded-xl p-4"
        style={{ backgroundColor: 'var(--elevated)', border: '1px solid var(--border)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <p className="text-[10px] uppercase tracking-wider font-semibold mb-3"
          style={{ color: 'var(--muted)' }}>
          Inter-model similarity (after fine-tuning)
        </p>

        {transferInterModel.map((row, i) => {
          const highlight = row.limeMean >= 0.9
          return (
            <div key={row.pair} className={`mb-3 last:mb-0 p-2 rounded-lg ${highlight ? 'ring-1' : ''}`}
              style={{
                border: highlight ? '1px solid #00D4FF44' : '1px solid transparent',
                backgroundColor: highlight ? '#00D4FF08' : 'transparent',
              }}>
              <div className="flex items-center gap-2 mb-2">
                {highlight && (
                  <span className="text-[9px] px-1 py-0.5 rounded font-bold"
                    style={{ backgroundColor: '#00D4FF22', color: 'var(--accent)' }}>
                    HIGH KINSHIP
                  </span>
                )}
                <span className="text-[10px] font-semibold" style={{ color: 'var(--text)' }}>
                  {row.pair.replace('\n', ' ')}
                </span>
              </div>

              <div className="space-y-1.5">
                {[
                  { key: 'lime', label: 'LIME', color: EXPLAINER_COLORS.LIME, val: row.limeMean },
                  { key: 'shap', label: 'SHAP', color: EXPLAINER_COLORS.SHAP, val: row.shapMean },
                ].map(m => (
                  <div key={m.key} className="flex items-center gap-2">
                    <span className="text-[9px] w-8 flex-shrink-0" style={{ color: 'var(--muted)' }}>
                      {m.label}
                    </span>
                    <div className="flex-1 h-3 rounded overflow-hidden" style={{ backgroundColor: 'var(--surface)' }}>
                      <motion.div
                        className="h-full rounded"
                        style={{ backgroundColor: m.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${m.val * 100}%` }}
                        transition={{ duration: 0.7, delay: i * 0.1 + 0.5, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                    <span className="text-[9px] w-7 text-right font-mono" style={{ color: 'var(--text)' }}>
                      {m.val.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        <p className="text-[10px] mt-2" style={{ color: 'var(--muted)' }}>
          Shared ImageNet pretraining creates explanation kinship (≥ 0.92).<br />
          Custom CNN trained from scratch is an explanation outsider (≈ 0.33).
        </p>
      </motion.div>
    </div>
  )
}
