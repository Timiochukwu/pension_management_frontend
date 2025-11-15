# Pension Management System - Frontend

A modern, professional React + TypeScript frontend application for managing pension systems. Built with Tailwind CSS, this application provides a comprehensive interface for member management, contribution tracking, benefit claims processing, payment handling, and detailed reporting.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=flat&logo=vite&logoColor=white)

## 🚀 Features

### Core Functionality
- ✅ **Authentication & Authorization**: JWT-based authentication with role-based access control
- ✅ **Dashboard Analytics**: Real-time statistics, charts, and insights with Recharts
- ✅ **Member Management**: Complete CRUD operations for pension members
- ✅ **Contribution Tracking**: Monitor and manage member contributions
- ✅ **Benefit Claims**: Process and approve benefit claims with workflow management
- ✅ **Payment Processing**: Integration with Paystack and Flutterwave payment gateways
- ✅ **Reports & Export**: Generate and export reports in PDF, Excel, and CSV formats

### UI/UX Features
- 🌙 **Dark Mode**: Persistent theme toggle with smooth transitions
- 🔔 **Notifications Panel**: Real-time notifications with dropdown panel and badges
- ⚙️ **User Settings**: Comprehensive settings page (Profile, Security, Notifications, Preferences)
- 📱 **Responsive Design**: Mobile-first design that works on all screen sizes
- 🎨 **Professional FinTech Design**: Custom color palette optimized for financial applications
- ✅ **Form Validation**: Client-side validation using React Hook Form + Zod
- ⏳ **Loading States**: Skeleton loaders and loading indicators
- 🚨 **Error Handling**: User-friendly error messages and toast notifications

### Developer Experience
- 🔷 **TypeScript**: Full type safety throughout the application
- 🧹 **ESLint**: Code quality and consistency enforcement
- ⚡ **Hot Reload**: Fast development with Vite's HMR
- 🐳 **Docker Support**: Complete Docker setup for development and production
- 📦 **Code Splitting**: Optimized bundle sizes with lazy loading

## 🛠 Tech Stack

### Core
- **React 19** - UI library
- **TypeScript 5.6** - Type-safe JavaScript
- **Vite 7.2** - Build tool and dev server
- **React Router v6** - Client-side routing

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Headless UI** - Unstyled accessible components
- **Lucide React** - Beautiful icon library

### State Management
- **Zustand** - Lightweight state management with persistence
- **TanStack Query (React Query)** - Server state management

### Forms & Validation
- **React Hook Form** - Performant form handling
- **Zod** - TypeScript-first schema validation

### Data Visualization
- **Recharts** - Chart library for analytics dashboard

### HTTP Client
- **Axios** - Promise-based HTTP client with interceptors

### Utilities
- **date-fns** - Modern date utility library
- **React Hot Toast** - Beautiful toast notifications

## 📋 Prerequisites

- **Node.js**: >= 18.x
- **npm**: >= 9.x (or yarn/pnpm)
- **Backend API**: Pension Management System backend running on port 8080
- **Docker** (optional): For containerized development

## 🚦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Timiochukwu/pension_management_frontend.git
cd pension_management_frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8080/api
```

For production, update with your production API URL:

```env
VITE_API_URL=https://api.yourdomain.com/api
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

### 6. Preview Production Build

```bash
npm run preview
```

## 🐳 Docker Setup

### Quick Start with Docker Compose

#### Development Mode (Frontend Only)
```bash
docker-compose -f docker-compose.dev.yml up
```

Access the application at `http://localhost:5173`

#### Full Stack (Frontend + Backend + Database + Cache)
```bash
docker-compose up
```

Services available:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8080`
- phpMyAdmin: `http://localhost:8081`
- Redis Commander: `http://localhost:8082`

#### Production Mode
```bash
docker-compose up frontend
```

Production build served via Nginx at `http://localhost:5173`

### Docker Commands

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f frontend

# Rebuild containers
docker-compose up --build

