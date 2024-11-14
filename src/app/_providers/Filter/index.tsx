'use client'

import { createContext, SetStateAction, useContext, useState } from 'react'

type FilterContextType = {
  categoryFilters: number[]
  setCategoryFilters: React.Dispatch<SetStateAction<number[]>>
  sort: string
  setSort: React.Dispatch<SetStateAction<string>>
}

export const INITIAL_FILTER_DATA = {
  categoryFilters: [],
  setCategoryFilters: () => [],
  sort: '',
  setSort: () => '',
}

const FilterContext = createContext<FilterContextType>(INITIAL_FILTER_DATA)

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [categoryFilters, setCategoryFilters] = useState([])
  const [sort, setSort] = useState('-createdAt')

  return (
    <FilterContext.Provider
      value={{
        categoryFilters,
        setCategoryFilters,
        sort,
        setSort,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const useFilter = () => useContext(FilterContext)
