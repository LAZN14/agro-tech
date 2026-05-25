import { cn } from '../../utils/format'
import { CONDITION_LABELS, CONDITION_SHORT_LABELS } from '../../data/constants'
import type { EquipmentCondition } from '../../types/equipment'

const conditionStyles: Record<EquipmentCondition, string> = {
  new: 'bg-agro-100 text-agro-800',
  used: 'bg-earth-100 text-earth-800',
  refurbished: 'bg-blue-100 text-blue-800',
}

interface BadgeProps {
  condition: EquipmentCondition
  className?: string
  short?: boolean
}

export function ConditionBadge({ condition, className, short }: BadgeProps) {
  const label = short ? CONDITION_SHORT_LABELS[condition] : CONDITION_LABELS[condition]

  return (
    <span
      className={cn(
        'inline-flex shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold shadow-sm',
        conditionStyles[condition],
        className,
      )}
    >
      {label}
    </span>
  )
}
