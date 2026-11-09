# Quyết định giao diện mới (bản Sáng v4) — chốt trước khi code

> Trạng thái: Figma đã duyệt; **đã triển khai code** (G0–G4) trên nhánh `claude/redesign-ui-layout-43a82a`. Xem mục 10 về điểm khác Figma.
> Figma: file `GIbPvIxwVLXxIdGj0k9NBs`, trang `54:2` "Home v4 · Sáng (chốt, rút gọn + nút liên hệ)", frame `53:3` (1280 × 16435).
> Nội dung: Google Doc `1XNqxT4HYU2LjRUCtR1PAl3_tpZI2meVfn3YkKPHIhyQ` (bản mới) — thay cho docx cũ `docs/NOI_DUNG_TRANG_CHU_Mentor_Jenny_Nguyen.docx`.

## 1. Yêu cầu gốc của khách
- Làm giống **bố cục, chuyển động, kiểu chữ, khoảng cách, thẻ** của nguyentatkiem.com (NTK) — "copy từ NTK, chỉ khác màu và nội dung".
- **Màu** lấy từ mentor-jenny-nguyen-ai.tallcoin1.chatgpt.site. **Nội dung** lấy từ file nội dung của khách.
- Vẽ Figma cho khách duyệt **trước khi code**.

## 2. Các quyết định đã chốt (theo thứ tự thời gian)
| # | Quyết định | Ghi chú |
|---|---|---|
| D1 | Bám NTK 1:1 về bố cục/chuyển động; chỉ đổi màu + nội dung | Bản navy đầu tiên bị khách bác ("sai, vẽ lại") |
| D2 | Bản tối dùng **đen tuyền**, không dùng navy | Đã vẽ ở trang Figma `13:2` (không còn dùng) |
| D3 | Bố cục = **hợp** các khối của NTK và các khối trong file nội dung. Khối NTK mà doc không có → để **khung trống gạch đứt "Marketing bổ sung"**. Khối trùng/xung đột → được thiết kế lại cho hợp lý. "Thừa hơn thiếu" | |
| D4 | Có thêm bản **Sáng: xanh – trắng – vàng gold** | Trang Figma `28:2` |
| D5 | **Chốt bản Sáng** làm bản chính thức | Bản tối bỏ |
| D6 | **Rút bớt chữ** ở mọi khối | Xem mục 5 |
| D7 | Dùng Google Doc mới làm nguồn nội dung | Thêm khối "Hệ sinh thái" |
| D8 | Thêm **nút liên hệ nổi** ở góc màn hình (Zalo, Messenger, điện thoại, email) | Xem mục 6 |

## 3. Bảng màu (bản Sáng)
| Vai trò | Mã |
|---|---|
| Navy (chữ chính, topbar, footer, khối tối) | `#102978` |
| Xanh chính (nút, link, nhấn) | `#1645B8` → `#2A6BF0` (gradient nút) |
| Nền xanh nhạt | `#EAF0FC`, `#F4F7FD`, `#F8FAFF` |
| Viền | `#D7E2F7` (`#CFDCF5` cho ô nhập) |
| Vàng gold — chữ/nhấn | `#C69A53` |
| Vàng — băng màu, số lớn | `#F1C64D` |
| Vàng nhạt | `#FFE9A8` |
| Chữ phụ | `#33477A`, `#5D6B88` |
| Nền trang | `#FFFFFF` |
| Zalo / Messenger / Điện thoại / Email | `#0068FF` / gradient `#00B2FF→#A033FF` / gradient xanh / `#F1C64D` |

Quy tắc: nền xen kẽ trắng ↔ `#F4F7FD`; khối nhấn dùng navy hoặc gradient xanh; vàng chỉ để **nhấn** (số, gạch chân, viền, băng "big").

## 4. Kiểu chữ & hệ thống (giữ nguyên NTK)
- Font: **Anton** (tiêu đề hoa), **Montserrat** (nội dung), **Dancing Script** (chữ viết tay nhấn).
- Giữ các lớp NTK: `.sec--night/--black/--paper`, `.hero`, `.stats`, `.cgrid/.course`, `.hstep/.htrack`, `.tile`, `.tickets`, `.strip`, `.vids`, `.biz`, `.books`, `.blog`, `.gift-band`, `.form`, `.footer`.
- Chữ gradient của NTK → dùng **màu đặc** (vàng) trong Figma vì không vẽ được; trong code có thể phục hồi gradient.
- Container tối đa khoảng 1280, lề theo biến `--gutter` của NTK.

