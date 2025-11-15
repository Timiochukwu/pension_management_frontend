# Pension Management System - Frontend

Modern React frontend built with TypeScript, Tailwind CSS, and professional FinTech UI/UX.

## 🚀 Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS 4 (Custom FinTech design system)
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

✅ Authentication with JWT
✅ Dashboard with analytics
✅ Member management
✅ Contribution tracking
✅ Benefit claims
✅ Report generation
✅ Professional FinTech design
✅ Fully responsive
✅ Dark/Light mode ready

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

## 📚 Documentation

- All components include inline documentation
- TypeScript types for full IDE support
- See comments in each file for details

## 🤝 Contributing

Built with ❤️ for enterprise pension management
