import type { ComponentProps } from 'react'

type Variant = 'primary' | 'ghost'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-bold tracking-wide transition-colors focus-visible:outline-offset-4'
const variants: Record<Variant, string> = {
  // Nút nền vàng, chữ tối ở cả hai chế độ (đã đo tương phản).
  primary: 'bg-action text-on-gold hover:bg-action-hover active:bg-action-pressed',
  ghost: 'border border-line-gold text-gold-500 hover:bg-elevated',
}

type ButtonProps = ComponentProps<'a'> & { variant?: Variant }

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return <a className={`${base} ${variants[variant]} ${className}`.trim()} {...props} />
}
