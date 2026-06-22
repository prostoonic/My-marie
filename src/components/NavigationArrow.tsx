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
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
      style={{
        background: 'rgba(204, 68, 170, 0.1)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(204, 68, 170, 0.4)',
      }}
      whileHover={{ scale: 1.15, boxShadow: '0 0 20px rgba(255, 136, 204, 0.5)' }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 4v12M4 10l6 6 6-6" stroke="#ff88cc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </motion.button>
  )
}
