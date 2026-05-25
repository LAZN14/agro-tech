import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Calendar, Gauge, Phone, Calculator } from 'lucide-react'
import { useEquipmentCatalog } from '../context/EquipmentContext'
import { CATEGORY_LABELS, SITE } from '../data/constants'
import { formatHp, formatHours, formatPrice } from '../utils/format'
import { ConditionBadge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { ImageGallery } from '../components/catalog/ImageGallery'
import { CompareButton } from '../components/catalog/CompareButton'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'

export function EquipmentDetailPage() {
  const { slug } = useParams()
  const { catalog, loading } = useEquipmentCatalog()
  const item = catalog.find((e) => e.slug === slug)

  if (loading) return <LoadingSpinner />
  if (!item) return <Navigate to="/catalog" replace />

  return (
    <div className="py-10 lg:py-14">
      <Container>
        <Link
          to="/catalog"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-agro-600 hover:text-agro-800 dark:text-agro-400 dark:hover:text-agro-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Назад в каталог
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">
          <ImageGallery slug={item.slug} images={item.images} alt={item.name} />

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <ConditionBadge condition={item.condition} />
              <span className="rounded-full bg-agro-100 px-3 py-1 text-sm font-medium text-agro-700 dark:bg-agro-800 dark:text-agro-200">
                {CATEGORY_LABELS[item.category]}
              </span>
              <CompareButton equipmentId={item.id} />
            </div>

            <p className="mt-4 text-lg font-medium text-agro-500 dark:text-agro-400">{item.brand}</p>
            <h1 className="font-display text-3xl font-bold text-agro-950 sm:text-4xl dark:text-white">
              {item.name}
            </h1>

            <p className="mt-4 leading-relaxed text-agro-700 dark:text-agro-300">{item.description}</p>

            <ul className="mt-6 flex flex-wrap gap-6 text-agro-700 dark:text-agro-300">
              <li className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-agro-400" />
                {item.year} г.
              </li>
              <li className="flex items-center gap-2">
                <Gauge className="h-5 w-5 text-agro-400" />
                {formatHours(item.hours)}
              </li>
              {item.horsepower > 0 && (
                <li className="font-semibold text-earth-600 dark:text-earth-400">
                  {formatHp(item.horsepower)}
                </li>
              )}
            </ul>

            <p className="mt-8 font-display text-4xl font-bold text-agro-800 dark:text-agro-100">
              {formatPrice(item.price)}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/contact" size="lg">
                Запросить предложение
              </Button>
              <Button to={`/leasing?price=${item.price}`} variant="secondary" size="lg">
                <Calculator className="h-5 w-5" />
                Лизинг
              </Button>
              <Button href={`tel:${SITE.phone}`} variant="outline" size="lg">
                <Phone className="h-5 w-5" />
                Позвонить
              </Button>
            </div>

            <dl className="surface-card mt-10 grid gap-4 p-6 sm:grid-cols-2">
              {Object.entries(item.specs).map(([key, value]) => (
                <div key={key}>
                  <dt className="text-sm capitalize text-agro-500 dark:text-agro-400">{key}</dt>
                  <dd className="font-semibold text-agro-900 dark:text-agro-100">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </div>
  )
}
