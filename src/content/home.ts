/**
 * Nội dung trang chủ bản "Sáng v4", rút gọn theo Google Doc nội dung mới.
 * Đây là dữ liệu mặc định; Payload sẽ ghi đè khi marketing nhập.
 * Mảng/số đếm (count, placeholders) là khung "Marketing bổ sung": hiển thị ô gạch đứt, không bịa nội dung.
 * Mục có `confirm: true` là nội dung chưa được xác nhận.
 */

export const CTA = {
  register: { label: 'Đăng ký tư vấn', href: '#dang-ky' },
  courses: { label: 'Khám phá khóa học AI', href: '#khoa-hoc' },
  business: { label: 'Giải pháp AI cho doanh nghiệp', href: '#doanh-nghiep' },
  gift: { label: 'Nhận bộ công cụ AI miễn phí', href: '#qua-tang' },
}

/** Kênh liên hệ dùng cho topbar, nút nổi và footer. Số điện thoại/email lấy từ bản cũ, chờ xác nhận. */
export const CONTACT = {
  phones: [
    { label: 'Trợ lý', phone: '0812.98.68.98', tel: '+84812986898' },
    { label: 'Chuyên gia', phone: '0934.457.589', tel: '+84934457589' },
  ],
  /** TODO(khách): điền email, link Zalo OA và Messenger thật; kênh để trống sẽ tự ẩn khỏi nút nổi. */
  email: '',
  zalo: 'https://zalo.me/0812986898',
  messenger: '',
  website: 'mentorjennynguyen.com',
  office: 'NetViet TV – Tầng 2, Chelsea Park, 116 Trung Kính, Yên Hòa, Hà Nội',
}

export const NAV = [
  { label: 'Trang chủ', href: '#top' },
  { label: 'Về Jenny', href: '#ve-jenny' },
  { label: 'Khóa học', href: '#khoa-hoc' },
  { label: 'Giải pháp doanh nghiệp', href: '#giai-phap' },
  { label: 'Sách', href: '#sach' },
  { label: 'Sự kiện', href: '#su-kien' },
  { label: 'Liên hệ', href: '#dang-ky' },
]

export const HERO = {
  hi: 'Xin chào, tôi là',
  name: 'Mentor Jenny Nguyễn',
  role: 'Doanh nhân · Mentor · Tác giả sách',
  tagline: 'Làm chủ AI. Bứt phá công việc. Tăng trưởng kinh doanh.',
  body: 'Đồng hành cùng cá nhân và doanh nghiệp ứng dụng AI bằng phương pháp thực chiến, đo lường được kết quả.',
  quote: { lead: 'Không chỉ học AI.', text: 'Hãy biến AI thành lợi thế của bạn.' },
  mark: 'THỞ CÙNG AI',
}

export const STATS = [
  { value: 12, suffix: '+', label: 'Năm kinh nghiệm' },
  { value: 15000, suffix: '+', label: 'Học viên được đào tạo' },
  { text: 'AI', label: 'Ứng dụng thực chiến' },
  { value: 2, pad: 2, label: 'Sách AI' },
] as { value?: number; suffix?: string; pad?: number; text?: string; label: string }[]

/** Dải đối tác: logo thật do marketing bổ sung. */
export const PARTNERS = {
  caption: 'Đối tác & đơn vị đồng hành',
  items: ['Techfest Việt Nam', 'Trung ương Đoàn', 'UNDP Việt Nam', 'VTV', 'Viettel', 'HanoiBA'],
}

export const CONTEXT = {
  eyebrow: 'Kinh doanh trong kỷ nguyên AI',
  title: 'Thị trường thay đổi.',
  accent: 'Bạn cần đi trước.',
  body: 'Sở hữu công cụ thôi chưa đủ. Quan trọng là ứng dụng AI đúng cách để ra kết quả.',
  pains: [
    'Nhiều việc, thiếu thời gian.',
    'Làm nội dung tốn kém.',
    'Biết AI nhưng chưa biết dùng.',
    'Muốn tăng trưởng nhưng thiếu hệ thống.',
  ],
  closing: 'AI không thay thế tư duy của bạn. AI giúp bạn làm việc thông minh hơn khi có đúng phương pháp.',
  cta: { label: 'Khám phá phương pháp của Jenny', href: '#khoa-hoc' },
}

