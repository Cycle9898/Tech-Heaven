'use client'

import React, { useState } from 'react'
import classes from './index.module.scss'
import Link from 'next/link'
import { Media } from '@/app/_components/Media'
import { Price } from '@/app/_components/Price'
import Image from 'next/image'
import { RemoveFromCartButton } from '@/app/_components/RemoveFromCartButton'

function CartItem({ product, title, metaImage, quantity, addItemToCart }) {
  const [dynamicQuantity, setDynamicQuantity] = useState(quantity)

  const decrementQuantity = () => {
    const updatedQuantity = dynamicQuantity > 1 ? dynamicQuantity - 1 : 1

    setDynamicQuantity(updatedQuantity)
    addItemToCart({ product, quantity: Number(updatedQuantity) })
  }
  const incrementQuantity = () => {
    const updatedQuantity = dynamicQuantity + 1

    setDynamicQuantity(updatedQuantity)
    addItemToCart({ product, quantity: Number(updatedQuantity) })
  }
  const enterQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQuantity = Number(event.target.value)

    if (!updatedQuantity) return

    setDynamicQuantity(updatedQuantity)
    addItemToCart({ product, quantity: Number(updatedQuantity) })
  }

  return (
    <li className={classes.item}>
      <Link href={`/products/${product.slug}`} className={classes.mediaWrapper}>
        {!metaImage && <span>Pas d'image</span>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media className={classes.media} imgClassName={classes.image} resource={metaImage} fill />
        )}
      </Link>

      <div className={classes.itemDetails}>
        <div className={classes.titleWrapper}>
          <h6>{title}</h6>

          <Price product={product} button={false} />
        </div>

        <div className={classes.quantity}>
          <div className={classes.quantityBtn} onClick={decrementQuantity}>
            <Image
              src="/assets/icons/minus.svg"
              alt="Moins"
              width={24}
              height={24}
              className={classes.qtnBt}
            />
          </div>

          <input
            type="text"
            className={classes.quantityInput}
            value={dynamicQuantity}
            onChange={enterQuantity}
          />

          <div className={classes.quantityBtn} onClick={incrementQuantity}>
            <Image
              src="/assets/icons/plus.svg"
              alt="Plus"
              width={24}
              height={24}
              className={classes.qtnBt}
            />
          </div>
        </div>
      </div>

      <div className={classes.subtotalWrapper}>
        <Price product={product} button={false} quantity={dynamicQuantity} />

        <RemoveFromCartButton product={product} />
      </div>
    </li>
  )
}

export default CartItem