# Clean up (remove volumes)
docker-compose down -v
```

For detailed Docker documentation, see [DOCKER.md](./DOCKER.md)

## 📁 Project Structure

```
pension_management_frontend/
├── public/                      # Static assets
├── src/
│   ├── components/             # Reusable components
│   │   ├── auth/              # Authentication components
│   │   ├── layout/            # Layout components
│   │   │   ├── DashboardLayout.tsx    # Main dashboard layout
│   │   │   ├── NotificationPanel.tsx  # Notifications dropdown
│   │   │   ├── ThemeToggle.tsx        # Dark mode toggle
│   │   │   └── ...
│   │   └── ui/                # UI components (Button, Card, Input, etc.)
│   ├── pages/                 # Page components
│   │   ├── auth/              # Login, Register
│   │   ├── dashboard/         # Dashboard page
│   │   ├── members/           # Members management
│   │   ├── contributions/     # Contributions tracking
│   │   ├── benefits/          # Benefit claims
│   │   ├── reports/           # Reports & export
│   │   └── settings/          # User settings
│   ├── services/              # API services
│   │   ├── api.ts            # Axios instance & interceptors
│   │   ├── authService.ts    # Authentication API
│   │   ├── memberService.ts  # Member API
│   │   └── ...               # Other service files
│   ├── store/                # Zustand stores
│   │   ├── authStore.ts      # Authentication state
│   │   ├── themeStore.ts     # Theme state
│   │   └── notificationStore.ts  # Notifications state
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts          # All type definitions
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
├── docker/                    # Docker configuration
├── .dockerignore
├── .env.example              # Environment variables template
├── Dockerfile                # Multi-stage Docker build
├── docker-compose.yml        # Full stack setup
├── docker-compose.dev.yml    # Development setup
├── nginx.conf                # Nginx configuration
├── tailwind.config.js        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
├── vercel.json               # Vercel deployment config
├── DEPLOYMENT.md             # Deployment guide
└── DOCKER.md                 # Docker documentation
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. **Login**: User credentials are sent to `/auth/login`
2. **Token Storage**: JWT token is stored in `localStorage`
3. **Auto-attach**: Axios interceptor automatically adds `Authorization: Bearer <token>` header
4. **Auto-logout**: 401 responses trigger automatic logout
5. **Protected Routes**: `ProtectedRoute` component guards authenticated pages

### Default Login Credentials

```
Email: admin@pension.com
Password: password123
```

## 🎨 Theming & Design

### Dark Mode

The application supports dark mode with persistent storage:

```typescript
// Toggle theme
const { isDarkMode, toggleTheme } = useThemeStore();

toggleTheme(); // Switches between light and dark
```

**Features:**
- Persistent theme storage (localStorage via Zustand)
- Smooth transitions between themes
- All components fully support dark mode
- System preference detection

### Custom FinTech Color Palette

Tailwind configuration includes a custom color system optimized for financial applications:

- **Primary**: Blue (`#0ea5e9`, `#0284c7`)
- **Success**: Green (`#22c55e`)
- **Warning**: Orange (`#f59e0b`)
- **Danger**: Red (`#ef4444`)

## 🔔 Notifications System

Real-time notification panel with:
- Unread count badge on bell icon
- Dropdown menu with notification list
- Click to navigate to related pages
- Mark individual or all as read
- Delete notifications
- Relative timestamps (e.g., "10 minutes ago")
- Support for different types: info, success, warning, error

## ⚙️ Settings Page

Comprehensive user settings with 4 tabbed sections:

1. **Profile Tab**: Update personal details (name, email, phone)
2. **Security Tab**: Change password, enable 2FA
3. **Notifications Tab**: Configure notification preferences
4. **Preferences Tab**: Theme, language, timezone, currency

## 📊 API Integration

### Axios Configuration

```typescript
// src/services/api.ts
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor - Add JWT token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Expected Backend Endpoints

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /members` - List members
- `POST /members` - Create member
- `GET /members/{id}` - Get member details
- `PUT /members/{id}` - Update member
- `DELETE /members/{id}` - Delete member
- `GET /contributions` - List contributions
- `POST /contributions` - Create contribution
- `GET /benefits` - List benefit claims
- `POST /benefits` - Create benefit claim
- `PUT /benefits/{id}/approve` - Approve claim
- `PUT /benefits/{id}/reject` - Reject claim
- `POST /reports/generate` - Generate report
- `GET /reports/{id}/download` - Download report

### CORS Configuration

Backend should enable CORS for the frontend:

```java
// Spring Boot example
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:5173")
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .allowedHeaders("*")
                    .allowCredentials(true);
            }
        };
    }
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard:
   - `VITE_API_URL` - Production API URL

### Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy `dist/` folder to Netlify

3. Configure environment variables in Netlify dashboard

### Docker Production

```bash
# Build production image
docker build -t pension-frontend:latest .

# Run container
docker run -p 80:80 pension-frontend:latest
```

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- **Timiochukwu** - [GitHub](https://github.com/Timiochukwu)

## 🙏 Acknowledgments

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Headless UI](https://headlessui.com/)
- [TanStack Query](https://tanstack.com/query)
- [Recharts](https://recharts.org/)
- [Zustand](https://zustand-demo.pmnd.rs/)

## 📞 Support

For issues and questions, please open an issue on the [GitHub repository](https://github.com/Timiochukwu/pension_management_frontend/issues).

---

**Built with ❤️ using React + TypeScript + Tailwind CSS**
