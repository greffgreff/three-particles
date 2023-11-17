import { Composition } from 'remotion'
import { SpaceDust } from './Scene'

// Remotion Docs:
// https://remotion.dev/docs

// @remotion/three Docs:
// https://remotion.dev/docs/three

// React Three Fiber Docs:
// https://docs.pmnd.rs/react-three-fiber/getting-started/introduction

export const RemotionVideo: React.FC = () => {
  return (
    <Composition
      id="Scene"
      component={SpaceDust}
      durationInFrames={60*60*2}
      fps={60}
      width={1920}
      height={1080}
    />
  )
}
