import { useEffect, useRef } from 'react'
import { PointLight, TextureLoader } from 'three'
import { useLoader, useFrame } from '@react-three/fiber'
import { colord } from 'colord'
import Vibrant from 'node-vibrant'

interface BackgroundProps {
  onPalette?: (color: string[]) => void
}

export const Background = ({ onPalette }: BackgroundProps) => {
  const backgroundImage =
    'https://cdna.artstation.com/p/assets/images/images/041/465/030/large/margarita-aivazian-dh5-2.jpg?1631775498'
  const texture = useLoader(TextureLoader, backgroundImage)
  const light1 = useRef<PointLight>(null)
  const light2 = useRef<PointLight>(null)

  useFrame(({ clock }) => {
    const frequency1 = 0.3
    const intensity1 = Math.sin(clock.elapsedTime * frequency1) * 1 + 6
    const frequency2 = 0.5
    const intensity2 = Math.sin(clock.elapsedTime * frequency2) * 1.5 + 5

    light1.current!.intensity = intensity1
    light2.current!.intensity = intensity2
  })

  useEffect(() => {
    Vibrant.from(backgroundImage).getPalette().then(sortPalette).then(onPalette)
  }, [])

  const sortPalette = (palette: any) => {
    const toHex = Object.keys(palette).map((color) => palette[color]!.hex)
    const sorted = toHex
      .sort((c1, c2) => colord(c2).brightness() - colord(c1).brightness())
      .reverse()
    sorted.push('white')
    return sorted
  }

  return (
    <>
      <pointLight
        ref={light1}
        color="lightblue"
        position={[-5000, 5000, 500]}
      />
      <pointLight
        ref={light2}
        color="lightyellow"
        position={[-5000, 5000, 500]}
      />

      <mesh position={[0, 0, -420]}>
        <planeGeometry args={[texture.image.width, texture.image.height]} />
        <meshLambertMaterial map={texture} />
      </mesh>
    </>
  )
}
