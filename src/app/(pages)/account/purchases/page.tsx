import React from 'react'
import Link from 'next/link'

import { getMeUser } from '@/app/_utilities/getMeUser'
import { formatDateTime } from '@/app/_utilities/formatDateTime'
import { Price } from '@/app/_components/Price'
import { Media } from '@/app/_components/Media'

import classes from './index.module.scss'

async function Purchases() {
  const { user } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'Vous devez être connecté pour voir vos commandes.',
    )}&redirect=${encodeURIComponent('/account/purchases')}`,
  })

  return (
    <div>
      <h5>Produits achetés précédemment</h5>
      <div>
        {user?.purchases?.length || 0 > 0 ? (
          <ul className={classes.purchases}>
            {user?.purchases?.map((purchase, index) => {
              return (
                <li key={index} className={classes.purchase}>
                  {typeof purchase === 'string' ? (
                    <div className={classes.noProduct}>
                      <div className={classes.placeholder}>Pas d'image</div>
                      <p>Produit indisponible</p>
                    </div>
                  ) : (
                    <Link href={`/products/${purchase.slug}`} className={classes.item}>
                      <div className={classes.mediaWrapper}>
                        {!purchase.meta.image && (
                          <div className={classes.placeholder}>Pas d'image</div>
                        )}
                        {purchase.meta.image && typeof purchase.meta.image !== 'string' && (
                          <Media imgClassName={classes.image} resource={purchase.meta.image} />
                        )}
                      </div>
                      <div className={classes.itemDetails}>
                        <h6>{purchase.title}</h6>
                        {purchase.stripeProductID && <Price product={purchase} />}
                        <p className={classes.purchasedDate}>{`Commandé le: ${formatDateTime(
                          purchase.createdAt,
                        )}`}</p>
                      </div>
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        ) : (
          <div className={classes.noPurchases}>Vous n'avez pas encore commandé.</div>
        )}
      </div>
    </div>
  )
}

export default Purchases
