// src/App.tsx
import { AnimatePresence, motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ParticlesProvider } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { useScreenStore } from './store/useScreenStore'
import { MobileGuard } from './components/MobileGuard'
import { Screen0_Splash }  from './screens/Screen0_Splash'
import { Screen1_Timer }   from './screens/Screen1_Timer'
import { Screen2_Letter }  from './screens/Screen2_Letter'
import { Screen3_LoveIs }  from './screens/Screen3_LoveIs'
import { Screen4_Rose }    from './screens/Screen4_Rose'
import { Screen5_Galaxy }  from './screens/Screen5_Galaxy'
import { Screen6_Final }   from './screens/Screen6_Final'
import type { Engine } from '@tsparticles/engine'

const SCREENS = [
  Screen0_Splash,
  Screen1_Timer,
  Screen2_Letter,
  Screen3_LoveIs,
  Screen4_Rose,
  Screen5_Galaxy,
  Screen6_Final,
]

const screenVariants: Variants = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
  exit:    { opacity: 0, y: -60, transition: { duration: 0.5, ease: 'easeIn' as const } },
}

async function initEngine(engine: Engine) {
  await loadSlim(engine)
}

export default function App() {
  const currentScreen = useScreenStore((s) => s.currentScreen)
  const ActiveScreen  = SCREENS[currentScreen]

  return (
    <ParticlesProvider init={initEngine}>
      <MobileGuard>
        <div className="relative w-full h-full overflow-hidden" style={{ background: '#050510' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0"
            >
              <ActiveScreen />
            </motion.div>
          </AnimatePresence>
        </div>
      </MobileGuard>
    </ParticlesProvider>
  )
}
