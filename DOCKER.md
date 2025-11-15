# Docker Setup Guide

Complete Docker and Docker Compose setup for the Pension Management System.

## 🐳 Quick Start

### Prerequisites
- Docker installed ([Get Docker](https://docs.docker.com/get-docker/))
- Docker Compose installed (included with Docker Desktop)

### Option 1: Frontend Development Only

```bash
# Start frontend development server
docker-compose -f docker-compose.dev.yml up

# Access the application
# Frontend: http://localhost:5173
```

### Option 2: Full Stack Development

```bash
# Start all services (frontend, backend, database, cache)
docker-compose up -d

# View logs
docker-compose logs -f frontend

# Access the services
# Frontend: http://localhost:5173
# Backend API: http://localhost:8080
# Database Admin: http://localhost:8081
# Redis Commander: http://localhost:8082
```

### Option 3: Production Build

```bash
# Build production image
docker build -t pension-frontend:latest .

# Run production container
docker run -d -p 80:80 pension-frontend:latest

# Access the application
# http://localhost
```

## 📦 Available Services

| Service | Port | Description |
|---------|------|-------------|
| Frontend | 5173 | React development server |
| Backend | 8080 | Spring Boot API |
| MySQL | 3306 | Database |
| Redis | 6379 | Cache |
| phpMyAdmin | 8081 | Database admin UI |
| Redis Commander | 8082 | Redis admin UI |

## 🛠️ Common Commands

### Start Services
```bash
# Start all services
docker-compose up

# Start in detached mode
docker-compose up -d

# Start specific service
docker-compose up frontend

# Frontend only (dev mode)
docker-compose -f docker-compose.dev.yml up
```

### Stop Services
```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Stop specific service
docker-compose stop frontend
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f frontend

# Last 100 lines
docker-compose logs --tail=100 frontend
```

### Rebuild Services
```bash
# Rebuild all services
docker-compose up --build

# Rebuild specific service
docker-compose up --build frontend

# Force rebuild
docker-compose build --no-cache frontend
```

### Execute Commands
```bash
# Open shell in container
docker-compose exec frontend sh

# Run npm commands
docker-compose exec frontend npm install lucide-react
docker-compose exec frontend npm run build

# Database commands
docker-compose exec database mysql -u pension_user -p pension_db
```

### Clean Up
```bash
# Remove stopped containers
docker-compose rm

# Remove all containers, networks, volumes
docker-compose down -v

# Clean up Docker system
docker system prune -a
```

## 🔧 Configuration

### Environment Variables

Create `.env` file in project root:

```env
# Frontend
VITE_API_URL=http://localhost:8080/api
NODE_ENV=development

# Database
MYSQL_ROOT_PASSWORD=root_password
MYSQL_DATABASE=pension_db
MYSQL_USER=pension_user
MYSQL_PASSWORD=pension_password

# Redis
REDIS_HOST=cache
REDIS_PORT=6379
```

### Custom Ports

Edit `docker-compose.yml` to change ports:

```yaml
services:
  frontend:
    ports:
      - "3000:5173"  # Change 3000 to your preferred port
```

## 📊 Health Checks

Check service health:

```bash
# All services
docker-compose ps

# Specific service health
docker inspect --format='{{.State.Health.Status}}' pension-database

# Frontend health check
curl http://localhost/health
```

## 🚀 Production Deployment

### Build Production Image

```bash
# Build
docker build -t pension-frontend:1.0.0 -t pension-frontend:latest .

# Test locally
docker run -p 80:80 pension-frontend:latest

# Tag for registry
docker tag pension-frontend:latest your-registry.com/pension-frontend:1.0.0

# Push to registry
docker push your-registry.com/pension-frontend:1.0.0
```

### Deploy with Docker Compose

```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  frontend:
    image: your-registry.com/pension-frontend:1.0.0
    ports:
      - "80:80"
    restart: always
    environment:
      - VITE_API_URL=https://api.yourproduction.com/api
```

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -i :5173

# Or kill all node processes
killall node

# Change port in docker-compose.yml
```

### Container Won't Start
```bash
# Check logs
docker-compose logs frontend

# Remove and recreate
docker-compose down
docker-compose up --force-recreate
```

### Database Connection Issues
```bash
# Check database is running
docker-compose ps database

# Check database logs
docker-compose logs database

# Reset database
docker-compose down -v
docker-compose up database
```

### Hot Reload Not Working
```bash
# Ensure volumes are mounted correctly
# Add to docker-compose.yml:
volumes:
  - .:/app
  - /app/node_modules

# Restart with --build
docker-compose up --build
```

### Permission Issues
```bash
# Fix ownership
sudo chown -R $USER:$USER .

# Or run as root (not recommended for production)
docker-compose exec -u root frontend sh
```

## 📈 Performance Optimization

### Multi-stage Builds
Already implemented in Dockerfile with 3 stages:
1. Development - Full node_modules for dev
2. Build - Compile production assets
3. Production - Minimal nginx image

### Volume Caching
```yaml
services:
  frontend:
    volumes:
      - .:/app
      - /app/node_modules  # Don't overwrite node_modules
      - /app/.next         # Cache build outputs
```

### Resource Limits
```yaml
services:
  frontend:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
```

## 🔒 Security Best Practices

1. **Don't expose unnecessary ports**
2. **Use non-root user in containers**
3. **Keep images updated**
4. **Scan for vulnerabilities:**
   ```bash
   docker scan pension-frontend:latest
   ```
5. **Use secrets for sensitive data**
6. **Enable HTTPS in production**

## 🎯 Development Workflow

```bash
# 1. Start services
docker-compose up -d

# 2. View logs
docker-compose logs -f frontend

# 3. Make code changes (hot reload works automatically)

# 4. Install new package
docker-compose exec frontend npm install package-name

# 5. Rebuild if needed
docker-compose up --build frontend

# 6. Stop when done
docker-compose down
```

## 📝 Notes

- **Hot reload works** in development mode
- **node_modules** are in container (not on host)
- **Database data** persists in named volumes
- **Logs** available via `docker-compose logs`
- **Health checks** ensure services are running

## 🎉 Success!

Your development environment is now running in Docker containers!

**Next Steps:**
- Access frontend at http://localhost:5173
- Check API health at http://localhost:8080/actuator/health
- View database at http://localhost:8081
- Monitor Redis at http://localhost:8082
