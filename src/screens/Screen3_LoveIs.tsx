// src/screens/Screen3_LoveIs.tsx
import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { StarField } from '../components/StarField'
import { NavigationArrow } from '../components/NavigationArrow'
import { LOVE_IS_IMAGE, LOVE_IS_CAPTION } from '../constants/config'

export function Screen3_LoveIs() {
  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center gap-6 overflow-hidden"
      style={{ background: '#050510' }}
    >
      <StarField count={80} opacity={0.6} id="loveis-stars" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 flex flex-col items-center gap-6"
      >
        <motion.div
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
          style={{ perspective: '1000px' }}
        >
          <Tilt
            tiltMaxAngleX={8}
            tiltMaxAngleY={8}
            glareEnable
            glareMaxOpacity={0.15}
            glareColor="#ff88cc"
            glareBorderRadius="16px"
          >
            <div
              className="w-80 rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(204,68,170,0.3)', boxShadow: '0 20px 60px rgba(204,68,170,0.2)' }}
            >
              {LOVE_IS_IMAGE ? (
                <img src={LOVE_IS_IMAGE} alt="Love Is" className="w-full h-auto" />
              ) : (
                <div
                  className="w-full flex flex-col items-center justify-center gap-3 text-center p-8"
                  style={{ aspectRatio: '3/4', background: '#0d0d2b' }}
                >
                  <div className="text-4xl">🖼️</div>
                  <p
                    className="text-sm"
                    style={{ color: 'rgba(255,255,255,0.4)', fontFamily: '"DM Sans", sans-serif' }}
                  >
                    твоя картинка<br />сюда
                  </p>
                </div>
              )}
            </div>
          </Tilt>
        </motion.div>

        {LOVE_IS_CAPTION && (
          <motion.p
            className="text-base italic text-center max-w-xs"
            style={{ fontFamily: '"Cormorant Garamond", serif', color: 'rgba(255,255,255,0.65)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            {LOVE_IS_CAPTION}
          </motion.p>
        )}
      </motion.div>

      <NavigationArrow />
    </div>
  )
}
