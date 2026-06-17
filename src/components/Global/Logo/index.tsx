import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import type { Mesh, MeshStandardMaterial } from 'three'
import type { ThreeElements } from '@react-three/fiber'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
    nodes: {
        Asset_2: Mesh
    }
    materials: {
        'Material.001': MeshStandardMaterial
    }
}

type SelbyTextProps = ThreeElements['mesh'] & {
  glbPath?: string
  metalness?: number
  roughness?: number
  envMapIntensity?: number
  color?: string
}

export const SelbyText = ({
    glbPath = '/SelbyChrome3.glb',
    metalness = 1,
    roughness = 0.05,
    envMapIntensity = 2,
    color = '#c0c0c0',
    ...props
}: SelbyTextProps) => {
    const meshRef = useRef<Mesh>(null)
    const { nodes } = useGLTF(glbPath) as unknown as GLTFResult

    return (
    <mesh
      ref={meshRef}
      geometry={nodes.Asset_2.geometry}
      {...props}
    >
      <meshStandardMaterial
        color={color}
        metalness={metalness}
        roughness={roughness}
        envMapIntensity={envMapIntensity}
      />
    </mesh>
    )
}

useGLTF.preload('/SelbyChrome3.glb')
