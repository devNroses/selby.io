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
    const horizontalSectionRef = useRef<HTMLDivElement>(null)
    const horizontalTrackRef = useRef<HTMLDivElement>(null)
    const ctx = useRef<gsap.Context | null>(null)

    useLayoutEffect(() => {
        if(!allstarContainerRef.current ||
            !allstarIntroRef.current ||
            !boxaRef.current ||
            !boxFeatureRef.current ||
            !boxbRef.current ||
            !horizontalTrackRef.current ||
            !horizontalSectionRef.current ||
            !imgRef.current
        ) return

        window.scrollTo(0, 0)
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0

        const introElement = allstarIntroRef.current
        const track = horizontalTrackRef.current
        const section = horizontalSectionRef.current
        const isMobile = window.innerWidth <= 768

        // set initial states
        gsap.set(introElement.querySelectorAll('h2'), { opacity: 0, y: 40, visibility: 'visible' })
        gsap.set(imgRef.current, { opacity: 0, visibility: 'visible' })
        gsap.set(boxaRef.current, { opacity: 0, height: 0, y: 380, visibility: 'visible' })
        gsap.set(boxbRef.current, { opacity: 0, height: 0, y: 480, visibility: 'visible' })

        ctx.current = gsap.context(() => {

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
                delay: 2.5,
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
                    start: "top top",
                    end: "bottom center",
                    scrub: true,
                    toggleActions: "restart pause reverse pause",
                }
            })

            gsap.to(boxbRef.current, {
                opacity: 1,
                height: 320,
                delay: 1.05,
                duration: 6.5,
                y: 220,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: imgRef.current,
                    start: "top 210px",
                    end: "top top",
                    endTrigger: boxbRef.current,
                    scrub: true,
                    toggleActions: "restart pause reverse pause",
                }
            })

            // horizontal scroll — inside context, no setTimeout
            console.log('section:', section.offsetWidth, section.offsetHeight)
            console.log('track:', track.scrollWidth, track.scrollHeight)
            console.log('panels:', track.children.length)
            
           if (!isMobile) {
                gsap.to(track, {
                    x: () => -(track.scrollWidth - section.offsetWidth),
                    ease: "none",
                    scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: () => `+=${track.scrollWidth - section.offsetWidth}`,
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    }
                })
            }
        }, allstarContainerRef.current)

        const handleResize = () => {
            ScrollTrigger.refresh()
        }

        window.addEventListener('resize', handleResize)
        // // refresh after context is set up
        // ScrollTrigger.refresh()

        return () => {
            ctx.current?.revert()
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
            window.removeEventListener('resize', handleResize)
        }
    }, [id])

    return (
        <div
            ref={allstarContainerRef}
            className={styles.allstarContainer}
        >
            <div
                ref={allstarIntroRef}
                className={styles.allstarIntro}
            >
                <h2>Court Hues</h2>
                <div ref={boxFeatureRef} className={styles.boxa1}>
                    <img
                        ref={imgRef}
                        src="/portfolioImg/allStar/allstarIntroBg.jpg"
                        alt="All Star Project"
                    />
                </div>
                <div ref={boxaRef} className={styles.boxa}>
                    <img src="/portfolioImg/allStar/stephObamas.jpg" alt="step and obama at allstar 26"/>
                </div>
                <div ref={boxbRef} className={styles.boxb}>
                    <img src="/portfolioImg/allStar/allstarShootingShirts.jpg" alt="nba allstar 26 shai and murray"/>
                </div>
            </div>

            <motion.div className={styles.section}>
                <div className={styles.breifWrapper}>
                    <div className={styles.briefContext}>
                        <h3>The Brief</h3>
                        <p>
                            The All-Star Game is where the league’s elite converge,
                            set against the energy of one of the world’s most 
                            iconic cities.<br /><br />
                            This wasn’t about standard issue warmups.
                            It was about energy you could see, texture you could feel, and a color
                            story rooted in the DNA of LA sun-faded tones, late-night glow,
                            and the contrast of street and spotlight.
                        </p>
                        <p>
                            <span>My role:</span><br />
                            Tasked with capturing the essence of Los Angeles through color,
                            while complementing the NBA GSA team’s jersey vision and elevating
                            the warm-up, jackets, pants, and shooting shirts, into a more
                            expressive, unified system.
                        </p>
                    </div>
                    <div className={styles.briefInfoWrapper}>
                        <div className={styles.briefInfo}>
                            <h4>Company</h4>
                            <p>Nike</p>
                        </div>
                        <div className={styles.briefInfo}>
                            <h4>Industry</h4>
                            <p>Nike Basketball: NBA License</p>
                        </div>
                        <div className={styles.briefInfo}>
                            <h4>Team Role</h4>
                            <p>Color Design Lead</p>
                        </div>
                        
                    </div>
                </div>
            </motion.div>

            <div className={styles.horizontalWrapper}>
                <div ref={horizontalSectionRef} className={styles.horizontalSection}>
                    <div ref={horizontalTrackRef} className={styles.horizontalTrack}>
                        <div className={styles.horizontalPanel}>
                            <div className={styles.boxlrg} style={{maxWidth: '600px'}}>
                                 <img src="/portfolioImg/allStar/allstarMoodboard.png" alt="Color moodboard for All Star concept"/>
                            </div>
                            <div className={styles.boxlrg}>
                                 <img 
                                    src="/portfolioImg/allStar/swatches.png" 
                                    alt="Explored swatches for shirt and merch"
                                    style={{ objectPosition: 'center center' }}
                                />
                            </div>
                            <div className={`${styles.boxlrg} ${styles.boxlrgWide}`} style={{maxWidth: '400px'}}>
                                <video
                                src={'/portfolioImg/allStar/allstarStripes_26.mov'}
                                autoPlay
                                loop
                                muted
                                playsInline
                                />
                            </div>
                        </div>
                        <div className={styles.horizontalPanel}>
                            <div className={styles.boxlrg}>
                                 <img src="/portfolioImg/allStar/dBook.jpg" alt="Devin booker in All Star 26 Jacket"/>
                            </div>
                            <div className={`${styles.boxlrg}`}>
                                <video
                                src={'/portfolioImg/allStar/socialResponse.mp4'}
                                autoPlay
                                loop
                                muted
                                controls
                                playsInline
                                />
                            </div>
                            <div className={styles.boxlrg}>
                                 <img src="/portfolioImg/allStar/allstarMaxey.jpg" alt="Maxxey in All Star 26"/>
                            </div>
                        </div>
                        <div className={styles.horizontalPanel}>
                            <div className={`${styles.boxlrg} ${styles.boxlrgWide}`}>
                                <video
                                src={'/portfolioImg/allStar/AntManAllStar.mov'}
                                autoPlay
                                loop
                                muted
                                playsInline
                                />
                            </div>
                            <div className={styles.boxlrg}>
                                <img src="/portfolioImg/allStar/allstarAntMvp.jpg" alt="Anthony Edwards" />
                            </div>
                        </div>
                        <div className={styles.horizontalPanel}>
                            <div className={styles.boxlrg}>
                                 <video
                                src={'/portfolioImg/allStar/kdBronIntros.mov'}
                                autoPlay
                                loop
                                muted
                                playsInline
                                />
                            </div>
                            <div className={styles.boxlrg}>
                                <img src="/portfolioImg/allStar/socialPost.jpg" alt="Instagram Post reacting to all star warm ups" />
                            </div>
                            <div className={styles.boxlrg}>
                                 <video
                                src={'/portfolioImg/allStar/wambawambaclip.mov'}
                                autoPlay
                                loop
                                muted
                                playsInline
                                />
                            </div>
                        </div>
                        {/* <div className={styles.horizontalPanel}>
                            <div className={styles.boxlrg}></div>
                            <div className={styles.boxlrg}></div>
                            <div className={styles.boxlrg}></div>
                        </div> */}
                    </div>
                </div>
            </div>

            {/* <motion.div className={styles.section}>
                [ Box 3: Other Projects section ]
            </motion.div> */}
        </div>
    )
}