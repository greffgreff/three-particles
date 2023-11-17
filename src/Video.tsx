import { Composition } from 'remotion'
import { Scene } from './Scene'

export const Video = () => {
  return (
    <Composition
      id="Scene"
      component={Scene}
      durationInFrames={60 * 60 * 2}
      fps={60}
      width={1920}
      height={1080}
    />
  )
}
