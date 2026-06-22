// src/components/NavigationArrow.tsx
import { motion } from 'framer-motion'
import { useScreenStore } from '../store/useScreenStore'

interface NavigationArrowProps {
  hidden?: boolean
}

export function NavigationArrow({ hidden = false }: NavigationArrowProps) {
  const goNext = useScreenStore((s) => s.goNext)

  if (hidden) return null

  return (
    <motion.button
      onClick={goNext}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 primary-cta-button next-page-button"
      whileHover={{
        scale: 1.06,
        boxShadow: '0 14px 34px rgba(204, 68, 170, 0.42)',
        filter: 'brightness(1.05)',
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      Дальше
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <path d="M4 10h12M10 4l6 6-6 6" stroke="#ffffff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </motion.button>
  )
}
