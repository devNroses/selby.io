import { useEffect, useRef } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Environment, Center, Bounds } from '@react-three/drei'
import { ACESFilmicToneMapping, Group } from 'three'
import { SelbyText } from '../Logo'

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
    <Environment files="/THAZERO-WORLD-TEXTURE.hdr" background={false} />
    <Bounds fit clip observe margin={0.65}>
      <RotatingText />
    </Bounds>
  </Canvas>
)

export default WordmarkScene
