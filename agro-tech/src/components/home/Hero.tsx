import { ArrowRight, Shield, Truck, Wrench } from 'lucide-react'
import { useSiteContent } from '../../context/SiteContext'
import { imageFallbackSrc } from '../../utils/images'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'

export function Hero() {
  const { content } = useSiteContent()
  const hero = content?.hero

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-agro-800 via-agro-700 to-agro-900 text-white">
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `url("${imageFallbackSrc()}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-agro-950/90 via-agro-900/70 to-transparent" />

      <Container className="relative py-20 sm:py-28 lg:py-32">
        <div className="max-w-2xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-earth-400" />
            {hero?.badge ?? 'Проверенная техника для вашего хозяйства'}
          </p>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {hero?.title ?? 'Сельхозтехника'}{' '}
            <span className="text-earth-300">{hero?.titleAccent ?? 'с гарантией качества'}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-agro-100/90">
            {hero?.description ??
              'Тракторы, комбайны, опрыскиватели и посевная техника — каждая единица проходит полную диагностику.'}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button to="/catalog" size="lg" variant="secondary">
              Смотреть каталог
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button to="/leasing" size="lg" variant="outline" className="border-white/40 text-white hover:bg-white hover:text-agro-900">
              Калькулятор лизинга
            </Button>
          </div>
        </div>

        <div className="mt-14 grid max-w-3xl gap-4 sm:grid-cols-3">
          {[
            { icon: Shield, label: 'Гарантия качества' },
            { icon: Truck, label: 'Доставка по РФ' },
            { icon: Wrench, label: 'Сервис 360°' },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm"
            >
              <Icon className="h-5 w-5 text-earth-300" />
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
