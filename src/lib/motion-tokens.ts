/**
 * Hằng số chuyển động dùng chung cho JS (Motion, rAF). Bản CSS tương ứng là biến trong globals.css
 * (--ease-out, --dur-reveal, --stagger). Giữ hai nơi khớp nhau.
 */
export const MOTION = {
  /** cubic-bezier(.22,1,.36,1) */
  ease: [0.22, 1, 0.36, 1] as const,
  revealMs: 800,
  staggerMs: 90,
  revealOffsetPx: 35,
  revealThreshold: 0.12,
  countDurationMs: 1600,
  /** Chỉ ghim cuộn ngang từ độ rộng này trở lên (px). */
  pinMinWidth: 761,
  marqueeSeconds: 32,
  headerScrollPx: 40,
  /** Độ lệch tối đa của nút "từ tính" khi rê chuột (px). */
  magneticPx: 6,
} as const

/** Thiết bị yếu hoặc màn nhỏ: tắt parallax/nền động. */
export function isLowPower(): boolean {
  if (typeof window === 'undefined') return false
  const cores = navigator.hardwareConcurrency ?? 8
  return window.innerWidth < 768 || cores <= 4
}
