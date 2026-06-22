// src/hooks/useTimer.ts
import { useState, useEffect } from 'react'

export interface Elapsed {
  years: number
  months: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function calcElapsed(start: Date, now: Date): Elapsed {
  let years  = now.getFullYear() - start.getFullYear()
  let months = now.getMonth()    - start.getMonth()
  let days   = now.getDate()     - start.getDate()
  let hours  = now.getHours()    - start.getHours()
  let mins   = now.getMinutes()  - start.getMinutes()
  let secs   = now.getSeconds()  - start.getSeconds()

  if (secs < 0)  { secs  += 60; mins--  }
  if (mins < 0)  { mins  += 60; hours-- }
  if (hours < 0) { hours += 24; days--  }
  if (days < 0) {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
    days += prevMonth.getDate()
    months--
  }
  if (months < 0) { months += 12; years-- }

  return { years, months, days, hours, minutes: mins, seconds: secs }
}

export function useTimer(start: Date): Elapsed {
  const [elapsed, setElapsed] = useState<Elapsed>(() => calcElapsed(start, new Date()))

  useEffect(() => {
    const id = setInterval(() => {
      setElapsed(calcElapsed(start, new Date()))
    }, 1000)
    return () => clearInterval(id)
  }, [start])

  return elapsed
}
