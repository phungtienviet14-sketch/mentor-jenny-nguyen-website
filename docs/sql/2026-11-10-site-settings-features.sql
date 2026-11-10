-- Thêm cột cho công tắc "Hiện phần Sự kiện" (Payload: Cài đặt chung > Công tắc hiển thị).
-- Production dùng push=false nên Payload không tự tạo cột; chạy một lần trên cơ sở dữ liệu production
-- (Neon: SQL Editor), TRƯỚC khi deploy bản có công tắc. An toàn chạy lại nhiều lần.
ALTER TABLE "site_settings"
  ADD COLUMN IF NOT EXISTS "features_show_events" boolean DEFAULT false;

-- Hoàn tác (chỉ khi cần): ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "features_show_events";
