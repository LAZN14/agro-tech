import {
  LayoutGrid,
  Calculator,
  Wrench,
  Truck,
  ShieldCheck,
  Building2,
  Mail,
  type LucideIcon,
} from 'lucide-react'

export const navLinks: Array<{ to: string; label: string; icon: LucideIcon }> = [
  { to: '/catalog', label: 'Каталог', icon: LayoutGrid },
  { to: '/leasing', label: 'Лизинг', icon: Calculator },
  { to: '/service', label: 'Сервис', icon: Wrench },
  { to: '/delivery', label: 'Доставка', icon: Truck },
  { to: '/warranty', label: 'Гарантия', icon: ShieldCheck },
  { to: '/about', label: 'О компании', icon: Building2 },
  { to: '/contact', label: 'Контакты', icon: Mail },
]
