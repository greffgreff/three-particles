import React, { useRef } from 'react'
import { useVideoConfig } from 'remotion'
import { ThreeCanvas } from '@remotion/three'
import { TextureLoader } from 'three'
import { useLoader } from '@react-three/fiber'
import { Dust } from './Dust'

export const Scene = () => {
  const { width, height } = useVideoConfig()

  const backgroundImage =
    'https://cdnb.artstation.com/p/assets/images/images/030/755/647/large/jasmin-habezai-fekri-landscape1.jpg?1601551984'

  const texture = useLoader(TextureLoader, backgroundImage)

  return (
    <ThreeCanvas
      width={width}
      height={height}
      camera={{ fov: 100, position: [0, 0, 30] }}
    >
      <mesh position={[0, 0, -380]}>
        <planeGeometry args={[texture.image.width, texture.image.height]} />
        <meshBasicMaterial map={texture} />
      </mesh>
      <Dust />
    </ThreeCanvas>
  )
}
