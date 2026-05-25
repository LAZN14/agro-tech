import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../utils/format'
import { imageFallbackSrc, resolveEquipmentImages } from '../../utils/images'

interface CardImageAlbumProps {
  slug: string
  images?: string[]
  alt: string
}

export function CardImageAlbum({ slug, images, alt }: CardImageAlbumProps) {
  const album = resolveEquipmentImages(slug, images)
  const [index, setIndex] = useState(0)
  const [broken, setBroken] = useState(false)

  useEffect(() => {
    setIndex(0)
    setBroken(false)
  }, [slug])

  const src = broken ? imageFallbackSrc() : (album[index] ?? imageFallbackSrc())

  const go = useCallback(
    (dir: -1 | 1) => {
      setBroken(false)
      setIndex((i) => (i + dir + album.length) % album.length)
    },
    [album.length],
  )

  const handleError = () => setBroken(true)

  if (album.length <= 1) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={handleError}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    )
  }

  return (
    <div className="relative h-full w-full">
      <img
        key={`${slug}-${index}-${src}`}
        src={src}
        alt={`${alt} — фото ${index + 1}`}
        loading={index === 0 ? 'lazy' : 'eager'}
        onError={handleError}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          go(-1)
        }}
        className="absolute left-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition hover:bg-black/55 group-hover:opacity-100"
        aria-label="Предыдущее фото"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          go(1)
        }}
        className="absolute right-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition hover:bg-black/55 group-hover:opacity-100"
        aria-label="Следующее фото"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-10 left-3 z-20 flex items-center gap-1.5">
        {album.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setBroken(false)
              setIndex(i)
            }}
            className={cn(
              'h-1.5 rounded-full transition-all',
              i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80',
            )}
            aria-label={`Фото ${i + 1}`}
          />
        ))}
        <span className="ml-1 rounded-md bg-black/40 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
          {index + 1}/{album.length}
        </span>
      </div>
    </div>
  )
}
