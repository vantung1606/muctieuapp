# Financial Goal Tracker (Mục Tiêu App)

Ứng dụng quản lý mục tiêu tài chính và lập kế hoạch tiết kiệm thông minh.

## Công nghệ sử dụng
- **Frontend**: Next.js (App Router), Tailwind CSS, Lucide React.
- **Backend**: Node.js (Express), Prisma ORM.
- **Database**: PostgreSQL.
- **Deployment**: Docker & Docker Compose.

## Cách khởi chạy dự án

### Yêu cầu
- Đã cài đặt [Docker](https://www.docker.com/) và Docker Compose.

### Các bước thực hiện

1. **Khởi động ứng dụng bằng Docker Compose:**
   ```bash
   docker-compose up --build
   ```

2. **Truy cập ứng dụng:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - API: [http://localhost:5000/api](http://localhost:5000/api)

3. **Chạy Migration cho Database (Lần đầu tiên):**
   Trong khi container đang chạy, mở một terminal mới và chạy:
   ```bash
   docker exec -it muctieu_api npx prisma migrate dev --name init
   ```

## Tính năng chính
- Thêm mới mục tiêu tài chính với tên, số tiền cần đạt và hạn chót.
- Tự động tính toán số tiền cần tiết kiệm mỗi ngày, tuần, tháng dựa trên hạn chót.
- Theo dõi tiến độ tiết kiệm thông qua thanh Progress Bar trực quan.
- Giao diện Clean & Minimalist, hỗ trợ Responsive.

## Cấu trúc thư mục
- `/backend`: Mã nguồn server Express và Prisma schema.
- `/frontend`: Mã nguồn ứng dụng Next.js.
- `docker-compose.yml`: Cấu hình container cho toàn bộ hệ thống.
