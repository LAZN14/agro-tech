import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { Equipment } from '../types/equipment'
import { useEquipmentCatalog } from './EquipmentContext'

const MAX_COMPARE = 3
const STORAGE_KEY = 'agro-compare'

interface CompareContextValue {
  ids: string[]
  items: Equipment[]
  count: number
  isInCompare: (id: string) => boolean
  toggleCompare: (id: string) => void
  removeFromCompare: (id: string) => void
  clearCompare: () => void
  canAdd: boolean
}

const CompareContext = createContext<CompareContextValue | null>(null)

function loadIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? (JSON.parse(raw) as string[]) : []
    return Array.isArray(parsed) ? parsed.slice(0, MAX_COMPARE) : []
  } catch {
    return []
  }
}

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const { catalog } = useEquipmentCatalog()
  const [ids, setIds] = useState<string[]>(loadIds)

  const persist = useCallback((next: string[]) => {
    setIds(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }, [])

  const items = useMemo(
    () => ids.map((id) => catalog.find((e) => e.id === id)).filter(Boolean) as Equipment[],
    [ids, catalog],
  )

  const isInCompare = useCallback((id: string) => ids.includes(id), [ids])

  const toggleCompare = useCallback(
    (id: string) => {
      if (ids.includes(id)) {
        persist(ids.filter((x) => x !== id))
      } else if (ids.length < MAX_COMPARE) {
        persist([...ids, id])
      }
    },
    [ids, persist],
  )

  const removeFromCompare = useCallback(
    (id: string) => persist(ids.filter((x) => x !== id)),
    [ids, persist],
  )

  const clearCompare = useCallback(() => persist([]), [persist])

  return (
    <CompareContext.Provider
      value={{
        ids,
        items,
        count: ids.length,
        isInCompare,
        toggleCompare,
        removeFromCompare,
        clearCompare,
        canAdd: ids.length < MAX_COMPARE,
      }}
    >
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const ctx = useContext(CompareContext)
  if (!ctx) throw new Error('useCompare must be used within CompareProvider')
  return ctx
}
