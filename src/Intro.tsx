import { interpolate, useCurrentFrame, AbsoluteFill } from 'remotion'

interface IntroProps {
  onFade?: (fade: number) => void
}

export const Intro = ({ onFade }: IntroProps) => {
  const frame = useCurrentFrame()
  const fadeDuration = 100

  const fade = interpolate(frame, [0, fadeDuration], [1, 0], {
    extrapolateRight: 'clamp',
  })

  onFade!(fade)

  return null
  // return <AbsoluteFill style={{ zIndex: 1, background: 'white' }} />
}
