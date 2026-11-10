/**
 * Công tắc hiển thị các khung "Marketing bổ sung" (nội dung chưa có).
 * Mặc định hiện, để marketing thấy chỗ cần điền. Khi ra mắt mà chưa đủ nội dung, đặt biến môi trường
 * `NEXT_PUBLIC_SHOW_PLACEHOLDERS=0` trên Vercel và deploy lại: các khối chỉ toàn khung trống sẽ ẩn,
 * khung ảnh lẻ không hiện.
 */
export const SHOW_PLACEHOLDERS = process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS !== '0'

/**
 * Công tắc phần Sự kiện (khối, mục menu, link chân trang). Mặc định TẮT; khi có sự kiện thật thì đặt
 * `NEXT_PUBLIC_SHOW_EVENTS=1` trên Vercel và deploy lại. Độc lập với công tắc khung chờ nội dung ở trên.
 */
export const SHOW_EVENTS = process.env.NEXT_PUBLIC_SHOW_EVENTS === '1'
