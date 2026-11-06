# Kế hoạch chi tiết theo task (Phase 0 → 6)

Tham chiếu: [PLAN.md](PLAN.md) (tổng quan), [MOTION_AND_TECH.md](MOTION_AND_TECH.md) (chuyển động & thư viện), [SEO.md](SEO.md) (SEO & công cụ). **Chưa viết code** cho tới khi các câu hỏi mở ở mục 1 được chốt và bạn xác nhận.

## 1. Câu hỏi mở cần chốt trước khi code
| # | Câu hỏi | Ảnh hưởng |
|---|---|---|
| Q1 | Đội marketing quen CMS nào (WordPress, Sanity, Payload, khác)? Họ cần tự sửa những gì (meta, blog, khóa học, FAQ)? | Chọn CMS (SEO.md mục 3) |
| Q2 | Lead gửi về đâu: Google Sheets, CRM (HubSpot, Bitrix, Zalo OA), email? Ai nhận thông báo? | Phase 4 |
| Q3 | Domain `mentorjennynguyen.com` do ai quản lý, hosting (Vercel/Cloudflare) | Phase 6, xác minh Search Console |
| Q4 | Mức chuyển động: giống site tham chiếu đầy đủ (nền 3D + ghim ngang) hay bản rút gọn trên mobile? | Phase 3 |
| Q5 | Có bao gồm trang con (Khóa học, Sách, Blog) trong đợt 1 không, hay chỉ trang chủ? | Phạm vi SEO |
| Q6 | Nguồn ảnh thật, logo đối tác đã được phép, số liệu và cảm nhận đã xác nhận | Phase 3 |

## 2. Cấu trúc dự án đề xuất
```
src/
  app/            layout.tsx, page.tsx, sitemap.ts, robots.ts, opengraph-image.tsx, (api)/leads/route.ts
  components/
    sections/     01-Hero ... 17-Footer (mỗi khối 1 file, khớp Figma)
    motion/       Reveal, PinnedTrack, AmbientBackground, Marquee
    ui/           Button, Card, Field, Dialog, Accordion (shadcn)
    seo/          JsonLd
  content/        home.ts (nội dung từ docx), site.ts (liên hệ, social)
  lib/            leads.ts (zod schema), analytics.ts, env.ts
  styles/         tokens.css (từ Figma variables)
tests/            unit (Vitest), e2e (Playwright)
```

## 3. Task chi tiết
Ký hiệu: **V** = lệnh/kiểm chứng; mỗi task nhỏ hơn 1 ngày.

### Phase 0 — Khởi tạo & chốt đầu vào
| ID | Task | Đầu ra | V |
|---|---|---|---|
| 0.1 | Chốt Q1–Q6 | Bản quyết định trong PLAN.md | Bạn xác nhận |
| 0.2 | Gom tài sản (ảnh, logo, font, nội dung thiếu) | Thư mục `assets/` + danh sách còn thiếu | Checklist Phụ lục C docx |
| 0.3 | Xuất token từ Figma (màu, spacing, radius, text style) | `src/styles/tokens.css` | So khớp tên biến với Figma |

### Phase 1 — Figma (đã làm phần lớn)
| ID | Task | Trạng thái |
|---|---|---|
| 1.1 | Design system + desktop 1440 + mobile 375 | Xong |
| 1.2 | Trạng thái form + prototype | Xong |
| 1.3 | Bản tablet 768, ảnh thật, spec chuyển động | Còn thiếu |
| 1.4 | **Cổng duyệt** của Jenny/team | Chờ |

### Phase 2 — Nền tảng
| ID | Task | Đầu ra | V |
|---|---|---|---|
| 2.1 | Khởi tạo Next.js + TS + Tailwind v4 trong repo (ESLint, Prettier) | `package.json`, cấu hình | `npm run build` |
| 2.2 | Font `next/font` (Playfair Display, Be Vietnam Pro, subset vietnamese), tokens, layout | `layout.tsx` | Không CLS, chữ Việt đúng |
| 2.3 | Khung SEO: Metadata API, `sitemap.ts`, `robots.ts`, `JsonLd` | Trang `/` có meta + schema | Rich Results Test |
| 2.4 | CI GitHub Actions: lint, type-check, test, build, Lighthouse CI | `.github/workflows/ci.yml` | CI xanh trên PR |
| 2.5 | Thiết lập test (Vitest, Testing Library, Playwright) | Test mẫu chạy được | `npm test` |
| 2.6 | Cài `motion`, tạo `Reveal`, `Marquee` (CSS) | Component + test | Test reduced-motion |

