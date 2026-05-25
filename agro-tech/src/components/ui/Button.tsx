import { Link } from 'react-router-dom'
import { cn } from '../../utils/format'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary:
    'bg-agro-600 text-white hover:bg-agro-700 shadow-md shadow-agro-600/20 focus-visible:ring-agro-500',
  secondary:
    'bg-earth-500 text-white hover:bg-earth-600 shadow-md shadow-earth-500/20 focus-visible:ring-earth-400',
  outline:
    'border-2 border-agro-600 text-agro-700 hover:bg-agro-600 hover:text-white focus-visible:ring-agro-500',
  ghost: 'text-agro-700 hover:bg-agro-100 focus-visible:ring-agro-400',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3.5 text-base',
}

interface ButtonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: React.ReactNode
  to?: string
  href?: string
  type?: 'button' | 'submit'
  onClick?: () => void
  disabled?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  to,
  href,
  type = 'button',
  onClick,
  disabled,
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
    variants[variant],
    sizes[size],
    className,
  )

  if (to) {
    if (disabled) {
      return <span className={cn(classes, 'pointer-events-none opacity-50')}>{children}</span>
    }
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
