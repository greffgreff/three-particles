import { useState } from 'react'
import {
  useVideoConfig,
  useCurrentFrame,
  AbsoluteFill,
  Audio,
  staticFile,
} from 'remotion'
import { ThreeCanvas } from '@remotion/three'
import { Dust } from './components/Dust'
import { Background } from './components/Background'
import { Logo } from './components/Logo'
import { interpolateByDuration } from '../utils/easing'

export const Scene = () => {
  const { width, height, fps } = useVideoConfig()
  const frame = useCurrentFrame()
  const [palette, setPalette] = useState<string[]>()

  const blur = interpolateByDuration(frame, fps, 2, 2, [5, 0])
  const scale = interpolateByDuration(frame, fps, 0, 7, [0.5, 0.6])

  return (
    <>
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          transform: `scale(${scale})`,
        }}
      >
        <Logo palette={palette} />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          filter: `blur(${blur}px)`,
          transform: 'scale(1.04)',
          zIndex: -1,
        }}
      >
        <ThreeCanvas
          width={width}
          height={height}
          camera={{ fov: 100, position: [0, 0, 30] }}
        >
          <Dust count={200} />
          <Background onPalette={setPalette} />
        </ThreeCanvas>
      </AbsoluteFill>

      <Audio volume={0.1} src={staticFile('music.mp3')} />
    </>
  )
}
