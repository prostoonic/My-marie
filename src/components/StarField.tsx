// src/components/StarField.tsx
import { Particles, useParticlesProvider } from '@tsparticles/react'

interface StarFieldProps {
  count?: number
  opacity?: number
  id?: string
}

export function StarField({ count = 200, opacity = 1, id = 'starfield' }: StarFieldProps) {
  const { loaded } = useParticlesProvider()

  if (!loaded) return null

  return (
    <Particles
      id={id}
      className="absolute inset-0 pointer-events-none"
      options={{
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        particles: {
          number: { value: count },
          color: { value: '#ffffff' },
          opacity: {
            value: { min: 0.1 * opacity, max: 0.9 * opacity },
            animation: { enable: true, speed: 0.8, sync: false },
          },
          size: {
            value: { min: 0.5, max: 2.5 },
          },
          move: { enable: false },
        },
        detectRetina: true,
      }}
    />
  )
}
