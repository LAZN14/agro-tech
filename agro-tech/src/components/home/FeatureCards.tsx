import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSiteContent } from '../../context/SiteContext'
import { Container } from '../ui/Container'
import type { SiteContent } from '../../types/site'

const fallbackFeatures: SiteContent['features'] = [
  {
    title: 'Каталог техники',
    description:
      'Тракторы, комбайны, опрыскиватели и посевная техника — каждая единица проходит полную диагностику перед продажей.',
    to: '/catalog',
    cta: 'Смотреть каталог',
  },
  {
    title: 'Доставка по России',
    description:
      'Организуем безопасную перевозку тяжёлой техники на низкорамных платформах с полным страхованием груза.',
    to: '/delivery',
    cta: 'Узнать условия',
  },
  {
    title: 'Гарантия возврата',
    description:
      'Покупайте с уверенностью: если техника не соответствует описанию — возврат по условиям договора.',
    to: '/warranty',
    cta: 'Подробнее',
  },
]

export function FeatureCards() {
  const { content } = useSiteContent()
  const features = content?.features ?? fallbackFeatures

  return (
    <section className="py-16 lg:py-20">
      <Container>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, i) => (
            <Link
              key={feature.to}
              to={feature.to}
              className="surface-card group relative overflow-hidden p-8 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="font-display text-5xl font-bold text-agro-100 dark:text-agro-800">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-agro-950 transition-colors group-hover:text-agro-600 dark:text-white dark:group-hover:text-agro-300">
                {feature.title}
              </h3>
              <p className="mt-3 leading-relaxed text-agro-600 dark:text-agro-400">{feature.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-agro-600 group-hover:text-agro-800 dark:text-agro-400">
                {feature.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
