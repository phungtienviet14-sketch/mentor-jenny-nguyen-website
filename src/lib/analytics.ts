type Params = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer?: unknown[]
  }
}

/** Đẩy sự kiện vào dataLayer (GTM đọc). An toàn khi chưa tải GTM hoặc chạy trên server. */
export function track(event: 'cta_click' | 'form_open' | 'form_error' | 'generate_lead', params: Params = {}): void {
  if (typeof window === 'undefined') return
  ;(window.dataLayer ??= []).push({ event, ...params })
}
