import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Center, Bounds } from '@react-three/drei'
import { ACESFilmicToneMapping } from 'three'
import { Dashboard } from '../Dashboard';
import { Button } from '../Global/Button'
import { SelbyText } from '../Global/Logo';
import styles from './Hero.module.css'

gsap.ticker.lagSmoothing(0);

export const Hero = () => {
  gsap.registerPlugin(ScrollTrigger);

  const heroRef = useRef<HTMLDivElement | null>(null);
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

  useLayoutEffect(() => {
    if (!heroRef.current || !introTextRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(introTextRef.current, {
        opacity: 0,
        y: 40,
      });

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "+=50%",
        scrub: true,
        pin: true,
        pinSpacing: true,  // restored
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set(introTextRef.current, {
            opacity: self.progress,
            y: 40 - self.progress * 50,
          });
        }
      });

    }, heroRef);

    heroCtx.current = ctx;
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!showDashboard || !dashboardRef.current) return;
    dashboardCtx.current = gsap.context(() => {
      gsap.fromTo(
        dashboardRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
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
    heroCtx.current?.revert();
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [showDashboard]);

  const handleEnter = (): void => {
    if (!heroRef.current) return;
    const exitTL = gsap.timeline({
      onComplete: () => {
        ScrollTrigger.getAll().forEach(t => t.kill());
        setShowDashboard(true);
      }
    });
    exitTL.to(introTextRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
    });
  }

  return (
    <div ref={heroRef} className={styles.container}>
      <div className={styles.heroContainer}>

        <div className={styles.mainLogo}>
          <Canvas
            camera={{ position: [0, 0, 10], fov: 50 }}
            gl={{ antialias: true, toneMapping: ACESFilmicToneMapping }}
            frameloop="always"
          >
            <Environment
              files="/THAZERO-WORLD-TEXTURE.hdr"
              background={false}
            />
            <Bounds fit clip observe margin={0.65}>
              <Center position={[0, 0.2, 0]}>
                <SelbyText
                  metalness={.85}
                  roughness={0.22}
                  envMapIntensity={2}
                  color="#c0c0c0"
                />
              </Center>
            </Bounds>
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.8}
            />
          </Canvas>
        </div>

        <div ref={introTextRef} className={styles.introText}>
          <p>
            Design Engineer. Creative Technologist.<br />
            Blending frontend systems, and color-driven storytelling.
            Building thoughtful digital products through design, code, and color.
          </p>
          <Button buttonAction={handleEnter} />
        </div>

      </div>
      {showDashboard && <Dashboard dashboardPropRef={dashboardRef} />}
    </div>
  )
}