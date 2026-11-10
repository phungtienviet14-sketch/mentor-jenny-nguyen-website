/**
 * Nội dung trang chi tiết khóa học / chương trình, lấy từ Google Doc nội dung (phần "trang con").
 * Giá trị `info` bắt đầu bằng "[" là thông tin marketing/khách phải xác nhận: hiển thị khung gạch đứt, không bịa số.
 */

import { SHOW_EVENTS } from './flags'

export type ProgramKind = 'course' | 'online' | 'workshop' | 'intro' | 'inhouse'

export type Program = {
  slug: string
  kind: ProgramKind
  /** Nhãn nhỏ phía trên tiêu đề, ví dụ "KHÓA 01". */
  tag: string
  /** Tên chương trình (h1, tiêu đề trang, thẻ ở trang chủ). */
  title: string
  /** Chữ viết tay phía trên tiêu đề. */
  kicker: string
  /** Tiêu đề lớn: dòng 1 trắng/navy, dòng 2 vàng. */
  headline: [string, string]
  intro: string[]
  audienceTitle: string
  audience: string[]
  learnTitle: string
  learn: { title: string; text: string }[]
  /** Chỉ dùng cho đào tạo in-house. */
  formats?: { title: string; text: string }[]
  process?: { title: string; text: string }[]
  infoTitle: string
  info: { label: string; value: string }[]
  ctaTitle: string
  ctaText?: string
  primary: { label: string; href: string }
  secondary: { label: string; href: string }
}

const COURSE_INFO = [
  { label: 'Hình thức', value: '[Offline/Online/Hybrid]' },
  { label: 'Thời lượng', value: '[Thông tin xác nhận]' },
  { label: 'Lịch học', value: '[Lịch khai giảng]' },
  { label: 'Học phí', value: '[Mức học phí chính thức]' },
  { label: 'Tài nguyên đi kèm', value: '[Danh sách thực tế]' },
  { label: 'Chính sách hỗ trợ', value: '[Thông tin xác nhận]' },
]

const COURSE_CTA = {
  primary: { label: 'Đăng ký tư vấn khóa học', href: '#dang-ky' },
  secondary: { label: 'Xem chương trình chi tiết', href: '#noi-dung' },
}

