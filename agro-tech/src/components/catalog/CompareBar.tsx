import { GitCompare, X } from 'lucide-react'
import { useCompare } from '../../context/CompareContext'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'

export function CompareBar() {
  const { count, items, removeFromCompare, clearCompare } = useCompare()

  if (count === 0) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-agro-200 bg-white/95 shadow-2xl backdrop-blur-md dark:border-agro-700 dark:bg-agro-900/95">
      <Container className="flex flex-wrap items-center justify-between gap-4 py-3">
        <div className="flex items-center gap-3">
          <GitCompare className="h-5 w-5 text-agro-600 dark:text-agro-400" />
          <span className="text-sm font-semibold text-agro-900 dark:text-agro-100">
            Сравнение: {count} из 3
          </span>
          <div className="hidden gap-2 sm:flex">
            {items.map((item) => (
              <span
                key={item.id}
                className="inline-flex items-center gap-1 rounded-full bg-agro-100 px-3 py-1 text-xs font-medium text-agro-800 dark:bg-agro-800 dark:text-agro-200"
              >
                {item.name}
                <button
                  type="button"
                  onClick={() => removeFromCompare(item.id)}
                  className="rounded-full p-0.5 hover:bg-agro-200 dark:hover:bg-agro-700"
                  aria-label="Удалить"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={clearCompare}
            className="text-sm font-medium text-agro-600 hover:text-agro-800 dark:text-agro-400"
          >
            Очистить
          </button>
          <Button to="/compare" size="sm" disabled={count < 2}>
            Сравнить ({count})
          </Button>
        </div>
      </Container>
    </div>
  )
}
