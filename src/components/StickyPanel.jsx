import { motion } from 'framer-motion'
import UnstableViz from './viz/UnstableViz'
import RdmViz from './viz/RdmViz'
import DatasetViz from './viz/DatasetViz'
import ModelSimilarityViz from './viz/ModelSimilarityViz'
import PreprocessingViz from './viz/PreprocessingViz'
import FeatureViz from './viz/FeatureViz'
import TransferViz from './viz/TransferViz'
import ConclusionViz from './viz/ConclusionViz'

const VIZ_MAP = {
  problem: UnstableViz,
  neuroscience: RdmViz,
  study: DatasetViz,
  models: ModelSimilarityViz,
  preprocessing: PreprocessingViz,
  features: FeatureViz,
  transfer: TransferViz,
  conclusion: ConclusionViz,
}

const PANEL_VARIANTS = {
  initial: { opacity: 0, scale: 0.96, y: 16 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit:    { opacity: 0, scale: 0.96, y: -16 },
}

export default function StickyPanel({ activeSectionId }) {
  const VizComponent = VIZ_MAP[activeSectionId]

  if (!VizComponent) return null

  return (
    <motion.div
      className="w-full h-full flex items-center justify-center p-6 lg:p-10"
      variants={PANEL_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="w-full max-w-2xl">
        <VizComponent />
      </div>
    </motion.div>
  )
}
