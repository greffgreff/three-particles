import { TextureLoader } from 'three'
import { useLoader } from '@react-three/fiber'

export const Background = () => {
  const backgroundImage =
    'https://cdnb.artstation.com/p/assets/images/images/030/755/647/large/jasmin-habezai-fekri-landscape1.jpg?1601551984'

  const texture = useLoader(TextureLoader, backgroundImage)

  return (
    <mesh position={[0, 0, -380]}>
      <planeGeometry args={[texture.image.width, texture.image.height]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  )
}
