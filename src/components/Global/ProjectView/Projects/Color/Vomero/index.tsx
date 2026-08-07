import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Vomero.module.css'

gsap.registerPlugin(ScrollTrigger)

// The right-column images are placeholder/stand-in content (per user
// confirmation) — not real Vomero production photography. Swap these
// out for real process shots whenever they're ready; nothing else in
// the reveal logic below needs to change.
const PROCESS_IMAGES = [
    { src: '/portfolioImg/vomero/process/process-1.jpg', alt: '' },
    { src: '/portfolioImg/vomero/process/process-2.jpg', alt: '' },
    { src: '/portfolioImg/vomero/process/process-3.jpg', alt: '' },
    { src: '/portfolioImg/vomero/process/process-4.jpg', alt: '' },
    { src: '/portfolioImg/vomero/process/process-5.jpg', alt: '' },
    { src: '/portfolioImg/vomero/process/process-6.gif', alt: '' },
]

// Mirrors about.nike.com/en/magazine's article hero (checked live): the
// cover image starts dim under a dark scrim, the whole section pins in
// place while you scroll, the scrim fades off and the brief text rises
// into position, then it releases into normal content. Modeled on the
// same gsap.context/ScrollTrigger pattern AllStar already uses.
//
// The title is its own separate layer, centered on screen — it's the
// initial-load focal point (like AllStar's giant centered intro h2),
// not part of the bottom-left Brief block. It fades in on mount, then
// rises up and out as the scroll-scrub reveal takes over below, timed
// to the same 0-1 progress as the Brief block's entrance so the two
// motions read as a single handoff (title exits up, Brief rises into
// place) rather than two unrelated animations.
//
// The process section below mirrors theperformancelab.ca's "OUR
// PROCESS / How elite performance actually gets built" section
// (checked live): a sticky left column (heading + product imagery)
// stays in place while a right column of content scrolls past it.
// That's plain CSS `position: sticky`, not a GSAP pin — sticky is the
// right tool here since there's no scrub-driven reveal tied to it, and
// it sidesteps all the pin-height/mobile-jump issues already dealt
// with on the hero above. Each right-column image gets its own
// ScrollTrigger that slides it in from the right as it enters the
// viewport (toggleActions so it reverses if you scroll back up past
// it, rather than a one-shot play).
export const Vomero = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const heroRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const scrimRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const revealRefs = useRef<(HTMLDivElement | null)[]>([])
    const ctx = useRef<gsap.Context | null>(null)

    useLayoutEffect(() => {
        if (
            !containerRef.current ||
            !heroRef.current ||
            !titleRef.current ||
            !scrimRef.current ||
            !contentRef.current
        ) return

        gsap.set(titleRef.current, { opacity: 0, y: 24, visibility: 'visible' })
        gsap.set(scrimRef.current, { opacity: 0.88 })
        gsap.set(contentRef.current, { opacity: 0, y: 32 })

        ctx.current = gsap.context(() => {
            // Initial-load entrance for the centered title — plays once
            // on mount, independent of scroll.
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
                    // Pin for a full extra viewport of scroll distance —
                    // this is the "sticky until the next section" part.
                    // Bump this if the reveal should take longer to play out.
                    end: '+=100%',
                    // A numeric scrub (rather than `true`) adds a short lerp
                    // lag between scroll position and animation progress.
                    // `scrub: true` maps 1:1 to raw scroll delta, so on a
                    // mouse wheel (coarse, discrete deltas) the animation
                    // visibly jumps in chunks each tick — trackpads feel
                    // smoother only because their deltas are finer-grained.
                    // 0.5s of smoothing makes both input types feel
                    // continuous instead of stepped.
                    scrub: 0.5,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            })
                // Title rises further and exits up while the Brief block
                // (below) rises into place over the same span, so it reads
                // as one continuous handoff instead of an unrelated fade.
                .to(titleRef.current, { opacity: 0, y: -72, ease: 'none' }, 0)
                .to(scrimRef.current, { opacity: 0.88, ease: 'none' }, 0)
                .to(contentRef.current, { opacity: 1, y: 0, ease: 'none' }, 0)

            // Right-column reveals — each image slides in from the right
            // and fades up independently as it crosses into view. Not
            // pinned, not scrubbed: this is a plain one-shot-per-item
            // scroll reveal, the same pattern used for basic editorial
            // "content enters as you scroll" sections.
            revealRefs.current.forEach((el) => {
                if (!el) return
                gsap.fromTo(
                    el,
                    { opacity: 0, x: 72 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    },
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
                            How the Silver Line Pack comes together
                        </h2>
                        <p className={styles.processIntro}>
                            Every pack starts from the same foundation — the Vomero last,
                            its ZoomX geometry, its support structure. From there the two
                            colorways diverge: one chasing the flash and velocity of the
                            machine, the other honoring the workforce that keeps it running.
                            Same source material, two different stories.
                        </p>
                        <div className={styles.stickyShoes}>
                            <img
                                className={styles.shoeImg}
                                src="/portfolioImg/vomero/process/process/pack-1.png"
                                alt="Vomero Silver Line Pack — Silver Bullet colorway"
                            />
                            <img
                                className={styles.shoeImg}
                                src="/portfolioImg/vomero/process/process/pack-2.png"
                                alt="Vomero Silver Line Pack — Conductor colorway"
                            />
                        </div>
                    </div>

                    <div className={styles.processRight}>
                        {PROCESS_IMAGES.map((img, i) => (
                            <div
                                key={img.src}
                                ref={(el) => { revealRefs.current[i] = el }}
                                className={styles.revealItem}
                            >
                                <img className={styles.revealImg} src={img.src} alt={img.alt} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