### Phase 3 — Giao diện 17 khối
Mỗi khối: viết test render + đối chiếu ảnh chụp với Figma (desktop/mobile).
| ID | Khối | Ghi chú kỹ thuật |
|---|---|---|
| 3.1 | 0 Menu + 1 Hero | Header sticky blur, nút đăng ký nổi, shimmer chữ, ảnh Hero `priority` |
| 3.2 | 2 Chỉ số + 3 Logo | Đếm số (tùy chọn, tôn trọng reduced-motion), marquee CSS |
| 3.3 | 4, 5, 6 | Reveal so le 90ms |
| 3.4 | 7 Khóa học | `PinnedTrack` (≥ 761px) / scroll-snap (mobile) |
| 3.5 | 8 Lộ trình | `PinnedTrack` + thanh tiến độ |
| 3.6 | 9, 10, 11, 12 | Lưới thẻ, khối sách, carousel học viên bằng scroll-snap |
| 3.7 | 13, 14, 15, 16, 17 | Accordion FAQ (Radix), form, footer |
| 3.8 | `AmbientBackground` (nền vàng) | Orb + lưới 3D, giảm trên mobile |
| V | Mọi khối | `npm run build`, ảnh chụp so Figma, Lighthouse mobile ≥ 90 |

### Phase 4 — Chức năng & tích hợp
| ID | Task | V |
|---|---|---|
| 4.1 | Schema Zod cho form (SĐT VN, email), thông báo lỗi giống Figma | Unit test các trường hợp biên |
| 4.2 | API `/api/leads`: kiểm tra, honeypot, Turnstile, rate limit, lưu theo Q2, thông báo | Test tích hợp, không lộ key |
| 4.3 | Dialog form + trạng thái focus/lỗi/đang gửi/thành công (theo Figma prototype) | Playwright: luồng gửi form |
| 4.4 | GTM + GA4 + sự kiện (`cta_click`, `form_open`, `generate_lead`), banner cookie | Kiểm bằng GA DebugView |
| 4.5 | CMS (nếu chọn ở Q1): schema nội dung, preview, webhook revalidate | Marketing sửa meta thử thành công |
| 4.6 | Trang Chính sách bảo mật, Điều khoản | Có link trong footer và form |

### Phase 5 — Chất lượng, SEO, bảo mật
| ID | Task | V |
|---|---|---|
| 5.1 | Test e2e (menu, form, FAQ, mobile) + coverage ≥ 80% phần logic | `npm run test:coverage` |
| 5.2 | A11y: tương phản, focus, bàn phím, reduced-motion | axe + kiểm tay |
| 5.3 | Audit SEO: Lighthouse, Screaming Frog, Rich Results, kiểm JSON-LD | Báo cáo không lỗi nghiêm trọng |
| 5.4 | Bảo mật: header (CSP, HSTS), phụ thuộc, bí mật | `npm audit`, rà soát secret |
| 5.5 | Hiệu năng: bundle analyzer, FPS cuộn nền/ghim trên máy yếu | JS đầu < ~150 KB gzip, LCP < 2,5s |
| 5.6 | So sánh chuyển động với site tham chiếu (ảnh chụp theo mốc cuộn + video) | Bạn duyệt |

### Phase 6 — Ra mắt & bàn giao
| ID | Task | V |
|---|---|---|
| 6.1 | Deploy (Vercel/Cloudflare), biến môi trường, domain, SSL | Trang chạy trên domain thật |
| 6.2 | Nộp sitemap Search Console/Bing; xác minh GA4/GTM | Trạng thái "Đã gửi" |
| 6.3 | Thay placeholder bằng nội dung đã xác nhận | Danh sách "chờ J" trống |
| 6.4 | Tài liệu bàn giao cho marketing (sửa meta, thêm bài, đọc báo cáo) và vận hành | Buổi hướng dẫn |

