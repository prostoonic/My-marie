// src/screens/Screen2_Letter.tsx
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import { LETTER_TEXT } from '../constants/config'
import { NavigationArrow } from '../components/NavigationArrow'

export function Screen2_Letter() {
  const [opened, setOpened] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!opened || !scrollRef.current) return
    lenisRef.current = new Lenis({
      wrapper: scrollRef.current,
      content: scrollRef.current.firstElementChild as HTMLElement,
      smoothWheel: true,
    })
    const raf = (time: number) => {
      lenisRef.current?.raf(time)
      requestAnimationFrame(raf)
    }
    const id = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(id)
      lenisRef.current?.destroy()
    }
  }, [opened])

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#050510' }}
    >
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="envelope"
            className="flex flex-col items-center gap-6 cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, y: -30 }}
            transition={{ duration: 0.6 }}
            onClick={() => setOpened(true)}
          >
            <motion.p
              className="text-sm uppercase"
              style={{ color: 'rgba(255,255,255,0.5)', fontFamily: '"DM Sans", sans-serif', letterSpacing: '0.12em' }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              тыкай тыкай ↓
            </motion.p>

            <motion.div
              className="relative w-72 h-48 rounded-2xl flex items-center justify-center"
              style={{ background: '#0d0d2b', border: '1px solid rgba(204,68,170,0.3)' }}
              whileHover={{ boxShadow: '0 0 40px rgba(204,68,170,0.3)', borderColor: '#cc44aa' }}
            >
              <div
                className="absolute top-0 left-0 right-0"
                style={{
                  height: 0,
                  borderLeft: '144px solid transparent',
                  borderRight: '144px solid transparent',
                  borderTop: '80px solid rgba(204,68,170,0.25)',
                }}
              />
              <motion.div
                className="text-4xl relative z-10"
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                ✉️
              </motion.div>
            </motion.div>

            <p
              className="text-xs"
              style={{ color: 'rgba(255,255,255,0.35)', fontFamily: '"DM Sans", sans-serif', letterSpacing: '0.08em' }}
            >
              нажми, чтобы прочитать
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            className="relative w-full max-w-2xl mx-auto h-full flex flex-col"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <button
              onClick={() => setOpened(false)}
              className="absolute top-6 right-6 z-20 text-sm"
              style={{ color: 'rgba(255,255,255,0.4)', fontFamily: '"DM Sans", sans-serif', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              закрыть ×
            </button>

            <div
              ref={scrollRef}
              className="flex-1 overflow-auto px-12 py-16"
              style={{ scrollbarWidth: 'none' }}
            >
              <div>
                <motion.h2
                  className="text-3xl mb-8 text-center"
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontStyle: 'italic',
                    color: '#ff88cc',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Письмо для тебя ❤️
                </motion.h2>

                {LETTER_TEXT.split('\n').map((line, i) => (
                  <motion.p
                    key={i}
                    className="mb-4 leading-relaxed"
                    style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontWeight: 300,
                      fontSize: '16px',
                      color: 'rgba(255,255,255,0.85)',
                      minHeight: line ? undefined : '1rem',
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.06, duration: 0.5 }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <NavigationArrow hidden={opened} />
    </div>
  )
}
