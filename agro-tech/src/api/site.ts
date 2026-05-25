import { apiGet } from './client'
import type { SiteContent } from '../types/site'

export async function fetchSiteContent(signal?: AbortSignal): Promise<SiteContent> {
  return apiGet<SiteContent>('/site.json', signal)
}
