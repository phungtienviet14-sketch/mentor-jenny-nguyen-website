# Phân tích SEO & công cụ cho đội marketing

Bối cảnh: đội marketing sẽ dùng công cụ SEO để đưa trang lên trang nhất Google. Việc của dự án web là (1) làm nền kỹ thuật **không cản trở** SEO, (2) cho phép đội marketing **tự sửa nội dung/meta không cần dev**, (3) gắn sẵn đo lường để họ theo dõi thứ hạng. Lưu ý trung thực: không ai đảm bảo được vị trí trang nhất; kết quả phụ thuộc nội dung, backlink và cạnh tranh từ khóa, web chỉ tạo điều kiện.

## 1. Ba lớp công việc

| Lớp | Ai làm | Nội dung |
|---|---|---|
| A. SEO kỹ thuật (on-site) | **Dev (dự án này)** | SSR/SSG, meta, sitemap, robots, canonical, JSON-LD, tốc độ, mobile, a11y, URL sạch |
| B. Nội dung & từ khóa | Đội marketing | Nghiên cứu từ khóa, trang khóa học, blog "Tin tức AI", FAQ, cập nhật tiêu đề |
| C. Uy tín & backlink (off-site) | Đội marketing/PR | Báo chí, VTV, Techfest, hồ sơ Google Business, mạng xã hội, giới thiệu sách |

## 2. Kiến trúc kỹ thuật để SEO được (Next.js)

| Hạng mục | Cách làm | Công cụ/thư viện |
|---|---|---|
| Render | SSG/ISR, HTML đầy đủ nội dung chữ (không giấu sau JS); hiệu ứng chỉ là lớp phủ | Next.js App Router |
| Meta từng trang | `generateMetadata`: title ≤ 60, description ≤ 160, canonical, Open Graph, Twitter card | Next.js Metadata API |
| Sitemap, robots | `app/sitemap.ts`, `app/robots.ts` tự sinh từ danh sách trang/bài viết | Next.js built-in |
| Dữ liệu có cấu trúc (JSON-LD) | `Person` (Jenny), `Organization` (NetViet), `Course` (4 khóa), `Book` (2 sách), `FAQPage`, `BreadcrumbList`, `Article` (blog), `Event` | `schema-dts` (kiểu TypeScript), kiểm bằng Rich Results Test |
| Tiêu đề & cấu trúc | 1 `h1` duy nhất/trang, `h2`–`h3` đúng thứ bậc, alt ảnh tiếng Việt, URL không dấu (`/khoa-hoc/ai-video-kenh-ve-tinh`) | Lint + kiểm thử |
| Ngôn ngữ | `<html lang="vi">`, locale `vi_VN`; chưa cần hreflang nếu chỉ tiếng Việt | — |
| Tốc độ (Core Web Vitals) | LCP < 2,5s, CLS < 0,1, INP < 200ms; ảnh AVIF/WebP, font `display:swap` subset `vietnamese`; chống CLS cho nền/animation | `next/image`, `next/font`, Lighthouse CI |
| Ảnh chia sẻ | OG image tự sinh theo trang | `next/og` (`ImageResponse`) |
| Liên kết nội bộ | Hero → khóa học → blog liên quan; breadcrumb; footer đầy đủ | Component dùng chung |
| Tránh lỗi hay gặp | Không `noindex` nhầm, không trùng title, trang 404 có điều hướng, redirect 301 khi đổi URL, HTTPS, www/non-www thống nhất | Kiểm bằng Screaming Frog |
| Hạn chế của hiệu ứng | Nội dung bị `opacity:0` ban đầu vẫn có trong HTML nên Google đọc được; cuộn ngang ghim dùng dữ liệu trong DOM, không tải lười nội dung quan trọng | Xem `MOTION_AND_TECH.md` |

## 3. Quyền tự chủ cho đội marketing (quyết định quan trọng)

Đợt 1 nội dung nằm trong file code (`content/home.ts`) nên mỗi lần sửa chữ phải nhờ dev: **không phù hợp** khi đội marketing cần chạy SEO liên tục. Đề xuất:

| Phương án | Ưu | Nhược | Gợi ý |
|---|---|---|---|
| **Headless CMS: Sanity** hoặc **Payload** (tự host) | Marketing sửa title/meta/nội dung, đăng blog, xem trước (preview), phân quyền; Next.js gọi API + `revalidate` | Thêm chi phí/thiết lập | **Khuyến nghị cho blog "Tin tức AI", trang khóa học, FAQ, meta** |
| WordPress headless | Marketing đã quen, nhiều plugin SEO (Yoast/RankMath) | Hai hệ thống, bảo mật/bảo trì thêm | Chọn nếu đội đã dùng WordPress sẵn |
| Giữ file MDX trong repo | Rẻ, nhanh | Không thân thiện với marketing | Chỉ dùng tạm ở đợt 1 |

Trường SEO cần có trong CMS: title, meta description, slug, canonical, OG image, `noindex`, schema tùy chọn, tác giả, ngày cập nhật. **Cần bạn chốt**: đội marketing quen công cụ nào (WordPress hay không), vì quyết định này đổi kiến trúc.

## 4. Bộ công cụ đề xuất (và việc dev phải gắn sẵn)

