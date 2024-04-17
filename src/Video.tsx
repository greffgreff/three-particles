import { Composition } from 'remotion'
import { Scene } from './Scene'

export const Video = () => {
  return (
    <Composition
      id="scene"
      component={Scene}
      durationInFrames={60 * 20}
      fps={60}
      width={1920}
      height={1080}
    />
  )
}
