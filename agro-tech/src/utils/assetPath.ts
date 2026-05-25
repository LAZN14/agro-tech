/** Абсолютный путь с учётом base (GitHub Pages: /имя-репозитория/) */
export function assetPath(path: string): string {
  if (!path || path.startsWith('http') || path.startsWith('data:')) return path
  const clean = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${clean}`
}
