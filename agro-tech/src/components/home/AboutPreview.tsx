import { CheckCircle2 } from 'lucide-react'
import { useSiteContent } from '../../context/SiteContext'
import { imageFallbackSrc } from '../../utils/images'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

export function AboutPreview() {
  const { content } = useSiteContent()
  const about = content?.about

  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <img
              src={imageFallbackSrc()}
              alt="Уборка урожая комбайном"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-agro-900/10" />
          </div>

          <div>
            <SectionHeading
              eyebrow="О компании"
              title={about?.title ?? 'Техника, которой доверяют аграрии'}
              description={
                about?.description ??
                'Мы специализируемся на продаже и обслуживании сельхозтехники ведущих мировых брендов.'
              }
            />
            <ul className="mt-8 space-y-3">
              {(about?.benefits ?? []).map((item) => (
                <li key={item} className="flex items-center gap-3 text-agro-800 dark:text-agro-200">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-agro-500" />
                  {item}
                </li>
              ))}
            </ul>
            <Button to="/about" className="mt-8">
              Узнать больше
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
