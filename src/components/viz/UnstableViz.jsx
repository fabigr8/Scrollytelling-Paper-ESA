import { motion } from 'framer-motion'

// Qualitative data drawn from paper's Figure 4 description:
// Four models (nuSVC, MLP, RF, CatBoost) explain the same heart-disease observation.
// Key documented differences: RF omits negative cholesterol; nuSVC + MLP show age as positive.
// Values are illustrative representations of the described Figure 4 patterns.
const MODELS = [
  {
    name: 'nuSVC',
    color: '#4F72FF',
    features: [
      { name: 'max heart rate', value: 0.31 },
      { name: 'age', value: 0.22 },
      { name: 'chest pain type', value: 0.18 },
      { name: 'exercise angina', value: 0.14 },
      { name: 'num vessels', value: -0.12 },
      { name: 'cholesterol', value: -0.19 },
      { name: 'thalassemia', value: -0.28 },
    ],
  },
  {
    name: 'MLP',
    color: '#00D4FF',
    features: [
      { name: 'max heart rate', value: 0.00 },
      { name: 'age', value: 0.18 },
      { name: 'chest pain type', value: 0.24 },
      { name: 'exercise angina', value: 0.11 },
      { name: 'num vessels', value: -0.08 },
      { name: 'cholesterol', value: -0.14 },
      { name: 'thalassemia', value: -0.31 },
    ],
  },
  {
    name: 'Random Forest',
    color: '#F59E0B',
    features: [
      { name: 'max heart rate', value: 0.28 },
      { name: 'age', value: -0.05 },
      { name: 'chest pain type', value: 0.20 },
      { name: 'exercise angina', value: 0.16 },
      { name: 'num vessels', value: -0.15 },
      { name: 'cholesterol', value: 0.00 },   // RF omits negative cholesterol (documented)
      { name: 'thalassemia', value: -0.22 },
    ],
  },
  {
    name: 'CatBoost',
    color: '#A78BFA',
    features: [
      { name: 'max heart rate', value: 0.25 },
      { name: 'age', value: -0.08 },
      { name: 'chest pain type', value: 0.19 },
      { name: 'exercise angina', value: 0.12 },
      { name: 'num vessels', value: -0.18 },
      { name: 'cholesterol', value: -0.16 },
      { name: 'thalassemia', value: -0.24 },
    ],
  },
]

const MAX_VAL = 0.35

export default function UnstableViz() {
  return (
    <div className="w-full space-y-3">
      <p className="text-xs uppercase tracking-widest font-semibold mb-4"
        style={{ color: 'var(--muted)' }}>
        Same patient · Four explanations
      </p>

      {MODELS.map((model, mi) => (
        <motion.div
          key={model.name}
          className="rounded-xl p-4"
          style={{ backgroundColor: 'var(--elevated)', border: '1px solid var(--border)' }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: mi * 0.1 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: model.color }} />
            <span className="text-xs font-semibold" style={{ color: model.color }}>
              {model.name}
            </span>
          </div>

          <div className="space-y-1.5">
            {model.features.map((feat, fi) => (
              <div key={feat.name} className="flex items-center gap-2">
                <span className="text-[10px] w-24 text-right flex-shrink-0 truncate"
                  style={{ color: 'var(--muted)' }}>
                  {feat.name}
                </span>
                {/* Center line */}
                <div className="flex-1 relative h-4 flex items-center">
                  <div className="absolute left-1/2 top-0 bottom-0 w-[1px]"
                    style={{ backgroundColor: 'var(--border)' }} />

                  {feat.value !== 0 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: 0.6,
                        delay: mi * 0.1 + fi * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{
                        backgroundColor: feat.value > 0 ? model.color : '#F87171',
                        opacity: 0.85,
                        position: 'absolute',
                        height: '12px',
                        borderRadius: '2px',
                        transformOrigin: feat.value > 0 ? 'left' : 'right',
                        ...(feat.value > 0
                          ? { left: '50%', width: `${Math.abs(feat.value) / MAX_VAL * 48}%` }
                          : { right: '50%', width: `${Math.abs(feat.value) / MAX_VAL * 48}%` }
                        ),
                      }}
                    />
                  )}

                  {/* Highlight "cholesterol" for RF — the documented anomaly */}
                  {feat.name === 'cholesterol' && feat.value === 0 && model.name === 'Random Forest' && (
                    <span className="absolute left-1/2 ml-1 text-[9px]"
                      style={{ color: '#F59E0B' }}>
                      ← none
                    </span>
                  )}
                </div>

                <span className="text-[9px] w-8 tabular-nums flex-shrink-0"
                  style={{ color: feat.value > 0 ? model.color : feat.value < 0 ? '#F87171' : 'var(--muted)' }}>
                  {feat.value > 0 ? '+' : ''}{feat.value.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      <div className="flex justify-between text-[10px] pt-1"
        style={{ color: 'var(--muted)' }}>
        <span>← Pushes toward healthy</span>
        <span>Pushes toward disease →</span>
      </div>
    </div>
  )
}