export const ABOUT = {
  eyebrow: 'Về Mentor Jenny',
  title: 'Làm thật - Dạy thật -',
  accent: 'Kết quả thật.',
  body: 'Tôi là Jenny Nguyễn, Tổng giám đốc NetViet TV, hơn 12 năm trong truyền thông, marketing và công nghệ AI. Tôi đồng hành cùng cá nhân và doanh nghiệp ứng dụng AI bằng phương pháp thực chiến, dễ triển khai.',
  areas: [
    'Chiến lược truyền thông và marketing',
    'Sản xuất nội dung, video và TVC',
    'Xây dựng thương hiệu cá nhân',
    'Đào tạo ứng dụng AI',
  ],
  quote: 'Kiến thức chỉ thực sự có giá trị khi được biến thành hành động và kết quả.',
  quoteBy: 'Jenny Nguyễn · Mentor',
  badge: { value: '12+ năm', label: 'Thực chiến' },
  cta: { label: 'Khám phá hành trình của Jenny', href: '#ve-jenny' },
}

/** Dải chữ lớn chạy ngang (băng vàng). */
export const MARQUEE_WORDS = ['Thở cùng AI', 'Làm thật', 'Dạy thật', 'Kết quả thật']

export const ECOSYSTEM = {
  eyebrow: 'Hệ sinh thái Mentor Jenny',
  title: 'Ứng dụng AI vào',
  accent: 'học tập, sáng tạo & kinh doanh',
  subtitle: 'Từ đào tạo đến triển khai thực tế.',
  items: [
    { title: 'Đào tạo AI Video & xây kênh tự động', text: 'Làm chủ công cụ AI để sản xuất video và phát triển kênh.', cta: 'Khám phá khóa học', href: '#khoa-hoc' },
    { title: 'Sản xuất video & TVC AI', text: 'AI vào hình ảnh, video quảng cáo cho thương hiệu.', cta: 'Xem giải pháp', href: '#doanh-nghiep' },
    { title: 'Xây dựng thương hiệu cá nhân', text: 'Định vị chuyên gia, xây hệ thống truyền thông với AI.', cta: 'Tìm hiểu thêm', href: '#khoa-hoc' },
    { title: 'Hệ sinh thái KocViet & MCN V-Hub', text: 'Sáng tạo nội dung, KOC, livestream và thương mại điện tử.', cta: 'Khám phá hệ sinh thái', href: '#giai-phap' },
    { title: 'Phần mềm & AI Agent', text: 'Công cụ AI và giải pháp tự động hóa vận hành.', cta: 'Xem giải pháp AI', href: '#doanh-nghiep' },
    { title: 'Sách & tài nguyên thực chiến', text: 'Kiến thức, tài liệu, prompt và phương pháp ứng dụng AI.', cta: 'Khám phá tài nguyên', href: '#sach' },
  ],
}

export type Course = {
  tag: string
  name: string
  hook: string
  audience: string
}

export const COURSES_INTRO = {
  eyebrow: 'Hệ sinh thái đào tạo',
  title: 'Học là làm được.',
  accent: 'Làm là ra kết quả.',
  tabs: ['Khóa chủ lực', 'Khóa online', 'Chương trình bổ trợ'],
}

