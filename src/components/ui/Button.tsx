import type { ComponentProps } from 'react'

type Variant = 'primary' | 'ghost' | 'light'

const base =
  'btn-sheen magnetic relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3 text-sm font-bold tracking-wide transition-[translate,transform,background-color,box-shadow,color] duration-300 hover:-translate-y-0.5 focus-visible:outline-offset-4 motion-reduce:transition-none motion-reduce:hover:translate-y-0'
const variants: Record<Variant, string> = {
  // Nút xanh thương hiệu (gradient), chữ trắng. Vệt sáng quét qua khi hover (.btn-sheen).
  primary:
    'bg-[image:var(--action-gradient)] text-on-gold shadow-lg shadow-action/30 hover:shadow-xl hover:shadow-action/35 active:bg-action-pressed',
  ghost: 'border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-white',
  // Nút trắng trên nền navy/xanh.
  light: 'bg-white text-gold-600 shadow-lg shadow-black/15 hover:bg-gold-soft',
}

type ButtonProps = ComponentProps<'a'> & { variant?: Variant }

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return <a className={`${base} ${variants[variant]} ${className}`.trim()} {...props} />
}
