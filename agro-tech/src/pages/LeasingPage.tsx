import { useSearchParams } from 'react-router-dom'
import { LeasingCalculator } from '../components/leasing/LeasingCalculator'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { CTABanner } from '../components/shared/CTABanner'

export function LeasingPage() {
  const [params] = useSearchParams()
  const price = Number(params.get('price')) || undefined

  return (
    <>
      <section className="py-16 lg:py-20">
        <Container>
          <SectionHeading
            eyebrow="Финансирование"
            title="Калькулятор лизинга"
            description="Рассчитайте ежемесячный платёж с учётом первоначального взноса, срока и процентной ставки. Параметры можно изменить под вашу сделку."
          />
          <div className="mt-10">
            <LeasingCalculator initialPrice={price} />
          </div>
        </Container>
      </section>
      <CTABanner
        title="Нужна индивидуальная ставка?"
        description="Для юридических лиц и крупных хозяйств подготовим персональное предложение по лизингу."
      />
    </>
  )
}
