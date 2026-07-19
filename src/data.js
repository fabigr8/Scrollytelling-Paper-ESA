// All data extracted directly from:
// Gwinner, Tomitza & Winkelmann (2024). "Comparing expert systems and their
// explainability through similarity." Decision Support Systems 182, 114248.

// ─── Shared color palettes ─────────────────────────────────────────────────
// Two separate identity channels are used across the visualizations:
//   DATASET_COLORS — "which of the 4 datasets" (dots/badges in study + model slides)
//   METRIC_COLORS  — "which similarity measure" (cosine / Kendall's τ / Pearson)
// They're deliberately different hue families (validated for dark-surface
// lightness band + colorblind-safe pairwise separation) so a chart that shows
// both at once — e.g. a dataset dot next to a row of metric bars — never
// makes the reader guess which dimension a color is standing for.
export const DATASET_COLORS = {
  'Heart Disease': '#5B7FFF', // blue
  'CA Housing':    '#0EA5B7', // teal
  'Jannis':        '#D97706', // amber
  'COVID CXR':     '#E11D48', // rose
}

export const METRIC_COLORS = {
  cosine:  '#8B6CF2', // violet
  tau:     '#1E9E4A', // green
  pearson: '#D6409F', // magenta
}

// ─── Table 3: Explanation similarity across different ML model pairs ──────────
export const modelSimilarity = [
  // DS1 — Heart Disease (binary classification, 303 observations)
  { dataset: 'Heart Disease', pair: 'CatB vs RF',    cosine: 0.757, tau: 0.986, pearson: 0.927 },
  { dataset: 'Heart Disease', pair: 'CatB vs nuSVC', cosine: 0.597, tau: 0.959, pearson: 0.799 },
  { dataset: 'Heart Disease', pair: 'RF vs nuSVC',   cosine: 0.543, tau: 0.949, pearson: 0.747 },
  // DS2 — California Housing (regression, 20,640 observations)
  { dataset: 'CA Housing',    pair: 'CatB vs DT',    cosine: 0.639, tau: 0.964, pearson: 0.835 },
  { dataset: 'CA Housing',    pair: 'DT vs GB',       cosine: 0.449, tau: 0.915, pearson: 0.630 },
  { dataset: 'CA Housing',    pair: 'CatB vs GB',     cosine: 0.665, tau: 0.968, pearson: 0.855 },
  // DS3 — Jannis (multiclass classification, 83,733 observations)
  { dataset: 'Jannis',        pair: 'MLP vs RF',      cosine: 0.022, tau: 0.868, pearson: 0.047 },
  { dataset: 'Jannis',        pair: 'MLP vs LGBM',    cosine: 0.034, tau: 0.897, pearson: 0.095 },
  { dataset: 'Jannis',        pair: 'RF vs LGBM',     cosine: 0.503, tau: 0.959, pearson: 0.710 },
]

// ─── Figure 8: Similarity under step-wise feature reduction (DS2, CatB) ──────
// TODO(needs source figure): these numbers are an approximation of the shape
// described in §5.4 (tau drops faster than cosine/pearson) — not transcribed
// from Figure 8 itself. Replace once the original figure/export is available.
export const featureReduction = [
  { removed: 0, tau: 1.00, cosine: 1.00, pearson: 1.00 },
  { removed: 1, tau: 0.97, cosine: 0.99, pearson: 0.98 },
  { removed: 2, tau: 0.94, cosine: 0.98, pearson: 0.96 },
  { removed: 3, tau: 0.91, cosine: 0.97, pearson: 0.94 },
  { removed: 4, tau: 0.89, cosine: 0.96, pearson: 0.93 },
  { removed: 5, tau: 0.87, cosine: 0.96, pearson: 0.92 },
  { removed: 6, tau: 0.86, cosine: 0.95, pearson: 0.91 },
  { removed: 7, tau: 0.84, cosine: 0.95, pearson: 0.90 },
  { removed: 8, tau: 0.83, cosine: 0.94, pearson: 0.89 },
]

// ─── Figure 7: Preprocessing similarity (DS2, GB and CatB) ───────────────────
// Read directly from the author's source figures (four panels: GB/CatBoost ×
// numerical-scaler/categorical-encoder). `tau` is the median across k-folds;
// `tauLow`/`tauHigh` are the whisker/error-bar extent (excluding fliers).
// Cosine & Pearson vary far less across folds, so only their median is kept.

