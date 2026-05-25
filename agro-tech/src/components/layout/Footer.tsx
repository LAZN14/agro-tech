import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Tractor } from 'lucide-react'
import { SITE } from '../../data/constants'
import { navLinks } from '../../data/navigation'
import { Container } from '../ui/Container'

export function Footer() {
  return (
    <footer className="border-t border-agro-200 bg-agro-900 text-agro-100">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-agro-600">
                <Tractor className="h-5 w-5 text-white" />
              </span>
              <div>
                <p className="font-display text-lg font-bold text-white">{SITE.name}</p>
                <p className="text-sm text-agro-300">{SITE.tagline}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-agro-300">
              Надёжный партнёр для агробизнеса: продажа, сервис и доставка сельхозтехники по всей
              России.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white">Навигация</h4>
            <ul className="mt-4 space-y-2">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="inline-flex items-center gap-2 text-sm text-agro-300 transition hover:text-white"
                  >
                    <Icon className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white">Контакты</h4>
            <ul className="mt-4 space-y-3 text-sm text-agro-300">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-agro-400" />
                {SITE.address}
              </li>
              <li>
                <a href={`tel:${SITE.phone}`} className="flex items-center gap-2 hover:text-white">
                  <Phone className="h-4 w-4 text-agro-400" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-white">
                  <Mail className="h-4 w-4 text-agro-400" />
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white">Режим работы</h4>
            <dl className="mt-4 space-y-2 text-sm text-agro-300">
              <div>
                <dt className="font-medium text-agro-200">Продажи</dt>
                <dd>{SITE.hours.sales}</dd>
              </div>
              <div>
                <dt className="font-medium text-agro-200">Сервис</dt>
                <dd>{SITE.hours.service}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-agro-800 pt-8 text-sm text-agro-400 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. Все права защищены.</p>
          <p>Информация на сайте носит ознакомительный характер.</p>
        </div>
      </Container>
    </footer>
  )
}
