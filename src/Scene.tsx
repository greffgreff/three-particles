import { interpolate, useVideoConfig, useCurrentFrame } from 'remotion'
import { ThreeCanvas } from '@remotion/three'
import { Dust } from './Dust'
import { Background } from './Background'

export const Scene = () => {
  const { width, height, fps } = useVideoConfig()
  const frame = useCurrentFrame()

  const fadeDuration = 100
  const fadeStartTime = 2

  const fadeStart = fps * fadeStartTime

  const blur = interpolate(frame, [fadeStart, fadeDuration + fadeStart], [5, 0])

  return (
    <div style={{ filter: `blur(${blur}px)`, transform: 'scale(1.03)' }}>
      <ThreeCanvas
        width={width}
        height={height}
        camera={{ fov: 100, position: [0, 0, 30] }}
      >
        <Dust count={200} />
        <Background />
      </ThreeCanvas>
    </div>
  )
}
