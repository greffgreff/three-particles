import { interpolate, useCurrentFrame, Easing, useVideoConfig } from 'remotion'
import { SkiaCanvas } from '@remotion/skia'
import { defaultPaths, defaultClipPaths } from '../../assets/SvgPaths'
import { Paint, Mask, Path, Skia } from '@shopify/react-native-skia'

const easing: Partial<{}> = {
  easing: Easing.bezier(0.49, 0.19, 0.43, 0.84),
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
}

interface LogoProps {
  palette?: string[]
}

export const Logo = ({ palette }: LogoProps) => {
  const { fps } = useVideoConfig()
  const frame = useCurrentFrame()
  const paths = defaultPaths.map((p) => Skia.Path.MakeFromSVGString(p))
  const clipPaths = defaultClipPaths.map((p) => Skia.Path.MakeFromSVGString(p))

  const startAnimation = 3
  const logoDuration = 1.5
  const endAnimation = 2

  const drawProgress = interpolate(
    frame,
    [
      0,
      fps * startAnimation,
      fps * (startAnimation + logoDuration),
      fps * (startAnimation + logoDuration + endAnimation),
    ],
    [0, 2.5, 2.5, 0],
    easing,
  )

  const widthProgress = interpolate(
    frame,
    [
      0,
      fps * startAnimation - 100,
      fps * (startAnimation + logoDuration) + 50,
      fps * (startAnimation + logoDuration + endAnimation),
    ],
    [0, 30, 30, 0],
    easing,
  )

  const boundingBox = clipPaths.reduce(
    (acc, path) => {
      const pathBounds = path!.getBounds()

      return {
        minX: Math.min(acc.minX, pathBounds.x),
        minY: Math.min(acc.minY, pathBounds.y),
        maxX: Math.max(acc.maxX, pathBounds.x + pathBounds.width),
        maxY: Math.max(acc.maxY, pathBounds.y + pathBounds.height),
      }
    },
    {
      minX: Number.MAX_VALUE,
      minY: Number.MAX_VALUE,
      maxX: Number.MIN_VALUE,
      maxY: Number.MIN_VALUE,
    },
  )

  const canvasWidth = boundingBox.maxX - boundingBox.minX
  const canvasHeight = boundingBox.maxY - boundingBox.minY

  return (
    <SkiaCanvas height={canvasHeight} width={canvasWidth}>
      {palette?.map((color, i) => (
        <Mask
          children={clipPaths.map((path) => (
            <Path path={path!} color={color} />
          ))}
          mask={paths.map((path, p) => (
            <Path
              path={path!}
              end={drawProgress - 0.1 * (i + p)}
              color="transparent"
            >
              <Paint
                style="stroke"
                strokeWidth={widthProgress}
                strokeCap="round"
                strokeJoin="round"
              />
            </Path>
          ))}
        />
      ))}
    </SkiaCanvas>
  )
}
