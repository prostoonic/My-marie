// src/screens/Screen6_Final.tsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Fireworks } from 'fireworks-js'
import { StarField } from '../components/StarField'

const INFINITY_ITEMS = [
  'дней',
  'объятий',
  'поцелуев',
  'счастливых моментов вместе ❤️',
]

export function Screen6_Final() {
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (!revealed) return

    const duration = 5000
    const end = Date.now() + duration
    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#cc44aa', '#ff88cc', '#d4af37', '#ffffff'],
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#cc44aa', '#ff88cc', '#d4af37', '#ffffff'],
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()

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
    const stopTimer = setTimeout(() => {
      fw.stop()
      if (document.body.contains(container)) {
        document.body.removeChild(container)
      }
    }, 6000)

    return () => {
      clearTimeout(stopTimer)
      try { fw.stop(); if (document.body.contains(container)) document.body.removeChild(container) } catch {}
    }
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
              className="px-10 py-3 rounded-full text-sm uppercase"
              style={{
                border: '1px solid rgba(204,68,170,0.5)',
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 300,
                letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.85)',
                background: 'transparent',
                cursor: 'pointer',
              }}
              whileHover={{
                boxShadow: '0 0 30px rgba(255,136,204,0.4)',
                background: 'rgba(204,68,170,0.15)',
                borderColor: '#ff88cc',
              }}
              whileTap={{ scale: 0.97 }}
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
              Надеюсь, впереди ещё:
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
                  <motion.span
                    className="text-5xl"
                    style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 300, color: '#ff88cc' }}
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2, delay: 1 + i * 0.4, repeat: Infinity }}
                  >
                    ∞
                  </motion.span>
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
