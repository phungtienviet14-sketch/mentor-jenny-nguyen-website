# Kế hoạch dự án: Website Mentor Jenny Nguyễn (mentorjennynguyen.com)

Nguồn: `NOI_DUNG_TRANG_CHU_Mentor_Jenny_Nguyen.docx` (17 khối nội dung) + bản demo tham chiếu https://mentor-jenny-nguyen-ai.tallcoin1.chatgpt.site/
Trạng thái: **CHỜ XÁC NHẬN – chưa viết code. Figma phải xong và được duyệt trước Phase 2.**

## 1. Phân tích yêu cầu

**Mục tiêu**: landing page trang chủ chuyển đổi cao cho chủ doanh nghiệp SME: tin Jenny → nhận quà miễn phí / đăng ký tư vấn → bán 4 khóa chủ lực + dịch vụ NetViet.

**Phạm vi trang chủ (17 khối)**: 0 Menu + nút nổi · 1 Hero · 2 Dải chỉ số · 3 Logo đồng hành (marquee) · 4 Bối cảnh 2026 · 5 Về Jenny · 6 Công thức Thở cùng AI (4 bước) · 7 Khóa chủ lực (4 thẻ + 3 chương trình bổ trợ) · 8 Lộ trình 5 bước · 9 Hệ sinh thái NetViet (6 thương hiệu + quy trình 4 bước) · 10 Vì sao chọn Jenny · 11 Học viên nói gì · 12 Sách · 13 Quà tặng (form lead) · 14 Dấu ấn & báo chí · 15 FAQ · 16 CTA cuối + form · 17 Footer.

**Chức năng**:
- Form lead (khối 13 & 16): Họ tên, SĐT/Zalo, Email, Công ty–chức vụ, Quan tâm (6 lựa chọn). Hiện demo chưa gửi đi → cần backend thật.
- Nút đăng ký nổi, menu cố định, anchor scroll, marquee logo, accordion FAQ, carousel học viên/sự kiện, A/B test tiêu đề Hero.
- SEO (title, meta, từ khóa ở Phụ lục A, JSON-LD Person/Organization/Course/FAQ), responsive mobile-first, tiếng Việt.
- Các trang con menu trỏ tới (Về Jenny, Khóa học, Giải pháp, Sách, Sự kiện, Tin tức AI, Liên hệ): **ngoài phạm vi đợt 1**, chỉ làm trang chủ + stub.

**Điểm lệch cần chốt (quan trọng)**:
1. Docx ghi giao diện "nền tối, chữ vàng ánh kim, ảnh chân dung J"; bản demo thực tế lại là **nền sáng, đỏ + xanh navy**. → Chốt hướng thị giác trước khi vào Figma.
2. Demo có 8 nhóm khóa (Master ChatGPT/AI/Video/…) và "10K+"; docx có 4 khóa chủ lực và 15.000+. → **Docx là nguồn đúng**, demo chỉ tham chiếu bố cục.
3. Nhiều nội dung chờ J xác nhận (Phụ lục C docx: số liệu, học phí/lịch khai giảng, vai trò tác giả sách, link mua, cảm nhận học viên, quà tặng thật, link báo chí, liên hệ công khai). Không đưa các dòng "Ghi chú cho J" lên web.
4. Tài sản có sẵn: `ảnh.jpg`, `trắng_xóa nền.png`, `đỏ_xóa nền.png`. Thiếu: ảnh sự kiện, logo đối tác, ảnh bìa sách, video cảm nhận.

## 2. Phân tích công nghệ

| Hạng mục | Đề xuất | Lý do / phương án thay thế |
|---|---|---|
| Framework | **Next.js 15 (App Router) + TypeScript** | SEO tốt (SSG/ISR), dễ mở rộng sang Khóa học/Sách/Tin tức. Thay thế: Astro nếu chỉ landing tĩnh. |
| Styling | **Tailwind CSS v4 + design tokens từ Figma** | Khớp luồng Figma → code; đổi theme bằng token. |
| UI | shadcn/ui (Accordion, Dialog, Form) + Motion | A11y tốt, tùy biến cao. |
| Form | React Hook Form + Zod, Server Action/API route | Validate SĐT/Email VN, chống spam Cloudflare Turnstile + honeypot. |
| Lưu lead | Google Sheets (nhanh) hoặc Supabase/Postgres; báo Zalo OA/Email (Resend) cho đội tư vấn | Chọn 1 ở Phase 0. |
| Nội dung | File MDX/TS trong repo đợt 1; nâng cấp Sanity/Payload khi cần đăng tin tức | Tránh over-engineer. |
| Ảnh/Font | `next/image` (AVIF/WebP), font subset tiếng Việt | LCP/CLS tốt. |
| Hosting | **Vercel** (hoặc Cloudflare Pages), domain mentorjennynguyen.com | Preview theo PR, CDN. |
| Analytics | GA4 + Meta Pixel + TikTok Pixel; event bấm CTA, gửi form | Phục vụ quảng cáo/A-B. |
| Chất lượng | Vitest + Testing Library, Playwright e2e, Lighthouse CI ≥ 90, ESLint/Prettier, GitHub Actions | Coverage ≥ 80% phần logic. |

