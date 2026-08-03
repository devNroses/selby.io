import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { NavPill } from '../Global/NavPill'
// import { GithubIcon } from '../../assets/icons/githubIcon'
// import { InstagramIcon } from '../../assets/icons/instagramIcon'
// import { LinkedInIcon } from '../../assets/icons/linkedIn'
import styles from './About.module.css'

type Chapter = {
  label: string
  photo: string
  panelBg: string
  panelFg: string
  accent: string
  eyebrow: string
  headline: ReactNode
  bioColumns: [ReactNode, ReactNode]
}

const chapters: Chapter[] = [
  {
    label: 'Creative Navigator',
    photo: '/imgs/about/selby_train.jpg',
    panelBg: '#F1E9DD',
    panelFg: '#1A1A1A',
    accent: '#C1652F',
    eyebrow: 'Design Engineer · Color Designer',
    headline: (
      <>
        Navigating
        <br />
        by Design
      </>
    ),
    bioColumns: [
      <>
        Raised in North Carolina and shaped by years living abroad. My creative
        perspective was formed through contrast, culture, and curiosity. Early
        exposure to different environments taught me to observe closely and
        find connection in unexpected places.
      </>,
      <>
        What began as sketching sports logos and studying sneaker ads gradually
        evolved into a deeper appreciation for visual systems, storytelling,
        color concepts, and the emotional impact of design.
      </>,
    ],
  },
  {
    // TODO: swap in real eyebrow/headline/bio copy for this chapter
    label: 'Design Engineer',
    photo: '/imgs/about/selbyPanel2.jpg',
    panelBg: '#1B222C',
    panelFg: '#F2F2F2',
    accent: '#3FD1E5',
    eyebrow: 'Visual Design · UX · Engineering',
    headline: (
      <>
        Systems, <br /> Not Screens
      </>
    ),
    bioColumns: [
       <>
         Four years inside Nike&rsquo;s product ecosystem, starting in
        engineering as a Senior Software Engineer functioning as Engineering
        Lead, then expanding into UX: building reusable components,
        implementing APIs, and shipping conversational interfaces that scale.
      </>,
      <>
        That foundation carried into a VP of Visual Design &amp; Development
        role, where the same rigor extended to product experience,
        translating research and interaction design into resilient frontend
        systems,from component libraries to product flows.
      </>,
    ],
  },
  {
    // TODO: swap in real eyebrow/headline/bio copy for this chapter
    label: 'Color Designer',
    photo: '/imgs/about/selby_profile.jpg',
    panelBg: '#C6284A',
    panelFg: '#FFFFFF',
    accent: '#FFD23F',
    eyebrow: 'Apparel · Footwear',
    headline: (
      <>
        Color as
        <br />
        Language
      </>
    ),
    bioColumns: [
    <>
     A year embedded with the Nike Basketball licensed apparel team, developing color stories for on-court product, including the palette work behind NBA All-Star Weekend warm-ups and shooting shirts.
    </>, 
    <>
      That work sits on a foundation built across visual design, UX, and engineering, a rare vantage point for translating a color concept into a technical spec, and a technical constraint into a design decision.
    </>],
  },
]

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

function usePreloadImages(srcs: string[]) {
  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: IdleRequestCallback) => setTimeout(() => cb({} as IdleDeadline), 1))
    const cancel = window.cancelIdleCallback ?? clearTimeout
    const id = idle(() => {
      srcs.forEach((src) => {
        const img = new Image()
        img.src = src
      })
    })
    return () => cancel(id as number)
  }, [srcs])
}

const chapterPhotos = chapters.map((c) => c.photo)

export const AboutPage = () => {
  const [active, setActive] = useState(0)
  const isCompact = useMediaQuery('(max-width: 1024px)')
  const activeChapter = chapters[active]
  usePreloadImages(chapterPhotos)

  return (
    <div className={styles.aboutWrapper}>
      <div className={styles.contentContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.mediaRow}>
            {/* tabs: desktop shows all three stacked, compact shows only the active label */}
            <div className={styles.tabsContainer} role="tablist" aria-label="About chapters">
              {isCompact ? (
                <AnimatePresence mode="wait">
                  <motion.button
                    key={activeChapter.label}
                    role="tab"
                    aria-selected="true"
                    className={styles.tab}
                    data-active="true"
                    style={{ '--tab-accent': activeChapter.accent } as CSSProperties}
                    onClick={() => setActive((i) => (i + 1) % chapters.length)}
                    initial={{ y: '-105%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '-105%' }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  >
                    {activeChapter.label}
                  </motion.button>
                </AnimatePresence>
              ) : (
                chapters.map((chapter, i) => (
                  <motion.button
                    key={chapter.label}
                    role="tab"
                    aria-selected={active === i}
                    data-active={active === i}
                    className={styles.tab}
                    style={{ '--tab-accent': chapter.accent } as CSSProperties}
                    onClick={() => setActive(i)}
                    initial={{ y: '-105%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.35 + i * 0.1, delay: i * 0.2, ease: 'easeInOut' }}
                  >
                    {chapter.label}
                  </motion.button>
                ))
              )}
            </div>
            <div className={styles.photoStack}>
              <AnimatePresence>
                <motion.img
                  key={activeChapter.photo}
                  src={activeChapter.photo}
                  alt=""
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                />
              </AnimatePresence>
            </div>

            {isCompact && (
              <nav className={styles.indexStrip} aria-label="Chapter index">
                {chapters.map((chapter, i) => (
                  <button
                    key={chapter.label}
                    data-active={active === i}
                    onClick={() => setActive(i)}
                    aria-label={chapter.label}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </button>
                ))}
              </nav>
            )}
          </div>
          <motion.div
            className={styles.tabContent}
            role="tabpanel"
            animate={{ backgroundColor: activeChapter.panelBg, color: activeChapter.panelFg }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <div className={styles.tabContentInner}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.p className={styles.eyebrow} style={{ color: activeChapter.accent }}>
                    {activeChapter.eyebrow}
                  </motion.p>

                  <div className={styles.headlineMask}>
                    <motion.h2
                      className={styles.headline}
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {activeChapter.headline}
                    </motion.h2>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                  >
                    <p className={styles.byline}>By Selby</p>
                    <div className={styles.bodyColumns}>
                      {activeChapter.bioColumns.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
          <span className={styles.srOnly} role="status" aria-live="polite">
            Showing chapter: {activeChapter.label}
          </span>
        </div>
      </div>
      <NavPill />
    </div>
  )
}
