// types.d.ts — augment R3F's JSX namespace if needed
import { Object3DNode } from '@react-three/fiber'
import { Mesh } from 'three'

declare module '@react-three/fiber' {
  interface ThreeElements {
    selbyText: Object3DNode<Mesh, typeof Mesh>
  }
}