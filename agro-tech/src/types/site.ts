export interface SiteContent {
  hero: {
    badge: string
    title: string
    titleAccent: string
    description: string
  }
  features: Array<{
    title: string
    description: string
    to: string
    cta: string
  }>
  about: {
    title: string
    description: string
    benefits: string[]
  }
  leasing: {
    defaultRate: number
    defaultTerm: number
    defaultDownPayment: number
    minTerm: number
    maxTerm: number
  }
}
