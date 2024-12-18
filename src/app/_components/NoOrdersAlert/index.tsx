import React from 'react'

import classes from './index.module.scss'

function NoOrdersAlert() {
  return (
    <div className={classes.mainContainer}>
      <p>⚠️</p>

      <p className={classes.message}>
        Ceci est un site de démonstration, aucune commande ne sera traitée.
      </p>

      <p>⚠️</p>
    </div>
  )
}

export default NoOrdersAlert