## 3. Các phase

### Phase 0 – Khởi tạo & chốt đầu vào (0,5 ngày)
- Tạo repo GitHub, README, docs (làm cùng bản kế hoạch này).
- Chốt: hướng thị giác, nơi lưu lead, domain/hosting. Gom tài sản và nội dung còn thiếu (dùng placeholder có đánh dấu).

### Phase 1 – THIẾT KẾ FIGMA (bắt buộc, 3–4 ngày) — chưa code
1. Moodboard + đối chiếu demo và nguyentatkiem.com; **duyệt hướng thị giác**.
2. Design system: màu, typography, spacing, lưới 12 cột, nút, thẻ, form, icon (Variables + Styles).
3. Wireframe 17 khối (desktop 1440 / tablet 768 / mobile 375).
4. High-fidelity từng khối với **nội dung thật từ docx**; trạng thái hover/focus/error, menu mobile, popup form quà tặng.
5. Prototype luồng chính: Hero → quà tặng → form → thông báo thành công.
6. Handoff: đặt tên layer, Auto Layout, export asset, kiểm tra a11y (tương phản, cỡ chữ).
- **Cổng duyệt**: Jenny/team xác nhận Figma → mới sang Phase 2.
- Lưu ý: Figma MCP cần xác thực (`/mcp`) trước khi tạo/đọc file Figma trực tiếp.

### Phase 2 – Dựng nền tảng (1 ngày)
- Scaffold Next.js + TS + Tailwind, import tokens từ Figma, layout, font, SEO base, CI.
- Cấu trúc: `app/`, `components/sections/*` (1 component/khối), `content/home.ts` (toàn bộ chữ từ docx), `lib/`, `public/`.

### Phase 3 – Dựng giao diện 17 khối (4–5 ngày)
- Thứ tự: Menu+Hero+Chỉ số → 4–6 → 7–10 → 11–15 → 16–17. Responsive từng khối, đối chiếu Figma bằng screenshot.

### Phase 4 – Chức năng & tích hợp (2 ngày)
- Form lead + Zod + Turnstile + lưu Sheet/DB + thông báo; trang cảm ơn; analytics/pixel; A/B tiêu đề Hero; trang stub cho menu.

### Phase 5 – Chất lượng, SEO, bảo mật (1–2 ngày)
- Unit/e2e test, Lighthouse ≥ 90, a11y WCAG 2.2 AA, JSON-LD, sitemap/robots, OG image, bảo mật form (rate limit, không lộ key), chính sách bảo mật/điều khoản (dữ liệu cá nhân – NĐ 13/2023).

### Phase 6 – Ra mắt (0,5–1 ngày)
- Deploy Vercel, trỏ domain, SSL, redirect, theo dõi lỗi; thay placeholder bằng nội dung J xác nhận; bàn giao hướng dẫn cập nhật.

**Tổng ước tính**: ~13–16 ngày làm việc, độ phức tạp **Trung bình**; Figma chiếm ~25%.

## 4. Rủi ro

| Rủi ro | Mức | Giảm thiểu |
|---|---|---|
| Xung đột hướng thị giác (tối/vàng vs sáng/đỏ–navy) | CAO | Chốt ở Phase 1 bước 1 |
| Nội dung/số liệu chưa được J xác nhận, claim "sách AI đầu tiên", số liệu 22.200 DN | CAO | Placeholder có cờ; không xuất bản trước khi có xác nhận + nguồn |
| Thiếu ảnh sự kiện, logo đối tác, cảm nhận học viên, quyền dùng hình/logo | CAO | Danh sách tài sản cần gửi; chỉ dùng logo đã được đồng ý |
| Thu thập dữ liệu cá nhân (SĐT, email) | TB | Chính sách bảo mật, consent, Turnstile, lưu trữ an toàn |
| Hiệu năng (ảnh lớn, animation, marquee) trên mobile | TB | Tối ưu ảnh, lazy load, Lighthouse trong CI |
| Phình phạm vi (trang con, CMS) | TB | Đợt 1 chỉ trang chủ + stub |
| Font tiếng Việt lỗi | THẤP | Subset `vietnamese`, test sớm |

## 5. Repo & quy trình
- Repo GitHub **private**: `mentor-jenny-nguyen-website`; nhánh `main` + `feat/*`, PR có preview, conventional commits.
- Thư mục: `docs/` (kế hoạch, nội dung gốc); sau này `app/`, `components/`, `content/`, `public/`.
