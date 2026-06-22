// src/screens/Screen5_Galaxy.tsx
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import TypeIt from 'typeit-react'
import { NavigationArrow } from '../components/NavigationArrow'
import styles from '../styles/galaxy.module.scss'

function rando(range: number) {
  return Math.floor(Math.random() * range)
}

export function Screen5_Galaxy() {
  const galaxyRef  = useRef<HTMLDivElement>(null)
  const bgStarsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const galaxy  = galaxyRef.current
    const bgStars = bgStarsRef.current
    if (!galaxy || !bgStars) return

    const galaxyFragment = document.createDocumentFragment()
    for (let i = 0; i < 5000; i++) {
      const star = document.createElement('span')
      star.className = styles.star
      const d = rando(3)
      Object.assign(star.style, {
        height: `${d}px`,
        width: `${d}px`,
        top: `${rando(800)}px`,
        left: `${rando(800)}px`,
        backgroundColor: `hsla(${rando(360)},50%,75%,1)`,
      })
      galaxyFragment.appendChild(star)
    }
    galaxy.appendChild(galaxyFragment)

    const bgFragment = document.createDocumentFragment()
    for (let i = 0; i < 700; i++) {
      const star = document.createElement('span')
      star.className = styles.star
      const d = rando(5)
      Object.assign(star.style, {
        height: `${d}px`,
        width: `${d}px`,
        top: `${rando(100)}vh`,
        left: `${rando(100)}vw`,
        backgroundColor: `hsla(${rando(360)},50%,75%,1)`,
        opacity: '0.8',
        position: 'fixed',
      })
      bgFragment.appendChild(star)
    }
    bgStars.appendChild(bgFragment)

    return () => {
      galaxy.innerHTML = ''
      bgStars.innerHTML = ''
    }
  }, [])

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: 'black' }}>
      <div ref={bgStarsRef} className={styles.bgStars} />

      <div className={styles.universe}>
        <div ref={galaxyRef} className={styles.galaxy} />
      </div>

      <motion.div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div
          className="text-2xl md:text-3xl leading-loose"
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontStyle: 'italic',
            fontWeight: 300,
            color: '#ffffff',
            textShadow: '0 0 30px rgba(255,136,204,0.6)',
            maxWidth: '600px',
          }}
        >
          <TypeIt
            options={{
              speed: 50,
              startDelay: 2200,
              cursor: false,
            }}
            getBeforeInit={(instance) => {
              instance
                .type('Во Вселенной миллиарды звезд,')
                .pause(1500)
                .break()
                .type('миллиарды людей,')
                .pause(1000)
                .break()
                .type('миллиарды случайностей.')
                .pause(2500)
                .break()
                .break()
                .type('И каким-то невероятным образом')
                .pause(800)
                .break()
                .type('мы нашли друг друга ❤️')
              return instance
            }}
          />
        </div>
      </motion.div>

      <NavigationArrow />
    </div>
  )
}
