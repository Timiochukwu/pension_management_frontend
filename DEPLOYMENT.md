# Deployment Guide

Complete guide for deploying the Pension Management System frontend to various platforms.

## 🚀 Quick Deploy to Vercel

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy:**
```bash
cd /home/user/pension_management_frontend
vercel
```

4. **Set Environment Variables:**
```bash
vercel env add VITE_API_URL production
# Enter your production API URL when prompted
```

5. **Deploy to Production:**
```bash
vercel --prod
```

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite configuration
6. Add environment variables:
   - `VITE_API_URL`: Your production API URL
7. Click "Deploy"

## 📦 Environment Variables

Set these in your deployment platform:

```env
# Required
VITE_API_URL=https://your-api.com/api

# Optional
VITE_APP_NAME=Pension Management System
VITE_APP_VERSION=1.0.0
```

## 🌐 Deploy to Netlify

1. **Install Netlify CLI:**
```bash
npm i -g netlify-cli
```

2. **Build the project:**
```bash
npm run build
```

3. **Deploy:**
```bash
netlify deploy --prod --dir=dist
```

4. **Or via Netlify UI:**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Drag and drop the `dist` folder
   - Set environment variables in Site Settings

## ☁️ Deploy to AWS S3 + CloudFront

1. **Build:**
```bash
npm run build
```

2. **Create S3 Bucket:**
```bash
aws s3 mb s3://pension-frontend
aws s3 website s3://pension-frontend --index-document index.html
```

3. **Upload:**
```bash
aws s3 sync dist/ s3://pension-frontend
```

4. **Set up CloudFront** for HTTPS and caching

## 🐳 Deploy with Docker

1. **Create Dockerfile:**
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. **Create nginx.conf:**
```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

3. **Build and Run:**
```bash
docker build -t pension-frontend .
docker run -p 80:80 pension-frontend
```

## ✅ Pre-Deployment Checklist

- [ ] Update `.env` with production API URL
- [ ] Test production build locally: `npm run build && npm run preview`
- [ ] Verify all API endpoints work
- [ ] Check CORS configuration on backend
- [ ] Enable HTTPS on production
- [ ] Set up custom domain (optional)
- [ ] Configure analytics (optional)
- [ ] Set up error tracking (Sentry, etc.)

## 🔧 Post-Deployment

### 1. Configure Backend CORS

Your Spring Boot backend must allow requests from your frontend domain:

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins(
                "https://your-frontend.vercel.app",
                "https://your-custom-domain.com"
            )
            .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")
            .allowedHeaders("*")
            .allowCredentials(true);
    }
}
```

### 2. Update Environment Variables

After deployment, update your `.env` variables in the deployment platform dashboard.

### 3. Test the Deployment

1. Visit your deployed URL
2. Test login functionality
3. Verify API calls work
4. Check dark mode toggle
5. Test all modules (Members, Contributions, Benefits, Reports)

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### API Calls Fail

- Check VITE_API_URL is set correctly
- Verify backend CORS configuration
- Check browser console for errors
- Ensure backend is accessible from your deployment

### Blank Page After Deployment

- Check browser console for errors
- Verify routing configuration (should redirect all routes to index.html)
- Check that `dist/index.html` exists

## 📊 Performance Optimization

1. **Enable Gzip Compression** (usually enabled by default on Vercel/Netlify)
2. **Set up CDN** for static assets
3. **Enable HTTP/2**
4. **Add Service Worker** for offline support (optional)

## 🔒 Security

1. **Enable HTTPS** (mandatory for production)
2. **Set security headers** (CSP, X-Frame-Options, etc.)
3. **Implement rate limiting** on backend
4. **Regular security audits**: `npm audit`

## 📈 Monitoring

### Set up Analytics

```typescript
// Add to src/main.tsx
import ReactGA from 'react-ga4';

ReactGA.initialize('YOUR-GA4-ID');
```

### Error Tracking (Sentry)

```bash
npm install --save @sentry/react
```

```typescript
// Add to src/main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR-SENTRY-DSN",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

## 🎉 Success!

Your Pension Management System frontend is now deployed and ready for production use!

**Live URL:** Check your deployment platform for the URL

**Next Steps:**
- Set up custom domain
- Configure monitoring
- Add analytics
- Implement CI/CD pipeline
