import { Search, SlidersHorizontal, X } from 'lucide-react'
import { CATEGORY_LABELS, CONDITION_LABELS } from '../../data/constants'
import type { EquipmentFilters } from '../../types/equipment'
import { formatPrice } from '../../utils/format'
import { Button } from '../ui/Button'

interface FilterPanelProps {
  filters: EquipmentFilters
  brands: string[]
  onChange: <K extends keyof EquipmentFilters>(key: K, value: EquipmentFilters[K]) => void
  onReset: () => void
  activeCount: number
  resultCount: number
  mobileOpen?: boolean
  onMobileClose?: () => void
}

const categories = Object.entries(CATEGORY_LABELS) as [keyof typeof CATEGORY_LABELS, string][]

export function FilterPanel({
  filters,
  brands,
  onChange,
  onReset,
  activeCount,
  resultCount,
  mobileOpen,
  onMobileClose,
}: FilterPanelProps) {
  const panel = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-agro-600" />
          <h3 className="font-display text-lg font-bold text-agro-950 dark:text-white">Фильтры</h3>
          {activeCount > 0 && (
            <span className="rounded-full bg-agro-600 px-2 py-0.5 text-xs font-bold text-white">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="text-sm font-medium text-agro-600 hover:text-agro-800"
          >
            Сбросить
          </button>
        )}
      </div>

      <p className="text-sm text-agro-600">
        Найдено: <span className="font-semibold text-agro-900">{resultCount}</span> единиц
      </p>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-agro-800">Поиск</span>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-agro-400" />
          <input
            type="search"
            value={filters.search}
            onChange={(e) => onChange('search', e.target.value)}
            placeholder="Марка, модель..."
            className="w-full rounded-xl border border-agro-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-agro-500 focus:ring-2 focus:ring-agro-500/20 dark:border-agro-700 dark:bg-agro-800 dark:text-white"
          />
        </div>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-agro-800">Категория</span>
        <select
          value={filters.category}
          onChange={(e) => onChange('category', e.target.value as EquipmentFilters['category'])}
          className="w-full rounded-xl border border-agro-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-agro-500 focus:ring-2 focus:ring-agro-500/20 dark:border-agro-700 dark:bg-agro-800 dark:text-white"
        >
          <option value="all">Все категории</option>
          {categories.map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-agro-800">Бренд</span>
        <select
          value={filters.brand}
          onChange={(e) => onChange('brand', e.target.value)}
          className="w-full rounded-xl border border-agro-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-agro-500 focus:ring-2 focus:ring-agro-500/20 dark:border-agro-700 dark:bg-agro-800 dark:text-white"
        >
          <option value="all">Все бренды</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-agro-800">Состояние</span>
        <select
          value={filters.condition}
          onChange={(e) => onChange('condition', e.target.value as EquipmentFilters['condition'])}
          className="w-full rounded-xl border border-agro-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-agro-500 focus:ring-2 focus:ring-agro-500/20 dark:border-agro-700 dark:bg-agro-800 dark:text-white"
        >
          <option value="all">Любое</option>
          {(Object.entries(CONDITION_LABELS) as [keyof typeof CONDITION_LABELS, string][]).map(
            ([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ),
          )}
        </select>
      </label>

      <div>
        <span className="mb-2 block text-sm font-medium text-agro-800">
          Цена: {formatPrice(filters.minPrice)} — {formatPrice(filters.maxPrice)}
        </span>
        <div className="flex gap-3">
          <input
            type="range"
            min={0}
            max={50_000_000}
            step={500_000}
            value={filters.maxPrice}
            onChange={(e) => onChange('maxPrice', Number(e.target.value))}
            className="w-full accent-agro-600"
          />
        </div>
      </div>

      <div>
        <span className="mb-2 block text-sm font-medium text-agro-800">
          Год: {filters.minYear} — {filters.maxYear}
        </span>
        <input
          type="range"
          min={2015}
          max={2026}
          value={filters.minYear}
          onChange={(e) => onChange('minYear', Number(e.target.value))}
          className="w-full accent-agro-600"
        />
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-agro-800">Сортировка</span>
        <select
          value={filters.sort}
          onChange={(e) => onChange('sort', e.target.value as EquipmentFilters['sort'])}
          className="w-full rounded-xl border border-agro-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-agro-500 focus:ring-2 focus:ring-agro-500/20 dark:border-agro-700 dark:bg-agro-800 dark:text-white"
        >
          <option value="year-desc">Сначала новые</option>
          <option value="price-asc">Цена ↑</option>
          <option value="price-desc">Цена ↓</option>
          <option value="hours-asc">Меньше моточасов</option>
        </select>
      </label>
    </div>
  )

  return (
    <>
      <aside className="hidden w-72 shrink-0 lg:block">
        <div className="surface-card sticky top-24 p-6">
          {panel}
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-agro-950/50 backdrop-blur-sm" onClick={onMobileClose} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl dark:bg-agro-900">
            <div className="mb-4 flex justify-end">
              <button
                type="button"
                onClick={onMobileClose}
                className="rounded-full p-2 hover:bg-agro-100"
                aria-label="Закрыть"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {panel}
            <Button className="mt-6 w-full" onClick={onMobileClose}>
              Показать {resultCount} результатов
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
