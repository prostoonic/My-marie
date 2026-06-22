// src/screens/Screen2_Letter.tsx
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import { LETTER_TEXT } from '../constants/config'
import { NavigationArrow } from '../components/NavigationArrow'
import { useScreenStore } from '../store/useScreenStore'

export function Screen2_Letter() {
  const [opened, setOpened] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const goNext = useScreenStore((s) => s.goNext)

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
              className="relative w-72 h-48 rounded-2xl flex items-center justify-center overflow-hidden"
              style={{ background: '#0d0d2b', border: '1px solid rgba(204,68,170,0.3)' }}
              whileHover={{
                scale: 1.04,
                boxShadow: '0 0 40px rgba(204,68,170,0.3)',
                borderColor: '#cc44aa',
              }}
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            >
              <div
                className="absolute top-0 left-0 right-0 pointer-events-none"
                style={{
                  height: 0,
                  borderLeft: '144px solid transparent',
                  borderRight: '144px solid transparent',
                  borderTop: '80px solid rgba(204,68,170,0.25)',
                }}
              />
              <motion.div
                className="relative z-10"
                style={{ marginTop: '-10px' }}
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="#ef4444"
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-heart"
                  aria-hidden="true"
                >
                  <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
                </svg>
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
            className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 py-8 md:py-10 gap-6"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              className="letter-paper w-full max-w-3xl h-[68vh] md:h-[72vh] overflow-hidden"
              initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            >
              <div
                ref={scrollRef}
                className="h-full overflow-auto"
                style={{ scrollbarWidth: 'none' }}
              >
                <div className="letter-paper-content">
                  <motion.h2
                    className="text-3xl md:text-4xl mb-8 text-center"
                    style={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontStyle: 'italic',
                      color: '#7a3d63',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Письмо для тебя ❤️
                  </motion.h2>

                  {LETTER_TEXT.split('\n').map((line, i) => (
                    <motion.p
                      key={i}
                      className="mb-4 leading-relaxed"
                      style={{
                        fontFamily: '"DM Sans", sans-serif',
                        fontWeight: 400,
                        fontSize: '17px',
                        color: 'rgba(54,34,23,0.9)',
                        minHeight: line ? undefined : '1rem',
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + i * 0.05, duration: 0.45 }}
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.button
              onClick={goNext}
              className="primary-cta-button next-page-button"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 16px 34px rgba(204, 68, 170, 0.45)',
                filter: 'brightness(1.05)',
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Дальше
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <NavigationArrow hidden />
    </div>
  )
}
