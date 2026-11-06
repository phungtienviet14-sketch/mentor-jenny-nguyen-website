# Phân tích hosting / server (Payload CMS + Next.js)

Ngày tra cứu: 2026-11-06. Giá và hạn mức thay đổi thường xuyên: **kiểm tra lại trang giá chính thức trước khi mua**. Nguồn ở cuối tài liệu.

## 1. Cần những gì để chạy
| Thành phần | Vai trò | Ghi chú |
|---|---|---|
| Next.js (SSG/ISR) | Trang chủ, trang khóa học, blog | Phần lớn lưu lượng là trang tĩnh qua CDN, tải server rất nhỏ |
| Payload CMS 3 | Trang quản trị cho đội marketing, API nội dung, lưu lead | Chạy cùng ứng dụng Next.js; cần cơ sở dữ liệu |
| Cơ sở dữ liệu | Postgres (hoặc SQLite/D1 nếu chạy trên Cloudflare) | Nội dung + lead, dung lượng nhỏ |
| Lưu ảnh/tệp | Object storage (S3 tương thích) | Ảnh sự kiện, bìa sách, quà tặng PDF |
| Email, Zalo | Gửi thông báo lead | Xem TASKS.md Phase 4 |
| DNS/CDN/chống bot | Cloudflare (DNS, CDN, Turnstile) | Có gói miễn phí, dùng cho mọi phương án |

## 2. Có miễn phí hoàn toàn được không?
**Với website thương mại (bán khóa học, thu lead) thì miễn phí hoàn toàn là có điều kiện hoặc có rủi ro**, không nên coi là phương án chính:

| Nhà cung cấp | Miễn phí cho dự án thương mại? | Vấn đề |
|---|---|---|
| Vercel Hobby | **Không**: chính sách sử dụng hợp lý ghi gói Hobby chỉ dành cho phi thương mại; dùng thương mại cần Pro (khoảng 20 USD/người/tháng + phí sử dụng) | Vi phạm điều khoản nếu dùng gói miễn phí cho trang bán hàng |
| Neon Postgres (gói Free) | Có cho quy mô nhỏ: 100 CU-giờ/tháng/dự án, 1 GB lưu trữ/dự án, 5 GB băng thông; không tính phí vượt, nhưng hết dung lượng thì không ghi thêm được | Đủ cho CMS nhỏ; cần theo dõi dung lượng; nên kiểm tra điều khoản dùng thương mại |
| Cloudflare (DNS, CDN, R2, Turnstile) | Có hạn mức miễn phí rộng (R2 có phần miễn phí) | Không phải nơi chạy ứng dụng Payload ở gói miễn phí nếu vượt giới hạn kích thước/CPU của Workers (cần kiểm chứng) |
| Cloudflare Workers + D1 + R2 | Gói Workers trả phí bắt đầu khoảng 5 USD/tháng; Payload có mẫu chính thức chạy trên Workers + D1 + R2 | Cách làm mới hơn, D1 là SQLite (không phải Postgres), ít tài liệu hơn; cần thử nghiệm |
| Render (gói Free) | Không phù hợp: Postgres miễn phí hết hạn sau 30 ngày, dịch vụ web "ngủ" gây chậm | Không chọn |
| Railway | Không có gói miễn phí lâu dài (chỉ tín dụng dùng thử) | Không chọn làm phương án miễn phí |
| Supabase (Free) | Có Postgres miễn phí nhưng dự án không hoạt động có thể bị tạm dừng; vẫn cần nơi chạy ứng dụng | Chỉ thay Neon |
| Oracle Cloud Always Free (máy ARM) | Có thể chạy miễn phí lâu dài (Docker, Postgres, Payload) | Phải tự vận hành, đăng ký đôi khi bị từ chối/thu hồi máy nhàn rỗi, vị trí trung tâm dữ liệu xa Việt Nam; **chưa kiểm chứng giới hạn hiện tại**. Rủi ro cao cho trang bán hàng chính |

