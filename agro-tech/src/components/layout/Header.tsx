import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Phone, Tractor, GitCompare } from 'lucide-react'
import { SITE } from '../../data/constants'
import { navLinks } from '../../data/navigation'
import { useCompare } from '../../context/CompareContext'
import { useScrolled } from '../../hooks/useScrolled'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { ThemeToggle } from '../ui/ThemeToggle'
import { cn } from '../../utils/format'

function HeaderActions({ className }: { className?: string }) {
  const { count } = useCompare()

  return (
    <div className={cn('flex shrink-0 items-center gap-5', className)}>
      <ThemeToggle />
      <Link
        to="/compare"
        className="relative rounded-lg p-2 text-agro-700 hover:bg-agro-100 dark:text-agro-200 dark:hover:bg-agro-800"
        aria-label="Сравнение"
      >
        <GitCompare className="h-5 w-5" />
        {count > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-agro-600 text-[10px] font-bold text-white">
            {count}
          </span>
        )}
      </Link>
      <a
        href={`tel:${SITE.phone.replace(/\s/g, '')}`}
        className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-agro-700 hover:text-agro-900 dark:text-agro-300"
      >
        <Phone className="h-4 w-4 shrink-0 text-agro-500" />
        {SITE.phone}
      </a>
    </div>
  )
}

function Logo({ expanded, onNavigate }: { expanded: boolean; onNavigate?: () => void }) {
  return (
    <Link
      to="/"
      className={cn(
        'relative z-10 flex shrink-0 items-center transition-[gap] duration-500',
        expanded ? 'gap-3' : 'gap-2.5',
      )}
      onClick={onNavigate}
    >
      <span
        className={cn(
          'flex items-center justify-center bg-agro-600 text-white transition-all duration-500',
          expanded
            ? 'h-12 w-12 rounded-2xl shadow-lg shadow-agro-600/35 animate-logo-pop'
            : 'h-10 w-10 rounded-xl shadow-none',
        )}
      >
        <Tractor
          className={cn(
            'transition-all duration-500',
            expanded ? 'h-6 w-6' : 'h-5 w-5',
          )}
        />
      </span>
      <span className="hidden sm:block">
        <span
          className={cn(
            'block font-display font-bold leading-tight whitespace-nowrap text-agro-950 transition-all duration-500 dark:text-white',
            expanded ? 'text-xl' : 'text-lg',
          )}
        >
          {SITE.name}
        </span>
        <span
          className={cn(
            'block font-medium whitespace-nowrap text-agro-500 transition-all duration-500 dark:text-agro-400',
            expanded ? 'text-sm' : 'text-xs',
          )}
        >
          {SITE.tagline}
        </span>
      </span>
    </Link>
  )
}

function DesktopBar({ expanded }: { expanded: boolean }) {
  return (
    <div
      className={cn(
        'mx-auto hidden w-full max-w-7xl grid-cols-[auto_1fr_auto] items-center px-4 transition-[height,gap] duration-500 ease-out sm:px-6 xl:grid',
        expanded ? 'h-[5.25rem] gap-4 animate-header-slide-in' : 'h-16 gap-3',
      )}
    >
      <Logo expanded={expanded} />

      <nav className="flex min-w-0 items-center justify-center gap-0.5 overflow-hidden">
        {navLinks.map(({ to, label, icon: Icon }, i) => (
          <NavLink
            key={to}
            to={to}
            style={expanded ? { animationDelay: `${120 + i * 40}ms` } : undefined}
            className={({ isActive }) =>
              cn(
                'inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium transition-colors duration-300',
                expanded && 'animate-nav-item',
                isActive
                  ? 'bg-agro-100 text-agro-800 dark:bg-agro-800 dark:text-agro-100'
                  : 'text-agro-700 hover:bg-agro-50 hover:text-agro-900 dark:text-agro-300 dark:hover:bg-agro-800 dark:hover:text-white',
              )
            }
          >
            <Icon className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
            {label}
          </NavLink>
        ))}
      </nav>

      <HeaderActions />
    </div>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const compact = useScrolled()
  const expanded = !compact

  return (
    <header
      className={cn(
        'sticky top-0 z-40 overflow-hidden border-b bg-white/90 backdrop-blur-md transition-[height,box-shadow] duration-500 ease-out dark:bg-agro-950/90',
        expanded
          ? 'border-agro-200/30 dark:border-agro-800/30'
          : 'border-agro-200/50 shadow-sm dark:border-agro-800/50',
      )}
    >
      {/* Полоска-акцент: выезжает слева направо в развёрнутом режиме */}
      <div
        className={cn(
          'h-0.5 bg-gradient-to-r from-agro-600 via-agro-500 to-earth-400 transition-[transform,opacity] duration-700 ease-out origin-left',
          expanded ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0',
        )}
        aria-hidden
      />

      <div className="hidden xl:block">
        <DesktopBar expanded={expanded} />
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 xl:hidden">
        <Logo expanded={false} onNavigate={() => setOpen(false)} />
        <div className="flex items-center gap-2">
          <HeaderActions />
          <button
            type="button"
            className="rounded-lg p-2 text-agro-700 hover:bg-agro-100 dark:text-agro-200 dark:hover:bg-agro-800"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-agro-100 bg-white dark:border-agro-800 dark:bg-agro-950 xl:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'inline-flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium',
                    isActive
                      ? 'bg-agro-100 text-agro-800 dark:bg-agro-800 dark:text-agro-100'
                      : 'text-agro-700 dark:text-agro-300',
                  )
                }
              >
                <Icon className="h-5 w-5 shrink-0 opacity-80" aria-hidden />
                {label}
              </NavLink>
            ))}
            <Button to="/catalog" className="mt-2" onClick={() => setOpen(false)}>
              Смотреть каталог
            </Button>
          </Container>
        </div>
      )}
    </header>
  )
}
