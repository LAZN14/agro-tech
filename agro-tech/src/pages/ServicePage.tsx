import { Settings, Cpu, Droplets, CalendarCheck } from 'lucide-react'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { CTABanner } from '../components/shared/CTABanner'

const services = [
  {
    icon: Settings,
    title: 'ТО и регламентные работы',
    description: 'Замена масел, фильтров, регулировка узлов по регламенту производителя.',
  },
  {
    icon: Cpu,
    title: 'Диагностика электроники',
    description: 'Сканирование блоков управления, калибровка GPS и систем точного земледелия.',
  },
  {
    icon: Droplets,
    title: 'Гидравлика и трансмиссия',
    description: 'Ремонт гидросистем, КПП, мостов и ходовой части.',
  },
  {
    icon: CalendarCheck,
    title: 'Сезонная подготовка',
    description: 'Предпосевная и предуборочная подготовка техники к пику нагрузки.',
  },
]

export function ServicePage() {
  return (
    <>
      <section className="bg-agro-800 py-16 text-white lg:py-20">
        <Container>
          <SectionHeading
            eyebrow="Сервис"
            title="Профессиональное обслуживание"
            description="Собственный сервисный центр с сертифицированными механиками и оригинальными запчастями."
            className="[&_h2]:text-white [&_p]:text-agro-200"
          />
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            {services.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-agro-200/60 bg-white p-8 shadow-sm"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-agro-100 text-agro-600">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-agro-950">{title}</h3>
                <p className="mt-2 text-agro-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner
        title="Запишитесь на сервис"
        description="Оставьте заявку — перезвоним в течение рабочего дня и согласуем удобное время."
      />
    </>
  )
}
