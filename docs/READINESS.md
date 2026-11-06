# Đánh giá mức sẵn sàng trước khi code + ghi chú bàn giao

Ngày: 2026-11-06. Đây là bản rà soát trung thực: **kế hoạch chưa đủ để code toàn bộ dự án**, nhưng đủ để bắt đầu Phase 2 (nền tảng). Danh sách dưới đây là những gì còn thiếu.

## 1. Kết luận nhanh
| Phase | Sẵn sàng? | Lý do |
|---|---|---|
| 2. Nền tảng + Payload | **Gần sẵn sàng** | Cần tài khoản Neon/Vercel (bạn tạo), chốt vài mục nhỏ ở mục 3 |
| 3. Giao diện 17 khối | **Chưa** | Thiếu ảnh thật, thiết kế nền 3D vàng, bản tablet, nội dung trang con |
| 4. Form, lead, analytics | **Chưa** | Zalo chưa xác minh, thiếu tài khoản/ID công cụ, thiếu nội dung pháp lý |
| 5–6. QA, ra mắt | Chưa | Phụ thuộc phase trước + tên miền, email gửi thư |

## 2. Những gì đã đầy đủ (không cần làm lại)
- Phân tích yêu cầu 17 khối, nội dung chữ thật (docx) — `PLAN.md`
- Thiết kế Figma: design system, desktop, mobile, 9 trạng thái form, prototype (xem mục 6)
- Phân tích chuyển động của site tham chiếu, chọn Motion + CSS thuần, motion spec — `MOTION_AND_TECH.md`
- Phân tích SEO và công cụ cho đội marketing — `SEO.md`
- Hosting: phương án A (Vercel + Neon + Cloudflare) — `HOSTING.md`, `TASKS.md` mục 12
- Task chi tiết Phase 0–6, mô hình dữ liệu Payload, mốc giao hàng — `TASKS.md`

## 3. Còn thiếu / chưa chắc (cần chuẩn bị trước khi code)

### 3.1 Việc của bạn (đầu vào)
| # | Hạng mục | Cần cho | Ghi chú |
|---|---|---|---|
| U1 | Ảnh thật: chân dung Jenny độ phân giải cao (nền xóa/không), ảnh bìa 2 sách, ảnh sự kiện (slide 5–14 hồ sơ), logo đối tác **đã được phép** | Phase 3 | Hiện chỉ có `ảnh.jpg`, `trắng_xóa nền.png`, `đỏ_xóa nền.png`. Bạn nói Q6 "đã xác nhận" nhưng tôi **chưa nhận được tệp**: xin gửi vào thư mục dự án |
| U2 | Số liệu/cảm nhận học viên đã xác nhận (3–6 người, có phép dùng tên/ảnh) | Phase 3 | Chưa có thì dùng placeholder có cờ |
| U3 | Nội dung trang khóa học (4 trang): thời lượng, hình thức, học phí, lịch khai giảng, giáo trình | Phase 3, Q5 | **docx chỉ có mức thẻ khóa học**, chưa đủ cho trang chi tiết |
| U4 | Nội dung pháp lý: Chính sách bảo mật, Điều khoản | Phase 4 | Chưa ai soạn; cần người chịu trách nhiệm (khuyến nghị tham khảo luật sư về dữ liệu cá nhân) |
| U5 | Tài khoản: Vercel (Pro khi ra mắt), Neon, Cloudflare, Google (GA4/GTM/Search Console), Meta/TikTok pixel nếu chạy quảng cáo | Phase 2–4 | Không gửi mật khẩu/khóa qua chat |
| U6 | Email gửi thư từ tên miền (ví dụ `lienhe@mentorjennynguyen.com`) và quyền sửa DNS (SPF/DKIM) | Phase 4 | Nếu không, email lead dễ vào thư rác |
| U7 | Zalo OA: có chưa, đã xác thực chưa, ai là người nhận thông báo | Phase 4 | Quyết định cách gửi Zalo |
| U8 | Danh sách người dùng Payload: ai là admin, ai là marketing | Phase 2 | Cấp quyền theo vai trò |
| U9 | Chốt bản tablet: thiết kế riêng hay co giãn từ desktop/mobile | Phase 3 | Đề xuất: co giãn, không vẽ thêm khung tablet |
| U10 | Xác nhận nội dung còn chờ J (Phụ lục C docx): số liệu hero, KocViet/MCN VHub thuộc NetViet hay không, vai trò tác giả sách, link mua sách, chính sách hỗ trợ sau khóa | Phase 3 | Chưa xác nhận thì không công bố |

