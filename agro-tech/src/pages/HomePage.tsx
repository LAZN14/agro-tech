import { Hero } from '../components/home/Hero'
import { FeatureCards } from '../components/home/FeatureCards'
import { FeaturedEquipment } from '../components/home/FeaturedEquipment'
import { AboutPreview } from '../components/home/AboutPreview'
import { CTABanner } from '../components/shared/CTABanner'

export function HomePage() {
  return (
    <>
      <Hero />
      <FeatureCards />
      <FeaturedEquipment />
      <AboutPreview />
      <CTABanner
        title="Нужна консультация по подбору техники?"
        description="Наши специалисты помогут выбрать оптимальную модель под ваши культуры, площадь и бюджет."
      />
    </>
  )
}
