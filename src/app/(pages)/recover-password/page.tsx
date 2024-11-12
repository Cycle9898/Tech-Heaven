import React from 'react'
import { Metadata } from 'next'

import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import { RecoverPasswordForm } from './RecoverPasswordForm'

import classes from './index.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { RenderParams } from '@/app/_components/RenderParams'

export default async function RecoverPassword() {
  return (
    <section className={classes.recoverPassword}>
      <div className={classes.heroImg}>
        <Link href="/">
          <Image
            src="/logo-black.svg"
            alt="Logo de Tech Heaven"
            width={250}
            height={23}
            className={classes.logo}
          />
        </Link>
      </div>

      <div className={classes.formWrapper}>
        <div className={classes.formContainer}>
          <RenderParams className={classes.params} />

          <Link href="/login" className={classes.backLink}>
            <Image
              src="/assets/icons/arrow-left.svg"
              alt="logo flèche vers la gauche"
              width={24}
              height={24}
            />
            <p>Retour</p>
          </Link>

          <div className={classes.formTitle}>
            <h3>Mot de passe oublié ?</h3>
          </div>

          <RecoverPasswordForm />
        </div>
      </div>
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Récupérer mon mot de passe',
  description: 'Entrez votre adresse email pour récupérer votre mot de passe.',
  openGraph: mergeOpenGraph({
    title: 'Récupérer mon mot de passe',
    url: '/recover-password',
  }),
}
