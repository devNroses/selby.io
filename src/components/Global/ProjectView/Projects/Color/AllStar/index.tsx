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
    const boxFeatureRef = useRef<HTMLDivElement>(null)
    const boxaRef = useRef<HTMLDivElement>(null)
    const boxbRef = useRef<HTMLDivElement>(null)
    const ctx = useRef<gsap.Context | null>(null)

    useLayoutEffect(() => {
        if(!allstarContainerRef.current || 
            !
allstarIntroRef.current ||
            !boxaRef.current ||
            !boxbRef.current
        ) return

        const introElement = allstarIntroRef.current
        ctx.current = gsap.context(() => {
            gsap.fromTo(
                introElement.querySelectorAll('h2'),
                { opacity: 0, y: 50 },
                {
                    opacity: 1, 
                    y: 0,
                    duration: 0.85,
                    delay: 0.5,
                    stagger: 0.35,
                    ease: "circ.out",
                }
            );
            gsap.fromTo(boxaRef.current, 
                { opacity: 0, height: 0, y: 260 },
            {
                opacity: 1,
                height: 400,
                duration: 6.5,
                y: 200,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: allstarIntroRef.current,
                    scroller: window,
                    start: "top top",
                    end: "bottom center",
                    scrub: true,
                    toggleActions: "restart pause reverse pause",
                    // markers: true, // shows start/end markers in browser
                }
            }
            ),
            gsap.fromTo(boxbRef.current,
                { opacity: 0, height: 0, y: 200 },
            {
                opacity: 1,
                height: 400,
                duration: 6.5,
                y: 150,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: boxaRef.current,
                    scroller: window,
                    start: "top 245px",
                    end: "top center",
                    endTrigger: boxbRef.current,
                    scrub: true,
                    toggleActions: "restart pause reverse pause",
                    // markers: true, // shows start/end markers in browser
                }
            }
            )
        }, allstarContainerRef.current)

        return () => {
            ctx.current?.revert() // cleans up on unmount
            ScrollTrigger.getAll().forEach(trigger => trigger.kill()) // kills all ScrollTriggers
        }
    }, [id]) // re-run effect if id changes

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
                    <img src="/portfolioImg/allStar/allstarIntroBg.jpg" alt="All Star Project" />
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