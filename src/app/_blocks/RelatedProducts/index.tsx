import React from 'react'

import { Product } from '../../../payload/payload-types'
import { Card } from '../../_components/Card'
import { Gutter } from '../../_components/Gutter'

import classes from './index.module.scss'

export type RelatedProductsProps = {
  blockType: 'relatedProducts'
  blockName: string
  introContent?: any
  docs?: (number | Product)[]
  relationTo: 'products'
}

export const RelatedProducts: React.FC<RelatedProductsProps> = props => {
  const { docs, relationTo } = props

  return (
    <div className={classes.relatedProducts}>
      <Gutter>
        <h3 className={classes.title}>Produits associés</h3>

        <div className={classes.grid}>
          {docs?.map(doc => {
            if (typeof doc === 'number') return null

            return <Card key={doc.id} relationTo={relationTo} doc={doc as Product} showCategories />
          })}
        </div>
      </Gutter>
    </div>
  )
}