export const COURSES: Course[] = [
  { tag: 'KHÓA 01', name: 'AI Video & Kênh vệ tinh tự động', hook: 'Biến ý tưởng thành video. Xây hệ thống nội dung bằng AI.', audience: 'Creator, marketer, chủ kinh doanh muốn xây kênh nội dung.' },
  { tag: 'KHÓA 02', name: 'Thương hiệu cá nhân với AI', hook: 'Xây dựng dấu ấn riêng trong kỷ nguyên số.', audience: 'Chuyên gia, doanh nhân, nhà đào tạo.' },
  { tag: 'KHÓA 03', name: 'Tối ưu doanh nghiệp với AI', hook: 'Giảm việc thủ công. Tăng hiệu quả vận hành.', audience: 'Chủ doanh nghiệp, quản lý, trưởng bộ phận.' },
  { tag: 'KHÓA 04', name: 'Marketing với AI', hook: 'Làm marketing nhanh hơn, có hệ thống hơn.', audience: 'Nhân sự marketing, chủ kinh doanh, agency.' },
]

export const ONLINE_COURSES = {
  items: [
    { tag: 'ONLINE', name: 'AI Video từ cơ bản', hook: 'Tự tạo video bằng AI từ con số 0.', audience: 'Người mới, creator, chủ kinh doanh.' },
  ] as Course[],
  /** Số khung trống chờ marketing bổ sung khóa online khác. */
  placeholders: 2,
}

export const COURSE_CTAS = { detail: 'Xem chi tiết', register: 'Đăng ký tư vấn' }

export const SUPPORT_PROGRAMS = [
  { name: 'Workshop AI cho CEO', text: 'Cơ hội ứng dụng AI vào quản trị, marketing, vận hành.', cta: 'Xem lịch workshop', href: '#su-kien' },
  { name: 'Nhập môn AI miễn phí', text: 'Làm quen công cụ AI phổ biến và thực hành cơ bản.', cta: 'Học miễn phí', href: '#qua-tang' },
  { name: 'Đào tạo AI in-house', text: 'Thiết kế theo nhu cầu doanh nghiệp, phòng ban.', cta: 'Nhận tư vấn', href: '#doanh-nghiep' },
]

export const ROADMAP = {
  eyebrow: 'Bắt đầu từ đâu?',
  title: 'Lộ trình',
  accent: 'bắt đầu từ đâu cũng được',
  steps: [
    { no: '01', tag: 'Bước 1', title: 'Nhận quà miễn phí' },
    { no: '02', tag: 'Bước 2', title: 'Nhập môn hoặc workshop' },
    { no: '03', tag: 'Bước 3', title: 'Khóa chủ lực' },
    { no: '04', tag: 'Bước 4', title: 'Coaching & triển khai' },
    { no: '05', tag: 'Bước 5', title: 'Cộng đồng Thở cùng AI' },
  ],
  cta: { label: 'Tôi nên bắt đầu từ bước nào?', href: '#dang-ky' },
}

/** Khối cộng đồng: chờ marketing bổ sung. */
export const COMMUNITY = {
  eyebrow: 'Cộng đồng',
  title: 'Cộng đồng',
  accent: 'Thở cùng AI',
  lead: '[Marketing bổ sung phần giới thiệu]',
  activities: ['[Hoạt động cộng đồng 1]', '[Hoạt động cộng đồng 2]', '[Hoạt động cộng đồng 3]'],
  cta: { label: 'Tham gia cộng đồng', href: '#dang-ky' },
}

/** Lịch sự kiện: chờ marketing bổ sung. */
export const EVENTS = {
  eyebrow: 'Gặp Jenny trực tiếp',
  title: 'Lịch sự kiện',
  accent: 'sắp diễn ra',
  count: 3,
}

export const ACTIVITIES = { caption: 'Hoạt động & dấu ấn', count: 6 }

export const VIDEOS = {
  eyebrow: 'Xem và học',
  title: 'Video',
  accent: 'nổi bật',
  sideCount: 2,
  cta: { label: 'Kênh YouTube', href: '#' },
}

export const INHOUSE = {
  eyebrow: 'Doanh nghiệp & tổ chức',
  title: 'Đào tạo AI',
  accent: 'in-house',
  points: ['Thiết kế theo nhu cầu thực tế của doanh nghiệp', 'Theo phòng ban hoặc đội ngũ', 'Thực hành trên dữ liệu và quy trình của chính doanh nghiệp'],
  cta: { label: 'Nhận tư vấn doanh nghiệp', href: '#dang-ky' },
}

