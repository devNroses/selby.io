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
    const boxaRef = useRef<HTMLDivElement>(null)
    const boxbRef = useRef<HTMLDivElement>(null)
    const horizontalSectionRef = useRef<HTMLDivElement>(null)
    const horizontalTrackRef = useRef<HTMLDivElement>(null)
    const ctx = useRef<gsap.Context | null>(null)

    useLayoutEffect(() => {
        if(!allstarContainerRef.current ||
            !allstarIntroRef.current ||
            !boxaRef.current ||
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
        // starts slightly zoomed in so the reveal has some motion to it
        // instead of a flat opacity pop — settles to scale 1 below.
        gsap.set(imgRef.current, { opacity: 0, scale: 1.08, visibility: 'visible' })
        // boxa/boxb now rest at an explicit top/left in CSS (see
        // Allstar.module.css) instead of the old negative-margin hack, so
        // they no longer need a big compensating y-transform here — just
        // a small settle-in-place as they grow open.
        gsap.set(boxaRef.current, { opacity: 0, height: 0, y: 24, visibility: 'visible' })
        gsap.set(boxbRef.current, { opacity: 0, height: 0, y: 24, visibility: 'visible' })

        ctx.current = gsap.context(() => {

            // One timeline instead of two independently-delayed tweens —
            // the headline settles in, then the hero image cross-dissolves
            // in on its heels (overlapping via the negative offset) rather
            // than popping in nearly 2.5s later on its own. Reads as one
            // choreographed beat instead of two coincidentally-timed ones.
            gsap.timeline({ delay: 0.3 })
                .to(introElement.querySelectorAll('h2'), {
                    opacity: 1,
                    y: 10,
                    duration: 0.9,
                    ease: "circ.out",
                })
                .to(imgRef.current, {
                    opacity: 1,
                    scale: 1,
                    duration: 1.1,
                    ease: "power2.out",
                }, "-=0.55")

            // Scroll-linked reveals: dropped `delay`/long `duration` and
            // `toggleActions` here — both are dead weight once `scrub` is
            // set. `toggleActions` has no effect under scrub, and `delay`
            // just eats the first chunk of the scroll range as a dead zone
            // before anything visibly moves. Scroll position should map
            // straight to progress with nothing hidden behind it.
            gsap.to(boxaRef.current, {
                opacity: 1,
                height: 400,
                y: 0,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: allstarIntroRef.current,
                    start: "top top",
                    end: "bottom center",
                    scrub: true,
                }
            })

            gsap.to(boxbRef.current, {
                opacity: 1,
                height: 320,
                y: 0,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: imgRef.current,
                    start: "top 210px",
                    end: "top top",
                    endTrigger: boxbRef.current,
                    scrub: true,
                }
            })

           if (!isMobile) {
                const horizontalTween = gsap.to(track, {
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

                // The gallery boxes used to just sit there fully visible
                // for the entire horizontal pan — nothing marked the
                // moment a piece actually arrived in frame. Now each one
                // settles in (fade + slight scale-up) as it crosses into
                // view. `containerAnimation` remaps the horizontal pan
                // into this trigger's coordinate space, so "left"/"right"
                // below behave the way "top"/"bottom" would for an
                // ordinary vertical reveal.
                const panels = gsap.utils.toArray<HTMLElement>(
                    track.querySelectorAll('[class*="boxlrg"]')
                )
                gsap.set(panels, { opacity: 0, scale: 0.94 })
                panels.forEach((panel) => {
                    gsap.to(panel, {
                        opacity: 1,
                        scale: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: panel,
                            containerAnimation: horizontalTween,
                            start: "left 90%",
                            end: "left 55%",
                            scrub: true,
                        }
                    })
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
                <div className={styles.boxa1}>
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

            {/* was a bare motion.div with no initial/animate at all — it
                just appeared fully-formed the instant it scrolled into
                view, the only section on the page with no reveal of its
                own. whileInView + viewport once:true fades/slides it up
                the first (and only) time it crosses into frame. */}
            <motion.div
                className={styles.section}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
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
                                onLoadedData={(e) => { e.currentTarget.style.opacity = '1' }}
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
                                onLoadedData={(e) => { e.currentTarget.style.opacity = '1' }}
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
                                onLoadedData={(e) => { e.currentTarget.style.opacity = '1' }}
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
                                onLoadedData={(e) => { e.currentTarget.style.opacity = '1' }}
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
                                onLoadedData={(e) => { e.currentTarget.style.opacity = '1' }}
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
