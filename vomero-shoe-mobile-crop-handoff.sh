#!/bin/bash
# Vomero: fix the shoe images cropping too aggressively on mobile.
#
# Run from your selby.io repo root, on bugfix/layouts, after
# vomero-stack-spacing-handoff.sh has already been applied.
#
# What was wrong: .shoeImg used a fixed height: clamp(140px, 15vw, 190px)
# with a fluid width -- the box's own aspect ratio drifted at different
# viewport sizes because the height clamp bottomed out at 140px while
# width kept shrinking on mobile, making the box proportionally wider
# there than on desktop. That cropped one of the two shoe photos (the
# less-wide of the two source images) noticeably more on small screens.
#
# Fix: aspect-ratio: 2.2 / 1 (width: 100%, height: auto) instead of the
# fixed-height clamp, so width and height scale together and the crop
# amount stays consistent at every breakpoint. 2.2:1 splits the
# difference between the two source photos' own ratios (2.43:1, 2.0:1).
#
# Verified: tsc -b, vite build, eslint -- zero errors.
set -e

if [ ! -f "package.json" ] || [ ! -d "src" ]; then
  echo "ERROR: no package.json/src/ here ($(pwd))." >&2
  echo "cd into your selby.io repo root, then re-run." >&2
  exit 1
fi

if [ ! -d "src/components/Global/ProjectView/Projects/Color/Vomero" ]; then
  echo "ERROR: Vomero component folder not found -- are you on the bugfix/layouts branch?" >&2
  exit 1
fi

echo "Writing src/components/Global/ProjectView/Projects/Color/Vomero/Vomero.module.css..."
cat > src/components/Global/ProjectView/Projects/Color/Vomero/Vomero.module.css <<'FILEEOF'
.vomeroContainer {
  width: 100%;
  background-color: var(--ink);
}

.hero {
  position: relative;
  width: 100%;
  /* dvh accounts for mobile browser chrome (address bar) collapsing/
     expanding during scroll -- plain 100vh is measured against the
     *largest* possible viewport, so on mobile it can cause the pinned
     hero to visibly jump or clip as the chrome shows/hides mid-scroll.
     The 100vh line stays first as a fallback for browsers that don't
     support dvh -- they'll just ignore the second, invalid-to-them
     declaration and keep the first. */
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
}

.heroImage {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 62%;
  display: block;
}

/* Opacity is driven entirely by GSAP (see index.tsx) — this gradient is
   just the shape of the darkening: heavier at the bottom where the Brief
   text sits, lighter through the middle so the image itself still reads
   while dimmed. The 70% stop pulls the darkening in earlier (rather than
   only ramping up in the last 30%), and the bottom stop is darker than
   before -- the Brief copy was blending into the photo at initial load
   because that region wasn't dark enough on its own. */
.heroScrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.45) 0%,
    rgba(0, 0, 0, 0.15) 45%,
    rgba(0, 0, 0, 0.55) 70%,
    rgba(0, 0, 0, 0.94) 100%
  );
}

/* The initial-load focal point — centered on screen, separate from the
   bottom-left Brief block below. Fades in on mount, then dissolves out
   as the scroll-scrub reveal takes over (see index.tsx), so it never
   sits on top of the Brief copy once that's fully visible. */
.centerTitleWrap {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6vw;
  text-align: center;
  pointer-events: none;
}

.title {
  visibility: hidden;
  margin: 0;
  color: var(--cream);
  font-family: 'ThunderSemiBold', var(--sans);
  font-size: clamp(2.75rem, 7vw, 6.5rem);
  line-height: 1.02;
  letter-spacing: 0.01em;
  text-transform: uppercase;
}

.heroContent {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 4vw 5vw 6vw;
  max-width: 640px;
  color: var(--cream);
}

.eyebrow {
  font-family: 'Roboto', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.75;
  margin: 0 0 0.5em;
}

.copy {
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  max-width: 56ch;
  margin: 0;
}

/* Mirrors theperformancelab.ca's "OUR PROCESS" section (checked live):
   a sticky left column (heading + product imagery) that stays in view
   while a right column reveals a stacked deck of images as you scroll.
   Plain CSS sticky for the left column -- no GSAP pin, since nothing
   scrub-driven is tied to it, and sticky sidesteps the pin-height/
   mobile-jump complexity already dealt with on the hero above. */
.process {
  width: 100%;
  background: var(--ink);
  padding: clamp(4rem, 10vw, 7rem) 6vw;
}

