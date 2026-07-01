import { useEffect, useRef, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap';
import { motion } from 'motion/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Environment, Center, Bounds } from '@react-three/drei'
import { ACESFilmicToneMapping, Group } from 'three'
import { Button } from '../Global/Button'
import { SelbyText } from '../Global/Logo';
import styles from './Hero.module.css'

gsap.ticker.lagSmoothing(0);
gsap.registerPlugin(ScrollTrigger);

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