// src/screens/Screen1_Timer.tsx
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import TypeIt from 'typeit-react'
import { useTimer } from '../hooks/useTimer'
import { START_DATE } from '../constants/config'
import { NavigationArrow } from '../components/NavigationArrow'

const HEARTS = Array.from({ length: 10 }, (_, i) => i)

function FloatingHeart({ delay }: { delay: number }) {
  const x = Math.random() * 80 + 10
  return (
    <motion.div
      className="absolute text-2xl pointer-events-none select-none"
      style={{ left: `${x}%`, bottom: '-40px', opacity: 0 }}
      animate={{
        y: [0, -120, -200],
        opacity: [0, 0.6, 0],
        scale: [0.8, 1.1, 0.9],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 4,
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
        className="w-24 h-20 flex items-center justify-center rounded-xl"
        style={{ background: 'rgba(13,13,43,0.7)', border: '1px solid rgba(204,68,170,0.2)' }}
      >
        <CountUp
          end={value}
          duration={0.4}
          preserveValue
          style={{ fontFamily: '"Cormorant Garamond", serif', color: '#ffffff', fontSize: '3rem', fontWeight: 600 }}
        />
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
      {HEARTS.map((i) => <FloatingHeart key={i} delay={i * 0.8} />)}

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

        <motion.div
          className="text-base italic"
          style={{ color: 'rgba(255,255,255,0.5)', fontFamily: '"Cormorant Garamond", serif', fontWeight: 300, maxWidth: '400px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <TypeIt
            options={{
              speed: 40,
              startDelay: 2000,
              cursor: false,
            }}
          >
            И я бы прожил каждый из этих дней с тобой снова.
          </TypeIt>
        </motion.div>
      </motion.div>

      <NavigationArrow />
    </div>
  )
}
