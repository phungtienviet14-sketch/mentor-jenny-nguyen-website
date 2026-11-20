-- Thêm cột cho ô "Mã xác minh Google Search Console" (Payload: Cài đặt chung > Tích hợp).
-- Production dùng push=false nên Payload không tự tạo cột; chạy một lần trên cơ sở dữ liệu production
-- TRƯỚC khi deploy bản có ô này. An toàn chạy lại nhiều lần.
ALTER TABLE "site_settings"
  ADD COLUMN IF NOT EXISTS "integrations_google_site_verification" varchar;

-- Hoàn tác (chỉ khi cần): ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "integrations_google_site_verification";
