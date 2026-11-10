/** Đường dẫn neo của khối Sự kiện: mọi link tới đây phải ẩn cùng lúc với khối. Không import code server để Header (client) dùng được. */
export const EVENTS_HREF = '/#su-kien'

/** Bỏ các link trỏ tới khối Sự kiện khi phần này đang tắt. */
export function filterEventLinks<T extends { href: string }>(links: readonly T[], showEvents: boolean): T[] {
  return showEvents ? [...links] : links.filter((l) => l.href !== EVENTS_HREF)
}
