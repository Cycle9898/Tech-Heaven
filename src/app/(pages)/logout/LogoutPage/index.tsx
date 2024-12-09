'use client'

import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'

import { Settings } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'

import classes from './index.module.scss'

export const LogoutPage: React.FC<{
  settings: Settings
}> = props => {
  const { settings } = props
  const { productsPage } = settings || {}
  const { logout } = useAuth()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout()
        setSuccess('Déconnexion réussie.')
      } catch (_) {
        setError('Vous êtes déjà déconnecté.')
      }
    }

    performLogout()
  }, [logout])

  return (
    <Fragment>
      {(error || success) && (
        <div className={classes.container}>
          <h1>{error || success}</h1>

          <div className={classes.whatNext}>
            <h2 className={classes.whatNextTitle}>Que souhaiteriez-vous faire ensuite ?</h2>

            {typeof productsPage === 'object' && productsPage?.slug && (
              <p>
                <Link href={`/${productsPage.slug}`} className={classes.link}>
                  Cliquez ici
                </Link>
                <span> pour retourner à la boutique.</span>
              </p>
            )}

            <p>
              {'Pour se reconnecter, '}
              <Link href="/login" className={classes.link}>
                cliquez ici
              </Link>
              .
            </p>
          </div>
        </div>
      )}
    </Fragment>
  )
}
