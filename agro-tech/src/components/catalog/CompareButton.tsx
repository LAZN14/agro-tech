import { GitCompare } from 'lucide-react'
import { useCompare } from '../../context/CompareContext'
import { cn } from '../../utils/format'

interface CompareButtonProps {
  equipmentId: string
  className?: string
  /** Только иконка — для карточек каталога */
  iconOnly?: boolean
}

export function CompareButton({ equipmentId, className, iconOnly }: CompareButtonProps) {
  const { isInCompare, toggleCompare, canAdd } = useCompare()
  const active = isInCompare(equipmentId)
  const disabled = !active && !canAdd

  return (
    <button
      type="button"
      onClick={() => toggleCompare(equipmentId)}
      disabled={disabled}
      title={disabled ? 'Максимум 3 модели' : active ? 'Убрать из сравнения' : 'Добавить к сравнению'}
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-semibold transition',
        iconOnly ? 'p-2' : 'gap-1 px-2.5 py-1.5 text-xs',
        active
          ? 'bg-agro-600 text-white'
          : 'bg-white/95 text-agro-700 shadow-sm hover:bg-white dark:bg-agro-900/95 dark:text-agro-200 dark:hover:bg-agro-800',
        disabled && 'cursor-not-allowed opacity-40',
        className,
      )}
      aria-label={active ? 'Убрать из сравнения' : 'Добавить к сравнению'}
    >
      <GitCompare className={iconOnly ? 'h-4 w-4' : 'h-3.5 w-3.5'} />
      {!iconOnly && (active ? 'В сравнении' : 'Сравнить')}
    </button>
  )
}
