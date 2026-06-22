// src/screens/Screen4_Rose.tsx
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WORDS } from '../constants/words'
import { NavigationArrow } from '../components/NavigationArrow'
import styles from '../styles/rose.module.scss'

interface FallingWord {
  id: number
  text: string
  x: number
  duration: number
  color: string
}

let wordIdCounter = 0

export function Screen4_Rose() {
  const [fallingWords, setFallingWords] = useState<FallingWord[]>([])
  const wordIndexRef = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const text = WORDS[wordIndexRef.current % WORDS.length]
      wordIndexRef.current++

      const word: FallingWord = {
        id: wordIdCounter++,
        text,
        x: 10 + Math.random() * 80,
        duration: 8 + Math.random() * 5,
        color: Math.random() > 0.5 ? '#ff88cc' : '#ffffff',
      }

      setFallingWords((prev) => [...prev.slice(-20), word])
    }, 1200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: '#050510' }}
    >
      {/* Rose */}
      <div className={styles.container}>
        <div className={styles.glass}>
          <div className={styles.shine} />
        </div>
        <div className={styles.thorns}>
          <div /><div /><div /><div />
        </div>
        <div className={styles.leaves}>
          <div /><div /><div /><div />
        </div>
        <div className={styles.petals}>
          <div /><div /><div /><div />
          <div /><div /><div />
        </div>
        <div className={styles.deadPetals}>
          <div /><div /><div /><div />
        </div>
      </div>

      {/* Falling Words */}
      <AnimatePresence>
        {fallingWords.map((word) => (
          <motion.span
            key={word.id}
            className="absolute pointer-events-none select-none"
            style={{
              left: `${word.x}%`,
              top: '-40px',
              color: word.color,
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: 'italic',
              fontSize: '18px',
              textShadow: '0 0 10px rgba(255,136,204,0.4)',
            }}
            initial={{ y: 0, opacity: 0, rotate: -15 }}
            animate={{ y: '110vh', opacity: [0, 1, 1, 0], rotate: 15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: word.duration, ease: 'linear' }}
          >
            {word.text}
          </motion.span>
        ))}
      </AnimatePresence>

      <NavigationArrow />
    </div>
  )
}
