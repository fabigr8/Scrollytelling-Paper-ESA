import { motion } from 'framer-motion'

const PIPELINE_STEPS = [
  { id: 'data',       label: 'Data',        sub: 'Raw observations', icon: '⊞', color: '#4F72FF' },
  { id: 'model',      label: 'ML Model',    sub: 'Train & tune',     icon: '⬡', color: '#8B6FFF' },
  { id: 'explainer',  label: 'Explainer',   sub: 'SHAP / LIME',      icon: '◎', color: '#00D4FF' },
  { id: 'explanation',label: 'Explanation', sub: 'Feature attrs.',   icon: '≡', color: '#22D3EE' },
  { id: 'rsa',        label: 'RSA Monitor', sub: 'Drift detection',  icon: '⊛', color: '#F59E0B', highlight: true },
]

const FINDINGS = [
  { label: 'Model choice',    impact: 'Very High', color: '#F87171', width: 92 },
  { label: 'Transfer learning', impact: 'Very High', color: '#F87171', width: 88 },
  { label: 'Feature reduction', impact: 'Moderate', color: '#F59E0B', width: 62 },
  { label: 'Preprocessing',   impact: 'Low',       color: '#4F72FF', width: 28 },
]

export default function ConclusionViz() {
  return (
    <div className="w-full space-y-5">
      <p className="text-xs uppercase tracking-widest font-semibold"
        style={{ color: 'var(--muted)' }}>
        The RSA pipeline · Explanation drift monitoring
      </p>

      {/* ML Pipeline diagram */}
      <motion.div
        className="rounded-xl p-5"
        style={{ backgroundColor: 'var(--elevated)', border: '1px solid var(--border)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          {PIPELINE_STEPS.map((step, i) => (
            <div key={step.id} className="flex items-center">
              {/* Step node */}
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                {/* Icon circle */}
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-1.5 text-base relative"
                  style={{
                    backgroundColor: step.color + '22',
                    border: `1.5px solid ${step.color}`,
                    color: step.color,
                  }}
                  animate={step.highlight ? {
                    boxShadow: [
                      `0 0 0px ${step.color}00`,
                      `0 0 16px ${step.color}88`,
                      `0 0 0px ${step.color}00`,
                    ],
                  } : {}}
                  transition={step.highlight ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
                >
                  {step.icon}
                  {step.highlight && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                      style={{ backgroundColor: step.color }}
                      animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                <span className="text-[9px] font-bold text-center"
                  style={{ color: step.highlight ? step.color : 'var(--text)', maxWidth: 52 }}>
                  {step.label}
                </span>
                <span className="text-[8px] text-center"
                  style={{ color: 'var(--muted)', maxWidth: 52 }}>
                  {step.sub}
                </span>
              </motion.div>

              {/* Connector arrow */}
              {i < PIPELINE_STEPS.length - 1 && (
                <motion.div
                  className="flex-1 flex items-center mx-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.12 + 0.3 }}
                >
                  <div className="flex-1 h-[1px]" style={{ backgroundColor: 'var(--border)' }} />
                  <svg width="8" height="8" viewBox="0 0 8 8">
                    <path d="M0 4H6M6 4L3 1.5M6 4L3 6.5"
                      stroke="var(--border)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Findings impact summary */}
      <motion.div
        className="rounded-xl p-5"
        style={{ backgroundColor: 'var(--elevated)', border: '1px solid var(--border)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <p className="text-[10px] uppercase tracking-widest font-semibold mb-4"
          style={{ color: 'var(--muted)' }}>
          Explanation drift impact by pipeline component
        </p>
        <div className="space-y-3">
          {FINDINGS.map((f, i) => (
            <div key={f.label}>
              <div className="flex justify-between text-[10px] mb-1">
                <span style={{ color: 'var(--text)' }}>{f.label}</span>
                <span className="font-semibold" style={{ color: f.color }}>{f.impact}</span>
              </div>
              <div className="h-3 rounded overflow-hidden" style={{ backgroundColor: 'var(--surface)' }}>
                <motion.div
                  className="h-full rounded"
                  style={{ backgroundColor: f.color, opacity: 0.8 }}
                  initial={{ width: 0 }}
                  animate={{ width: `${f.width}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 + 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Drift meter */}
      <motion.div
        className="rounded-xl p-5 text-center"
        style={{
          background: 'linear-gradient(135deg, #06080F, #0E1220)',
          border: '1px solid var(--border)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <p className="text-[10px] uppercase tracking-widest font-semibold mb-3"
          style={{ color: 'var(--muted)' }}>
          Explanation drift is now measurable
        </p>
        <div className="relative h-3 rounded-full overflow-hidden mb-2"
          style={{ backgroundColor: 'var(--surface)' }}>
          <div className="absolute inset-0 rounded-full"
            style={{ background: 'linear-gradient(to right, #22C55E, #F59E0B, #F87171)' }} />
          <motion.div
            className="absolute top-0 right-0 bottom-0 rounded-r-full"
            style={{ backgroundColor: 'var(--surface)' }}
            initial={{ width: '100%' }}
            animate={{ width: '25%' }}
            transition={{ duration: 1.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <div className="flex justify-between text-[9px]" style={{ color: 'var(--muted)' }}>
          <span>Stable</span>
          <span>Moderate drift</span>
          <span>Drifted</span>
        </div>
        <p className="text-sm font-bold mt-3"
          style={{
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
          Set your threshold. Monitor. Trust.
        </p>
      </motion.div>
    </div>
  )
}