## 4. Quy ước làm việc
- Nhánh `feat/<id>-<tên>`; PR nhỏ theo task; commit dạng conventional commits.
- Mỗi PR: test xanh, Lighthouse CI không tụt, ảnh chụp so Figma đính kèm.
- Thứ tự giao: trang chủ chạy được (Phase 2–3) → form (Phase 4) → SEO/QA (Phase 5) → ra mắt (Phase 6).
- Ước tính: Phase 2: 1,5 ngày; 3: 6–7 ngày; 4: 3 ngày; 5: 2 ngày; 6: 1 ngày (tổng ~14–16 ngày, chưa tính chờ nội dung/ảnh).

## 5. Quyết định đã chốt (Q1-Q6)

| # | Quyết định | He quả kỹ thuật |
|---|---|---|
| Q1 | **Payload CMS** | Payload 3 chạy cùng ứng dụng Next.js (một repo, một lần deploy). Collections: Pages/Sections, Courses, Books, Posts (Tin tức AI), Testimonials, Events, Press, Leads, Media. Trường SEO (title, description, slug, canonical, OG image, noindex) trên mọi collection. Cần cơ sở dữ liệu (Postgres) và nơi lưu ảnh |
| Q2 | Lead gửi qua **Zalo + email** | Mỗi lead: lưu vào collection Leads trong Payload (nguồn sự thật), gửi email (Resend hoặc SMTP), gửi Zalo. **Rủi ro cần xác minh trước Phase 4**: Zalo OA API chỉ nhắn được cho người đã tương tác với OA, ZNS cần mẫu tin được duyệt và tính phí; nếu không khả thi sẽ dùng webhook trung gian (n8n/Make) hoặc nhóm Zalo thủ công. Email là kênh bắt buộc, Zalo là kênh bổ sung |
| Q3 | Bạn quản lý tên miền; hosting do tôi chọn | Đề xuất: **Vercel (vùng Singapore) + Neon Postgres (Singapore) + Cloudflare R2 hoặc Vercel Blob cho ảnh**. Lý do: Payload 3 + Next.js chạy tốt, preview theo PR, CI sẵn. Lưu ý: gói Vercel Hobby chỉ cho phi thương mại, trang bán khóa học nên dùng gói trả phí (khoảng 20 USD/tháng, cần kiểm tra giá hiện tại). Phương án thay: VPS Docker tại Việt Nam (rẻ, độ trễ thấp, nhưng tự vận hành). Bạn chỉ cần trỏ DNS khi tới Phase 6 |
| Q4 | Mobile giữ **đủ nền 3D và cuộn ngang ghim** | Làm theo ý bạn nhưng bổ sung các biện pháp an toàn: dùng đơn vị `dvh`, giảm chiều dài ghim trên mobile, tự phát hiện máy yếu (đo FPS/`deviceMemory`) để giảm độ phức tạp nền, vẫn tôn trọng giảm chuyển động của hệ điều hành, **kiểm thử trên điện thoại thật** (iPhone Safari, Android tầm trung). Mục tiêu giữ Lighthouse mobile >= 85 (hạ từ 90 vì nền 3D) |
| Q5 | Theo đề xuất của tôi | **Đợt 1**: trang chủ đầy đủ + khung trang từ CMS (mẫu trang khóa học, sách, bài blog, sitemap, schema) và 4 trang khóa học cơ bản. **Đợt 2**: nội dung blog và các trang sách/giải pháp do đội marketing đăng qua Payload |
| Q6 | Ảnh thật, logo được phép, số liệu và cảm nhận đã xác nhận | **Chưa nhận được**: hiện chỉ có 3 file trong thư mục dự án. Cần gửi trước Phase 3: ảnh chân dung độ phân giải cao, ảnh bìa 2 sách, ảnh sự kiện, logo đối tác được phép, 3-6 cảm nhận học viên, số liệu xác nhận, link báo chí/VTV. Đến khi đủ, web dùng nội dung giữ chỗ có đánh dấu |

