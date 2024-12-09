import React from 'react'
import { Metadata } from 'next'

import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import AccountForm from './AccountForm'

import classes from './index.module.scss'

export default async function Account() {
  return (
    <div>
      <h5 className={classes.personalInfo}>Informations personnelles</h5>
      <AccountForm />
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Mon compte',
  description: 'Créez un compte ou connectez-vous à votre compte existant.',
  openGraph: mergeOpenGraph({
    title: 'Account',
    url: '/account',
  }),
}
