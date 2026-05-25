import { apiGet } from './client'
import type { Equipment } from '../types/equipment'
import { assetPath } from '../utils/assetPath'

interface EquipmentApiResponse {
  items: Omit<Equipment, 'image'>[]
  meta: { version: string; updatedAt: string }
}

function normalizeEquipment(raw: Omit<Equipment, 'image'>): Equipment {
  const images = raw.images.map(assetPath)
  return {
    ...raw,
    images,
    image: images[0] ?? assetPath('/images/equipment/1.jpeg'),
  }
}

export async function fetchEquipmentCatalog(signal?: AbortSignal): Promise<Equipment[]> {
  const data = await apiGet<EquipmentApiResponse>('/equipment.json', signal)
  return data.items.map(normalizeEquipment)
}

export async function fetchEquipmentBySlug(
  slug: string,
  catalog: Equipment[],
): Promise<Equipment | undefined> {
  return catalog.find((e) => e.slug === slug)
}
