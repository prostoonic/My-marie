// src/components/MobileGuard.tsx
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function MobileGuard({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <>
      <AnimatePresence>
        {isMobile && (
          <motion.div
            key="mobile-guard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center px-8 text-center"
            style={{ background: '#050510' }}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-5xl mb-6">💻</div>
              <h1
                className="text-2xl mb-4"
                style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', color: '#ff88cc' }}
              >
                Этот подарок создан для большого экрана
              </h1>
              <p
                className="text-base leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.6)', fontFamily: '"DM Sans", sans-serif', fontWeight: 300 }}
              >
                Открой с компьютера —<br />
                там тебя ждёт кое-что особенное ❤️
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {!isMobile && children}
    </>
  )
}
