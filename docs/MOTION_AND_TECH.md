# Phân tích chuyển động & công nghệ (so với site tham chiếu)

Nguồn: đọc trực tiếp mã của https://mentor-jenny-nguyen-ai.tallcoin1.chatgpt.site/ (CSS, 5 khối script inline, computed style). Figma **không** chứa chuyển động nên tài liệu này là "motion spec" bổ sung cho Figma.

## 1. Phát hiện chính: site tham chiếu KHÔNG dùng thư viện nào

Không có GSAP, Framer Motion, Lenis, AOS, Three.js, Swiper (đã kiểm tra `window` và danh sách script: chỉ có 5 script inline, cộng font Google). Toàn bộ hiệu ứng là **HTML + CSS + JavaScript thuần (~10 KB)**, dùng 4 kỹ thuật:

| # | Hiệu ứng | Cách site tham chiếu làm | Chi tiết đo được |
|---|---|---|---|
| 1 | Nền "sống" (ambient) | `position:fixed` + 3 quả cầu gradient (`radial-gradient`, 65vmax, opacity .65) + lưới 3D (`perspective:1100px`, `rotateX(65deg)`) + 4 vật thể 3D bằng CSS (cầu, 2 vòng, khối lập phương) | JS rAF: `transform` đổi theo `scrollY` bằng hàm sin; làm mượt `current += (target-current)*.085` |
| 2 | Hiện dần khi cuộn (reveal) | `IntersectionObserver` threshold .12, thêm class `is-visible` rồi `unobserve` | `opacity 0→1`, `translateY 35px→0`, 0.7s / 0.85s, easing `cubic-bezier(.22,1,.36,1)`, so le 90ms theo thứ tự con (`--reveal-delay`) |
| 3 | Cuộn ngang ghim (khóa học 8 thẻ, lộ trình 5 bước) | Kỹ thuật **sticky + section cao**: section cao `240vh`, bên trong `position:sticky`; tiến độ cuộn → `translate3d(-travel*p,0,0)` | `p` làm mượt kiểu mũ `current += (target-current)*(1-exp(-dt/85))`, thanh tiến độ `scaleX`, tự đo lại bằng `ResizeObserver`; tắt ghim khi < 761px hoặc reduced-motion |
| 4 | Marquee chữ, chữ lấp lánh, header | CSS keyframes thuần: `brandDrift 32s linear infinite` (`translateX(-50%)` trên bộ nội dung nhân đôi), chữ viền `-webkit-text-stroke`; `jennyTextLight 6s` (di chuyển `background-position` của gradient clip chữ); header `sticky` + `backdrop-filter: blur(18px)` | Fade vào lúc tải: `fade .7s` (translateY 15px) |

Ngoài ra: `scroll-behavior:smooth`, `prefers-reduced-motion` được xử lý ở mọi hiệu ứng, chỉ animate `transform`/`opacity` (GPU), listener `passive`, `will-change` chỉ đặt trên vật đang chuyển động.

## 2. So sánh lựa chọn thư viện

| Phương án | Ưu | Nhược | Dung lượng gần đúng* | Kết luận |
|---|---|---|---|---|
| **Motion** (`motion/react`, trước đây Framer Motion) | `whileInView`, `useScroll` + `useTransform` + `useSpring` (đúng bài toán lerp/pin), variants stagger, `useReducedMotion`, hợp React/Next, `LazyMotion` giảm bundle | Phải đặt trong client component; dễ re-render nếu dùng state thay vì MotionValue | ~5 KB lõi (LazyMotion) + phần scroll | **CHỌN – thư viện chính** |
| GSAP + ScrollTrigger | Mạnh nhất cho pin/scrub/timeline phức tạp | Phải tự quản lý cleanup trong React (`useGSAP`), nặng hơn, API khác React | ~25–40 KB | Dự phòng nếu cần timeline phức tạp (chưa cần) |
| Lenis (smooth scroll) | Cuộn mượt "kiểu quảng cáo" | Site tham chiếu **không** dùng; có thể xung đột sticky/anchor, ảnh hưởng a11y | ~3 KB | **KHÔNG dùng** ở đợt 1 |
| CSS scroll-driven animations (`animation-timeline`) | Không JS, rất nhẹ | Hỗ trợ trình duyệt chưa đồng đều (Firefox) | 0 KB | Chỉ dùng như tăng cường, có fallback |
| CSS thuần (keyframes, transition, sticky, `backdrop-filter`) | Y hệt site tham chiếu | Cần JS cho phần gắn với `scrollY` | 0 KB | **CHỌN – cho marquee, shimmer, hover, header** |
| Three.js / React Three Fiber | 3D thật | Nặng (~150 KB+), thừa vì site chỉ dùng CSS 3D transform | 150 KB+ | **KHÔNG dùng** |
| Lottie / AOS / Swiper | Hoạt họa dựng sẵn / reveal / carousel | AOS lỗi thời; Swiper chỉ cần nếu có carousel thật | 15–50 KB | Không dùng (carousel dùng scroll-snap CSS) |

\* Con số ước lượng để so sánh, cần đo lại bằng `next build` + bundle analyzer ở Phase 5.

