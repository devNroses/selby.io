import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Vomero.module.css'

gsap.registerPlugin(ScrollTrigger)

const PROCESS_IMAGES = [
    { src: '/portfolioImg/vomero/process/process-7.jpg', alt: '' },
    { src: '/portfolioImg/vomero/process/process-1.jpg', alt: '' },
    { src: '/portfolioImg/vomero/process/process-2.jpg', alt: '' },
    { src: '/portfolioImg/vomero/process/process-3.jpg', alt: '' },
    { src: '/portfolioImg/vomero/process/process-4.jpg', alt: '' },
    { src: '/portfolioImg/vomero/process/process-5.jpg', alt: '' },
    { src: '/portfolioImg/vomero/process/process-6.gif', alt: '' },
]

export const Vomero = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const heroRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const scrimRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const processRightRef = useRef<HTMLDivElement>(null)
    const stackRefs = useRef<(HTMLDivElement | null)[]>([])
    const ctx = useRef<gsap.Context | null>(null)

    useLayoutEffect(() => {
        if (
            !containerRef.current ||
            !heroRef.current ||
            !titleRef.current ||
            !scrimRef.current ||
            !contentRef.current ||
            !processRightRef.current
        ) return

        gsap.set(titleRef.current, { opacity: 0, y: 24, visibility: 'visible' })
        gsap.set(scrimRef.current, { opacity: 0.88 })
        gsap.set(contentRef.current, { opacity: 0, y: 32 })

        ctx.current = gsap.context(() => {
            gsap.to(titleRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.9,
                delay: 0.2,
                ease: 'power2.out',
            })

            gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: '+=100%',
                    scrub: 0.5,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            })
                
                .to(titleRef.current, { opacity: 0, y: -72, ease: 'none' }, 0)
                .to(scrimRef.current, { opacity: 0.90, ease: 'none' }, 0)
                .to(contentRef.current, { opacity: 1, y: 0, ease: 'none' }, 0)

            const stacks = stackRefs.current.filter(
                (el): el is HTMLDivElement => el !== null,
            )
            gsap.set(stacks, { opacity: 0 })

            const stackTl = gsap.timeline({
                scrollTrigger: {
                    trigger: processRightRef.current,
                    start: 'top center',
                    end: 'bottom bottom',
                    scrub: 0.5,
                },
            })

            stacks.forEach((el, i) => {
                const fanRotation = (i % 2 === 0 ? 1 : -1) * (i * 1.5)
                stackTl.fromTo(
                    el,
                    { opacity: 0, x: 140, y: i * 6 },
                    {
                        opacity: 1,
                        x: i * 10,
                        y: i * 10,
                        rotate: fanRotation,
                        ease: 'none',
                        duration: 1,
                    },
                    i,
                )
            })
        }, containerRef.current)

        const handleResize = () => ScrollTrigger.refresh()
        window.addEventListener('resize', handleResize)

        return () => {
            ctx.current?.revert()
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div ref={containerRef} className={styles.vomeroContainer}>
            <section ref={heroRef} className={styles.hero}>
                <img
                    className={styles.heroImage}
                    src="/portfolioImg/vomero/vomeroCover.jpg"
                    alt="Vomero Silver Line Pack — runner in motion on a track"
                />
                <div ref={scrimRef} className={styles.heroScrim} />

                <div className={styles.centerTitleWrap}>
                    <h1 ref={titleRef} className={styles.title}>
                        Vomero Silver Line Pack
                    </h1>
                </div>

                <div ref={contentRef} className={styles.heroContent}>
                    <p className={styles.eyebrow}>Brief</p>
                    <p className={styles.copy}>
                        Rooted in the legacy of the Air Max 97 “Silver Bullet,” the Silver
                        Line Pack is a two-shoe story about speed, systems, and the people
                        who make them run. Built on Nike’s most comfortable running
                        silhouette of 2025–26, the pack splits its narrative between the
                        bullet and the conductor — one shoe capturing the flash and
                        velocity of the machine, the other honoring the unseen workforce
                        that keeps every city moving. Two color-ways. One culture. A pack
                        for everyone who’s ever kept something running that the world
                        depends on.
                    </p>
                </div>
            </section>

            <section className={styles.process}>
                <div className={styles.processGrid}>
                    <div className={styles.processSticky}>
                        <p className={styles.eyebrow}>The Process</p>
                        <h2 className={styles.processHeading}>
                            Exploration Digital Archieve
                        </h2>
                        <p className={styles.processIntro}>
                            Built on the Vomero's ZoomX geometry and support structure, 
                            the Silver Line Pack carries the DNA of the Air Max 97 "Silver Bullet" 
                            into two distinct cultural narratives. One colorway chases the flash and 
                            velocity of the machine, street iconic, head-turning,the other honors the 
                            workforce that keeps the system moving. Same foundation, two stories, one culture.
                        </p>
                        <div className={styles.stickyShoes}>
                            <img
                                className={styles.shoeImg}
                                src="/portfolioImg/vomero/process/pack-1.png"
                                alt="Vomero Silver Line Pack — Silver Bullet colorway"
                            />
                            <img
                                className={styles.shoeImg}
                                src="/portfolioImg/vomero/process/pack-2.png"
                                alt="Vomero Silver Line Pack — Conductor colorway"
                            />
                        </div>
                    </div>

                    <div ref={processRightRef} className={styles.processRight}>
                        <div className={styles.stackSticky}>
                            {PROCESS_IMAGES.map((img, i) => (
                                <div
                                    key={img.src}
                                    ref={(el) => { stackRefs.current[i] = el }}
                                    className={styles.stackItem}
                                    style={{ zIndex: i + 1 }}
                                >
                                    <img className={styles.stackImg} src={img.src} alt={img.alt} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
