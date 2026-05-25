import { MapPin, Package, FileCheck } from 'lucide-react'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { CTABanner } from '../components/shared/CTABanner'

const steps = [
  { icon: FileCheck, title: 'Договор и страхование', text: 'Оформляем перевозку с полным страхованием груза.' },
  { icon: Package, title: 'Погрузка на платформу', text: 'Используем низкорамные тралы и крепления по стандартам.' },
  { icon: MapPin, title: 'Доставка до поля', text: 'Доставляем технику до вашего хозяйства в согласованные сроки.' },
]

export function DeliveryPage() {
  return (
    <>
      <section className="py-16 lg:py-20">
        <Container>
          <SectionHeading
            eyebrow="Логистика"
            title="Доставка по всей России"
            description="Организуем безопасную перевозку тракторов, комбайнов и навесного оборудования в любой регион."
          />

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <div key={title} className="relative rounded-2xl bg-white p-8 shadow-sm ring-1 ring-agro-200/60">
                <span className="font-display text-4xl font-bold text-agro-100">{i + 1}</span>
                <Icon className="mt-4 h-8 w-8 text-agro-600" />
                <h3 className="mt-4 font-display text-lg font-bold text-agro-950">{title}</h3>
                <p className="mt-2 text-agro-600">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner
        title="Рассчитать стоимость доставки"
        description="Укажите регион и тип техники — подготовим индивидуальное предложение."
      />
    </>
  )
}
