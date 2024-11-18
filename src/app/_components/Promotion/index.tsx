'use client'

import { useEffect, useState } from 'react'
import classes from './index.module.scss'

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <li className={classes.statBox}>
    <h4>{value}</h4>
    <p>{label}</p>
  </li>
)

function Promotion() {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + 3)

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const currentTime = new Date()
      const timeDifference = Math.max(Number(targetDate) - Number(currentTime), 0)

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

      setTime({ days, hours, minutes, seconds })

      if (timeDifference === 0) {
        clearInterval(timerInterval)
      }
    }, 1000)

    return () => {
      // Cleanup the interval when the component unmounts.
      clearInterval(timerInterval)
    }
  }, [])

  return (
    <section className={classes.promotion}>
      <div className={classes.textBox}>
        <h3 className={classes.title}>Offres du moment</h3>
        <p>
          Ne ratez pas les promotions du moment ! Une opportunité de faire des économies sur votre
          prochaine commande ! 🛒🛒🛒
        </p>

        <ul className={classes.stats}>
          <StatBox label={time.days > 1 ? 'jours' : 'jour'} value={time.days} />
          <StatBox label={time.hours > 1 ? 'heures' : 'heure'} value={time.hours} />
          <StatBox label={time.minutes > 1 ? 'minutes' : 'minute'} value={time.minutes} />
          <StatBox label={time.seconds > 1 ? 'secondes' : 'seconde'} value={time.seconds} />
        </ul>
      </div>
    </section>
  )
}

export default Promotion
