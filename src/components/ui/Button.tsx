import type { ComponentProps } from 'react'

type Variant = 'primary' | 'ghost'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-bold tracking-wide transition-colors focus-visible:outline-offset-4'
const variants: Record<Variant, string> = {
  // Nút đỏ thương hiệu, chữ trắng ở cả hai chế độ (đã đo tương phản).
  primary:
    'bg-action text-on-gold shadow-md shadow-action/25 hover:-translate-y-0.5 hover:bg-action-hover active:bg-action-pressed motion-reduce:hover:translate-y-0',
  ghost: 'border border-gold-500 text-gold-500 hover:bg-elevated',
}

type ButtonProps = ComponentProps<'a'> & { variant?: Variant }

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return <a className={`${base} ${variants[variant]} ${className}`.trim()} {...props} />
}
