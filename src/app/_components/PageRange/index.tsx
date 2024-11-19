import React from 'react'

import classes from './index.module.scss'

const defaultLabels = {
  plural: 'Éléments',
  singular: 'Élément',
}

const defaultCollectionLabels = {
  products: {
    plural: 'Produits',
    singular: 'Produit',
  },
}

export const PageRange: React.FC<{
  className?: string
  collection?: string
  collectionLabels?: {
    plural?: string
    singular?: string
  }
  currentPage?: number
  limit?: number
  totalDocs?: number
}> = props => {
  const {
    className,
    collection,
    collectionLabels: collectionLabelsFromProps,
    currentPage,
    limit,
    totalDocs,
  } = props

  let indexStart = (currentPage ? currentPage - 1 : 1) * (limit || 1) + 1
  if (totalDocs && indexStart > totalDocs) indexStart = 0

  let indexEnd = (currentPage || 1) * (limit || 1)
  if (totalDocs && indexEnd > totalDocs) indexEnd = totalDocs

  const { plural, singular } =
    collectionLabelsFromProps || defaultCollectionLabels[collection || ''] || defaultLabels || {}

  return (
    <div className={[className, classes.pageRange].filter(Boolean).join(' ')}>
      {(typeof totalDocs === 'undefined' || totalDocs === 0) &&
        "La recherche n'a produit aucun résultat."}
      {typeof totalDocs !== 'undefined' &&
        totalDocs > 0 &&
        `${indexStart}${indexStart > 0 ? ` à ${indexEnd}` : ''} sur ${totalDocs} ${
          totalDocs > 1 ? plural : singular
        }`}
    </div>
  )
}