### Thay đổi kế hoạch do các quyết định này
- Phase 2 thêm: cài Payload vào Next.js, kết nối Postgres, tạo collections, tài khoản quản trị, phân quyền (marketing chỉ sửa nội dung, không đụng cấu hình).
- Phase 4: thay "lưu lead vào Sheet" bằng collection Leads + email + Zalo; không lưu bí mật trong repo.
- Phase 5: kiểm thử hiệu năng trên thiết bị thật cho nền 3D + ghim ngang mobile.
- Ước tính tăng: +2 đến 3 ngày (Payload + thiết bị thật), tổng khoảng 16-19 ngày.

## 6. Hosting (xem [HOSTING.md](HOSTING.md))
Khuyến nghị phương án A: Vercel Pro + Neon Postgres + Cloudflare (DNS, CDN, R2, Turnstile), khoảng 20-25 USD/tháng. Không có phương án miễn phí hoàn toàn an toàn cho trang thương mại (Vercel Hobby cấm dùng thương mại). Chờ bạn chốt A/B/C và ngân sách (task H1).

## 7. Mô hình dữ liệu Payload (Phase 2)
| Collection | Trường chính | Dùng ở |
|---|---|---|
| Users | email, vai trò (admin, marketing, sales) | Đăng nhập quản trị; marketing chỉ sửa nội dung |
| Media | tệp, alt (bắt buộc), caption | Ảnh toàn site |
| Courses | tên, slug, tagline, mô tả, đối tượng, kết quả (mảng), hình thức, học phí, lịch khai giảng, SEO | Khối 7 + trang khóa học |
| Books | tên, slug, bìa, mô tả, link mua, SEO | Khối 12 |
| Testimonials | họ tên, chức vụ, nội dung, video, đã xin phép (checkbox bắt buộc) | Khối 11 |
| Events / Press | tiêu đề, nhãn, ảnh, link nguồn, năm | Khối 14 |
| Posts | tiêu đề, slug, nội dung, tác giả, ngày cập nhật, SEO | Tin tức AI (blog) |
| Faqs | câu hỏi, trả lời, thứ tự | Khối 15 + schema FAQPage |
| Leads | họ tên, SĐT, email, công ty, quan tâm, nguồn (UTM), trạng thái, đã gửi email/Zalo | Form khối 13, 16 (chỉ admin/sales đọc) |
| Globals: SiteSettings | liên hệ, mạng xã hội, số liệu khối 2, menu, footer | Header/footer/chỉ số |
| Globals: HomePage | thứ tự và nội dung từng khối, A/B tiêu đề Hero | Trang chủ |
Nguyên tắc: nội dung chưa xác nhận có cờ `needsConfirmation` để không xuất bản nhầm; bản nháp (draft) và xem trước cho marketing.

## 8. Phase 2 bổ sung (Payload)
| ID | Task | V |
|---|---|---|
| 2.7 | Cài Payload 3 vào Next.js, kết nối Postgres, tài khoản quản trị đầu tiên | Đăng nhập `/admin` được |
| 2.8 | Tạo collections/globals theo mục 7, phân quyền theo vai trò | Test quyền truy cập |
| 2.9 | Nhập nội dung từ docx làm dữ liệu khởi tạo (seed) | Trang chủ đọc dữ liệu từ Payload |
| 2.10 | Lưu ảnh lên R2/Blob, ảnh tối ưu qua `next/image` | Tải ảnh lên và hiển thị |
| 2.11 | Preview + revalidate khi marketing bấm xuất bản | Sửa tiêu đề, trang cập nhật trong vài giây |
| 2.12 | Ghi tài liệu `.env.example`, quy trình sao lưu | Không có bí mật trong repo |

