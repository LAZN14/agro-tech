import { Link } from 'react-router-dom'
import { CATEGORY_LABELS, CONDITION_LABELS } from '../data/constants'
import { useCompare } from '../context/CompareContext'
import { formatHp, formatHours, formatPrice } from '../utils/format'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'
import { ConditionBadge } from '../components/ui/Badge'

const ROWS: Array<{
  key: string
  label: string
  get: (item: import('../types/equipment').Equipment) => string
}> = [
  { key: 'brand', label: 'Бренд', get: (i) => i.brand },
  { key: 'category', label: 'Категория', get: (i) => CATEGORY_LABELS[i.category] },
  { key: 'year', label: 'Год', get: (i) => String(i.year) },
  { key: 'hours', label: 'Моточасы', get: (i) => formatHours(i.hours) },
  { key: 'hp', label: 'Мощность', get: (i) => formatHp(i.horsepower) },
  { key: 'condition', label: 'Состояние', get: (i) => CONDITION_LABELS[i.condition] },
  { key: 'price', label: 'Цена', get: (i) => formatPrice(i.price) },
]

export function ComparePage() {
  const { items, count, clearCompare } = useCompare()

  if (count < 2) {
    return (
      <Container className="py-20 text-center">
        <SectionHeading
          title="Сравнение моделей"
          description="Добавьте минимум 2 единицы техники из каталога для сравнения характеристик."
        />
        <Button to="/catalog" className="mt-8">
          Перейти в каталог
        </Button>
      </Container>
    )
  }

  const specKeys = [...new Set(items.flatMap((i) => Object.keys(i.specs)))]

  return (
    <div className="py-10 lg:py-14">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading title="Сравнение моделей" description={`Сравниваем ${count} позиций`} />
          <button
            type="button"
            onClick={clearCompare}
            className="text-sm font-semibold text-agro-600 hover:text-agro-800 dark:text-agro-400"
          >
            Очистить всё
          </button>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-agro-50 p-4 font-medium text-agro-500 dark:bg-agro-950 dark:text-agro-400">
                  Параметр
                </th>
                {items.map((item) => (
                  <th key={item.id} className="min-w-[200px] p-4 align-top">
                    <img
                      src={item.image}
                      alt=""
                      className="mb-3 aspect-video w-full rounded-xl object-cover"
                    />
                    <p className="font-display font-bold text-agro-950 dark:text-white">
                      {item.name}
                    </p>
                    <ConditionBadge condition={item.condition} className="mt-2" />
                    <Link
                      to={`/catalog/${item.slug}`}
                      className="mt-2 block text-xs font-semibold text-agro-600 hover:underline dark:text-agro-400"
                    >
                      Подробнее →
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.key} className="border-t border-agro-200 dark:border-agro-800">
                  <td className="sticky left-0 bg-agro-50 p-4 font-medium text-agro-700 dark:bg-agro-950 dark:text-agro-300">
                    {row.label}
                  </td>
                  {items.map((item) => (
                    <td key={item.id} className="p-4 text-agro-900 dark:text-agro-100">
                      {row.get(item)}
                    </td>
                  ))}
                </tr>
              ))}
              {specKeys.map((key) => (
                <tr key={key} className="border-t border-agro-200 dark:border-agro-800">
                  <td className="sticky left-0 bg-agro-50 p-4 font-medium capitalize text-agro-700 dark:bg-agro-950 dark:text-agro-300">
                    {key}
                  </td>
                  {items.map((item) => (
                    <td key={item.id} className="p-4 text-agro-900 dark:text-agro-100">
                      {item.specs[key] ?? '—'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  )
}
