// src/screens/Screen1_Timer.tsx
import { AnimatePresence, motion } from 'framer-motion'
import { useTimer } from '../hooks/useTimer'
import { START_DATE } from '../constants/config'
import { NavigationArrow } from '../components/NavigationArrow'

const HEARTS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  delay: i * 0.8,
  x: 10 + ((i * 13) % 80),
  repeatDelay: 0.5 + ((i * 7) % 8) * 0.4,
}))

interface FloatingHeartProps {
  delay: number
  x: number
  repeatDelay: number
}

function FloatingHeart({ delay, x, repeatDelay }: FloatingHeartProps) {
  return (
    <motion.div
      className="absolute text-2xl pointer-events-none select-none"
      style={{ left: `${x}%`, bottom: '-40px', opacity: 0 }}
      animate={{
        y: ['0vh', '-55vh', '-110vh'],
        opacity: [0, 0.65, 0.7, 0],
        scale: [0.8, 1.05, 1, 0.92],
      }}
      transition={{
        duration: 7.2,
        delay,
        repeat: Infinity,
        repeatDelay,
        ease: 'easeOut',
      }}
    >
      ❤️
    </motion.div>
  )
}

interface UnitBoxProps {
  value: number
  label: string
  index: number
}

function UnitBox({ value, label, index }: UnitBoxProps) {
  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
    >
      <div
        className="w-28 h-20 grid place-items-center rounded-xl"
        style={{ background: 'rgba(13,13,43,0.7)', border: '1px solid rgba(204,68,170,0.2)' }}
      >
        <div
          className="relative h-[3.8rem] w-full px-2"
          style={{ overflowY: 'hidden', overflowX: 'visible' }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={value}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center text-center tabular-nums leading-[1.08]"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                color: '#ffffff',
                fontSize: '3rem',
                fontWeight: 600,
                paddingBottom: '0.08em',
              }}
            >
              {value}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
      <span
        className="text-xs uppercase"
        style={{ color: 'rgba(255,255,255,0.45)', fontFamily: '"DM Sans", sans-serif', fontWeight: 300, letterSpacing: '0.1em' }}
      >
        {label}
      </span>
    </motion.div>
  )
}

export function Screen1_Timer() {
  const { years, months, days, hours, minutes, seconds } = useTimer(START_DATE)

  const units = [
    { value: years,   label: 'лет'     },
    { value: months,  label: 'месяцев' },
    { value: days,    label: 'дней'    },
    { value: hours,   label: 'часов'   },
    { value: minutes, label: 'минут'   },
    { value: seconds, label: 'секунд'  },
  ]

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#050510' }}
    >
      {HEARTS.map((heart) => (
        <FloatingHeart
          key={heart.id}
          delay={heart.delay}
          x={heart.x}
          repeatDelay={heart.repeatDelay}
        />
      ))}

      <motion.div
        className="relative z-10 flex flex-col items-center gap-10 px-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.p
          className="text-xl"
          style={{ color: 'rgba(255,255,255,0.55)', fontFamily: '"DM Sans", sans-serif', fontWeight: 300, letterSpacing: '0.08em' }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          ❤️ Мы вместе уже
        </motion.p>

        <div className="grid grid-cols-3 gap-6">
          {units.map((u, i) => (
            <UnitBox key={u.label} value={u.value} label={u.label} index={i} />
          ))}
        </div>

        <motion.p
          className="text-base italic"
          style={{ color: 'rgba(255,255,255,0.5)', fontFamily: '"Cormorant Garamond", serif', fontWeight: 300, maxWidth: '400px' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          И я бы прожил каждый из этих дней с тобой снова.
        </motion.p>
      </motion.div>

      <NavigationArrow />
    </div>
  )
}
