export function formatPrice(value: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatHours(hours: number): string {
  if (hours === 0) return '—'
  return `${hours.toLocaleString('ru-RU')} м/ч`
}

export function formatHp(hp: number): string {
  if (hp === 0) return '—'
  return `${hp} л.с.`
}

export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}