## 3. Ba phương án đề xuất
| | A. Vercel + Neon + R2 (khuyến nghị) | B. VPS (Docker) + Cloudflare | C. Cloudflare toàn bộ (Workers + D1 + R2) |
|---|---|---|---|
| Chi phí ước tính/tháng | Khoảng 20–25 USD (Vercel Pro 20 USD/người; Neon Free và R2 free tier lúc đầu) | Khoảng 5–15 USD (VPS Singapore hoặc VPS Việt Nam; cần kiểm tra giá) | Khoảng 5 USD trở lên (Workers trả phí) |
| Độ khó vận hành | Thấp: deploy bằng git, preview theo PR | Trung bình đến cao: tự cập nhật hệ điều hành, sao lưu, giám sát (có thể dùng Coolify/Dokploy cho dễ) | Trung bình: mô hình khác (Workers), ít ví dụ |
| Tương thích Payload + Next.js | Rất tốt (mẫu Vercel + Postgres + lưu trữ có sẵn) | Tốt (Docker) | Có mẫu chính thức nhưng mới; D1 không phải Postgres |
| Độ tin cậy | Cao | Phụ thuộc cách bạn vận hành | Cao (nếu chạy ổn) |
| Độ trễ từ Việt Nam | Tệp tĩnh từ CDN gần (HK/SG); chức năng động ở Singapore | Chọn VPS Singapore hoặc Việt Nam | CDN toàn cầu |
| Rủi ro | Phí tăng theo lưu lượng; khóa nhà cung cấp | Mất dữ liệu nếu quên sao lưu; thời gian dev vận hành | Giới hạn kích thước/CPU, ít kinh nghiệm cộng đồng |

### Khuyến nghị
**Phương án A** (Vercel Pro + Neon + Cloudflare R2/Turnstile/DNS): rủi ro thấp nhất, đội marketing có trang quản trị ngay, dev không phải trực server. Chi phí khoảng 20–25 USD/tháng là hợp lý cho trang có đội SEO và quảng cáo. Nếu cần tiết kiệm hơn, chọn **phương án B** (VPS + Cloudflare) và chấp nhận thêm việc vận hành. **Không** dùng Vercel Hobby cho trang thương mại, **không** dựa vào phương án miễn phí hoàn toàn cho trang bán hàng chính.
Thiết kế chung để chi phí thấp: trang chủ SSG/ISR phục vụ qua CDN, Payload chỉ phục vụ quản trị và API lead, tắt chức năng nặng không dùng.

## 4. Việc cần làm (đưa vào TASKS.md)
| ID | Task | V |
|---|---|---|
| H1 | Bạn chốt phương án A/B/C và ngân sách hằng tháng | Xác nhận trong chat |
| H2 | Tạo tài khoản (Vercel, Neon, Cloudflare; bạn sở hữu, thêm tôi vào nếu cần); **không gửi mật khẩu/khóa API qua chat**, dùng biến môi trường | Danh sách biến môi trường trong `.env.example` |
| H3 | Cấu hình DNS tên miền về Cloudflare, SSL, redirect www | Trang chạy HTTPS |
| H4 | Môi trường: `production`, `preview`; sao lưu cơ sở dữ liệu định kỳ (Neon branch/dump hoặc cron) | Thử khôi phục 1 lần |
| H5 | Giám sát: Vercel analytics/logs, báo lỗi (Sentry gói miễn phí), cảnh báo dung lượng Neon và R2 | Có cảnh báo thử |
| H6 | Kiểm tra giá, giới hạn và điều khoản thương mại hiện hành trước khi mua | Ghi ngày kiểm tra |

## Nguồn
- Vercel, chính sách sử dụng hợp lý: https://vercel.com/docs/limits/fair-use-policy
- Neon, giới hạn gói Free: https://neon.com/faqs/free-plan-limits-and-quotas
- Payload (GitHub): https://github.com/payloadcms/payload
- Hướng dẫn Payload trên Cloudflare D1 + R2 (bên thứ ba): https://www.buildwithmatija.com/blog/payload-cms-cloudflare-d1-r2-setup
- Tổng hợp gói Postgres miễn phí (bên thứ ba): https://dev.to/alicespark/im-an-ai-and-i-audited-every-free-postgres-tier-several-arent-free-anymore-nb8
