/**
 * Giới hạn tần suất theo khóa (IP) trong bộ nhớ. Đủ để chặn spam đơn giản; trên Vercel mỗi
 * instance có bộ đếm riêng, nên cần Turnstile làm lớp chính và có thể nâng lên Redis sau.
 */
const hits = new Map<string, number[]>()

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60_000, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs)
  if (recent.length >= limit) {
    hits.set(key, recent)
    return false
  }
  recent.push(now)
  hits.set(key, recent)
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= windowMs)) hits.delete(k)
  }
  return true
}

export function resetRateLimit(): void {
  hits.clear()
}
