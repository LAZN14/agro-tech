import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'
import { FilterPanel } from '../components/catalog/FilterPanel'
import { EquipmentCard } from '../components/catalog/EquipmentCard'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { useEquipmentCatalog } from '../context/EquipmentContext'
import { useEquipmentFilter } from '../hooks/useEquipmentFilter'
import type { EquipmentCategory } from '../types/equipment'

export function CatalogPage() {
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get('category') as EquipmentCategory | null
  const { loading, error, brands, refetch } = useEquipmentCatalog()

  const { filters, updateFilter, resetFilters, results, activeFilterCount } =
    useEquipmentFilter(categoryParam ? { category: categoryParam } : undefined)

  const [mobileFilters, setMobileFilters] = useState(false)

  if (loading) return <LoadingSpinner label="Загрузка каталога..." />

  return (
    <div className="py-10 lg:py-14">
      <Container>
        <SectionHeading eyebrow="Каталог" title="Сельхозтехника в наличии" />

        {error && (
          <div className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-800 dark:bg-red-950/50 dark:text-red-200">
            {error}{' '}
            <button type="button" onClick={refetch} className="font-semibold underline">
              Повторить
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => setMobileFilters(true)}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-agro-200 bg-white py-3 font-semibold text-agro-800 dark:border-agro-700 dark:bg-agro-900 dark:text-agro-100 lg:hidden"
        >
          <SlidersHorizontal className="h-5 w-5" />
          Фильтры {activeFilterCount > 0 && `(${activeFilterCount})`}
        </button>

        <div className="mt-8 flex gap-8">
          <FilterPanel
            filters={filters}
            brands={brands}
            onChange={updateFilter}
            onReset={resetFilters}
            activeCount={activeFilterCount}
            resultCount={results.length}
            mobileOpen={mobileFilters}
            onMobileClose={() => setMobileFilters(false)}
          />

          {results.length > 0 ? (
            <div className="grid flex-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((item) => (
                <EquipmentCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="surface-card flex flex-1 flex-col items-center justify-center border-dashed py-20 text-center">
              <p className="font-display text-xl font-bold text-agro-800 dark:text-agro-100">
                Ничего не найдено
              </p>
              <p className="mt-2 text-agro-600 dark:text-agro-400">
                Попробуйте изменить параметры фильтрации
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-6 text-sm font-semibold text-agro-600 hover:text-agro-800 dark:text-agro-400"
              >
                Сбросить все фильтры
              </button>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}
