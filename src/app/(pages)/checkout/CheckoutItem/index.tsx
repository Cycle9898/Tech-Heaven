import Link from 'next/link'

import { Media } from '../../../_components/Media'
import { Price } from '../../../_components/Price'

import classes from './index.module.scss'

function CheckoutItem({ product, title, metaImage, quantity }) {
  return (
    <li className={classes.item}>
      <Link href={`/products/${product.slug}`} className={classes.mediaWrapper}>
        {!metaImage && <div className={classes.placeholder}>Pas d'image</div>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media className={classes.media} imgClassName={classes.image} resource={metaImage} fill />
        )}
      </Link>

      <div className={classes.itemDetails}>
        <div className={classes.titleWrapper}>
          <h6>{title}</h6>
          <Price product={product} button={false} />
        </div>
        <p className={classes.quantity}>x{quantity}</p>
      </div>

      <div className={classes.subtotal}>
        <Price product={product} button={false} quantity={quantity} />
      </div>
    </li>
  )
}

export default CheckoutItem
