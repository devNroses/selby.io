import { useEffect, useRef, useLayoutEffect, lazy, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap';
import { motion } from 'motion/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Button } from '../Global/Button'
import styles from './Hero.module.css'

// The rotating 3D wordmark (three.js + @react-three/fiber + drei) is
// heavy and shared with the Dashboard profile panel, so it's loaded as
// its own async chunk rather than bundled into the main entry. The
// intro copy/button paint immediately; the logo streams in on top.
const WordmarkScene = lazy(() =>
  import('../Global/WordmarkScene').then((m) => ({ default: m.WordmarkScene }))
)

gsap.ticker.lagSmoothing(0);
gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const navigate = useNavigate()
  const heroRef = useRef<HTMLDivElement | null>(null);
  const introTextRef = useRef<HTMLDivElement | null>(null);
  const heroCtx = useRef<gsap.Context | null>(null);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!hasMounted.current) {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
      hasMounted.current = true;
    }
  }, []);

  // The only place Hero can go is Dashboard. Warm that chunk in the
  // background as soon as we land here so it's already cached by the
  // time the enter transition finishes — otherwise route-level code
  // splitting would trade the old blank-flash bug for a new one.
  useEffect(() => {
    import('../Dashboard');
  }, []);

  useLayoutEffect(() => {
    if (!heroRef.current || !introTextRef.current) return;

    const introEl = introTextRef.current

    const ctx = gsap.context(() => {
      gsap.fromTo(
        introEl.querySelectorAll('p, button'),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          delay: 1.25,
          stagger: 0.35,
          ease: "power2.out",
        }
      );
    }, heroRef);

    heroCtx.current = ctx;
    return () => ctx.revert();
  }, []);

  const handleEnter = (): void => {
    if (!heroRef.current) return;

    ScrollTrigger.getAll().forEach(t => t.kill());
    heroCtx.current?.revert();

    gsap.to(heroRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => navigate('/dashboard'),
    })
  }

  return (
    <motion.section
      className="pageSection"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: 'easeInOut' }}
    >
      <div ref={heroRef} className={styles.container}>
        <div className={styles.heroContainer}>

          <div className={styles.mainLogo}>
            <Suspense fallback={null}>
              <WordmarkScene responsive />
            </Suspense>
          </div>

          <div ref={introTextRef} className={styles.introText}>
            <p>
              Design Engineer. Creative Technologist. <br />
              Operating at the intersection of frontend systems and color design for apparel and footwear.
              Building thoughtful digital experiences through design, code, and color as a narrative.
            </p>
            <Button buttonAction={handleEnter} />
          </div>

        </div>
      </div>
    </motion.section>
  )
}