## 9. Phase 4 bổ sung (Lead qua Zalo + email)
| ID | Task | V |
|---|---|---|
| 4.7 | **Spike Zalo (1/2 ngày)**: đọc tài liệu Zalo OA/ZNS, xác định cách gửi thông báo nội bộ khả thi (OA đã xác thực? mẫu ZNS? webhook n8n/Make?) | Ghi kết luận vào TASKS.md |
| 4.8 | Email thông báo lead (Resend/SMTP) + email xác nhận cho khách | Nhận được email thử |
| 4.9 | Zalo theo kết luận spike; thất bại Zalo không làm mất lead (lead đã lưu, thử lại nền) | Test: tắt Zalo vẫn lưu lead |
| 4.10 | Trạng thái lead trong Payload (mới, đã gọi, đã chốt) cho đội tư vấn | Đổi trạng thái được |

## 10. Mốc giao hàng (milestones)
| Mốc | Nội dung | Điều kiện hoàn thành |
|---|---|---|
| M0 | Chốt quyết định + tài sản + hosting (H1) | Danh sách chờ rõ ràng |
| M1 | Nền tảng + Payload + CI (Phase 2) | Trang giữ chỗ chạy trên preview, đăng nhập quản trị được |
| M2 | Trang chủ 17 khối + chuyển động (Phase 3) | So Figma và site tham chiếu, bạn duyệt |
| M3 | Form + lead + analytics (Phase 4) | Gửi form thử thành công tới email (và Zalo nếu khả thi) |
| M4 | QA, SEO, hiệu năng thiết bị thật (Phase 5) | Lighthouse mobile >= 85, không lỗi nghiêm trọng |
| M5 | Ra mắt + bàn giao marketing (Phase 6) | Domain thật, sitemap đã gửi, tài liệu bàn giao |

## 11. Bước tiếp theo đề xuất
1. Bạn chốt hosting (H1) và gửi tài sản/nội dung (Q6).
2. Tôi làm Phase 2 (nền tảng + Payload) trên nhánh `feat/2-foundation`, mở PR để bạn xem trước khi vào Phase 3.
3. Song song làm spike Zalo (4.7) để biết sớm khả thi.

## 12. Hosting đã chốt (H1)
Phương án A: **Vercel Pro + Neon Postgres + Cloudflare (DNS, CDN, R2, Turnstile)**. Ngân sách ước tính khoảng 20-25 USD/tháng (kiểm tra lại giá chính thức khi mua).
Việc bạn cần làm (không gửi mật khẩu/khóa qua chat):
1. Tạo tài khoản Vercel (nâng lên Pro trước khi ra mắt thật; giai đoạn dựng có thể dùng preview), Neon, Cloudflare.
2. Khi tới Phase 2, tạo dự án Neon và dán chuỗi kết nối vào biến môi trường của Vercel (tôi sẽ hướng dẫn từng bước), không đưa vào repo.
3. Tới Phase 6: trỏ DNS tên miền về Cloudflare theo hướng dẫn.

## 13. Giao diện sáng / tối tự động (yêu cầu mới)
**Quyết định:** giao diện **tự chuyển sáng hoặc tối theo cấu hình hệ điều hành/Chrome của người xem** (`prefers-color-scheme`). Không có nút chuyển thủ công ở đợt 1 (nếu muốn có nút ghi đè, thêm ở đợt sau).

