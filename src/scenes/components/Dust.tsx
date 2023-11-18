import { useEffect, useMemo, useRef } from 'react'
import { random, interpolate, useCurrentFrame } from 'remotion'
import { InstancedMesh, Object3D } from 'three'

export const Dust = ({ count = 100 }: { count?: number }) => {
  const frame = useCurrentFrame()
  const mesh = useRef<InstancedMesh>(null)

  const image =
    'https://cdnb.artstation.com/p/assets/images/images/030/755/647/large/jasmin-habezai-fekri-landscape1.jpg?1601551984'

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
      const t = frame * speed

      dummy.position.set(
        x + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        y + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        z + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10,
      )

      const s = Math.cos(t)
      dummy.scale.set(s / 2, s / 2, s / 2)
      // dummy.rotation.set(s * 5, s * 5, s * 5)

      dummy.updateMatrix()
      current.setMatrixAt(index, dummy.matrix)
    })

    current.instanceMatrix.needsUpdate = true
  }, [dummy, particles, frame])

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <circleGeometry args={[0.3, 10, 0, Math.PI * 2]} />
      <meshBasicMaterial transparent opacity={0.5} />
    </instancedMesh>
  )
}
