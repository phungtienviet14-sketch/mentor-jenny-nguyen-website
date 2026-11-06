import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { marked } from 'marked'

/** Đọc văn bản pháp lý (Markdown trong docs/legal, do repo kiểm soát) và dựng HTML tại thời điểm build. */
export async function renderLegal(file: 'CHINH_SACH_BAO_MAT' | 'DIEU_KHOAN_SU_DUNG'): Promise<string> {
  const md = await readFile(path.join(process.cwd(), 'docs', 'legal', `${file}.md`), 'utf-8')
  return marked.parse(md, { async: false, gfm: true })
}
