/**
 * Công tắc hiển thị các khung "Marketing bổ sung" (nội dung chưa có).
 * Mặc định hiện, để marketing thấy chỗ cần điền. Khi ra mắt mà chưa đủ nội dung, đặt biến môi trường
 * `NEXT_PUBLIC_SHOW_PLACEHOLDERS=0` trên Vercel và deploy lại: các khối chỉ toàn khung trống sẽ ẩn,
 * khung ảnh lẻ không hiện, mục "Sự kiện" biến khỏi menu.
 */
export const SHOW_PLACEHOLDERS = process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS !== '0'