export const TESTIMONIALS = {
  eyebrow: 'Học viên nói gì',
  title: 'Chia sẻ',
  accent: 'của học viên',
  count: 5,
}

export const BOOKS = {
  eyebrow: 'Thư viện tri thức',
  title: 'Sách',
  accent: 'của Jenny',
  items: [
    { label: 'Sách nổi bật', name: 'ChatGPT Toàn Tập', desc: 'Hướng dẫn ứng dụng AI tạo sinh từ nền tảng đến thực hành cho người không chuyên kỹ thuật.', ctas: ['Đặt mua sách', 'Đọc thử'] },
    { label: 'Sách', name: 'Xây dựng thương hiệu với AI', desc: 'Cẩm nang dùng AI để xây thương hiệu cá nhân và doanh nghiệp, có quy trình từng bước.', ctas: ['Đặt mua sách'] },
  ],
}

export const BLOG = {
  eyebrow: 'Kiến thức mỗi tuần',
  title: 'Blog',
  accent: 'AI kinh doanh',
  rows: 3,
}

export const GIFT = {
  title: 'Nhận bộ công cụ AI miễn phí',
  text: 'Dùng được ngay trong tuần đầu.',
  cta: { label: 'Nhận quà', href: '#dang-ky' },
}

export const FAQ = {
  eyebrow: 'Câu hỏi thường gặp',
  title: 'Giải đáp trước khi',
  accent: 'anh chị đăng ký',
  items: [
    { q: 'Tôi không rành công nghệ, có học được không?', a: 'Được. Các khóa thiết kế cho người làm kinh doanh, không cần biết lập trình.' },
    { q: 'Học xong có áp dụng được ngay không?', a: 'Có. Anh chị thực hành trên sản phẩm của mình và mang về quy trình để làm tiếp.' },
    { q: 'Sau khóa học có được hỗ trợ không?', a: 'Đội ngũ tư vấn sẽ cho anh chị biết chính sách hỗ trợ sau khóa khi đăng ký.', confirm: true },
    { q: 'Doanh nghiệp muốn đào tạo riêng cho nhân viên?', a: 'Jenny nhận đào tạo in-house theo từng phòng ban. Để lại thông tin, đội ngũ sẽ liên hệ khảo sát nhu cầu.' },
  ],
}

export const FINAL_CTA = {
  eyebrow: 'Bắt đầu ngay hôm nay',
  title: 'Bắt đầu với AI',
  accent: 'từ đâu?',
  body: 'Để lại thông tin, đội ngũ của Jenny sẽ tư vấn lộ trình phù hợp. Miễn phí.',
  interests: [
    'AI Video & kênh vệ tinh',
    'Thương hiệu cá nhân',
    'Tối ưu doanh nghiệp',
    'Marketing với AI',
    'Đào tạo in-house',
    'Dịch vụ NetViet',
  ],
  submit: 'Nhận tư vấn miễn phí',
}

export const FOOTER = {
  intro: 'Mentor Jenny Nguyễn – Thở cùng AI. Đào tạo và giải pháp AI thực chiến cho doanh nghiệp Việt.',
  hotlines: CONTACT.phones,
  websites: [CONTACT.website, 'netviettv.com.vn'],
  office: CONTACT.office,
  socials: ['Facebook', 'TikTok', 'YouTube', 'Zalo OA'],
  links: [
    { label: 'Về Jenny', href: '#ve-jenny' },
    { label: 'Khóa học', href: '#khoa-hoc' },
    { label: 'Giải pháp doanh nghiệp', href: '#giai-phap' },
    { label: 'Sách', href: '#sach' },
    { label: 'Sự kiện', href: '#su-kien' },
    { label: 'Chính sách bảo mật', href: '/chinh-sach-bao-mat' },
    { label: 'Điều khoản', href: '/dieu-khoan-su-dung' },
  ],
  copyright: '© 2026 Mentor Jenny Nguyễn. All rights reserved.',
}
