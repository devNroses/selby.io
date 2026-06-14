import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Dashboard } from '../Dashboard';
import { Button } from '../Global/Button'
import styles from './Hero.module.css'

export const Hero = () => {
    gsap.registerPlugin(ScrollTrigger);
    const heroRef = useRef<HTMLDivElement | null>(null);
    const logoRef = useRef<HTMLDivElement | null>(null);
    const dashboardRef = useRef<HTMLDivElement | null>(null);
    const introTextRef = useRef<HTMLDivElement | null>(null);
    const heroCtx = useRef<gsap.Context | null>(null);
    const dashboardCtx = useRef<gsap.Context | null>(null);
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

   const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "+=50%",
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
      }
    });
tl.to(logoRef.current, {
  scale: 1.6,
  y: -90,
  ease: "none",
}, 0);

tl.to(introTextRef.current, {
  opacity: 1,
  y: -10,
  scale: 1,
  ease: "none",
}, 0.05);

  }, heroRef);

  return () => ctx.revert();
}, []);

    useEffect(() => {
  if (!showDashboard || !dashboardRef.current) return;

  dashboardCtx.current = gsap.context(() => {

    gsap.fromTo(
      dashboardRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      }
    );

  }, dashboardRef);

  return () => dashboardCtx.current?.revert();
}, [showDashboard]);

useEffect(() => {
  if (!showDashboard) return;

  const scrollY = window.scrollY;

  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = "100%";

  // ONLY kill hero context (not everything globally)
  heroCtx.current?.revert();

  return () => {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";

    window.scrollTo(0, scrollY);
  };
}, [showDashboard]);

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
    <div ref={heroRef} className={styles.container}>
      <div className={styles.heroContainer}>
        <div ref={logoRef} className={styles.mainLogo}>
          SELBY
        </div>
        <div ref={introTextRef} className={styles.introText}>
          <p>
            Design Engineer blending frontend, systems, and color-driven storytelling.

            Multidisciplinary design engineer crafting scalable, expressive digital experiences.

            Where design systems, frontend engineering, and color storytelling meet.

            Building thoughtful digital products through design, code, and color.

            Bridging design and engineering to create impactful, scalable experiences.         
          </p>
        
          <Button buttonAction={handleEnter} />
        </div>
      </div>
      {showDashboard && (
        <Dashboard dashboardPropRef={dashboardRef} />
      )}
    </div>
  )
}