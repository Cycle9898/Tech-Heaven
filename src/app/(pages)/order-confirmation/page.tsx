import React, { Suspense } from 'react'
import { Metadata } from 'next'

import { Gutter } from '../../_components/Gutter'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import { OrderConfirmationPage } from './OrderConfirmationPage'

import classes from './index.module.scss'

export default async function OrderConfirmation() {
  return (
    <Gutter className={classes.confirmationPage}>
      <Suspense fallback={<div>Chargement...</div>}>
        <OrderConfirmationPage />
      </Suspense>
    </Gutter>
  )
}

export const metadata: Metadata = {
  title: 'Confirmation de commande',
  description: 'Votre commande a été prise en compte.',
  openGraph: mergeOpenGraph({
    title: 'Order Confirmation',
    url: '/order-confirmation',
  }),
}