### 3.2 Khoảng trống trong thiết kế (việc của tôi, cần làm trước Phase 3)
| # | Hạng mục | Trạng thái |
|---|---|---|
| D1 | **Nền ambient và vật thể 3D bản vàng/tối** (màu quả cầu, vòng, khối lập phương, lưới) | **Chưa thiết kế/đặc tả**: site tham chiếu dùng xanh/trắng, Figma của chúng ta chưa có. Cần spec màu/độ sáng cho nền đen-vàng |
| D2 | Khối Khóa học và Lộ trình dạng **cuộn ngang ghim** | Figma mới có lưới thẻ tĩnh; cần frame minh họa hàng ngang + thanh tiến độ |
| D3 | Menu mobile mở (hamburger), trạng thái hover/focus nút và thẻ | Chưa vẽ |
| D4 | Bố cục mobile Hero (ảnh chân dung nên ở trên hay dưới) | Đang ở dưới, cần chốt |
| D5 | Mẫu trang khóa học, trang blog, 404, trang cảm ơn | Chưa vẽ (Q5) |
| D6 | Thanh cookie/đồng ý, banner thông báo | Chưa vẽ |
| D7 | Spec chuyển động đính kèm Figma | Có trong `MOTION_AND_TECH.md`, chưa gắn vào Figma |

### 3.3 Khoảng trống kỹ thuật (làm trong Phase 2, ghi lại để không quên)
- Danh sách biến môi trường (`.env.example`), quy trình sao lưu Neon, môi trường preview/production.
- Bảng hỗ trợ trình duyệt (đề xuất: 2 phiên bản mới nhất Chrome, Edge, Safari, Firefox; iOS 16+, Android 10+) và thiết bị thật để thử (iPhone, Android tầm trung).
- Quy ước bảo vệ nhánh `main`, kiểm tra CI bắt buộc, mẫu PR.
- Kế hoạch kiểm thử chi tiết (ảnh chụp so Figma, e2e luồng form, a11y) — đã có ở `TASKS.md`, cần cụ thể hóa từng test khi code.
- Rủi ro mở: Zalo (4.7), hiệu năng nền 3D + cuộn ngang ghim trên mobile (giữ đủ theo yêu cầu, mục tiêu Lighthouse mobile >= 85).

## 4. Điều kiện để bắt đầu code
- **Phase 2 có thể bắt đầu khi:** bạn tạo xong Neon + Vercel (U5), có danh sách người dùng Payload (U8). Không cần ảnh thật.
- **Phase 3 bắt đầu khi:** D1–D4 xong, U1–U3 và U9–U10 có (hoặc chấp nhận placeholder có cờ).
- **Phase 4 bắt đầu khi:** U4–U7 có và spike Zalo (4.7) đã có kết luận.

## 5. Có compact được trước khi code không?
**Được, an toàn**, vì toàn bộ kế hoạch, quyết định và phân tích đã nằm trong repo (`docs/`) và đã đẩy lên GitHub, không phụ thuộc lịch sử hội thoại. Những thứ chỉ có trong hội thoại đã được chép vào mục 6 dưới đây. Sau khi compact, phiên sau chỉ cần đọc `docs/READINESS.md` và `docs/TASKS.md`.
Lưu ý: bản Next.js thử nghiệm trong thư mục tạm (ngoài repo) **sẽ bị bỏ**, Phase 2 sẽ tạo lại sạch trong repo.

