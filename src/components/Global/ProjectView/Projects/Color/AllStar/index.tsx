import { useRef, useLayoutEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Allstar.module.css'

gsap.registerPlugin(ScrollTrigger)

export const AllStarProject = () => {
    const { id } = useParams()
    const allstarContainerRef = useRef<HTMLDivElement>(null)
    const allstarIntroRef = useRef<HTMLDivElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const boxFeatureRef = useRef<HTMLDivElement>(null)
    const boxaRef = useRef<HTMLDivElement>(null)
    const boxbRef = useRef<HTMLDivElement>(null)
    const ctx = useRef<gsap.Context | null>(null)
useLayoutEffect(() => {
    if( !allstarContainerRef.current || 
        !allstarIntroRef.current ||
        !boxaRef.current ||
        !boxFeatureRef.current ||
        !boxbRef.current ||
        !imgRef.current 
    ) return

     // force scroll to top before GSAP initializes
        window.scrollTo(0, 0)
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0

    const introElement = allstarIntroRef.current

    ctx.current = gsap.context(() => {

        // set initial states immediately — no flash
        gsap.set(introElement.querySelectorAll('h2'), { opacity: 0, y: 40, visibility: 'visible' })
        gsap.set(imgRef.current, { opacity: 0, visibility: 'visible' })
        gsap.set(boxaRef.current, { opacity: 0, height: 0, y: 380, visibility: 'visible' })
        gsap.set(boxbRef.current, { opacity: 0, height: 0, y: 480, visibility: 'visible' })

        // then animate
        gsap.to(introElement.querySelectorAll('h2'), {
            opacity: 1,
            y: 10,
            duration: 0.65,
            delay: .85,
            stagger: 0.35,
            ease: "circ.out",
        })

        gsap.to(imgRef.current, {
            opacity: 1,
            duration: 0.85,
            delay: 2.85,
            ease: "circ.inOut",
        })

        gsap.to(boxaRef.current, {
            opacity: 1,
            height: 400,
            delay: .95,
            duration: 6.5,
            y: 350,
            ease: "power2.out",
            scrollTrigger: {
                trigger: allstarIntroRef.current,
                scroller: window,
                start: "top top",
                end: "bottom center",
                scrub: true,
                toggleActions: "restart pause reverse pause",
            }
        })

        gsap.to(boxbRef.current, {
            opacity: 1,
            height: 400,
            delay: 1.05,
            duration: 6.5,
            y: 150,
            ease: "power2.out",
            scrollTrigger: {
                trigger: boxaRef.current,
                scroller: window,
                start: "top 260px",
                end: "top center",
                endTrigger: boxbRef.current,
                scrub: true,
                toggleActions: "restart pause reverse pause",
            }
        })

        // recalculate after scroll reset
        ScrollTrigger.refresh()

    }, allstarContainerRef.current)

    return () => {
        ctx.current?.revert()
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
}, [id])

    return (
        <motion.div 
            ref={allstarContainerRef}
            className={styles.allstarContainer}>
            <motion.div 
                ref={allstarIntroRef}
                className={styles.allstarIntro}
            >
                <h2>
                    Court Hues
                </h2>
                <div 
                ref={boxFeatureRef}
                className={styles.boxa1}>
                    <img 
                        ref={imgRef}
                        src="/portfolioImg/allStar/allstarIntroBg.jpg" 
                        alt="All Star Project" 
                    />
                </div>
                <div 
                ref={boxaRef}
                className={styles.boxa} />
                <div 
                ref={boxbRef}
                className={styles.boxb} />
            </motion.div>
            <motion.div className={styles.section}>
                Box 1
            </motion.div>
            <motion.div className={styles.section}>
                Box 2
            </motion.div>
            <motion.div className={styles.section}>
                Box 3
            </motion.div> 
        </motion.div>
    )
}