### Quyết định
**Motion + CSS thuần + kỹ thuật sticky.** Không GSAP, không Lenis, không Three.js. Lý do: tái hiện đúng các kỹ thuật site tham chiếu đang dùng nhưng có cấu trúc component, kiểm thử được và nhẹ.

## 3. Cách code từng hiệu ứng (so với site tham chiếu)

| Hiệu ứng | Site tham chiếu | Bản của chúng ta (Next.js + Motion) | Khác biệt |
|---|---|---|---|
| Reveal | `IntersectionObserver` + class | `<Reveal delay={i*0.09}>` bọc `motion.div`: `whileInView`, `viewport={{ once:true, amount:.12 }}`, `y:35→0`, ease `[.22,1,.36,1]` | Dùng chung 1 component; chỉ ẩn nội dung sau khi hydrate để không mất chữ khi JS lỗi |
| Nền ambient | 1 listener `scroll` + rAF thủ công | `<AmbientBackground>`: `useScroll()` → `useSpring` (khớp hệ số .085) → `useTransform` ra `x/y/rotate` gắn thẳng vào `style`, không qua React state | Đổi màu sang **vàng/hổ phách trên nền đen**; giảm số vật thể 3D trên mobile |
| Cuộn ngang ghim | tự đo `getBoundingClientRect`, `ResizeObserver`, lerp thủ công | `<PinnedTrack>`: wrapper cao `travel + 100vh`, con `sticky top-[header]`; `useScroll({target})` → `useSpring` → `useTransform(p,[0,1],[0,-travel])`; đo `travel` bằng `ResizeObserver` | Giữ logic: tắt ghim dưới 761px (đổi thành `scroll-snap`) và khi reduced-motion |
| Marquee | CSS keyframes 32s | CSS thuần y hệt, nhân đôi nội dung, bản sao `aria-hidden`, dừng khi hover/reduced-motion | Logo đối tác thay chữ |
| Chữ lấp lánh (Hero) | `background-position` 6s | CSS thuần: gradient vàng + `background-clip:text` | Gradient vàng ánh kim |
| Header | `sticky` + `backdrop-filter` | Tailwind `sticky top-0 backdrop-blur-xl`, đổi nền khi cuộn bằng `useScroll` | — |
| Accordion FAQ, popup form | demo đơn giản | shadcn/ui (Radix) Accordion/Dialog + Motion `AnimatePresence` | Có focus trap, ESC, a11y |
| Hover nút/thẻ | `transition: all .25s` | Tailwind `transition` chỉ trên `transform/opacity/colors` (không `all`) | Hiệu năng tốt hơn |

### Mẫu mã (rút gọn để duyệt hướng đi, chưa phải mã chính thức)
```tsx
// components/motion/Reveal.tsx
"use client";
import { motion, useReducedMotion } from "motion/react";
export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >{children}</motion.div>
  );
}
```
```tsx
// components/motion/PinnedTrack.tsx (ý tưởng)
const ref = useRef(null);
const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 }); // ≈ lerp của site tham chiếu
const x = useTransform(p, [0, 1], [0, -travel]);
// <section ref={ref} style={{ height: travel + vh }}>
//   <div className="sticky top-[var(--header-h)]"><motion.div style={{ x }}>…thẻ…</motion.div></div>
// </section>
```

## 4. Motion spec (bổ sung cho Figma)

| Token | Giá trị |
|---|---|
| Ease chính | `cubic-bezier(.22, 1, .36, 1)` |
| Reveal | 0.7–0.85s, `y: 35px`, so le 90ms, chạy một lần, threshold 0.12 |
| Fade vào trang | 0.7s, `y: 15px` |
| Hover | 0.25–0.35s, chỉ `transform/opacity/color` |
| Marquee | 32s linear, lặp |
| Shimmer chữ | 6s lặp |
| Làm mượt cuộn | hằng số thời gian ≈ 85ms (spring tương đương) |
| Ghim ngang | chỉ ≥ 761px và không reduced-motion; < 761px = scroll-snap |
| Reduced motion | tắt ghim, parallax; marquee dừng; reveal hiện ngay |

## 5. Ngân sách hiệu năng & rủi ro
- Mục tiêu: LCP < 2,5s, CLS < 0,1, INP < 200ms, Lighthouse mobile ≥ 90; JS ban đầu < ~150 KB gzip.
- Chỉ animate `transform`/`opacity`; dùng MotionValue thay state; `will-change` chỉ khi cần; ảnh `next/image` AVIF/WebP, `priority` cho ảnh Hero.
- Rủi ro: (1) nền 3D + blur nặng GPU trên máy yếu → giảm vật thể/blur dưới 768px và khi reduced-motion; (2) ghim ngang sai khi font tải trễ → đo lại sau `document.fonts.ready` + `ResizeObserver`; (3) nội dung bị ẩn nếu JS lỗi → chỉ ẩn sau khi hydrate; (4) hydration mismatch → toàn bộ hiệu ứng nằm trong client component.
- Kiểm chứng "đẹp như tham chiếu": so ảnh chụp theo mốc cuộn (0/25/50/75/100%) giữa site tham chiếu và bản dựng bằng Playwright, quay video so sánh, đo FPS bằng Chrome DevTools Performance.
