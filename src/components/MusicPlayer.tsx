// src/components/MusicPlayer.tsx
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Howl } from 'howler'
import { MUSIC_SRC } from '../constants/config'

export function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const soundRef = useRef<Howl | null>(null)

  useEffect(() => {
    if (!MUSIC_SRC) return
    soundRef.current = new Howl({
      src: [MUSIC_SRC],
      loop: true,
      volume: 0.4,
      html5: true,
    })
    return () => { soundRef.current?.unload() }
  }, [])

  const toggle = () => {
    if (!MUSIC_SRC) {
      setShowTooltip(true)
      setTimeout(() => setShowTooltip(false), 2500)
      return
    }
    if (playing) {
      soundRef.current?.pause()
    } else {
      soundRef.current?.play()
    }
    setPlaying(!playing)
  }

  return (
    <div className="fixed top-6 right-6 z-50">
      <motion.button
        onClick={toggle}
        className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.15)',
          color: playing ? '#ff88cc' : 'rgba(255,255,255,0.4)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {playing ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <rect x="3" y="2" width="3" height="12" rx="1"/>
            <rect x="10" y="2" width="3" height="12" rx="1"/>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 2l10 6-10 6V2z"/>
          </svg>
        )}
      </motion.button>

      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute top-12 right-0 text-xs whitespace-nowrap px-3 py-1.5 rounded-lg"
          style={{
            background: 'rgba(13,13,43,0.9)',
            border: '1px solid rgba(204,68,170,0.3)',
            color: 'rgba(255,255,255,0.7)',
            fontFamily: '"DM Sans", sans-serif',
          }}
        >
          Скоро добавим музыку ♫
        </motion.div>
      )}
    </div>
  )
}
