import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'

import { getMeUser } from '@/app/_utilities/getMeUser'
import type { Order } from '@/payload/payload-types'
import { RenderParams } from '@/app/_components/RenderParams'
import { formatDateTime } from '@/app/_utilities/formatDateTime'
import { Button } from '@/app/_components/Button'
import { mergeOpenGraph } from '@/app/_utilities/mergeOpenGraph'

import classes from './index.module.scss'

async function Orders() {
  const { token } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'Vous devez être connecté pour voir vos commandes.',
    )}&redirect=${encodeURIComponent('/account/orders')}`,
  })

  let orders: Order[] | null = null

  try {
    orders = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
      cache: 'no-store',
    })
      ?.then(async res => {
        if (!res.ok) notFound()
        const json = await res.json()
        if ('error' in json && json.error) notFound()
        if ('errors' in json && json.errors) notFound()
        return json
      })
      ?.then(json => json.docs)
  } catch (error) {
    // when deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // so swallow the error here and simply render the page with fallback data where necessary
    // in production you may want to redirect to a 404  page or at least log the error somewhere
    // console.error(error)
  }

  return (
    <div>
      <h5>Mes commandes</h5>

      {(!orders || !Array.isArray(orders) || orders?.length === 0) && (
        <p className={classes.noOrders}>Vous n'avez pas encore effectué de commande.</p>
      )}

      <RenderParams />

      {orders && orders.length > 0 && (
        <ul className={classes.orders}>
          {orders?.map(order => (
            <li key={order.id} className={classes.order}>
              <Link className={classes.item} href={`/account/orders/${order.id}`}>
                <div className={classes.itemContent}>
                  <h6 className={classes.itemTitle}>{`Commande numéro '${order.id}'`}</h6>
                  <div className={classes.itemMeta}>
                    <p>
                      {'Total: '}
                      {new Intl.NumberFormat('fr-FR', {
                        style: 'currency',
                        currency: 'EUR',
                      }).format(order.total / 100)}
                    </p>
                    <p className={classes.orderDate}>{`Commandée le: ${formatDateTime(
                      order.createdAt,
                    )}`}</p>
                  </div>
                </div>

                <Button
                  appearance="default"
                  label="Voir la commande"
                  className={classes.button}
                  el="button"
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Orders

export const metadata: Metadata = {
  title: 'Commandes',
  description: 'Mes commandes.',
  openGraph: mergeOpenGraph({
    title: 'Orders',
    url: '/orders',
  }),
}