## 6. Ghi chú bàn giao (thông tin chỉ có trong hội thoại)
- **Repo:** https://github.com/phungtienviet14-sketch/mentor-jenny-nguyen-website (private, nhánh `main`, tài khoản `gh` đã đăng nhập: phungtienviet14-sketch). Thư mục làm việc: `C:\Users\phung\Downloads\JENNY`. Chưa có mã nguồn.
- **Site tham chiếu:** https://mentor-jenny-nguyen-ai.tallcoin1.chatgpt.site/ (HTML/CSS/JS thuần, nền sáng đỏ-navy; chỉ lấy bố cục và kỹ thuật chuyển động, **nội dung lấy từ docx**).
- **Hướng thị giác chốt:** nền tối + vàng ánh kim (theo docx).
- **Figma:** file `nHvZGU6ebQlxBzCjsHnzI3` — https://www.figma.com/design/nHvZGU6ebQlxBzCjsHnzI3
  - Desktop `Home / Desktop 1440`: `2:2`. Khối: menu `2:3`, hero `2:16`, chỉ số `2:35`, logo `2:50`, bối cảnh `3:2`, về Jenny `3:18`, công thức `3:34`, khóa học `3:58`, lộ trình `3:116`, NetViet `4:2`, vì sao chọn `4:40`, học viên `4:66`, sách `4:81`, quà tặng `4:104`, dấu ấn `4:129`, FAQ `4:160`, CTA+form `4:183`, footer `4:201`.
  - Mobile `Home / Mobile 375`: `5:7`. Khối: menu `5:8`, hero `5:21`, chỉ số `5:40`, logo `5:55`, `5:77`, `5:93`, `5:109`, khóa học `5:133`, lộ trình `5:191`, `5:219`, `5:257`, `5:283`, sách `5:298`, quà tặng `5:321`, dấu ấn `5:346`, FAQ `5:377`, CTA+form `5:400`, footer `5:418`.
  - Form: quà tặng `7:4`, tư vấn `7:33`, focus `7:62`, lỗi `7:91`, đang gửi `7:123`, thành công `7:152`; mobile mặc định `7:163`, lỗi `7:192`, thành công `7:224`.
  - Biến: collection `Color` (`color/bg/base|surface|elevated|cream`, `color/gold/400|500|600`, `color/text/primary|muted|on-gold|on-cream`, `color/accent/red|orange`, `color/border/gold|subtle`, `color/state/error|success`), `Spacing` (`space/xs..3xl` = 4/8/16/24/40/64/96), `Radius` (`radius/sm|md|lg|full` = 8/16/24/999). Giá trị hex: base #0B0B0D, surface #141417, elevated #1C1C21, vàng 500 #D4AF37, chữ #F5F1E8, muted #A8A39A, cam #F28C28, lỗi #FF6B6B, thành công #4ADE80.
  - Text style: `Display/H1` (Playfair Display Bold 72/80), `H2` (48/58), `H3` (SemiBold 28/36), `Body/L|M|S` (Be Vietnam Pro 18/16/14), `Label/Eyebrow` (SemiBold 13, hoa, giãn 12%), `Label/Button` (15), `Stat/Number` (56/64), và `Mobile/H1|H2|H3|Stat|Body L`.
  - Chưa bind biến cho spacing/radius trong khung (mới bind màu); khi xuất token cần đối chiếu số liệu.
- **Quyết định đã chốt:** Payload CMS; lead qua email + Zalo (Zalo chưa xác minh); hosting A; mobile giữ đủ nền 3D + ghim ngang; chọn Motion + CSS thuần, không GSAP/Lenis/Three.
- **Lưu ý làm việc trong môi trường này:** hook GateGuard chặn lần tạo file mới đầu tiên và lệnh Bash đầu tiên: cần nêu 4 dữ kiện (nơi gọi, file trùng, dữ liệu, yêu cầu nguyên văn) rồi thử lại cùng thao tác. Lệnh Bash có `rm -rf` cũng bị chặn tương tự.
- **Việc kế tiếp sau khi compact:** (1) bạn xử lý mục 3.1; (2) tôi làm D1–D7 trong Figma; (3) bắt đầu Phase 2 trên nhánh `feat/2-foundation` khi U5 và U8 xong.

