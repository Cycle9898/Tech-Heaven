'use client'

import { useFilter } from '@/app/_providers/Filter'
import classes from './index.module.scss'
import type { Category } from '@/payload/payload-types'
import CheckBox from '@/app/_components/CheckBox'
import { HR } from '@/app/_components/HR'
import RadioButton from '@/app/_components/RadioButton'

function Filters({ categories }: { categories: Category[] }) {
  const { categoryFilters, sort, setCategoryFilters, setSort } = useFilter()

  const handleCategories = (categoryId: number) => {
    if (categoryFilters.includes(categoryId)) {
      const updatedCategories = categoryFilters.filter(id => id !== categoryId)

      setCategoryFilters(updatedCategories)
    } else {
      setCategoryFilters([...categoryFilters, categoryId])
    }
  }

  const handleSort = (value: string) => setSort(value)

  return (
    <div className={classes.filters}>
      <div>
        <h6 className={classes.title}>Catégories de produits</h6>

        <div className={classes.categories}>
          {categories.map(category => {
            const isSelected = categoryFilters.includes(category.id)

            return (
              <CheckBox
                key={category.id}
                label={category.title}
                value={category.id}
                isSelected={isSelected}
                onClickHandler={handleCategories}
              />
            )
          })}
        </div>
        <HR className={classes.hr} />

        <h6 className={classes.title}>Trier par</h6>

        <div className={classes.categories}>
          <RadioButton
            label="Les plus récent"
            value="-createdAt"
            isSelected={sort === '-createdAt'}
            onRadioChange={handleSort}
            groupName="sort"
          />
          <RadioButton
            label="Les plus anciens"
            value="createdAt"
            isSelected={sort === 'createdAt'}
            onRadioChange={handleSort}
            groupName="sort"
          />
        </div>
      </div>
    </div>
  )
}

export default Filters
