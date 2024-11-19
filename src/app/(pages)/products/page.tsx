import { Gutter } from '@/app/_components/Gutter'
import classes from './index.module.scss'
import { Blocks } from '@/app/_components/Blocks'
import { Category, Page } from '@/payload/payload-types'
import { fetchDoc } from '@/app/_api/fetchDoc'
import { draftMode } from 'next/headers'
import { fetchDocs } from '@/app/_api/fetchDocs'
import { HR } from '@/app/_components/HR'
import Filters from './Filters'

async function Products() {
  const { isEnabled: isDraftMode } = draftMode()

  let page: Page | null = null
  let categories: Category[] | null = null

  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug: 'products',
      draft: isDraftMode,
    })

    categories = await fetchDocs('categories')
  } catch (error) {
    console.error(error)
  }

  return (
    <div className={classes.container}>
      <Gutter className={classes.products}>
        <Filters categories={categories} />

        <Blocks blocks={page.layout} disableTopPadding={true} />
      </Gutter>
      <HR />
    </div>
  )
}

export default Products