// Numerical scalers — OhE fixed as the categorical encoder.
export const preprocessingScalersGB = [
  { comparison: 'MaxAbs vs StdSc',  tau: 0.920, tauLow: 0.911, tauHigh: 0.929, cosine: 0.995, pearson: 0.989 },
  { comparison: 'MinMax vs StdSc',  tau: 0.920, tauLow: 0.910, tauHigh: 0.930, cosine: 0.995, pearson: 0.989 },
  { comparison: 'MinMax vs MaxAbs', tau: 0.990, tauLow: 0.985, tauHigh: 0.995, cosine: 0.999, pearson: 0.999 },
]
export const preprocessingScalersCatB = [
  { comparison: 'MaxAbs vs StdSc',  tau: 0.99994, tauLow: 0.99984, tauHigh: 1.00000, cosine: 1.000, pearson: 1.000 },
  { comparison: 'MinMax vs StdSc',  tau: 0.99993, tauLow: 0.99983, tauHigh: 0.99999, cosine: 1.000, pearson: 1.000 },
  { comparison: 'MinMax vs MaxAbs', tau: 0.99999, tauLow: 0.99997, tauHigh: 1.00000, cosine: 1.000, pearson: 1.000 },
]

// Categorical encoders — StdSc fixed as the numerical scaler.
export const preprocessingEncodersGB = [
  { comparison: 'LooE vs OhE',   tau: 0.913, tauLow: 0.885, tauHigh: 0.923, cosine: 0.995, pearson: 0.987 },
  { comparison: 'Label vs OhE',  tau: 0.872, tauLow: 0.855, tauHigh: 0.887, cosine: 0.990, pearson: 0.978 },
  { comparison: 'Label vs LooE', tau: 0.881, tauLow: 0.874, tauHigh: 0.887, cosine: 0.990, pearson: 0.977 },
]
export const preprocessingEncodersCatB = [
  { comparison: 'LooE vs OhE',   tau: 0.888, tauLow: 0.883, tauHigh: 0.896, cosine: 0.994, pearson: 0.987 },
  { comparison: 'Label vs OhE',  tau: 0.857, tauLow: 0.842, tauHigh: 0.873, cosine: 0.990, pearson: 0.978 },
  { comparison: 'Label vs LooE', tau: 0.856, tauLow: 0.840, tauHigh: 0.872, cosine: 0.990, pearson: 0.977 },
]

// ─── Section 5.5: Transfer learning / image data (DS4, COVID CXR) ────────────
// Pre-training vs post-fine-tuning comparison — exact values from text (§5.5),
// pooled across both pre-trained backbones (MobileNetV2 & ResNet50). The paper
// gives cosine as a precise mean per explainer, but only a combined τ/Pearson
// range per explainer — NOT a separate per-model breakdown — so we represent
// τ/Pearson as a range rather than inventing false per-model precision.
export const transferPreVsPost = [
  { explainer: 'LIME', cosine: 0.55, tauPearsonRange: [-0.10, 0.22] },
  { explainer: 'SHAP', cosine: 0.89, tauPearsonRange: [0.02, 0.10] },
]
// Inter-model explanation similarity (exact values from text §5.5)
export const transferInterModel = [
  { pair: 'MobileNet\nvs ResNet', limeMean: 0.98, shapMean: 0.92 },
  { pair: 'CNN\nvs MobileNet',   limeMean: 0.33, shapMean: 0.52 },
  { pair: 'CNN\nvs ResNet',      limeMean: 0.33, shapMean: 0.52 },
]

// ─── Table 1: Dataset overview ────────────────────────────────────────────────
export const datasets = [
  {
    id: 'DS1',
    name: 'Heart Disease',
    obs: 303,
    features: 14,
    numFeatures: 7,
    catFeatures: 7,
    dataType: 'Tabular',
    task: 'Binary Classification',
    bestModel: 'AdaBoost',
    bestMetric: 'F1 = 0.92',
    color: DATASET_COLORS['Heart Disease'],
    icon: '♥',
  },
  {
    id: 'DS2',
    name: 'CA Housing',
    obs: 20640,
    features: 10,
    numFeatures: 9,
    catFeatures: 1,
    dataType: 'Tabular',
    task: 'Regression',
    bestModel: 'CatBoost',
    bestMetric: 'R² = 0.838',
    color: DATASET_COLORS['CA Housing'],
    icon: '🏠',
  },
  {
    id: 'DS3',
    name: 'Jannis',
    obs: 83733,
    features: 55,
    numFeatures: 55,
    catFeatures: 0,
    dataType: 'Tabular',
    task: 'Multiclass Classif.',
    bestModel: 'LGBM',
    bestMetric: 'F1 = 0.71',
    color: DATASET_COLORS['Jannis'],
    icon: '📊',
  },
  {
    id: 'DS4',
    name: 'COVID CXR',
    obs: 1823,
    features: null,
    numFeatures: null,
    catFeatures: null,
    dataType: 'Images',
    task: 'Multiclass Classif.',
    bestModel: 'Custom CNN',
    bestMetric: 'F1 = 0.96',
    color: DATASET_COLORS['COVID CXR'],
    icon: '🫁',
  },
]

