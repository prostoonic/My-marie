// src/screens/Screen0_Splash.tsx
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { StarField } from '../components/StarField'
import { useScreenStore } from '../store/useScreenStore'

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.4, delayChildren: 1.5 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
}

export function Screen0_Splash() {
  const goNext = useScreenStore((s) => s.goNext)

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center"
      style={{ background: 'radial-gradient(ellipse at center, #0d1b3e 0%, #050510 70%)' }}
    >
      <StarField count={220} id="splash-stars" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center gap-6 text-center px-8"
      >
        <motion.h1
          variants={item}
          className="text-4xl md:text-5xl"
          style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 300, color: '#ff88cc' }}
        >
          Для самой любимой девочки ❤️
        </motion.h1>

        <motion.p
          variants={item}
          className="text-base"
          style={{ color: 'rgba(255,255,255,0.55)', fontFamily: '"DM Sans", sans-serif', fontWeight: 300, letterSpacing: '0.12em' }}
        >
          Нажми, чтобы открыть нашу маленькую историю
        </motion.p>

        <motion.button
          variants={item}
          onClick={goNext}
          className="mt-6 primary-cta-button"
          whileHover={{
            boxShadow: '0 16px 34px rgba(204, 68, 170, 0.45)',
            filter: 'brightness(1.05)',
          }}
          whileTap={{ scale: 0.98 }}
        >
          Открыть
        </motion.button>
      </motion.div>
    </div>
  )
}
