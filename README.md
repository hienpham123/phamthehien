# Portfolio - Phạm Thế Hiển

Portfolio website hiện đại được xây dựng với Next.js 14, TypeScript, Tailwind CSS và Framer Motion.

## ✨ Tính năng

- 🚀 **Next.js 14** với App Router
- 📱 **Responsive Design** - Tối ưu cho mọi thiết bị
- 🎨 **Animations mượt mà** với Framer Motion
- 🔍 **SEO Optimized** - Metadata và Open Graph đầy đủ
- ⚡ **Performance** - Tối ưu hiệu suất và tốc độ tải
- 🎯 **Clean Code** - Cấu trúc code rõ ràng, dễ bảo trì
- 🌙 **Dark Theme** - Màu đen chủ đạo, hiện đại

## 🛠️ Công nghệ sử dụng

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📦 Cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Chạy development server:
```bash
npm run dev
```

3. Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt

## 🏗️ Cấu trúc project

```
phamthehien/
├── app/
│   ├── layout.tsx      # Root layout với SEO metadata
│   ├── page.tsx         # Trang chủ
│   └── globals.css      # Global styles
├── components/
│   ├── Header.tsx       # Navigation header
│   ├── Hero.tsx         # Hero section
│   ├── About.tsx        # Giới thiệu
│   ├── Skills.tsx       # Kỹ năng
│   ├── Portfolio.tsx    # Portfolio projects
│   ├── Contact.tsx      # Form liên hệ
│   └── Footer.tsx       # Footer
├── public/              # Static files
└── package.json
```

## 🎨 Customization

### Thay đổi thông tin cá nhân

1. **SEO Metadata**: Chỉnh sửa trong `app/layout.tsx`
2. **Hero Section**: Cập nhật trong `components/Hero.tsx`
3. **About Section**: Chỉnh sửa trong `components/About.tsx`
4. **Skills**: Cập nhật trong `components/Skills.tsx`
5. **Portfolio**: Thêm/sửa projects trong `components/Portfolio.tsx`
6. **Contact Info**: Cập nhật trong `components/Contact.tsx`

### Màu sắc

Màu sắc được cấu hình trong `tailwind.config.ts`. Màu chủ đạo là đen (#000000).

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🚀 Deploy

### Vercel (Recommended)

1. Push code lên GitHub
2. Import project vào Vercel
3. Deploy tự động

### Build cho production

```bash
npm run build
npm start
```

## 📝 License

MIT License - Tự do sử dụng cho mục đích cá nhân và thương mại.

## 👤 Author

**Phạm Thế Hiển**
- Portfolio: [Your Website]
- Email: phamthehien@example.com

---

Made with ❤️ using Next.js

