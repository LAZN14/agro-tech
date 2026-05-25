import { EquipmentProvider } from '../context/EquipmentContext'
import { SiteProvider } from '../context/SiteContext'
import { ThemeProvider } from '../context/ThemeContext'
import { CompareProvider } from '../context/CompareContext'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SiteProvider>
        <EquipmentProvider>
          <CompareProvider>{children}</CompareProvider>
        </EquipmentProvider>
      </SiteProvider>
    </ThemeProvider>
  )
}
