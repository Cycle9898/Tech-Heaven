import type { Category } from '@/payload/payload-types'
import classes from './index.module.scss'
import Link from 'next/link'
import CategoryCard from './CategoryCard'

function Categories({ categories }: { categories: Category[] }) {
  return (
    <section className={classes.container}>
      <div className={classes.titleWrapper}>
        <h3>Choisir une catégorie</h3>
        <Link href="/products">Tout montrer</Link>
      </div>

      <div className={classes.list}>
        {categories.map(category => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  )
}

export default Categories
