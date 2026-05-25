import { DEFAULT_IMAGE } from '../data/constants'
import { assetPath } from './assetPath'

const ALBUM_SIZE = 3

/** Пути к фотоальбому: slug-1.jpeg … slug-3.jpeg */
export function getEquipmentAlbumPaths(slug: string): string[] {
  return Array.from({ length: ALBUM_SIZE }, (_, i) =>
    assetPath(`/images/equipment/${slug}-${i + 1}.jpeg`),
  )
}

/** Только локальные пути (/…); внешние URL игнорируются */
export function resolveEquipmentImages(
  slug: string,
  apiImages?: string[],
): string[] {
  const local = (apiImages ?? []).filter((src) => src.startsWith('/'))

  if (local.length > 0) {
    const album = local.slice(0, ALBUM_SIZE).map(assetPath)
    const fill = album[0] ?? assetPath(DEFAULT_IMAGE)
    while (album.length < ALBUM_SIZE) album.push(fill)
    return album
  }

  return getEquipmentAlbumPaths(slug)
}

export function imageFallbackSrc(): string {
  return assetPath(DEFAULT_IMAGE)
}
