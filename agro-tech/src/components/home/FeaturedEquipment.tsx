import { useEquipmentCatalog } from '../../context/EquipmentContext'
import { EquipmentCard } from '../catalog/EquipmentCard'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { LoadingSpinner } from '../ui/LoadingSpinner'

export function FeaturedEquipment() {
  const { catalog, loading } = useEquipmentCatalog()
  const featured = catalog.filter((e) => e.featured).slice(0, 4)

  if (loading) {
    return (
      <section className="bg-white py-16 dark:bg-agro-900 lg:py-24">
        <LoadingSpinner label="Загрузка техники..." />
      </section>
    )
  }

  return (
    <section className="bg-white py-16 dark:bg-agro-900 lg:py-24">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Рекомендуем"
            title="Популярная техника"
            description="Подборка из CMS — проверенные единицы с минимальными моточасами."
          />
          <Button to="/catalog" variant="outline" className="shrink-0 self-start sm:self-auto">
            Весь каталог
          </Button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((item) => (
            <EquipmentCard key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </section>
  )
}
