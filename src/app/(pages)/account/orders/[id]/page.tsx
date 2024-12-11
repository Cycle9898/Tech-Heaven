import React from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

import type { Order } from '@/payload/payload-types'
import { getMeUser } from '@/app/_utilities/getMeUser'
import { mergeOpenGraph } from '@/app/_utilities/mergeOpenGraph'
import { formatDateTime } from '@/app/_utilities/formatDateTime'

import classes from './index.module.scss'
import Link from 'next/link'
import { Media } from '@/app/_components/Media'
import { Price } from '@/app/_components/Price'
import { HR } from '@/app/_components/HR'

type OrderProps = {
  params: {
    id: string
  }
}

export default async function Order({ params: { id } }: OrderProps) {
  const { token } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'Vous devez être connecté pour voir vos commandes.',
    )}&redirect=${encodeURIComponent(`/account/orders/${id}`)}`,
  })

  let order: Order | null = null

  try {
    order = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    })?.then(async res => {
      if (!res.ok) notFound()
      const json = await res.json()
      if ('error' in json && json.error) notFound()
      if ('errors' in json && json.errors) notFound()
      return json
    })
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  }

  if (!order) {
    notFound()
  }

  return (
    <div>
      <h5>
        {`Commande numéro `}
        <span className={classes.id}>{`'${order.id}'`}</span>
      </h5>

      <div className={classes.itemMeta}>
        <p>{`Numéro: '${order.id}'`}</p>
        <p>{`Référence du règlement: ${order.stripePaymentIntentID}`}</p>
        <p>{`Commandée le: ${formatDateTime(order.createdAt)}`}</p>
        <p className={classes.total}>
          {'Total: '}
          {new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
          }).format(order.total / 100)}
        </p>
      </div>

      <div className={classes.order}>
        {order.items?.map((item, index) => {
          if (typeof item.product === 'object') {
            const {
              quantity,
              product,
              product: { title, meta, stripeProductID },
            } = item

            const metaImage = meta?.image

            return (
              <div key={index} className={classes.row}>
                <Link href={`/products/${product.slug}`} className={classes.mediaWrapper}>
                  {!metaImage && <span className={classes.placeholder}>Pas d'image</span>}
                  {metaImage && typeof metaImage !== 'string' && (
                    <Media
                      className={classes.media}
                      imgClassName={classes.image}
                      resource={metaImage}
                      fill
                    />
                  )}
                </Link>
                <div className={classes.rowContent}>
                  <h6 className={classes.title}>
                    <Link href={`/products/${product.slug}`} className={classes.titleLink}>
                      {title}
                    </Link>
                  </h6>
                  <p>{`Quantité: ${quantity}`}</p>
                  {stripeProductID && (
                    <Price product={product} button={false} quantity={quantity} />
                  )}
                </div>
              </div>
            )
          }
          return null
        })}
      </div>

      <HR className={classes.hr} />
    </div>
  )
}

export async function generateMetadata({ params: { id } }: OrderProps): Promise<Metadata> {
  return {
    title: `Commande numéro ${id}`,
    description: `Informations de la commande numéro ${id}.`,
    openGraph: mergeOpenGraph({
      title: `Order ${id}`,
      url: `/orders/${id}`,
    }),
  }
}
