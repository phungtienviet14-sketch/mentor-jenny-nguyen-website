import { Marquee } from '@/components/ui/Marquee'

const WORDS = ['ĐỔI MỚI', 'MARKETING', 'THƯƠNG HIỆU', 'KINH DOANH', 'ỨNG DỤNG AI']

/**
 * Dải chữ lớn chạy ngang trên nền navy (như site tham chiếu): chữ vàng đặc xen chữ viền trắng.
 * Trang trí thuần túy nên ẩn với trình đọc màn hình; CSS thuần, dừng khi hover hoặc giảm chuyển động.
 */
export function BrandBand() {
  return (
    <div aria-hidden="true" className="bg-[var(--band-bg)] py-5">
      <Marquee duration={32}>
        {WORDS.map((w, i) => (
          <span key={w} className="flex items-center gap-10">
            <span
              className={`font-display text-3xl font-extrabold tracking-tight whitespace-nowrap md:text-5xl ${
                i % 2 === 0
                  ? 'text-[var(--band-accent)]'
                  : 'text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.8)]'
              }`}
            >
              {w}
            </span>
            <span className="text-[var(--band-accent)]">✦</span>
          </span>
        ))}
      </Marquee>
    </div>
  )
}
