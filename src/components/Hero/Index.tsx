import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Environment, Center, Bounds } from '@react-three/drei'
import { ACESFilmicToneMapping, Group } from 'three'
import { Dashboard } from '../Dashboard';
import { Button } from '../Global/Button'
import { SelbyText } from '../Global/Logo';
import styles from './Hero.module.css'

gsap.ticker.lagSmoothing(0);

export const ResponsiveCamera = () => {
  const { camera, size } = useThree()

  useEffect(() => {
    if (size.width < 768) {
      camera.position.set(0, 0, 20)
    } else if (size.width < 1024) {
      camera.position.set(0, 0, 10)
    } else {
      camera.position.set(0, 0, 7)
    }
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
  }, [size.width, camera])

  return null
}

export const RotatingText = () => {
  const groupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.4
  })

  return (
    <group ref={groupRef}>
      <Center rotation={[0, 0, 0]} position={[0, 0.2, 0]}>
        <SelbyText
          metalness={0.85}
          roughness={0.22}
          envMapIntensity={2}
          color="#c0c0c0"
        />
      </Center>
    </group>
  )
}

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

  useEffect(() => {
    if (!showDashboard || !dashboardRef.current) return;
    dashboardCtx.current = gsap.context(() => {
      gsap.fromTo(
        dashboardRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out"
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

  ScrollTrigger.getAll().forEach(t => t.kill());
  heroCtx.current?.revert();

  gsap.to(heroRef.current, {
    opacity: 0,
    duration: 0.6,
    ease: "power2.inOut",
    onComplete: () => {
      setShowDashboard(true)
    },
  })
}

  return (
    <>
    <div ref={heroRef} className={styles.container}>
      <div className={styles.heroContainer}>

        <div className={styles.mainLogo}>
          <Canvas
            camera={{ position: [0, 0, 7], fov: 50 }}
            gl={{ antialias: true, toneMapping: ACESFilmicToneMapping }}
            frameloop="always"
          >
            <ResponsiveCamera />
            <Environment
              files="/THAZERO-WORLD-TEXTURE.hdr"
              background={false}
            />
            <Bounds fit clip observe margin={0.65}>
              <RotatingText />
            </Bounds>
          </Canvas>
        </div>

        <div ref={introTextRef} className={styles.introText}>
          <p>
            Design Engineer. Creative Technologist.<br />
            Blending frontend systems, and color-driven storytelling.<br />
            Building thoughtful digital products through design, code, and color.
          </p>
          <Button buttonAction={handleEnter} />
        </div>

      </div>
    </div>
      {showDashboard && <Dashboard dashboardPropRef={dashboardRef} />}
    </>
  )
}