## 16. Cập nhật 2026-11-06 (sau D1-D7)
- Đã xong: D1-D7 (Figma), bản Light, bản nháp pháp lý (docs/legal/). Xem TASKS.md mục 13-15.
- Zalo hoãn; ảnh và nội dung bổ sung qua Payload nên Phase 3 không bị chặn bởi U1-U3.
- Còn lại của bạn: xem danh sách cuối cuộc trò chuyện (cài/đăng nhập Vercel CLI, tạo Neon project, danh sách người dùng Payload, email gửi thư và DNS, admin duyệt pháp lý).

## 17. Neon da tao (boi tro ly qua CLI)
- Project: mentor-jenny-nguyen, id lingering-water-01461847, vung aws-ap-southeast-1 (Singapore), Postgres 18, nhanh mac dinh main (br-round-tree-azjv1eev), database neondb, to chuc 74 Phung Viet.
- Chuoi ket noi (pooled va unpooled) luu o .env.local (bi gitignore), khong co trong repo. Da kiem tra ket noi ca hai thanh cong.
- Viec con lai cua ban ve Neon: khong con. Con Vercel CLI (cai + dang nhap), danh sach nguoi dung Payload, email gui thu/DNS, GA4/GTM, admin duyet phap ly.

## 18. Điểm dừng để compact (trước khi code Phase 2)
**Đã có:**
- Admin Payload: phungtienviet14@gmail.com, jennynguyen6899@gmail.com (tài khoản marketing: chưa có, thêm sau trong /admin).
- Email gửi thư: phungtienviet14@gmail.com. Lưu ý: Resend không gửi được từ địa chỉ @gmail.com (cần tên miền đã xác minh). Phương án cho Phase 4: **Gmail SMTP + App Password** (cần bật xác minh 2 bước và tạo App Password trong tài khoản Google; giới hạn gửi khoảng 500 thư/ngày, đủ cho lead). Khi có tên miền riêng thì chuyển sang gửi từ tên miền (Resend/SMTP) để tránh thư rác. **App Password chỉ dán vào biến môi trường, không gửi qua chat.**
- Vercel CLI 65.12.0 đã cài và đăng nhập (tài khoản phungtienviet14-sketch, team mặc định `phungtienviet14-sketchs-projects`, gói **hobby**: phải nâng Pro trước khi ra mắt thật vì Hobby cấm dùng thương mại).
- Neon: project `lingering-water-01461847`, chuỗi kết nối trong `.env.local` (gitignore).
- Nhánh `feat/2-foundation` đã tạo (chưa có mã nguồn).

**Lưu ý kỹ thuật Phase 2:**
- Node cục bộ là v24.18.0, nhưng `create-payload-app@3.93.0` yêu cầu `^22.23.4 || >=24.22.1` (chỉ cảnh báo EBADENGINE, có thể gây lỗi). Nên nâng Node lên >= 24.22.1 (hoặc 22.23.4+) trước khi cài Payload; nếu bạn chưa nâng được, tôi thử chạy với cảnh báo.
- `create-payload-app` có template `blank` (dùng cái này, không dùng `website`/`ecommerce` vì nặng) và cờ `-n`, `-t`, `--use-npm`; xem `npx create-payload-app --help`. Dự kiến lệnh: tạo trong thư mục scratchpad rồi chép vào repo (repo đã có docs/, README, .gitignore).
- Việc làm ở Phase 2: tasks 2.1-2.13 trong TASKS.md (Payload + Postgres, Tailwind v4, tokens Sáng/Tối, font, khung SEO, collections + phân quyền admin/marketing, seed từ docx, CI, test), mở PR cho bạn xem.

**Việc của bạn còn lại:** GA4 + Tag Manager (ID), App Password Gmail (khi tới Phase 4), nâng Node (nếu có thể), tên miền/DNS (Phase 6), admin duyệt pháp lý, email người dùng marketing (khi có).
