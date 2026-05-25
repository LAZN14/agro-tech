import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../utils/format'
import { imageFallbackSrc, resolveEquipmentImages } from '../../utils/images'

interface ImageGalleryProps {
  slug: string
  images?: string[]
  alt: string
}

export function ImageGallery({ slug, images, alt }: ImageGalleryProps) {
  const list = resolveEquipmentImages(slug, images)
  const [active, setActive] = useState(0)
  const [broken, setBroken] = useState(false)

  const src = broken ? imageFallbackSrc() : (list[active] ?? imageFallbackSrc())

  const go = (dir: -1 | 1) => {
    setBroken(false)
    setActive((i) => (i + dir + list.length) % list.length)
  }

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-3xl bg-agro-100 dark:bg-agro-800">
        <img
          src={src}
          alt={alt}
          className="aspect-[4/3] w-full object-cover"
          onError={() => setBroken(true)}
        />
        {list.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/55"
              aria-label="Предыдущее"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/55"
              aria-label="Следующее"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <span className="absolute bottom-3 right-3 rounded-md bg-black/40 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {active + 1} / {list.length}
            </span>
          </>
        )}
      </div>
      {list.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {list.map((photo, i) => (
            <button
              key={photo + i}
              type="button"
              onClick={() => {
              setBroken(false)
              setActive(i)
            }}
              className={cn(
                'h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition',
                i === active
                  ? 'border-agro-600 ring-2 ring-agro-600/30 dark:border-agro-400'
                  : 'border-transparent opacity-70 hover:opacity-100',
              )}
            >
              <img
                src={photo}
                alt=""
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = imageFallbackSrc()
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
