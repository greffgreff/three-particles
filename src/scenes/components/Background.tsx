import { useEffect } from 'react'
import { TextureLoader } from 'three'
import { useLoader } from '@react-three/fiber'
import { colord } from 'colord'
import Vibrant from 'node-vibrant'

interface BackgroundProps {
  onPalette?: (color: string[]) => void
}

export const Background = ({ onPalette }: BackgroundProps) => {
  const backgroundImage =
    'https://cdna.artstation.com/p/assets/images/images/041/465/030/large/margarita-aivazian-dh5-2.jpg?1631775498'
  const texture = useLoader(TextureLoader, backgroundImage)

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
    <mesh position={[0, 0, -420]}>
      <planeGeometry args={[texture.image.width, texture.image.height]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  )
}
