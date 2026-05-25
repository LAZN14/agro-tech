import { ArrowRight, Gauge, Calendar, Calculator } from 'lucide-react'
import { CATEGORY_SHORT_LABELS } from '../../data/constants'
import type { Equipment } from '../../types/equipment'
import { formatHp, formatHours, formatPrice } from '../../utils/format'
import { ConditionBadge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { CompareButton } from './CompareButton'
import { CardImageAlbum } from './CardImageAlbum'

interface EquipmentCardProps {
  item: Equipment
  variant?: 'default' | 'compact'
}

export function EquipmentCard({ item, variant = 'default' }: EquipmentCardProps) {
  return (
    <article className="surface-card group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-agro-900/10 dark:hover:shadow-black/30">
      <div className="relative aspect-[4/3] overflow-hidden bg-agro-100 dark:bg-agro-800">
        <CardImageAlbum slug={item.slug} images={item.images} alt={item.name} />
        <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-1.5">
          <ConditionBadge condition={item.condition} short />
          <span className="rounded-full bg-white/95 px-2 py-0.5 text-xs font-medium text-agro-800 shadow-sm backdrop-blur-sm dark:bg-agro-900/95 dark:text-agro-100">
            {CATEGORY_SHORT_LABELS[item.category]}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 z-10">
          <CompareButton equipmentId={item.id} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm font-medium text-agro-500 dark:text-agro-400">{item.brand}</p>
        <h3 className="mt-1 font-display text-lg font-bold text-agro-950 transition-colors group-hover:text-agro-600 dark:text-white dark:group-hover:text-agro-300">
          {item.name}
        </h3>

        <ul className="mt-3 flex flex-wrap gap-3 text-sm text-agro-600 dark:text-agro-400">
          <li className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-agro-400" />
            {item.year}
          </li>
          <li className="flex items-center gap-1">
            <Gauge className="h-4 w-4 text-agro-400" />
            {formatHours(item.hours)}
          </li>
          {item.horsepower > 0 && (
            <li className="font-medium text-earth-600 dark:text-earth-400">
              {formatHp(item.horsepower)}
            </li>
          )}
        </ul>

        {variant === 'default' && (
          <p className="mt-3 line-clamp-2 text-sm text-agro-600/80 dark:text-agro-400/80">
            {item.description}
          </p>
        )}

        <div className="mt-auto flex flex-col gap-3 pt-4">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-xs text-agro-500 dark:text-agro-400">Цена</p>
              <p className="truncate font-display text-base font-bold text-agro-800 dark:text-agro-100 sm:text-lg">
                {formatPrice(item.price)}
              </p>
            </div>
            <Button
              to={`/catalog/${item.slug}`}
              variant="outline"
              size="sm"
              className="shrink-0 gap-1 px-2.5 py-1.5 text-xs"
            >
              Подробнее
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
          <Button
            to={`/leasing?price=${item.price}`}
            variant="ghost"
            size="sm"
            className="w-full justify-center dark:text-agro-300"
          >
            <Calculator className="h-4 w-4" />
            Рассчитать лизинг
          </Button>
        </div>
      </div>
    </article>
  )
}
