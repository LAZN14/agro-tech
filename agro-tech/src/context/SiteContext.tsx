import { createContext, useContext, useEffect, useState } from 'react'
import { fetchSiteContent } from '../api/site'
import type { SiteContent } from '../types/site'

interface SiteContextValue {
  content: SiteContent | null
  loading: boolean
}

const SiteContext = createContext<SiteContextValue | null>(null)

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    fetchSiteContent(controller.signal)
      .then(setContent)
      .catch(() => setContent(null))
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [])

  return (
    <SiteContext.Provider value={{ content, loading }}>{children}</SiteContext.Provider>
  )
}

export function useSiteContent() {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error('useSiteContent must be used within SiteProvider')
  return ctx
}
