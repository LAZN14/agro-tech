import { Button } from '../ui/Button'
import { Container } from '../ui/Container'

interface CTABannerProps {
  title: string
  description: string
}

export function CTABanner({ title, description }: CTABannerProps) {
  return (
    <section className="py-16">
      <Container>
        <div className="rounded-3xl bg-gradient-to-r from-agro-700 to-agro-800 px-8 py-12 text-center text-white sm:px-16">
          <h2 className="font-display text-2xl font-bold sm:text-3xl text-balance">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-agro-100">{description}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button to="/contact" variant="secondary">
              Оставить заявку
            </Button>
            <Button
              to="/catalog"
              variant="outline"
              className="border-white/50 text-white hover:bg-white hover:text-agro-900"
            >
              Каталог техники
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
