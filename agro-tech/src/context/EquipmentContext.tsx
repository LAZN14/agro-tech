import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { fetchEquipmentCatalog } from '../api/equipment'
import type { Equipment } from '../types/equipment'

interface EquipmentContextValue {
  catalog: Equipment[]
  brands: string[]
  loading: boolean
  error: string | null
  refetch: () => void
}

const EquipmentContext = createContext<EquipmentContextValue | null>(null)

export function EquipmentProvider({ children }: { children: React.ReactNode }) {
  const [catalog, setCatalog] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback((signal?: AbortSignal) => {
    setLoading(true)
    setError(null)

    return fetchEquipmentCatalog(signal)
      .then(setCatalog)
      .catch((err: Error) => {
        if (err.name !== 'AbortError') setError('Не удалось загрузить каталог')
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    load(controller.signal)
    return () => controller.abort()
  }, [load])

  const refetch = useCallback(() => {
    const controller = new AbortController()
    load(controller.signal)
  }, [load])

  const brands = useMemo(
    () => [...new Set(catalog.map((e) => e.brand))].sort(),
    [catalog],
  )

  return (
    <EquipmentContext.Provider
      value={{ catalog, brands, loading, error, refetch }}
    >
      {children}
    </EquipmentContext.Provider>
  )
}

export function useEquipmentCatalog() {
  const ctx = useContext(EquipmentContext)
  if (!ctx) throw new Error('useEquipmentCatalog must be used within EquipmentProvider')
  return ctx
}
