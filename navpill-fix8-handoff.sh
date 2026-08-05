#!/bin/bash
# Run this from the root of your selby.io repo (the folder with package.json
# and your real src/ directory), on branch fix/dashboard-blank-flash.
#
# Fixes the blank gray box in the profile panel you saw on a real iPhone
# over a weak connection: WordmarkScene's HDR lighting map and GLB model
# both load behind one Suspense with fallback: null, so a stalled/failed
# fetch on either one blanks the whole 3D panel instead of just degrading.
#
# - Preloads the HDR file the same way the GLB already preloads.
# - Splits <Environment> into its own inner Suspense so a slow HDR load
#   doesn't block the model (which has a head start) from showing.
# - New Global/ErrorBoundary component, wrapped around Profile's
#   WordmarkScene usage, to catch a genuinely failed (not just slow)
#   asset fetch -- there was no error boundary anywhere in the app before.
set -e

mkdir -p src/components/Global/ErrorBoundary

# Sanity check: fail loudly instead of silently creating stray folders
# if this isn't run from the actual repo root.
for f in src/components/Global/WordmarkScene/index.tsx src/components/Dashboard/Profile/index.tsx; do
  if [ ! -f "$f" ]; then
    echo "ERROR: $f not found." >&2
    echo "You are running this from $(pwd), which does not look like the selby.io repo root." >&2
    echo "cd into the folder that contains package.json and your real src/ directory, then re-run." >&2
    exit 1
  fi
done

cat > src/components/Global/WordmarkScene/index.tsx <<'FILEEOF'
import { Suspense, useEffect, useRef } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Environment, useEnvironment, Center, Bounds } from '@react-three/drei'
import { ACESFilmicToneMapping, Group } from 'three'
import { SelbyText } from '../Logo'

const HDR_PATH = '/THAZERO-WORLD-TEXTURE.hdr'

// Mirrors Logo's useGLTF.preload() — kicks the HDR fetch off the moment
// this chunk evaluates, rather than waiting for <Environment> to mount
// and request it.
useEnvironment.preload({ files: HDR_PATH })

// Shared behind a single dynamic import() so the whole three.js /
// @react-three/fiber / @react-three/drei / three-stdlib graph loads as
// one lazily-fetched chunk instead of shipping in the main bundle.
// Both the Hero wordmark and the Dashboard profile panel render the
// same rotating logo, so they share this chunk rather than each
// bundling their own copy of the scene graph.

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

interface WordmarkSceneProps {
  /** Adjusts camera distance to viewport width. Hero wants this; the
   * smaller, fixed-size Profile panel doesn't need it. */
  responsive?: boolean
}

export const WordmarkScene = ({ responsive = false }: WordmarkSceneProps) => (
  <Canvas
    camera={{ position: [0, 0, 7], fov: 50 }}
    gl={{ antialias: true, toneMapping: ACESFilmicToneMapping }}
    frameloop="always"
  >
    {responsive && <ResponsiveCamera />}
    {/* Own inner Suspense boundary, separate from the outer one this
       whole scene is already loaded behind (see Profile/HeroPage) — on
       a slow/flaky connection the HDR lighting map can stall well after
       the model itself (preloaded above) is ready. Without this, that
       stall blocks the *entire* outer Suspense (fallback: null), so the
       whole canvas — model included — sits blank indefinitely. Splitting
       it out means the rotating wordmark still shows up, just without
       the environment-map sheen until it finishes loading. */}
    <Suspense fallback={null}>
      <Environment files={HDR_PATH} background={false} />
    </Suspense>
    <Bounds fit clip observe margin={0.65}>
      <RotatingText />
    </Bounds>
  </Canvas>
)

export default WordmarkScene
FILEEOF

cat > src/components/Global/ErrorBoundary/index.tsx <<'FILEEOF'
import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  /** Rendered in place of children once an error is caught. Defaults to
   * null so the boundary just quietly gives up rather than crashing
   * whatever it's embedded in. */
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

/**
 * Minimal catch-all for render-time errors in a subtree — React only
 * has a class-component API for this, no hook equivalent exists.
 *
 * First use case: WordmarkScene's Suspense-integrated asset loaders
 * (useGLTF/useEnvironment) throw if a fetch genuinely fails (bad
 * network, 404, decode error) rather than just being slow — Suspense
 * alone only covers the "still loading" case. Without a boundary
 * somewhere above it, that throw has nothing to catch it and can take
 * out more of the tree than just the 3D panel that failed.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    // Swallow it past this point, but don't swallow it silently —
    // still worth seeing in the console if it happens.
    console.error('ErrorBoundary caught:', error)
  }

  render() {
    if (this.state.hasError) return this.props.fallback ?? null
    return this.props.children
  }
}
FILEEOF

cat > src/components/Dashboard/Profile/index.tsx <<'FILEEOF'
import { lazy, Suspense } from 'react'
import { ErrorBoundary } from '../../Global/ErrorBoundary'
import styles from './Profile.module.css'

// Same shared chunk the Hero page uses for its rotating wordmark —
// fetched once, cached, and never bundled into either route's
// critical-path JS.
const WordmarkScene = lazy(() =>
  import('../../Global/WordmarkScene').then((m) => ({ default: m.WordmarkScene }))
)

export const Profile = () => {
    return (
        <div className={styles.profileWrapper}>
            {/* A genuinely failed asset fetch (bad network, not just
               slow) throws past Suspense's "still loading" handling —
               catch it here so a flaky connection loses the animated
               logo, not more of the page than that. profileWrapper's
               own gradient background already reads fine as an empty
               state underneath. */}
            <ErrorBoundary>
                <Suspense fallback={null}>
                    <WordmarkScene />
                </Suspense>
            </ErrorBoundary>
            <div className={styles.profileDesc}>
                <div className={styles.profileContent}>
                    <div className={styles.profileTitle}>
                        <p>Design<br></br>Engineer</p>
                        <p>Color<br></br>Architect</p>
                        <p>Creative<br></br>Navigator</p>
                    </div>
                    <div className={styles.description}>
                        <p>Navigating creative worlds with intent.</p>
                    </div>
                </div>
                <div className={styles.profileBackdrop} />
            </div>
        </div>
    )
}
FILEEOF

echo "Made the profile 3D wordmark resilient to slow/failed network loads."
echo ""
echo "NEXT STEPS:"
echo "1. git add src/components/Global/WordmarkScene/index.tsx src/components/Global/ErrorBoundary/index.tsx src/components/Dashboard/Profile/index.tsx"
echo "2. git commit -m 'fix(profile): make the 3D wordmark resilient to slow/failed asset loads'"
echo "3. git push when happy."

