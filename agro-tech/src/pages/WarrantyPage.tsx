import { Shield, RefreshCw, FileText } from 'lucide-react'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'

export function WarrantyPage() {
  return (
    <section className="py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="Гарантии"
          title="Покупайте с уверенностью"
          description="На всю технику предоставляем документированную историю обслуживания и гарантийные обязательства."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Shield,
              title: 'Гарантия на б/у',
              text: 'До 12 месяцев на восстановленную технику после полной диагностики.',
            },
            {
              icon: RefreshCw,
              title: 'Возврат средств',
              text: 'Если техника не соответствует описанию — возврат по условиям договора купли-продажи.',
            },
            {
              icon: FileText,
              title: 'Прозрачные документы',
              text: 'Полный пакет: ПТС, сервисная книга, акт диагностики, договор.',
            },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-agro-200/60 bg-white p-8 text-center shadow-sm"
            >
              <Icon className="mx-auto h-10 w-10 text-agro-600" />
              <h3 className="mt-4 font-display text-lg font-bold text-agro-950">{title}</h3>
              <p className="mt-2 text-sm text-agro-600 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
