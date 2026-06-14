import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { motion } from "motion/react"
import { Button } from '../Global/Button'
import styles from './Hero.module.css'

export const Hero = () => {
    gsap.registerPlugin(ScrollTrigger);
    const heroRef = useRef<HTMLDivElement | null>(null);
    const logoRef = useRef<HTMLDivElement | null>(null);
    const dashboardRef = useRef<HTMLDivElement | null>(null);
    const introTextRef = useRef<HTMLDivElement | null>(null);
    const [showDashboard, setShowDashboard] = useState(false);
    const hasMounted = useRef(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        if (!hasMounted.current) {
            window.history.scrollRestoration = 'manual';
            window.scrollTo(0, 0);
            hasMounted.current = true;
        }
    }, []);

    // gsap animation for hero and intro elements on mount + scroll
    useLayoutEffect(() => {
  if (!heroRef.current || !logoRef.current || !introTextRef.current) return;

  console.log("intro ref:", introTextRef.current);
  const ctx = gsap.context(() => {

    // Initial states
    gsap.set(logoRef.current, {
      scale: 0.4,
      y: 0,
      transformOrigin: "center center",
    });

    gsap.set(introTextRef.current, {
      opacity: 0,
      y: 60,
      scale: 0.98,
    });

    // ONE timeline controls everything
   const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "+=80%",
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
      }
    });

// LOGO (strong movement)
tl.to(logoRef.current, {
  scale: 1.6,
  y: -90,
  ease: "none",
}, 0);

 gsap.fromTo(
      introTextRef.current,
      {
        opacity: 0,
        y: 40,
        scale: 0.98,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top+=20% top",
          toggleActions: "play none none reverse",
        },
      }
    );

  }, heroRef);

  return () => ctx.revert();
}, []);

    useEffect(() => {
      if (!showDashboard || !dashboardRef.current) return;
      
      // Kill scroll triggers when dashboard shows
      ScrollTrigger.getAll().forEach(trigger => {
        trigger.kill();
      });
      
      const ctx = gsap.context(() => {
        gsap.fromTo(
          dashboardRef.current,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          }
        );
      }, dashboardRef);

      return () => ctx.revert();
    }, [showDashboard])

    // gsap button animation 
    const handleEnter = (): void => {
      if (!heroRef.current) return;

      const exitTL = gsap.timeline({
        onComplete: () => {
          // Kill all scroll triggers to allow normal page scroll
          ScrollTrigger.getAll().forEach(trigger => {
            trigger.kill();
          });
          setShowDashboard(true);
        }
      });

      exitTL
      .to(logoRef.current, {
        scale: 0.6,
        opacity: 0, 
        duration: 0.6,
        ease: "power2.inOut",
      })
      .to(
        introTextRef.current,
        {
          y: -20,
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        },
        "-=0.3"
      );
    }

  return (
    <div ref={heroRef} className={styles.headerContainer}>
      <div className={styles.header}>
        {/* <div className={styles.headerWrapper}>header [ScrollY: {scrollY}]</div> */}
      </div>
      <div
        ref={logoRef}
        className={styles.mainLogo}
      >
        SELBY
      </div>
      <div
        ref={introTextRef}
        className={styles.introText}
      >
        <p>
          Design Engineer blending frontend, systems, and color-driven storytelling.

          Multidisciplinary design engineer crafting scalable, expressive digital experiences.

          Where design systems, frontend engineering, and color storytelling meet.

          Building thoughtful digital products through design, code, and color.

          Bridging design and engineering to create impactful, scalable experiences.         
        </p>
       
        <Button buttonAction={handleEnter} />
      </div>
    <div className={styles.spacer} aria-hidden="true" />
      {showDashboard && (
        <div ref={dashboardRef} className={styles.dashboard}>
          <div className={styles.dashboardContent}>
            <motion.div
              className='panel'
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.25 } }}
              style={{ background: '#04d4fd', padding: '1rem'}}
            >
              panel 1
            </motion.div>
            <motion.div
              className='panel'
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.35 } }}
              style={{ background: '#04f94d', padding: '1rem'}}
            >
              panel 2
            </motion.div>
            <motion.div
              className='panel'
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.45 } }}
              style={{ transformOrigin: 'bottom', display: 'flex', flexDirection: 'column', background: '#f62900', padding: '1rem', gap: '1em' }}
            >
              <motion.div 
              className={styles.profileSection}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.55 } }}
              >
                [Profile] 
                <motion.div 
                className={styles.profileResume}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.6 } }}
                >
                  [ Resume CTA ]
                </motion.div>
                <motion.div 
                className={styles.profileSocials}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.65 } }}
                >
                  [ Socials CTA Container ]
                </motion.div>
              </motion.div>

               <motion.div className={styles.skillsSection}>
               [ Skills ]
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  )
}