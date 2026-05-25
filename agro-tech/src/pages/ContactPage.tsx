import { useState } from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { SITE } from '../data/constants'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="Контакты"
          title="Свяжитесь с нами"
          description="Ответим на вопросы о технике, доставке, лизинге и сервисе."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            {[
              { icon: MapPin, label: 'Адрес', value: SITE.address },
              { icon: Phone, label: 'Телефон', value: SITE.phone, href: `tel:${SITE.phone}` },
              { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
              { icon: Clock, label: 'Продажи', value: SITE.hours.sales },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-agro-200/60">
                <Icon className="h-6 w-6 shrink-0 text-agro-500" />
                <div>
                  <p className="text-sm font-medium text-agro-500">{label}</p>
                  {href ? (
                    <a href={href} className="font-semibold text-agro-900 hover:text-agro-600">
                      {value}
                    </a>
                  ) : (
                    <p className="font-semibold text-agro-900">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-agro-200/60"
          >
            {submitted ? (
              <div className="py-12 text-center">
                <p className="font-display text-xl font-bold text-agro-800">Заявка отправлена!</p>
                <p className="mt-2 text-agro-600">Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-medium text-agro-800">Имя</span>
                    <input
                      required
                      className="mt-1 w-full rounded-xl border border-agro-200 px-4 py-2.5 outline-none focus:border-agro-500 focus:ring-2 focus:ring-agro-500/20"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-agro-800">Телефон</span>
                    <input
                      required
                      type="tel"
                      className="mt-1 w-full rounded-xl border border-agro-200 px-4 py-2.5 outline-none focus:border-agro-500 focus:ring-2 focus:ring-agro-500/20"
                    />
                  </label>
                </div>
                <label className="mt-4 block">
                  <span className="text-sm font-medium text-agro-800">Сообщение</span>
                  <textarea
                    rows={4}
                    className="mt-1 w-full rounded-xl border border-agro-200 px-4 py-2.5 outline-none focus:border-agro-500 focus:ring-2 focus:ring-agro-500/20"
                    placeholder="Интересует трактор / комбайн, бюджет, регион..."
                  />
                </label>
                <Button type="submit" className="mt-6 w-full">
                  Отправить заявку
                </Button>
              </>
            )}
          </form>
        </div>
      </Container>
    </section>
  )
}
