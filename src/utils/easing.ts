import { EasingFunction, interpolate } from 'remotion'

export const interpolateByDuration = (
  frame: number,
  fps: number,
  startTime: number,
  timeDuration: number,
  outputRange: number[],
  easing?: EasingFunction,
) => {
  const start = fps * startTime
  const duration = fps * timeDuration
  return interpolate(frame, [start, start + duration], outputRange, {
    easing: easing,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
}

export const interpolateByRange = (
  frame: number,
  fps: number,
  startTime: number,
  endTime: number,
  outputRange: number[],
  easing?: EasingFunction,
) => {
  if (startTime < endTime) {
    throw Error('End cannot be before start')
  }
  const start = fps * startTime
  const duration = fps * (endTime - startTime)
  return interpolate(frame, [start, start + duration], outputRange, {
    easing: easing,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
}