| Mục đích | Công cụ | Dev cần làm | Chi phí |
|---|---|---|---|
| Theo dõi lập chỉ mục/thứ hạng/lỗi | **Google Search Console** | Xác minh tên miền (DNS), nộp `sitemap.xml` | Miễn phí |
| Bing/Cốc Cốc | Bing Webmaster Tools (và IndexNow) | Xác minh, nộp sitemap | Miễn phí |
| Phân tích hành vi, chuyển đổi | **GA4** + **Google Tag Manager** | Cài GTM; sự kiện: bấm CTA, mở form, gửi form (`generate_lead`), tải quà | Miễn phí |
| Nghiên cứu từ khóa, đối thủ, backlink | **Ahrefs** hoặc **Semrush** (đội marketing trả phí), Google Keyword Planner, Google Trends | Không cần mã; cấp quyền Search Console | Trả phí / miễn phí |
| Theo dõi thứ hạng hằng ngày | Ahrefs/Semrush Rank Tracker hoặc SERPstat/AccuRanker | Không | Trả phí |
| Quét kỹ thuật toàn site | **Screaming Frog**, Ahrefs Site Audit | Sửa lỗi theo báo cáo | Miễn phí (500 URL) / trả phí |
| Tốc độ & Core Web Vitals | PageSpeed Insights, Lighthouse CI, CrUX trong Search Console | Lighthouse CI trong GitHub Actions (chặn merge nếu tụt điểm) | Miễn phí |
| Kiểm schema | Rich Results Test, Schema Markup Validator | Test tự động JSON-LD | Miễn phí |
| Heatmap/hành vi | Microsoft Clarity (miễn phí) hoặc Hotjar | Gắn qua GTM, tôn trọng đồng ý cookie | Miễn phí |
| Quảng cáo/pixel (nếu chạy) | Meta Pixel, TikTok Pixel | Gắn qua GTM, A/B tiêu đề Hero | Miễn phí |
| Hồ sơ địa phương | Google Business Profile (văn phòng Hà Nội), Zalo OA | Thông tin NAP khớp footer | Miễn phí |
| Hỗ trợ trong dự án (công cụ AI sẵn có) | Skill `searchfit-seo` (audit, schema, keyword cluster, content brief) và agent `ecc:seo-specialist` | Dùng để audit trước khi ra mắt | — |

## 5. Từ khóa & ánh xạ trang (khởi điểm, từ Phụ lục A docx)

| Từ khóa nhóm | Trang đích đề xuất |
|---|---|
| đào tạo AI cho doanh nghiệp, AI Agent doanh nghiệp | Trang chủ + `/giai-phap-doanh-nghiep` |
| khóa học video AI, xây kênh vệ tinh tự động, sản xuất TVC AI | `/khoa-hoc/ai-video-kenh-ve-tinh`, `/giai-phap/netviet-studio` |
| thương hiệu cá nhân với AI | `/khoa-hoc/thuong-hieu-ca-nhan-voi-ai`, `/sach/xay-dung-thuong-hieu-voi-ai` |
| marketing với AI | `/khoa-hoc/marketing-voi-ai` |
| Jenny Nguyễn AI, ChatGPT toàn tập | Trang chủ, `/ve-jenny`, `/sach/chatgpt-toan-tap` |

Đội marketing sẽ mở rộng bằng Ahrefs/Semrush (tìm kiếm thực tế tại Việt Nam, từ khóa đuôi dài, ý định tìm kiếm). **Ghi chú**: trang chủ một trang chỉ xếp hạng tốt cho 1–2 chủ đề; để lên trang nhất nhiều từ khóa cần **trang riêng cho từng khóa/chủ đề + blog**, nên kiến trúc URL phải sẵn sàng từ đầu (đã nằm trong Phase 2).

## 6. E-E-A-T (uy tín) — lợi thế của dự án
- Trang "Về Jenny" đầy đủ vai trò (VTV, Techfest, UNDP), `Person` schema + `sameAs` (Facebook, TikTok, YouTube, LinkedIn).
- Bằng chứng thật: ảnh/link báo chí, logo đối tác **đã được phép**, cảm nhận học viên có tên thật, nguồn cho số liệu (ví dụ 22.200 doanh nghiệp từ VOV).
- Tác giả + ngày cập nhật trên mỗi bài blog; trang Chính sách bảo mật/Điều khoản/Liên hệ đầy đủ.
- Tránh nội dung AI sinh hàng loạt không kiểm chứng và claim chưa xác nhận (đang nằm trong danh sách chờ J).

## 7. Việc đưa vào kế hoạch
1. Phase 0: chốt CMS (Sanity/Payload/WordPress) và công cụ marketing đang dùng; xin quyền DNS để xác minh Search Console.
2. Phase 2: cấu trúc URL không dấu, Metadata API, `sitemap.ts`, `robots.ts`, khung JSON-LD, `lang="vi"`.
3. Phase 3–4: component SEO (Breadcrumb, JSON-LD theo trang), GTM + sự kiện chuyển đổi, trang con khóa học/sách (nếu mở rộng).
4. Phase 5: audit bằng Lighthouse CI, Screaming Frog, Rich Results Test; kiểm tra không có nội dung quan trọng chỉ hiện sau tương tác.
5. Phase 6: nộp sitemap Search Console/Bing, chuyển hướng tên miền cũ, bàn giao tài liệu cho đội marketing (cách sửa meta, thêm bài, đọc báo cáo).
6. Sau ra mắt: đội marketing theo dõi thứ hạng, backlink, cập nhật nội dung hằng tuần/tháng; dev xử lý lỗi kỹ thuật từ báo cáo audit.
