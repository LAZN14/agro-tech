import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { CompareBar } from '../catalog/CompareBar'
import { useCompare } from '../../context/CompareContext'
import { cn } from '../../utils/format'

export function Layout() {
  const { count } = useCompare()

  return (
    <div className={cn('flex min-h-screen flex-col', count > 0 && 'pb-[4.5rem]')}>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CompareBar />
    </div>
  )
}
