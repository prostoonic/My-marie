// src/screens/Screen6_Final.tsx
import { useState, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Fireworks } from 'fireworks-js'
import { StarField } from '../components/StarField'

const INFINITY_ITEMS = [
  'дней',
  'объятий',
  'поцелуев',
  'встреч',
  'поездок',
  'прогулок',
  'причин любить тебя',
  'счастливых моментов вместе ❤️',
]

function AnimatedInfinity({ delay }: { delay: number }) {
  const gradientId = useId().replace(/:/g, '')
  const glowId = useId().replace(/:/g, '')

  return (
    <motion.div
      style={{ width: 64, height: 44 }}
      initial={{ opacity: 0, scale: 0.85, y: 6 }}
      animate={{
        opacity: 1,
        scale: [1, 1.06, 1],
        y: [0, -1, 0],
      }}
      whileHover={{
        scale: 1.15,
        rotate: [0, -5, 5, 0],
        filter: 'drop-shadow(0 0 12px rgba(255, 136, 204, 0.95)) drop-shadow(0 0 24px rgba(122, 196, 255, 0.55))',
      }}
      transition={{
        opacity: { duration: 0.4, delay },
        scale: { duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay },
        y: { duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay },
        rotate: { duration: 0.6, ease: 'easeInOut' },
      }}
    >
      <svg viewBox="0 0 160 90" width="100%" height="100%" role="img" aria-label="Бесконечность">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7ac4ff" />
            <stop offset="45%" stopColor="#ff88cc" />
            <stop offset="100%" stopColor="#ffbfdc" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="-1 0;1 0;-1 0"
              dur="4s"
              repeatCount="indefinite"
            />
          </linearGradient>
          <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <path
            id={`infinity-path-${gradientId}`}
            d="M 18 45 C 18 22, 53 22, 80 45 C 107 68, 142 68, 142 45 C 142 22, 107 22, 80 45 C 53 68, 18 68, 18 45"
          />
        </defs>

        <use
          href={`#infinity-path-${gradientId}`}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${glowId})`}
        />

        <circle r="4.2" fill="#ffffff" opacity="0.95">
          <animateMotion dur="2.8s" rotate="auto" repeatCount="indefinite">
            <mpath href={`#infinity-path-${gradientId}`} />
          </animateMotion>
        </circle>
      </svg>
    </motion.div>
  )
}

export function Screen6_Final() {
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (!revealed) return

    const container = document.createElement('div')
    container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:100;'
    document.body.appendChild(container)

    const fw = new Fireworks(container, {
      rocketsPoint: { min: 20, max: 80 },
      hue: { min: 290, max: 340 },
      delay: { min: 15, max: 30 },
      traceSpeed: 3,
      acceleration: 1.05,
      friction: 0.97,
      gravity: 1.5,
      particles: 80,
      explosion: 5,
    })
    fw.start()

    const cleanupFireworks = () => {
      fw.stop()
      if (document.body.contains(container)) {
        document.body.removeChild(container)
      }
    }

    return cleanupFireworks
  }, [revealed])

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #0d1b3e 0%, #050510 70%)' }}
    >
      <StarField count={150} id="final-stars" />

      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="question"
            className="relative z-10 flex flex-col items-center gap-8 text-center px-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="text-5xl md:text-6xl"
              style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 300, color: '#ffffff' }}
            >
              А сколько ещё?
            </h1>
            <motion.button
              onClick={() => setRevealed(true)}
              className="primary-cta-button"
              whileHover={{
                boxShadow: '0 16px 34px rgba(204, 68, 170, 0.45)',
                filter: 'brightness(1.05)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              Узнать
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="answer"
            className="relative z-10 flex flex-col items-center gap-8 text-center px-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              className="text-xl"
              style={{ color: 'rgba(255,255,255,0.65)', fontFamily: '"DM Sans", sans-serif', fontWeight: 300, letterSpacing: '0.1em' }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Впереди ещё:
            </motion.p>

            <div className="flex flex-col gap-4">
              {INFINITY_ITEMS.map((item, i) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-4 justify-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.4, duration: 0.6 }}
                >
                  <AnimatedInfinity delay={1 + i * 0.4} />
                  <span
                    className="text-xl"
                    style={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 300, color: 'rgba(255,255,255,0.85)' }}
                  >
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
