# Bàn giao: vận hành site và việc còn lại

Cập nhật: 10/11/2026. Site chạy trên Vercel, tự deploy mỗi khi merge vào nhánh `main`.
Địa chỉ hiện tại: https://mentor-jenny-nguyen-website.vercel.app

## 1. Sửa nội dung ở đâu

Nội dung hiện nằm trong code, chưa sửa được từ trang quản trị. Sửa file rồi mở PR, merge là site tự cập nhật.

| Muốn sửa | File |
|---|---|
| Chữ trang chủ (hero, khóa học, sách, FAQ, footer) | `src/content/home.ts` |
| Trang chi tiết 8 chương trình | `src/content/programs.ts` |
| Số điện thoại, email, Zalo, Messenger, mạng xã hội | `CONTACT` trong `src/content/home.ts` |
| Chính sách bảo mật, điều khoản | `src/lib/legal.ts` |

Quy ước: ô có chữ trong ngoặc vuông, ví dụ `[Học phí]`, là chỗ chờ nội dung và hiện khung gạch đứt. Điền giá trị thật thì khung biến mất.

Kênh liên hệ để trống (`email`, `messenger`, `social.*`) thì nút và biểu tượng tương ứng tự ẩn.

## 2. Việc cần khách hoặc marketing cung cấp

| # | Việc | Ai | Ghi chú |
|---|---|---|---|
| 1 | Tên miền | Khách | `mentorjennynguyen.com` đang có người đăng ký (Vercel báo không mua được). Xác nhận ai giữ tên này, hoặc chọn tên khác |
| 2 | Gắn tên miền vào Vercel | Dev | Sau khi có quyền sửa DNS: `vercel domains add <tên miền>` |
| 3 | Mã GTM `GTM-XXXXXXX` | Marketing | Thêm biến `NEXT_PUBLIC_GTM_ID` trên Vercel. Chưa có thì site chạy nhưng chưa đo gì |
| 4 | Số điện thoại, địa chỉ, email thật | Khách | Hiện lấy từ bản cũ |
| 5 | Link Zalo OA, Messenger, Facebook, TikTok, YouTube | Marketing | Link Zalo hiện là tạm (`zalo.me/<số trợ lý>`) |
| 6 | Ảnh thật: chân dung, bìa sách, sự kiện, khóa học, logo đối tác đã được phép | Marketing | Đặt vào `public/images/` |
| 7 | Nội dung các khung "Marketing bổ sung": đối tác, sự kiện, cảm nhận học viên, cộng đồng, video, blog | Marketing | Cảm nhận cần có phép dùng tên và ảnh |
| 8 | Học phí, lịch khai giảng, thời lượng của từng chương trình | Khách | Điền vào `programs.ts` |
| 9 | Email gửi thư từ tên miền + SPF/DKIM | Dev + khách | Để email thông báo lead không vào thư rác |

## 3. Công tắc ẩn khung chờ nội dung

Khi ra mắt mà chưa đủ nội dung, ẩn các khối chỉ toàn khung trống: đặt biến `NEXT_PUBLIC_SHOW_PLACEHOLDERS=0` trên Vercel (Production) rồi deploy lại.

```bash
vercel env add NEXT_PUBLIC_SHOW_PLACEHOLDERS production
vercel deploy --prod
```

Khối bị ẩn: Cộng đồng, Hoạt động & dấu ấn, Video, Cảm nhận, Blog. Khung ảnh lẻ ở Sách, Doanh nghiệp, Quà tặng cũng không hiện. Xóa biến (hoặc đặt khác `0`) để hiện lại.

## 3b. Công tắc phần Sự kiện

Phần Sự kiện **mặc định ẩn** (khối `#su-kien`, mục menu, link chân trang), độc lập với công tắc trên. Admin hoặc marketing bật/tắt ngay trong trang quản trị, không cần dev:

1. Vào `/admin`, đăng nhập, mở **Cài đặt chung** (Globals).
2. Mục **Công tắc hiển thị**, tick **Hiện phần Sự kiện**, bấm **Save**.
3. Site cập nhật ngay, không cần deploy lại. Bỏ tick là ẩn cả ba nơi.

Chỉ vai trò `admin` và `marketing` sửa được. Nếu không đọc được CMS (lỗi, bản preview) thì site dùng biến `NEXT_PUBLIC_SHOW_EVENTS=1` làm dự phòng, mặc định tắt.

**Bước một lần cho production:** production không tự tạo cột mới, nên chạy file `docs/sql/2026-11-10-site-settings-features.sql` trong SQL Editor của Neon trước khi deploy bản này. Chưa chạy thì trang Cài đặt chung trong admin sẽ báo lỗi.

Khi ẩn, nút "Xem lịch Workshop" ở trang Workshop AI cho CEO đổi thành "Hỏi lịch Workshop" (cuộn tới form đăng ký). Lưu ý: nội dung các thẻ sự kiện hiện còn là khung mẫu trong `blocks-mid.tsx` (hàm `Events`); cần điền sự kiện thật trước khi bật.

## 4. Biến môi trường trên Vercel

Đã có: `DATABASE_URI`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SITE_URL`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `SMTP_USER`, `SMTP_PASSWORD`, `LEADS_NOTIFY_TO`.
Chưa có: `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_SHOW_PLACEHOLDERS` và `NEXT_PUBLIC_SHOW_EVENTS` (tùy chọn; công tắc Sự kiện chính nằm trong CMS, biến này chỉ là dự phòng).
Khi có tên miền thật, đổi `NEXT_PUBLIC_SITE_URL` cho khớp (canonical, sitemap, JSON-LD dùng biến này).

## 5. Sau khi gắn tên miền

1. Gửi thử form đăng ký một lần, kiểm tra lead vào DB và email thông báo.
2. Nộp `https://<tên miền>/sitemap.xml` lên Google Search Console và Bing Webmaster.
3. Xác minh GA4 qua GTM, kiểm tra sự kiện `cta_click`, `contact_click`, `generate_lead`.
4. Đo Lighthouse mobile (mục tiêu từ 90), CLS dưới 0,1.
5. Hosting: gói Vercel Hobby không dành cho trang thương mại, cần Pro (xem `HOSTING.md`).

## 6. Chưa có thiết kế duyệt

Figma chỉ có bản desktop trang chủ (`Home / Desktop 1280 · Sáng v4`). Bản mobile, tablet, 8 trang chương trình và nút liên hệ nổi được làm theo phong cách trang chủ, cần Jenny hoặc team duyệt.
