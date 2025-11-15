# Pension Management System - Frontend

Modern React frontend built with TypeScript, Tailwind CSS, and professional FinTech UI/UX.

## 🚀 Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS 3.4 (Custom FinTech design system)
- **State Management:** Zustand
- **API Client:** Axios with interceptors
- **Data Fetching:** TanStack Query (React Query)
- **Routing:** React Router v6
- **Forms:** React Hook Form + Zod validation
- **UI Components:** Headless UI
- **Charts:** Recharts
- **Icons:** Lucide React
- **Notifications:** React Hot Toast

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── ui/             # UI components (Button, Card, Input, etc.)
│   ├── layout/         # Layout components (DashboardLayout)
│   ├── auth/           # Auth components (ProtectedRoute)
│   └── members/        # Member-specific components
├── pages/              # Page components
│   ├── auth/           # Login, Register
│   ├── dashboard/      # Dashboard page
│   ├── members/        # Member management
│   ├── contributions/  # Contribution management
│   ├── benefits/       # Benefit claims
│   └── reports/        # Reports
├── services/           # API service layer
│   ├── api.ts          # Axios configuration
│   ├── authService.ts  # Authentication APIs
│   └── memberService.ts # Member APIs
├── store/              # Global state (Zustand)
│   └── authStore.ts    # Authentication state
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create `.env` file:

```env
VITE_API_URL=http://localhost:8080/api
```

### 3. Start Development Server

```bash
npm run dev
```

Runs on `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

## 🎨 Features

✅ Authentication with JWT bearer tokens
✅ Dashboard with analytics & interactive charts (Recharts)
✅ Member management (CRUD with form validation)
✅ Contribution tracking & payment integration
✅ Benefit claims workflow (approve/reject)
✅ Report generation (PDF/Excel)
✅ Professional FinTech design system
✅ Fully responsive (mobile, tablet, desktop)
✅ **Dark mode with persistent storage** 🌙
✅ **Production build optimized**
✅ **Vercel deployment ready** 🚀

## 📝 Backend Integration

Point `VITE_API_URL` to your Spring Boot backend:

```env
VITE_API_URL=http://localhost:8080/api
```

Backend should enable CORS for `http://localhost:5173`

## 🎯 Default Login

```
Email: admin@pension.com
Password: password123
```

## 🌙 Dark Mode

Toggle between light and dark themes using the moon/sun icon in the dashboard header.

**Features:**
- Persistent theme storage (localStorage via Zustand)
- Smooth transitions between themes
- All components fully support dark mode
- Tailwind CSS dark mode utilities throughout

## 🚀 Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for comprehensive deployment instructions including:
- ✅ Vercel (recommended - one command deploy)
- ✅ Netlify
- ✅ AWS S3 + CloudFront
- ✅ Docker containerization
- ✅ Environment variable configuration
- ✅ CORS setup guide
- ✅ Post-deployment checklist

**Quick Deploy to Vercel:**
```bash
npm i -g vercel
cd /home/user/pension_management_frontend
vercel
```

Your app will be live in seconds! 🎉

## 📚 Documentation

- All components include inline documentation
- TypeScript types for full IDE support
- Comprehensive comments in every file
- **DEPLOYMENT.md** - Complete deployment guide
- Pre-configured **vercel.json** for optimal performance

## 🤝 Contributing

Built with ❤️ for enterprise pension management
