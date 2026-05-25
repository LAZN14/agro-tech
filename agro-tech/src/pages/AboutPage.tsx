import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { CTABanner } from '../components/shared/CTABanner'

export function AboutPage() {
  return (
    <>
      <section className="py-16 lg:py-20">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="О нас"
            title="Зелёное Поле — ваш партнёр в агробизнесе"
          />
          <div className="prose prose-agro mt-8 space-y-4 text-agro-700 leading-relaxed">
            <p>
              Мы работаем с 2010 года и специализируемся на продаже сельхозтехники ведущих мировых
              и отечественных производителей. Наша команда — инженеры, механики и менеджеры с
              опытом в полевых условиях.
            </p>
            <p>
              Каждая единица техники проходит многоуровневую проверку: от электронной диагностики
              до испытаний на ходу. Мы не скрываем моточасы, историю ремонтов и реальное состояние
              узлов.
            </p>
            <p>
              Помимо продажи предлагаем лизинг, trade-in, сезонное ТО и доставку по всей России.
              Наша цель — чтобы вы вышли в поле с техникой, на которую можно положиться.
            </p>
          </div>
        </Container>
      </section>
      <CTABanner
        title="Приезжайте в шоурум"
        description="Посмотрите технику вживую, проведите тест-драйв и получите консультацию специалиста."
      />
    </>
  )
}