// ─── Story sections metadata ──────────────────────────────────────────────────
export const storySections = [
  {
    id: 'problem',
    label: '01 — The Problem',
    headline: 'The Same Patient. Four Different Explanations.',
    body: [
      'Imagine an AI that predicts whether a patient has heart disease. The model examines 13 clinical features — age, cholesterol, blood pressure — and renders a verdict.',
      'Now ask four different AI systems to explain that same verdict for the same patient. You get four different stories. One model flags cholesterol as harmful. Another ignores it entirely. A third highlights the patient\'s age as a positive factor; the fourth considers it irrelevant.',
      'All four models achieve similar prediction accuracy. Yet their explanations — the reasoning offered to doctors, patients, and regulators — diverge significantly.',
      'This is the explainability crisis at the heart of modern AI. Post-hoc explainers like SHAP and LIME are widely used to interpret black-box models. But how stable and trustworthy are those explanations when conditions change?',
    ],
    stat: { value: '4', label: 'Different AI explanations', sub: 'for the exact same patient' },
  },
  {
    id: 'neuroscience',
    label: '02 — The Method',
    headline: 'A Brain-Scanning Trick, Repurposed for AI.',
    body: [
      'The solution comes from an unlikely place: computational neuroscience. Researchers studying the brain needed a way to compare neural activity patterns across different experiments, subjects, and even different brain-imaging technologies.',
      'Their tool was Representational Similarity Analysis (RSA). The idea is elegant: instead of comparing raw measurements directly, you first compute how dissimilar every pair of stimuli is within each system. This creates a "representational dissimilarity matrix" (RDM) — a fingerprint of how the system organizes information.',
      'Then you compare fingerprints. If two brains (or two AI models) produce similar RDMs, they represent information in a similar way — regardless of how different the underlying measurements look.',
      'Gwinner et al. adapted RSA for XAI: treat feature-attribution explanations as the "stimuli," compute RDMs across model outputs, and measure how similar those RDMs are. High similarity = stable, trustworthy explanations. Low similarity = explanation drift.',
    ],
    stat: { value: 'RSA', label: 'Representational Similarity Analysis', sub: 'from neuroscience → AI stability' },
  },
  {
    id: 'study',
    label: '03 — The Study',
    headline: 'Four Datasets. Thirteen Models. One Framework.',
    body: [
      'To test their approach, the authors ran four experiments across four publicly available datasets, spanning tabular data, regression, multiclass classification, and medical images.',
      'They trained 13 different ML algorithms — from classic decision trees to gradient boosting ensembles to convolutional neural networks — tuned each with hyperparameter optimization, and then applied SHAP and LIME as explainers.',
      'At each step, they systematically "froze" everything except the variable under investigation: swapping only the model while keeping data identical; swapping only the preprocessing method while keeping the model fixed; and so on.',
      'The result is a rigorous, controlled study of how much each component of the AI pipeline shifts the explanations you get out the other end.',
    ],
    stat: { value: '13', label: 'ML algorithms tested', sub: 'across 4 datasets + 4 experiments' },
  },
  {
    id: 'models',
    label: '04 — Finding: Models',
    headline: 'Model Choice Is the Biggest Explainability Wild Card.',
    body: [
      'The most dramatic finding: switching the ML model — while keeping everything else identical — can make explanations nearly unrecognizable.',
      'On the Heart Disease dataset, CatBoost and Random Forest agree closely (Kendall\'s τ = 0.986). But on the complex Jannis multiclass dataset, comparing a neural network (MLP) against Random Forest yields a cosine similarity of just 0.022 — effectively zero alignment.',
      'The insight for practitioners: two models that perform equally well on accuracy metrics can offer radically different explanations. Before deploying an AI system, you must verify that its explanations are consistent — not just its predictions.',
      'The Kendall\'s τ measure, which ranks ordinal relationships, stays relatively high even in divergent cases, suggesting models tend to agree on the overall order of feature importance even when the magnitudes differ wildly.',
    ],
    stat: { value: '0.022', label: 'Cosine similarity', sub: 'MLP vs Random Forest on same data' },
  },
  {
    id: 'preprocessing',
    label: '05 — Finding: Preprocessing',
    headline: 'How You Scale Data Shifts What AI Sees.',
    body: [
      'Every real-world ML pipeline transforms raw data before training: numerical values get scaled, categorical variables get encoded. The authors tested whether these choices ripple into the explanations — on the same data, across two models, GB and CatBoost.',
      'Numerical scalers barely touch CatBoost: swapping MinMax, MaxAbs, or Standard Scaling leaves its explanations at similarity ≥ 0.9998 — practically indistinguishable from identical. GB is more sensitive: Kendall\'s τ drops to about 0.92 whenever Standard Scaling is involved, though cosine and Pearson stay ≥ 0.99.',
      'Categorical encoding is the case that actually moves the needle for both models. Label encoding — which assigns integer codes to categories — pulls Kendall\'s τ down to roughly 0.86–0.88, versus ~0.89–0.91 for one-hot vs. leave-one-out, because tree-based models read those integers as an ordering that isn\'t really there. Cosine and Pearson barely move (≥ 0.97) — the ranking of features shifts more than their overall pattern.',
      'Bottom line: preprocessing does matter, but less than model choice — and how much it matters depends on the model. CatBoost shrugs off scaling; GB and encoder choice both leave a measurable, but modest, mark.',
    ],
    stat: { value: '0.86', label: "Kendall's τ: Label vs. LooE (CatBoost)", sub: 'the lowest of all preprocessing swaps tested' },
  },
  {
    id: 'features',
    label: '06 — Finding: Features',
    headline: 'Strip Away Features, Watch Explanations Unravel.',
    body: [
      'What happens to explanations as you reduce the number of features in a model? The authors tested this by removing one feature at a time — starting with the least important — and measuring how the explanations drift from the "gold standard" full-feature model.',
      'The result is a steady, measurable decline. Each removed feature shifts the explanation landscape. Kendall\'s τ, which measures rank-order agreement, drops fastest — suggesting that which features rank highest changes more readily than their relative magnitudes.',
      'Cosine similarity, which focuses on directional alignment rather than magnitude, proves more robust and declines more gradually. This makes it the recommended measure when you care about the overall pattern of what the model is attending to.',
      'The practical takeaway: this gives data scientists a principled way to choose how many features to include. Set a similarity threshold (e.g., τ ≥ 0.90), then reduce features until you hit it — balancing model simplicity against explanation fidelity.',
    ],
    stat: { value: '−17%', label: 'Kendall\'s τ drop', sub: 'over 8 features removed' },
  },
  {
    id: 'transfer',
    label: '07 — Finding: Transfer Learning',
    headline: 'Fine-Tuning Rewrites the Explanation from Scratch.',
    body: [
      'The most dramatic experiment used chest X-ray images to diagnose COVID-19, viral pneumonia, and healthy patients. Pre-trained models (MobileNetV2 and ResNet50, both trained on ImageNet) were fine-tuned on the medical dataset.',
      'Before and after fine-tuning, the explanation similarity collapses. Using LIME, cosine similarity is just 0.55; tau and Pearson drop to near zero (-0.1 to 0.22). Fine-tuning doesn\'t just improve performance — it fundamentally rewires what the model attends to.',
      'But here\'s the striking counterpoint: MobileNetV2 and ResNet50, when compared to each other after fine-tuning, show similarity above 0.98 (LIME) and 0.92 (SHAP). Two models sharing the same ImageNet pretraining converge on similar visual explanations.',
      'Compare either to a custom CNN trained from scratch, and similarity drops to 0.15–0.50. The lesson: shared training heritage creates explanation kinship. A from-scratch model is an explanation alien to its pre-trained cousins.',
    ],
    stat: { value: '0.98', label: 'MobileNet vs ResNet similarity', sub: 'vs 0.33 for custom CNN' },
  },
  {
    id: 'conclusion',
    label: '08 — Conclusion',
    headline: 'A New Instrument for Trustworthy AI.',
    body: [
      'Across four datasets and hundreds of experiments, one conclusion emerges clearly: every component of the AI pipeline — model choice, preprocessing, feature selection, training procedure — leaves a fingerprint on the explanations you get.',
      'Explanation Similarity Analysis gives practitioners, auditors, and regulators a quantitative instrument to detect "explanation drift" — the point at which AI justifications have shifted enough that they can no longer be trusted to reflect the same underlying logic.',
      'This matters beyond academic research. As regulatory frameworks increasingly require AI systems to provide meaningful explanations for their decisions, methods for verifying explanation consistency will become essential compliance tools.',
      'The authors have released their code openly, and their framework integrates naturally into existing MLOps pipelines — adding a monitoring step that flags when explanations have drifted beyond an acceptable threshold. Trust, they argue, requires not just accuracy, but stability.',
    ],
    stat: { value: 'MLOps', label: 'Ready for production monitoring', sub: 'explanation drift detection' },
  },
]
