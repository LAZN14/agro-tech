import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'
import { LoadingSpinner } from './components/ui/LoadingSpinner'

const CatalogPage = lazy(() =>
  import('./pages/CatalogPage').then((m) => ({ default: m.CatalogPage })),
)
const EquipmentDetailPage = lazy(() =>
  import('./pages/EquipmentDetailPage').then((m) => ({ default: m.EquipmentDetailPage })),
)
const ComparePage = lazy(() =>
  import('./pages/ComparePage').then((m) => ({ default: m.ComparePage })),
)
const LeasingPage = lazy(() =>
  import('./pages/LeasingPage').then((m) => ({ default: m.LeasingPage })),
)
const ServicePage = lazy(() =>
  import('./pages/ServicePage').then((m) => ({ default: m.ServicePage })),
)
const DeliveryPage = lazy(() =>
  import('./pages/DeliveryPage').then((m) => ({ default: m.DeliveryPage })),
)
const WarrantyPage = lazy(() =>
  import('./pages/WarrantyPage').then((m) => ({ default: m.WarrantyPage })),
)
const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })),
)
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })),
)

function LazyPage({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || undefined}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="catalog" element={<LazyPage><CatalogPage /></LazyPage>} />
          <Route path="catalog/:slug" element={<LazyPage><EquipmentDetailPage /></LazyPage>} />
          <Route path="compare" element={<LazyPage><ComparePage /></LazyPage>} />
          <Route path="leasing" element={<LazyPage><LeasingPage /></LazyPage>} />
          <Route path="service" element={<LazyPage><ServicePage /></LazyPage>} />
          <Route path="delivery" element={<LazyPage><DeliveryPage /></LazyPage>} />
          <Route path="warranty" element={<LazyPage><WarrantyPage /></LazyPage>} />
          <Route path="about" element={<LazyPage><AboutPage /></LazyPage>} />
          <Route path="contact" element={<LazyPage><ContactPage /></LazyPage>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