export const PROGRAMS: Program[] = [
  {
    slug: 'ai-video-kenh-ve-tinh',
    kind: 'course',
    tag: 'KHÓA 01',
    title: 'AI Video & Kênh vệ tinh tự động',
    kicker: 'Khóa học AI Video & Kênh vệ tinh tự động',
    headline: ['Từ ý tưởng đến video AI', 'và hệ thống nội dung'],
    intro: ['Học cách ứng dụng AI vào sáng tạo video, xây dựng quy trình sản xuất và phát triển kênh nội dung có hệ thống.'],
    audienceTitle: 'Khóa học dành cho ai?',
    audience: [
      'Người mới bắt đầu làm video AI.',
      'Content creator và nhân sự marketing.',
      'Chủ kinh doanh muốn tự xây dựng nội dung.',
      'Người muốn phát triển kênh social với AI.',
    ],
    learnTitle: 'Bạn sẽ học được gì?',
    learn: [
      { title: 'Tư duy sản xuất nội dung AI', text: 'Xác định mục tiêu, đối tượng, ý tưởng và quy trình xây dựng nội dung.' },
      { title: 'Sử dụng công cụ AI', text: 'Thực hành các công cụ phù hợp với từng công đoạn sản xuất video.' },
      { title: 'Tạo video thực tế', text: 'Thực hành từ kịch bản, hình ảnh, chuyển động đến dựng và hoàn thiện sản phẩm.' },
      { title: 'Xây dựng quy trình', text: 'Tổ chức các bước sản xuất để dễ lặp lại và cải tiến.' },
      { title: 'Phát triển kênh nội dung', text: 'Lên kế hoạch xuất bản, theo dõi hiệu quả và tối ưu quy trình.' },
    ],
    infoTitle: 'Thông tin khóa học',
    info: COURSE_INFO,
    ctaTitle: 'Sẵn sàng bắt đầu?',
    ...COURSE_CTA,
  },
  {
    slug: 'thuong-hieu-ca-nhan',
    kind: 'course',
    tag: 'KHÓA 02',
    title: 'Thương hiệu cá nhân với AI',
    kicker: 'Khóa học Xây dựng thương hiệu cá nhân với AI',
    headline: ['Xây dựng dấu ấn riêng', 'phát triển thương hiệu với AI'],
    intro: ['Ứng dụng AI để định vị bản thân, xây dựng chiến lược nội dung và phát triển thương hiệu cá nhân một cách chuyên nghiệp, nhất quán và bền vững.'],
    audienceTitle: 'Khóa học dành cho ai?',
    audience: [
      'Doanh nhân, chủ doanh nghiệp muốn xây dựng thương hiệu cá nhân.',
      'Chuyên gia, mentor, giảng viên và nhà đào tạo.',
      'Người sáng tạo nội dung muốn phát triển hình ảnh chuyên nghiệp.',
      'Người muốn xây dựng uy tín và mở rộng cơ hội kinh doanh thông qua thương hiệu cá nhân.',
    ],
    learnTitle: 'Bạn sẽ học được gì?',
    learn: [
      { title: 'Định vị thương hiệu cá nhân', text: 'Xác định giá trị khác biệt, thế mạnh, đối tượng mục tiêu và thông điệp thương hiệu phù hợp.' },
      { title: 'Xây dựng chiến lược nội dung với AI', text: 'Ứng dụng AI để nghiên cứu khách hàng, tìm kiếm ý tưởng và xây dựng kế hoạch nội dung nhất quán.' },
      { title: 'Sáng tạo hình ảnh & video thương hiệu', text: 'Sử dụng công cụ AI để hỗ trợ thiết kế hình ảnh, viết kịch bản và sản xuất video truyền tải dấu ấn cá nhân.' },
      { title: 'Phát triển hệ thống kênh truyền thông', text: 'Xây dựng và quản lý nội dung trên Facebook, TikTok, YouTube và các nền tảng phù hợp với mục tiêu thương hiệu.' },
      { title: 'Tối ưu & phát triển thương hiệu', text: 'Theo dõi hiệu quả nội dung, cải thiện khả năng tiếp cận và xây dựng quy trình phát triển thương hiệu lâu dài.' },
    ],
    infoTitle: 'Thông tin khóa học',
    info: COURSE_INFO,
    ctaTitle: 'Sẵn sàng xây dựng thương hiệu của bạn?',
    ...COURSE_CTA,
  },
  {
    slug: 'toi-uu-doanh-nghiep',
    kind: 'course',
    tag: 'KHÓA 03',
    title: 'Tối ưu doanh nghiệp với AI',
    kicker: 'Khóa học Ứng dụng AI trong quản trị và vận hành doanh nghiệp',
    headline: ['Giảm việc thủ công', 'tăng hiệu quả với AI'],
    intro: ['Ứng dụng AI vào quản lý, marketing, bán hàng và vận hành để tối ưu nguồn lực, chuẩn hóa quy trình và nâng cao hiệu quả hoạt động doanh nghiệp.'],
    audienceTitle: 'Khóa học dành cho ai?',
    audience: [
      'Chủ doanh nghiệp, CEO và nhà quản lý.',
      'Trưởng phòng, trưởng bộ phận và đội ngũ vận hành.',
      'Doanh nghiệp nhỏ và vừa muốn ứng dụng AI vào công việc.',
      'Cá nhân phụ trách chuyển đổi số, cải tiến quy trình và nâng cao năng suất.',
    ],
    learnTitle: 'Bạn sẽ học được gì?',
    learn: [
      { title: 'Tư duy ứng dụng AI trong doanh nghiệp', text: 'Nhận diện những công việc có thể ứng dụng AI, xác định mục tiêu và lựa chọn giải pháp phù hợp với thực tế doanh nghiệp.' },
      { title: 'Tối ưu công việc & năng suất', text: 'Sử dụng AI để hỗ trợ xử lý tài liệu, lập kế hoạch, tổng hợp báo cáo và giảm thời gian thực hiện các tác vụ lặp lại.' },
      { title: 'Ứng dụng AI trong marketing & bán hàng', text: 'Khai thác AI để nghiên cứu khách hàng, xây dựng nội dung, hỗ trợ quy trình bán hàng và chăm sóc khách hàng.' },
      { title: 'Xây dựng quy trình & tự động hóa', text: 'Thiết kế các quy trình làm việc có sự hỗ trợ của AI, kết nối công cụ và từng bước tự động hóa những tác vụ phù hợp.' },
      { title: 'Triển khai & đo lường hiệu quả', text: 'Xây dựng lộ trình ứng dụng AI theo từng bộ phận, đánh giá kết quả và tối ưu hoạt động dựa trên dữ liệu thực tế.' },
    ],
    infoTitle: 'Thông tin khóa học',
    info: COURSE_INFO,
    ctaTitle: 'Sẵn sàng tối ưu doanh nghiệp với AI?',
    ...COURSE_CTA,
  },
  {
    slug: 'marketing-voi-ai',
    kind: 'course',
    tag: 'KHÓA 04',
    title: 'Marketing với AI',
    kicker: 'Khóa học Ứng dụng AI trong Marketing thực chiến',
    headline: ['Làm marketing thông minh hơn', 'tăng tốc sáng tạo với AI'],
    intro: ['Ứng dụng AI vào nghiên cứu khách hàng, xây dựng chiến lược, sáng tạo nội dung và triển khai marketing để tiết kiệm thời gian, tối ưu nguồn lực và nâng cao hiệu quả chiến dịch.'],
    audienceTitle: 'Khóa học dành cho ai?',
    audience: [
      'Nhân sự marketing, content creator và truyền thông.',
      'Chủ doanh nghiệp, chủ shop và người kinh doanh online.',
      'Nhân sự agency, freelancer và đội ngũ sáng tạo nội dung.',
      'Người muốn nâng cao kỹ năng marketing bằng công cụ AI.',
    ],
    learnTitle: 'Bạn sẽ học được gì?',
    learn: [
      { title: 'Tư duy marketing trong kỷ nguyên AI', text: 'Hiểu vai trò của AI trong marketing, xác định mục tiêu chiến dịch và lựa chọn công cụ phù hợp với từng công việc.' },
      { title: 'Nghiên cứu khách hàng & lập kế hoạch', text: 'Ứng dụng AI để phân tích đối tượng mục tiêu, khám phá insight, nghiên cứu thị trường và hỗ trợ xây dựng kế hoạch marketing.' },
      { title: 'Sáng tạo nội dung marketing với AI', text: 'Thực hành sử dụng AI để viết nội dung, xây dựng kịch bản quảng cáo, thiết kế hình ảnh và sản xuất video truyền thông.' },
      { title: 'Triển khai chiến dịch đa kênh', text: 'Xây dựng quy trình sản xuất và phân phối nội dung trên Facebook, TikTok, YouTube và các nền tảng phù hợp.' },
      { title: 'Đo lường & tối ưu hiệu quả', text: 'Sử dụng AI hỗ trợ tổng hợp dữ liệu, phân tích hiệu quả nội dung, cải tiến chiến dịch và xây dựng quy trình marketing có thể tái sử dụng.' },
    ],
    infoTitle: 'Thông tin khóa học',
    info: COURSE_INFO,
    ctaTitle: 'Sẵn sàng nâng cấp kỹ năng marketing với AI?',
    ...COURSE_CTA,
  },
  {
    slug: 'ai-video-co-ban',
    kind: 'online',
    tag: 'ONLINE',
    title: 'AI Video từ cơ bản',
    kicker: 'Khóa học Online – AI Video từ cơ bản',
    headline: ['Tự tạo video bằng AI', 'từ con số 0'],
    intro: [
      'Không cần kinh nghiệm quay dựng chuyên nghiệp, bạn vẫn có thể bắt đầu sáng tạo video bằng AI.',
      'Khóa học hướng dẫn từng bước từ xây dựng ý tưởng, tạo hình ảnh đến chuyển động và hoàn thiện video, giúp bạn hình thành quy trình sản xuất nội dung của riêng mình.',
    ],
    audienceTitle: 'Khóa học dành cho ai?',
    audience: [
      'Người mới bắt đầu tìm hiểu AI Video.',
      'Content creator, TikToker và YouTuber.',
      'Nhân sự marketing, truyền thông.',
      'Chủ kinh doanh muốn tự sản xuất video quảng bá sản phẩm.',
    ],
    learnTitle: 'Bạn sẽ học được gì?',
    learn: [
      { title: 'Tư duy sản xuất video bằng AI', text: 'Hiểu quy trình sản xuất video AI, các định dạng nội dung và cách lựa chọn công cụ phù hợp.' },
      { title: 'Xây dựng ý tưởng & kịch bản', text: 'Sử dụng AI để phát triển ý tưởng, viết kịch bản, chia cảnh và xây dựng storyboard đơn giản.' },
      { title: 'Tạo hình ảnh bằng AI', text: 'Thực hành viết prompt, tạo hình ảnh nhân vật, bối cảnh và lựa chọn phong cách hình ảnh phù hợp.' },
      { title: 'Chuyển hình ảnh thành video', text: 'Làm quen với công cụ tạo video AI, viết prompt chuyển động và cải thiện tính nhất quán giữa các cảnh.' },
      { title: 'Dựng & hoàn thiện video', text: 'Kết hợp các cảnh quay, lời thoại, âm thanh và hiệu ứng để hoàn thành một sản phẩm video cơ bản.' },
    ],
    infoTitle: 'Thông tin khóa học',
    info: [
      { label: 'Hình thức', value: 'Học online qua video' },
      { label: 'Thời lượng', value: '[Tổng số giờ học]' },
      { label: 'Số bài học', value: '[Số lượng bài]' },
      { label: 'Học phí', value: '[Mức học phí chính thức]' },
      { label: 'Quyền truy cập', value: '[Thời hạn truy cập]' },
      { label: 'Tài liệu đi kèm', value: '[Prompt mẫu, tài liệu thực hành]' },
      { label: 'Hỗ trợ học viên', value: '[Chính sách thực tế]' },
    ],
    ctaTitle: 'Sẵn sàng tạo video AI đầu tiên?',
    primary: { label: 'Đăng ký khóa học', href: '#dang-ky' },
    secondary: { label: 'Xem video học thử', href: '/#video' },
  },
  {
    slug: 'workshop-ai-cho-ceo',
    kind: 'workshop',
    tag: 'WORKSHOP',
    title: 'Workshop AI cho CEO',
    kicker: 'Chương trình Workshop AI dành cho lãnh đạo doanh nghiệp',
    headline: ['Lãnh đạo thời AI', 'tư duy mới – tăng trưởng mới'],
    intro: [
      'AI không chỉ là công cụ công nghệ, mà còn mở ra cơ hội thay đổi cách doanh nghiệp quản lý, vận hành và phát triển.',
      'Workshop AI for CEO giúp lãnh đạo tiếp cận những ứng dụng AI thực tế, xác định cơ hội triển khai và xây dựng tư duy quản trị phù hợp trong kỷ nguyên AI.',
    ],
    audienceTitle: 'Chương trình dành cho ai?',
    audience: [
      'CEO, nhà sáng lập và chủ doanh nghiệp.',
      'Giám đốc điều hành, giám đốc bộ phận.',
      'Nhà quản lý muốn tối ưu nguồn lực và hiệu quả vận hành.',
      'Lãnh đạo đang tìm hướng ứng dụng AI vào doanh nghiệp.',
    ],
    learnTitle: 'Bạn sẽ nhận được gì?',
    learn: [
      { title: 'Tư duy lãnh đạo trong kỷ nguyên AI', text: 'Hiểu những thay đổi AI mang lại cho doanh nghiệp và vai trò của người lãnh đạo trong quá trình ứng dụng công nghệ.' },
      { title: 'Nhận diện cơ hội ứng dụng AI', text: 'Khám phá các tình huống ứng dụng AI trong quản trị, marketing, bán hàng và vận hành.' },
      { title: 'Tối ưu nguồn lực doanh nghiệp', text: 'Tìm hiểu cách AI hỗ trợ xử lý công việc, chuẩn hóa quy trình và cải thiện hiệu suất đội ngũ.' },
      { title: 'Xây dựng lộ trình ứng dụng AI', text: 'Xác định những công việc nên ưu tiên, lựa chọn công cụ và định hướng triển khai phù hợp với quy mô doanh nghiệp.' },
      { title: 'Trao đổi & giải đáp cùng chuyên gia', text: 'Thảo luận các bài toán thực tế và nhận gợi ý ứng dụng AI phù hợp với nhu cầu doanh nghiệp.' },
    ],
    infoTitle: 'Thông tin Workshop',
    info: [
      { label: 'Hình thức', value: '[Trực tiếp/Trực tuyến]' },
      { label: 'Thời lượng', value: '[Thông tin xác nhận]' },
      { label: 'Lịch tổ chức', value: '[Ngày và giờ]' },
      { label: 'Địa điểm', value: '[Địa điểm tổ chức]' },
      { label: 'Phí tham dự', value: '[Thông tin chính thức]' },
      { label: 'Số lượng tham dự', value: '[Thông tin xác nhận]' },
    ],
    ctaTitle: 'Sẵn sàng dẫn dắt doanh nghiệp trong kỷ nguyên AI?',
    primary: { label: 'Đăng ký tham gia Workshop', href: '#dang-ky' },
    secondary: SHOW_EVENTS
      ? { label: 'Xem lịch Workshop', href: '/#su-kien' }
      : { label: 'Hỏi lịch Workshop', href: '#dang-ky' },
  },
  {
    slug: 'nhap-mon-ai',
    kind: 'intro',
    tag: 'MIỄN PHÍ',
    title: 'Nhập môn AI miễn phí',
    kicker: 'Chương trình nhập môn AI dành cho người mới',
    headline: ['Bắt đầu với AI', 'dễ hiểu – dễ học – dễ ứng dụng'],
    intro: [
      'Bạn muốn sử dụng AI nhưng chưa biết bắt đầu từ đâu?',
      'Nhập môn AI miễn phí giúp bạn làm quen với những công cụ AI phổ biến, hiểu cách sử dụng và từng bước ứng dụng công nghệ vào học tập, công việc và cuộc sống.',
      'Không cần kiến thức lập trình. Không cần kinh nghiệm công nghệ. Chỉ cần bạn sẵn sàng học hỏi và thực hành.',
    ],
    audienceTitle: 'Chương trình dành cho ai?',
    audience: [
      'Người mới bắt đầu tìm hiểu về AI.',
      'Nhân viên văn phòng muốn nâng cao hiệu suất công việc.',
      'Sinh viên, người đi làm muốn bổ sung kỹ năng AI.',
      'Chủ kinh doanh muốn khám phá cách AI hỗ trợ công việc hằng ngày.',
    ],
    learnTitle: 'Bạn sẽ học được gì?',
    learn: [
      { title: 'Hiểu đúng về AI', text: 'Tìm hiểu AI là gì, AI có thể làm gì và những ứng dụng thiết thực trong công việc hằng ngày.' },
      { title: 'Làm quen với công cụ AI', text: 'Tiếp cận các công cụ như ChatGPT và một số ứng dụng AI phổ biến, phù hợp với người mới.' },
      { title: 'Biết cách viết câu lệnh AI', text: 'Học cách đặt câu hỏi, cung cấp ngữ cảnh và hướng dẫn AI tạo ra câu trả lời phù hợp với nhu cầu.' },
      { title: 'Thực hành AI trong công việc', text: 'Sử dụng AI hỗ trợ viết nội dung, lập kế hoạch, tổng hợp thông tin và xử lý các công việc đơn giản.' },
      { title: 'Xây dựng thói quen ứng dụng AI', text: 'Biết cách lựa chọn công cụ, kiểm tra kết quả và từng bước đưa AI vào công việc hằng ngày.' },
    ],
    infoTitle: 'Thông tin chương trình',
    info: [
      { label: 'Hình thức', value: '[Online/Video tự học]' },
      { label: 'Thời lượng', value: '[Thông tin xác nhận]' },
      { label: 'Học phí', value: 'Miễn phí' },
      { label: 'Trình độ', value: 'Người mới bắt đầu' },
      { label: 'Tài liệu đi kèm', value: '[Thông tin xác nhận]' },
      { label: 'Cách tham gia', value: '[Hướng dẫn nhận quyền truy cập]' },
    ],
    ctaTitle: 'Bắt đầu hành trình AI của bạn ngay hôm nay!',
    primary: { label: 'Đăng ký học miễn phí', href: '#dang-ky' },
    secondary: { label: 'Khám phá các khóa học nâng cao', href: '/#khoa-hoc' },
  },
  {
    slug: 'dao-tao-in-house',
    kind: 'inhouse',
    tag: 'IN-HOUSE',
    title: 'Đào tạo AI in-house',
    kicker: 'Chương trình đào tạo AI dành riêng cho doanh nghiệp',
    headline: ['Đưa AI vào doanh nghiệp', 'từ đào tạo đến ứng dụng'],
    intro: [
      'Mỗi doanh nghiệp có một bài toán riêng. Vì vậy, đào tạo AI cần xuất phát từ công việc thực tế, không chỉ dừng lại ở kiến thức công cụ.',
      'Đào tạo AI In-house được định hướng xây dựng theo nhu cầu từng doanh nghiệp, giúp đội ngũ tiếp cận công nghệ, thực hành trên các tình huống cụ thể và từng bước ứng dụng AI vào công việc.',
    ],
    audienceTitle: 'Chương trình dành cho ai?',
    audience: [
      'Doanh nghiệp muốn nâng cao năng lực AI cho nhân sự.',
      'Ban lãnh đạo, CEO và đội ngũ quản lý.',
      'Phòng Marketing, Sales, HR, CSKH và vận hành.',
      'Tổ chức muốn chuẩn hóa cách ứng dụng AI trong công việc.',
    ],
    learnTitle: 'Doanh nghiệp sẽ nhận được gì?',
    learn: [
      { title: 'Đánh giá nhu cầu ứng dụng AI', text: 'Khảo sát hoạt động và xác định các nhóm công việc có khả năng ứng dụng AI hiệu quả.' },
      { title: 'Xây dựng chương trình đào tạo riêng', text: 'Thiết kế nội dung phù hợp với trình độ nhân sự, đặc thù phòng ban và mục tiêu doanh nghiệp.' },
      { title: 'Thực hành AI theo từng vị trí', text: 'Hướng dẫn sử dụng AI trong marketing, bán hàng, chăm sóc khách hàng, quản lý và xử lý công việc văn phòng.' },
      { title: 'Chuẩn hóa quy trình làm việc', text: 'Hướng dẫn đội ngũ xây dựng thư viện câu lệnh, biểu mẫu và quy trình ứng dụng AI có thể tái sử dụng.' },
      { title: 'Đánh giá & định hướng triển khai', text: 'Tổng kết kết quả thực hành, xác định điểm cần cải tiến và đề xuất lộ trình ứng dụng AI sau đào tạo.' },
    ],
    formats: [
      { title: 'Đào tạo cho ban lãnh đạo', text: 'Tập trung vào tư duy chiến lược, cơ hội ứng dụng AI và định hướng triển khai trong doanh nghiệp.' },
      { title: 'Đào tạo theo phòng ban', text: 'Thiết kế nội dung thực hành riêng cho Marketing, Sales, HR, CSKH và các bộ phận vận hành.' },
      { title: 'Đào tạo chuyên sâu theo dự án', text: 'Tập trung vào một bài toán cụ thể, hướng đến việc xây dựng quy trình hoặc sản phẩm ứng dụng AI.' },
    ],
    process: [
      { title: 'Tiếp nhận nhu cầu', text: 'Tìm hiểu mục tiêu, quy mô nhân sự và vấn đề doanh nghiệp cần giải quyết.' },
      { title: 'Thiết kế chương trình', text: 'Đề xuất nội dung, phương pháp đào tạo và kế hoạch triển khai phù hợp.' },
      { title: 'Đào tạo & thực hành', text: 'Tổ chức đào tạo kết hợp hướng dẫn thực hành với các tình huống công việc thực tế.' },
      { title: 'Đánh giá & bàn giao', text: 'Tổng kết chương trình, bàn giao tài liệu theo phạm vi thống nhất và đề xuất hướng phát triển tiếp theo.' },
    ],
    infoTitle: 'Thông tin chương trình',
    info: [
      { label: 'Hình thức', value: '[Trực tiếp/Trực tuyến/Hybrid]' },
      { label: 'Đối tượng', value: 'Doanh nghiệp và tổ chức' },
      { label: 'Quy mô', value: '[Theo nhu cầu và điều kiện triển khai]' },
      { label: 'Thời lượng', value: 'Thiết kế theo chương trình thống nhất' },
      { label: 'Địa điểm', value: '[Tại doanh nghiệp/Địa điểm đào tạo/Online]' },
      { label: 'Chi phí', value: 'Báo giá theo nhu cầu và phạm vi đào tạo' },
      { label: 'Tài liệu & hỗ trợ', value: 'Theo đề xuất chương trình' },
    ],
    ctaTitle: 'Sẵn sàng nâng cao năng lực AI cho đội ngũ?',
    ctaText: 'Hãy chia sẻ nhu cầu để nhận đề xuất chương trình đào tạo phù hợp với doanh nghiệp của bạn.',
    primary: { label: 'Nhận tư vấn đào tạo In-house', href: '#dang-ky' },
    secondary: { label: 'Xem chương trình đào tạo doanh nghiệp', href: '#noi-dung' },
  },
]

export const programHref = (slug: string) => `/chuong-trinh/${slug}`

export function getProgram(slug: string): Program | undefined {
  return PROGRAMS.find((p) => p.slug === slug)
}
