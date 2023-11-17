import { useEffect, useMemo, useRef } from 'react'
import { random, interpolate, useCurrentFrame } from 'remotion'
import { AmbientLight, InstancedMesh, Object3D } from 'three'

export const Dust = ({ count = 200 }: { count?: number }) => {
  const frame = useCurrentFrame()
  const mesh = useRef<InstancedMesh>(null)

  const image =
    'https://cdnb.artstation.com/p/assets/images/images/030/755/647/large/jasmin-habezai-fekri-landscape1.jpg?1601551984'

  // Generate some random positions, speed factors and timings
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const time = interpolate(random('time' + i), [0, 1], [0, 100])
      const factor = interpolate(random('factor' + i), [0, 1], [10, 100])
      const speed = interpolate(random('speed' + i), [0, 1], [0.015, 0.005]) / 2
      const x = interpolate(random('x' + i), [0, 1], [-50, 50])
      const y = interpolate(random('y' + i), [0, 1], [-50, 50])
      const z = interpolate(random('z' + i), [0, 1], [-50, 10])

      temp.push({ time, factor, speed, x, y, z })
    }
    return temp
  }, [])

  const dummy = useMemo(() => new Object3D(), [])

  useEffect(() => {
    const { current } = mesh

    if (!current) {
      return
    } 

    particles.forEach((particle, index) => {
      const { factor, speed, x, y, z } = particle

      // Update the particle time
      const t = frame * speed

      // Update the particle position based on the time
      // This is mostly random trigonometry functions to oscillate around the (x, y, z) point
      dummy.position.set(
        x + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        y + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        z + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10,
      )

      // Derive an oscillating value which will be used
      // for the particle size and rotation
      const s = Math.cos(t)
      dummy.scale.set(s, s, s)
      dummy.rotation.set(s * 5, s * 5, s * 5)
      dummy.updateMatrix()

      // And apply the matrix to the instanced item
      current.setMatrixAt(index, dummy.matrix)
    })
    current.instanceMatrix.needsUpdate = true
  }, [dummy, particles, frame])

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <circleBufferGeometry args={[0.2, 10, 0, Math.PI * 2]} />
      <meshBasicMaterial transparent opacity={0.7} />
    </instancedMesh>
  )
}
