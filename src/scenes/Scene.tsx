import { useState } from 'react'
import {
  interpolate,
  useVideoConfig,
  useCurrentFrame,
  Easing,
  AbsoluteFill,
} from 'remotion'
import { ThreeCanvas } from '@remotion/three'
import { Dust } from './components/Dust'
import { Background } from './components/Background'
import { SkiaCanvas } from '@remotion/skia'
import { defaultPaths, defaultClipPaths } from '../assets/SvgPaths'
import { Paint, Mask, Path, Skia } from '@shopify/react-native-skia'

export const Scene = () => {
  const { width, height, fps } = useVideoConfig()
  const frame = useCurrentFrame()

  const fadeDurationTime = 2
  const fadeStartTime = 2

  const fadeStart = fps * fadeStartTime
  const fadeDuration = fps * fadeDurationTime

  const blur = interpolate(frame, [fadeStart, fadeDuration + fadeStart], [5, 0])
  const scale = interpolate(
    frame,
    [fadeStart, fadeDuration + fadeStart],
    [0.4, 0.415],
  )

  const [palette, setPalette] = useState<string[]>()

  const paths = defaultPaths.map((p) => Skia.Path.MakeFromSVGString(p))
  const clipPaths = defaultClipPaths.map((p) => Skia.Path.MakeFromSVGString(p))

  const clamp = {
    easing: Easing.bezier(0.49, 0.19, 0.43, 0.84),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  } as const

  const startAnimation = 3
  const logoDuration = 1.5
  const endAnimation = 2

  const animationProgress = interpolate(
    frame,
    [
      0,
      fps * startAnimation,
      fps * (startAnimation + logoDuration),
      fps * (startAnimation + logoDuration + endAnimation),
    ],
    [0, 2.5, 2.5, 0],
    clamp,
  )
  const strokeProgress = interpolate(
    frame,
    [
      0,
      fps * startAnimation - 100,
      fps * (startAnimation + logoDuration) + 50,
      fps * (startAnimation + logoDuration + endAnimation),
    ],
    [0, 30, 30, 0],
    clamp,
  )

  return (
    <>
      <AbsoluteFill
        style={{
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${scale})`,
          width: 690,
          height: 170,
          zIndex: 1,
        }}
      >
        <SkiaCanvas height={height} width={width}>
          {palette?.map((color, i) => (
            <Mask
              children={clipPaths.map((path) => (
                <Path path={path!} color={color} />
              ))}
              mask={paths.map((path, p) => (
                <Path
                  path={path!}
                  end={animationProgress - 0.1 * (i + p)}
                  color="transparent"
                >
                  <Paint
                    style="stroke"
                    strokeWidth={strokeProgress}
                    strokeCap="round"
                    strokeJoin="round"
                    color="white"
                  />
                </Path>
              ))}
            />
          ))}
        </SkiaCanvas>
      </AbsoluteFill>

      <AbsoluteFill
        style={{ filter: `blur(${blur}px)`, transform: 'scale(1.04)' }}
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
    </>
  )
}
