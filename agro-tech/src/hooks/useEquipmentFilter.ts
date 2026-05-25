import { useMemo, useState } from 'react'
import { useEquipmentCatalog } from '../context/EquipmentContext'
import { defaultFilters, type Equipment, type EquipmentFilters } from '../types/equipment'

function applyFilters(items: Equipment[], filters: EquipmentFilters): Equipment[] {
  const q = filters.search.trim().toLowerCase()

  return items
    .filter((item) => {
      if (filters.category !== 'all' && item.category !== filters.category) return false
      if (filters.brand !== 'all' && item.brand !== filters.brand) return false
      if (filters.condition !== 'all' && item.condition !== filters.condition) return false
      if (item.price < filters.minPrice || item.price > filters.maxPrice) return false
      if (item.year < filters.minYear || item.year > filters.maxYear) return false
      if (item.horsepower > 0 && (item.horsepower < filters.minHp || item.horsepower > filters.maxHp))
        return false
      if (
        q &&
        !`${item.name} ${item.brand} ${item.description}`.toLowerCase().includes(q)
      )
        return false
      return true
    })
    .sort((a, b) => {
      switch (filters.sort) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'hours-asc':
          return a.hours - b.hours
        case 'year-desc':
        default:
          return b.year - a.year
      }
    })
}

export function useEquipmentFilter(initial?: Partial<EquipmentFilters>) {
  const { catalog } = useEquipmentCatalog()
  const [filters, setFilters] = useState<EquipmentFilters>({
    ...defaultFilters,
    ...initial,
  })

  const results = useMemo(
    () => applyFilters(catalog, filters),
    [catalog, filters],
  )

  const activeFilterCount = useMemo(() => {
    let count = 0
    if (filters.search) count++
    if (filters.category !== 'all') count++
    if (filters.brand !== 'all') count++
    if (filters.condition !== 'all') count++
    if (filters.minPrice > defaultFilters.minPrice || filters.maxPrice < defaultFilters.maxPrice)
      count++
    if (filters.minYear > defaultFilters.minYear || filters.maxYear < defaultFilters.maxYear)
      count++
    if (filters.minHp > defaultFilters.minHp || filters.maxHp < defaultFilters.maxHp) count++
    return count
  }, [filters])

  const resetFilters = () => setFilters({ ...defaultFilters, ...initial })

  const updateFilter = <K extends keyof EquipmentFilters>(
    key: K,
    value: EquipmentFilters[K],
  ) => setFilters((prev) => ({ ...prev, [key]: value }))

  return { filters, setFilters, updateFilter, resetFilters, results, activeFilterCount }
}
