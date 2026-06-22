// src/screens/Screen4_Rose.tsx
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WORDS } from '../constants/words'
import { NavigationArrow } from '../components/NavigationArrow'
import styles from '../styles/rose.module.scss'
import {
  createFallingWord,
  FALLING_WORD_INTERVAL_MS,
  type FallingWord,
  trimFallingWords,
} from './screen4RoseWords'

let wordIdCounter = 0

export function Screen4_Rose() {
  const [fallingWords, setFallingWords] = useState<FallingWord[]>([])
  const wordIndexRef = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const text = WORDS[wordIndexRef.current % WORDS.length]
      wordIndexRef.current++

      setFallingWords((prev) =>
        trimFallingWords([...prev, createFallingWord(wordIdCounter++, text)]),
      )
    }, FALLING_WORD_INTERVAL_MS)

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
            className={styles.fallingWord}
            style={{
              left: `${word.x}%`,
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
            whileHover={{
              scale: 1.14,
              y: -10,
              rotate: 0,
              filter:
                'drop-shadow(0 0 12px rgba(255, 136, 204, 0.95)) drop-shadow(0 0 26px rgba(255, 136, 204, 0.6))',
              textShadow:
                '0 0 10px rgba(255,255,255,0.9), 0 0 22px rgba(255,136,204,0.95), 0 0 42px rgba(255,136,204,0.65)',
            }}
          >
            <span className={styles.fallingWordGlow} aria-hidden="true">
              {word.text}
            </span>
            <span className={styles.fallingWordLabel}>{word.text}</span>
          </motion.span>
        ))}
      </AnimatePresence>

      <NavigationArrow />
    </div>
  )
}