## 5. Cấu trúc trang chủ (23 khối, theo thứ tự)
1. **Topbar** navy (liên hệ nhanh)
2. **Nav** trắng, logo, menu, nút CTA
3. **Hero** — "Xin chào, tôi là / MENTOR JENNY NGUYỄN", dòng vai trò *Doanh nhân | Mentor | Tác giả sách*, khẩu hiệu *Làm chủ AI. Bứt phá công việc. Tăng trưởng kinh doanh.*; nút chính "Khám phá khóa học AI", nút phụ "Giải pháp AI cho doanh nghiệp", link "Nhận bộ công cụ AI miễn phí"
4. **Stats** (băng xanh): 12+ năm kinh nghiệm · 15.000+ học viên · AI ứng dụng thực chiến · 02 sách AI
5. **Dải đối tác** (khung trống – Marketing)
6. **Bối cảnh** — 4 nỗi lo, mỗi nỗi 1 câu + câu chốt "AI không thay thế tư duy của bạn…"
7. **Về Mentor Jenny** — "LÀM THẬT – DẠY THẬT – KẾT QUẢ THẬT": 1 đoạn ngắn, 4 lĩnh vực, 1 câu trích (bỏ 6 vai trò)
8. **Marquee** (băng vàng chữ chạy)
9. **Hệ sinh thái Mentor Jenny** — 6 thẻ lưới 3×2: AI Video & xây kênh · Video & TVC AI · Thương hiệu cá nhân · KocViet & MCN V-Hub · Phần mềm & AI Agent · Sách & tài nguyên
10. **Khóa học** (tab): 4 khóa flagship (tên + 1 câu + "Phù hợp") · 1 khóa online "AI Video từ cơ bản" + 2 khung trống · 3 chương trình bổ trợ (Workshop AI cho CEO, Nhập môn AI miễn phí, Đào tạo AI in-house)
11. **Lộ trình** — 5 bước, chỉ tiêu đề (code: cuộn ngang ghim như NTK)
12. **Cộng đồng**
13. **Lịch sự kiện** — 3 vé (khung trống)
14. **Hoạt động & dấu ấn** — dải ảnh (placeholder)
15. **Video** (placeholder)
16. **Đào tạo in-house** (khối `.biz` navy)
17. **Cảm nhận** — 5 khung trống
18. **Sách** — 2 cuốn, mô tả ngắn
19. **Blog** — 1 bài lớn + 3 dòng
20. **Gift band** (băng vàng)
21. **FAQ** — 4 câu
22. **Form đăng ký + thông tin liên hệ**
23. **Footer** navy

**Đã bỏ khỏi bản cũ** (theo yêu cầu rút chữ / doc mới không có): khối Công thức, Vì sao chọn Jenny, Giải pháp NetViet, Quà tặng 4 món, Dấu ấn 6 mục (doc ghi chờ ảnh + thành tựu đã xác minh).

## 6. Nút liên hệ nổi
- Cột nút tròn 56 px, **cố định góc phải dưới** (`position: fixed`; trong Figma tạm đặt gần đầu trang để nhìn thấy).
- Thứ tự từ trên xuống: nhãn "Chat với Jenny" · **Zalo** · **Messenger** · **Điện thoại** (`tel:`) · **Email** (`mailto:`).
- Mobile: thu nhỏ còn 48 px, ẩn nhãn, không che nút CTA/form.
- Sự kiện GTM cho mỗi nút (nhất quán với cookie banner + GTM đã có ở PR #9).

## 7. Chuyển động (làm trong code, Figma không thể hiện)
Reveal khi cuộn · đếm số (count-up) ở Stats · marquee · lộ trình cuộn ngang ghim · hiệu ứng sheen trên nút · hover thẻ khóa học. Tôn trọng `prefers-reduced-motion`.

## 8. Còn **chưa chốt** — cần khách/marketing trả lời
1. Hai số điện thoại, địa chỉ, email đang lấy từ bản cũ — doc mới không có.
2. Link **Zalo** và **Messenger** thật.
3. Ảnh thật (hero, hoạt động, video, sách, blog) — hiện là placeholder.
4. Nội dung các khung "Marketing bổ sung": đối tác, sự kiện, cảm nhận, cộng đồng.
5. **Bản mobile** — chưa vẽ ở phong cách mới.
6. **Trang con** (chi tiết khóa học, Workshop, Nhập môn AI, in-house) — doc có nội dung nhưng chưa vẽ.
7. Mũi tên trong nút hiện thành chấm tròn trong Figma, bóng nút hero mất — lỗi vẽ, **không** áp dụng vào code.

## 9. Phạm vi & thứ tự code (sau khi duyệt)
- Ràng buộc `AGENTS.md`: **đọc `node_modules/next/dist/docs/` trước khi viết code Next.js** (phiên bản này có thay đổi so với kiến thức cũ).
- Đụng tới: `src/app/globals.css` (token màu + lớp NTK), `src/content/home.ts` (nội dung từ Google Doc), `src/app/(frontend)/page.tsx` + component khối, component nút liên hệ nổi (client component); giữ form `/api/leads`, cookie banner, sự kiện GTM.
- Thứ tự: (1) token màu + font + nền → (2) khối tĩnh theo thứ tự trang → (3) chuyển động → (4) nút liên hệ nổi → (5) mobile → (6) trang con.
- Kiểm tra: chạy dev, chụp từng khối so với Figma, test mobile, `tsc`/lint/build.

## 10. Đã triển khai và điểm khác Figma
- G0 đồng bộ `main` (next 16.4.5 + CSP). G1 token màu/font, bỏ chế độ tối + nền 3D. G2 23 khối. G3 nút liên hệ nổi. G4 chuyển động M1–M14.
- **Khác kế hoạch:** M15 (nền nhẹ cố định) đổi thành parallax nhẹ cho chữ nền Hero, vì mọi khối đều có nền đặc nên lớp nền cố định sẽ bị che. Lộ trình trên mobile dùng cuộn ngang native có snap (không ghim). Chưa dùng `LazyMotion`.
- **Nút liên hệ:** Messenger và email để trống trong `CONTACT` (`src/content/home.ts`) nên tự ẩn; Zalo đang dùng `zalo.me/<số trợ lý>` tạm. Điền link thật khi khách cung cấp.
- Khung "Marketing bổ sung" hiển thị công khai trên site; cân nhắc ẩn trước khi go-live nếu marketing chưa bổ sung kịp.
- Chưa làm: trang con (chi tiết khóa học, Workshop, Nhập môn AI, in-house), bản mobile tinh chỉnh theo Figma (chưa có Figma mobile), Lighthouse mobile chưa đo tay.
