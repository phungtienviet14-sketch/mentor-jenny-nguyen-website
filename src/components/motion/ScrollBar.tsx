'use client'

import { motion, useScroll } from 'motion/react'

/** Thanh tiến độ cuộn trang (M3): 3px trên cùng, gradient xanh → vàng. Trang trí nên ẩn với trình đọc màn hình. */
export function ScrollBar() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-gold-400 via-gold-500 to-gold-strong"
    />
  )
}
