export type EquipmentCategory =
  | 'tractors'
  | 'combines'
  | 'harvesters'
  | 'sprayers'
  | 'planters'
  | 'loaders'

export type EquipmentCondition = 'new' | 'used' | 'refurbished'

export interface Equipment {
  id: string
  slug: string
  name: string
  brand: string
  category: EquipmentCategory
  year: number
  hours: number
  horsepower: number
  price: number
  condition: EquipmentCondition
  featured?: boolean
  images: string[]
  image: string
  description: string
  specs: Record<string, string>
}

export interface EquipmentFilters {
  search: string
  category: EquipmentCategory | 'all'
  brand: string
  condition: EquipmentCondition | 'all'
  minPrice: number
  maxPrice: number
  minYear: number
  maxYear: number
  minHp: number
  maxHp: number
  sort: 'price-asc' | 'price-desc' | 'year-desc' | 'hours-asc'
}

export const defaultFilters: EquipmentFilters = {
  search: '',
  category: 'all',
  brand: 'all',
  condition: 'all',
  minPrice: 0,
  maxPrice: 50_000_000,
  minYear: 2015,
  maxYear: 2026,
  minHp: 0,
  maxHp: 600,
  sort: 'year-desc',
}
