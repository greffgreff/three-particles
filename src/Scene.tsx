import { useVideoConfig } from 'remotion'
import { ThreeCanvas } from '@remotion/three'
import { Dust } from './Dust'
import { DoubleSide, TextureLoader } from 'three'

export const SpaceDust = () => {
  const { width, height } = useVideoConfig()

  const backgroundImage =
    'https://cdnb.artstation.com/p/assets/images/images/030/755/647/large/jasmin-habezai-fekri-landscape1.jpg?1601551984'

  const texture = new TextureLoader().load(backgroundImage)

  return (
    <ThreeCanvas
      width={width}
      height={height}
      camera={{ fov: 100, position: [0, 0, 30] }}
    >
      <Dust />
    </ThreeCanvas>
  )
}
