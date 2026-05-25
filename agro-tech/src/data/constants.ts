import type { EquipmentCategory } from '../types/equipment'

export const SITE = {
  name: 'Зелёное Поле',
  tagline: 'Сельхозтехника',
  phone: '+7 (861) 234-56-78',
  email: 'info@zelenoe-pole.ru',
  address: 'г. Краснодар, ул. Сельская, 42',
  hours: {
    sales: 'Пн–Пт: 9:00–18:00, Сб: 10:00–15:00',
    service: 'Пн–Пт: 8:00–17:00',
  },
} as const

/** Основное фото техники и блоков сайта */
export const DEFAULT_IMAGE = '/images/equipment/1.jpeg'

export const CATEGORY_LABELS: Record<EquipmentCategory, string> = {
  tractors: 'Тракторы',
  combines: 'Комбайны',
  harvesters: 'Жатки и подборщики',
  sprayers: 'Опрыскиватели',
  planters: 'Посевная техника',
  loaders: 'Погрузчики',
}

/** Короткие подписи для бейджей на карточках каталога */
export const CATEGORY_SHORT_LABELS: Record<EquipmentCategory, string> = {
  tractors: 'Трактор',
  combines: 'Комбайн',
  harvesters: 'Жатка',
  sprayers: 'Опрыскиватель',
  planters: 'Посевная',
  loaders: 'Погрузчик',
}

export const CONDITION_LABELS = {
  new: 'Новая',
  used: 'Б/у',
  refurbished: 'Восстановленная',
} as const

export const CONDITION_SHORT_LABELS = {
  new: 'Новая',
  used: 'Б/у',
  refurbished: 'Восст.',
} as const