.processGrid {
  display: grid;
  grid-template-columns: minmax(280px, 380px) 1fr;
  gap: clamp(2rem, 5vw, 5rem);
  max-width: 1400px;
  margin: 0 auto;
  /* No align-items: start here on purpose -- that sizes a grid item's
     own box down to its content height, which leaves .processSticky
     with no extra room to actually *stick* while scrolling (a sticky
     element's stick range is bounded by its own box, not the grid
     row). Default stretch spans the item's box to the full row
     height (matching the taller .processRight column), so it has
     room to stay pinned for the whole scroll through that column. */
}

.processSticky {
  position: sticky;
  top: clamp(88px, 12vh, 140px);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  /* .processSticky's own box is now stretched to the full row height
     (see .processGrid above) -- height: fit-content keeps its actual
     content (heading/copy/shoes) sized to itself and anchored at the
     top of that taller box, rather than trying to stretch its
     children to fill the extra space. */
  height: fit-content;
}

.processHeading {
  margin: 0;
  color: var(--cream);
  font-family: 'ThunderSemiBold', var(--sans);
  text-transform: uppercase;
  font-size: clamp(1.75rem, 3.2vw, 3rem);
  line-height: 1.05;
}

.processIntro {
  margin: 0;
  color: var(--cream);
  opacity: 0.85;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  max-width: 42ch;
}

.stickyShoes {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 0.5rem;
}

/* aspect-ratio (rather than a fixed clamp() height) on purpose -- a fixed
   height with a fluid width meant the box's own aspect ratio drifted at
   different viewport sizes (it got proportionally wider on mobile, since
   the height clamp bottomed out while the width kept shrinking), which
   cropped one of the two shoe photos more aggressively on small screens --
   the "cut off in the container" issue. Locking width and height together
   via aspect-ratio keeps the crop amount consistent at every breakpoint.
   2.2:1 splits the difference between the two source photos' own aspect
   ratios (2.43:1 and 2.0:1) so neither crops drastically more than the
   other, and object-fit: cover still fills the box completely regardless
   of how each photo was originally framed. */
.shoeImg {
  width: 100%;
  aspect-ratio: 2.2 / 1;
  height: auto;
  object-fit: cover;
  object-position: center;
  display: block;
  border-radius: 4px;
}

/* The stacked-reveal column. Tall on purpose -- it's the scroll
   "budget" the reveal timeline (see index.tsx) uses to sequence all 6
   images in one at a time. 60vh per image is a reasonable per-card
   scroll distance; shorten/lengthen this if the reveal feels too fast
   or too slow. */
.processRight {
  position: relative;
  min-height: calc(6 * 60vh);
}

/* The pinned "stage" the images stack into. Fixed size, right-aligned
   in the column (margin-left: auto) since images enter *from* the
   right and settle into a deck anchored there. margin-right pulls it
   in from the true edge of the section instead of sitting flush
   against it. aspect-ratio keeps it a sensible card shape regardless
   of the source images' own aspect ratios (they're cropped to fit via
   object-fit: cover on .stackImg). Width bumped to 380px per direct
   request. */
.stackSticky {
  position: sticky;
  top: clamp(88px, 12vh, 140px);
  width: 380px;
  aspect-ratio: 3 / 4;
  margin-left: auto;
  margin-right: clamp(1rem, 4vw, 3rem);
}

.stackItem {
  position: absolute;
  inset: 0;
}

.stackImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 6px;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.45);
}

@media (max-width: 768px) {
  .heroContent {
    padding: 8vw 6vw 10vw;
    max-width: 100%;
  }

  .copy {
    font-size: 0.9rem;
  }

  /* Single column on mobile/tablet -- sticky only makes sense next to
     a taller sibling column, so it's turned off here and the shoes
     just sit in normal flow above the reveal stack. */
  .processGrid {
    grid-template-columns: 1fr;
  }

  .processSticky {
    position: static;
    height: auto;
  }

  /* Smaller stage and less scroll budget per image on narrower
     screens -- the desktop sizing feels oversized/slow on mobile. */
  .processRight {
    min-height: calc(6 * 45vh);
  }

  .stackSticky {
    width: 260px;
    margin: 0 auto;
  }
}

/* Matches NavPill's own mobile breakpoint (see NavPill.module.css) --
   below 640px the pill becomes a full-width, opaque, fixed bottom bar
   (~96px tall) portaled to document.body, sitting on top of everything.
   Without this, the Brief text -- anchored to the bottom of a pinned
   100dvh hero -- would sit directly underneath it, same clipping issue
   already fixed on Dashboard/About/ProjectView. */
@media (max-width: 640px) {
  .heroContent {
    padding-bottom: calc(10vw + 96px);
  }
}
FILEEOF

echo ""
echo "Done. Next steps:"
echo "1. npx tsc -b && npx vite build && npx eslint src   (sanity check)"
echo "2. git add -A && git commit -m fix-vomero-shoe-mobile-crop"
