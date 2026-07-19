import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { storySections } from './data'
import Hero from './components/Hero'
import ScrollSection from './components/ScrollSection'
import StickyPanel from './components/StickyPanel'

export default function App() {
  const [activeSectionId, setActiveSectionId] = useState('problem')

  const handleSectionEnter = useCallback((id) => {
    setActiveSectionId(id)
  }, [])

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Hero — full-screen, no sidecar */}
      <Hero />

      {/* Progress indicator */}
      <ProgressBar activeSectionId={activeSectionId} />

      {/* Sidecar layout: text left, sticky viz right */}
      <div className="relative flex flex-col lg:flex-row">

        {/* MOBILE: Sticky top visualization */}
        <div className="lg:hidden sticky top-0 z-10 h-[42vh]"
          style={{ backgroundColor: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
          <AnimatePresence mode="wait">
            <StickyPanel activeSectionId={activeSectionId} key={activeSectionId} />
          </AnimatePresence>
        </div>

        {/* LEFT: Scrolling narrative text */}
        <div className="w-full lg:w-5/12 px-6 lg:px-12 xl:px-16 py-8 lg:py-0">
          {storySections.map((section) => (
            <ScrollSection
              key={section.id}
              section={section}
              onEnter={handleSectionEnter}
            />
          ))}
          {/* Extra bottom padding so last section can fully trigger */}
          <div className="h-[30vh]" />
        </div>

        {/* RIGHT: Sticky visualization panel (desktop only) */}
        <div className="hidden lg:block lg:w-7/12 relative">
          <div className="sticky top-0 h-screen flex items-center justify-center">
            <AnimatePresence mode="wait">
              <StickyPanel activeSectionId={activeSectionId} key={activeSectionId} />
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

const BIBTEX = `@article{GWINNER2024114248,
title = {Comparing expert systems and their explainability through similarity},
journal = {Decision Support Systems},
volume = {182},
pages = {114248},
year = {2024},
issn = {0167-9236},
doi = {https://doi.org/10.1016/j.dss.2024.114248},
url = {https://www.sciencedirect.com/science/article/pii/S0167923624000812},
author = {Fabian Gwinner and Christoph Tomitza and Axel Winkelmann},
keywords = {XAI, RSA, Machine learning, Similarity analysis, Explanation drift},
abstract = {In our work, we propose the use of Representational Similarity Analysis (RSA) for explainable AI (XAI) approaches to enhance the reliability of XAI-based decision support systems. To demonstrate how similarity analysis of explanations can assess the output stability of post-hoc explainers, we conducted a computational evaluative study. This study addresses how our approach can be leveraged to analyze the stability of explanations amidst various changes in the ML pipeline. Our results show that modifications such as altered preprocessing or different ML models lead to changes in the explanations and illustrate the extent to which stability can suffer. Explanation similarity analysis enables practitioners to compare different explanation outcomes, thus monitoring stability in explanations. Alongside discussing the results and practical applications in operationalized ML, including both benefits and limitations, we also delve into insights from computational neuroscience and neural information processing.}
}`

const FOOTER_LINKS = [
  { label: 'Paper (DOI)', href: 'https://doi.org/10.1016/j.dss.2024.114248' },
  { label: 'Code repository', href: 'https://github.com/fabigr8/SimilarityXAI' },
  { label: 'Author page', href: 'https://fabigr8.github.io/' },
]

function Footer() {
  const [showBibtex, setShowBibtex] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyBibtex = useCallback(() => {
    navigator.clipboard.writeText(BIBTEX)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [])

  return (
    <footer className="py-12 px-6" style={{ borderTop: '1px solid var(--border)', color: 'var(--muted)' }}>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 text-left text-sm">
        {/* Left: links */}
        <div>
          <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: 'var(--text)' }}>
            Links
          </p>
          <ul className="space-y-2">
            {FOOTER_LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline underline-offset-2 transition-colors"
                  style={{ color: 'var(--accent)' }}
                >
                  {link.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Middle: citation + BibTeX */}
        <div>
          <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: 'var(--text)' }}>
            Citation
          </p>
          <p>
            Gwinner, Tomitza &amp; Winkelmann (2024).{' '}
            <em>Comparing expert systems and their explainability through similarity.</em>{' '}
            Decision Support Systems 182, 114248.
          </p>

          <button
            onClick={() => setShowBibtex(v => !v)}
            className="text-xs mt-3 font-semibold underline underline-offset-2"
            style={{ color: 'var(--primary)' }}
          >
            {showBibtex ? 'Hide BibTeX' : 'Show BibTeX'}
          </button>

          {showBibtex && (
            <div className="relative mt-3">
              <pre
                className="text-[10px] leading-relaxed p-3 pr-16 rounded-lg overflow-x-auto whitespace-pre-wrap break-words"
                style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--muted)' }}
              >
                {BIBTEX}
              </pre>
              <button
                onClick={copyBibtex}
                className="absolute top-2 right-2 text-[9px] font-semibold px-2 py-1 rounded"
                style={{ backgroundColor: 'var(--elevated)', border: '1px solid var(--border)', color: copied ? 'var(--accent)' : 'var(--muted)' }}
              >
                {copied ? 'Copied ✓' : 'Copy'}
              </button>
            </div>
          )}
        </div>

        {/* Right: reserved */}
        <div />
      </div>

      <p className="text-xs mt-8 text-center" style={{ color: 'var(--border)' }}>
        All data values sourced directly from the paper.
      </p>
    </footer>
  )
}

function ProgressBar({ activeSectionId }) {
  const currentIndex = storySections.findIndex(s => s.id === activeSectionId)
  const progress = ((currentIndex + 1) / storySections.length) * 100

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px]"
      style={{ backgroundColor: 'var(--elevated)' }}>
      <div
        className="h-full transition-all duration-500 ease-out"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, var(--primary), var(--accent))',
        }}
      />
    </div>
  )
}
