import type { Thing, WithContext } from 'schema-dts'

/** Chèn dữ liệu có cấu trúc JSON-LD. Thay `<` để tránh thoát khỏi thẻ script. */
export function JsonLd<T extends Thing>({ data }: { data: WithContext<T> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