| Hạng mục | Cách làm |
|---|---|
| Token | Bộ biến Figma `Color` có 2 chế độ **Dark** và **Light**. CSS: giá trị sáng đặt ở `:root`, giá trị tối đặt trong `@media (prefers-color-scheme: dark)`; khai báo `color-scheme: light dark`. Không dùng JavaScript nên không nhấp nháy khi tải trang |
| Tailwind v4 | Màu dùng biến CSS (ví dụ `bg-[var(--color-bg-base)]` hoặc map vào theme), không rải `dark:` khắp nơi |
| Màu vàng | Chữ và viền vàng dùng `color/gold/*` (sáng: vàng đậm #8A6A0F để đủ tương phản, tối: #D4AF37). **Nền nút vàng** dùng riêng `color/action/gold` (cùng #D4AF37 ở cả hai chế độ) với chữ tối |
| Logo | Dùng 2 file có sẵn: `đỏ_xóa nền.png` cho nền sáng, `trắng_xóa nền.png` cho nền tối, qua `<picture>` + `media="(prefers-color-scheme: dark)"` |
| `theme-color` | 2 thẻ meta theo `media` sáng/tối; ảnh OG dùng 1 bản |
| Nền ambient/3D | Có bản sáng (cam kem, quả cầu vàng nhạt, lưới vàng nâu mờ) — xem Figma `D1 ... — Light` |
| Kiểm thử | Playwright chạy 2 dự án `colorScheme: light` và `dark`; ảnh chụp so Figma cho cả hai; Lighthouse và axe (tương phản) cho cả hai |
| Payload admin | Giao diện quản trị dùng theme riêng của Payload, không nằm trong phạm vi |

Bảng màu chế độ Sáng (đã nhập vào Figma): nền #FFFCF5, bề mặt #FFFFFF, nâng #F6EEDC, chữ #1A160F, chữ phụ #5E574A, vàng 500 #8A6A0F, vàng 400 #7A5C0A, vàng 600 #6B520A, cam #B45309, viền vàng #E2D3A3, viền nhẹ #E8E0CC, lỗi #C62828, thành công #1B7F3B. **Tỷ lệ tương phản mới ước tính, cần đo lại bằng công cụ (axe/Lighthouse) khi code.**

Task thêm: 2.13 tokens CSS hai chế độ; 3.9 logo theo theme; 5.2 mở rộng kiểm tra tương phản cho cả hai chế độ; 5.7 ảnh chụp so Figma cho Light và Dark.

## 14. Cập nhật tiến độ thiết kế (D1-D7) và việc còn lại
Đã làm trong Figma (trang `Page 1`, các frame Dark ở cột trái, **bản Light cách 9000px về bên phải**, cùng tên + hậu tố "— Light"):
- D1 nền ambient đen-vàng và vật thể 3D (có spec): Dark `8:2`, Light `14:1079`, ghi chú `8:58`.
- D2 cuộn ngang ghim, 3 trạng thái p=0/0.5/1 (khóa học desktop `9:2`, `9:41`, `9:80`; lộ trình `9:119`, `9:145`; mobile `9:171`, `9:210`, `9:249`), ghi chú `9:275`. Bản Light của D2: chưa tạo (cùng cấu trúc, chỉ đổi chế độ).
- D3 menu mobile mở `10:2`, trạng thái nút/thẻ `10:34`; D4 Hero mobile ảnh lên trên `10:85`.
- D5 mẫu trang khóa học `13:2`, bài viết `13:91`, 404 `13:154` (desktop) / `13:177` (mobile), cảm ơn `13:201` / `13:235`.
- D6 cookie banner `13:270` (desktop), `13:282` (mobile), hộp tùy chỉnh `13:294`.
- D7 spec chuyển động: nằm trong `MOTION_AND_TECH.md` và các ghi chú Figma (`8:58`, `9:275`, `10:34`).
- Biến Figma: collection `Color` có chế độ **Dark** và **Light**; thêm `color/action/gold`, `color/action/gold-hover`, `color/action/gold-pressed`; 17 biến có giá trị Light.
Chưa làm / cần lưu ý: ảnh thật (CMS sẽ bổ sung), bản Light cho khung D2 và bản mobile Light của cookie đã có; spacing/radius chưa bind biến.

## 15. Cap nhat cuoi (Q1-Q7)
- Nội dung/ảnh/số liệu thiếu sẽ bổ sung sau qua Payload (placeholder có cờ). Zalo hoãn, làm email trước. Admin xác nhận Chính sách bảo mật/Điều khoản (bản nháp ở docs/legal/). Tablet: co giãn, không vẽ thêm.
- CLI: Neon đã đăng nhập; Cloudflare (wrangler) đã đăng nhập nhưng token thiếu một số scope, cần wrangler login lại nếu lỗi; Google (gcloud) đã đăng nhập; Vercel CLI chưa cài và chưa đăng nhập.
