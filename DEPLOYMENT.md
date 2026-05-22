# Deployment Guide

This guide explains how to deploy the Blog Platform to various hosting services.

## Table of Contents
1. [Frontend Deployment (GitHub Pages)](#frontend-deployment-github-pages)
2. [Backend Deployment (Heroku)](#backend-deployment-heroku)
3. [Database Setup](#database-setup)
4. [Environment Configuration](#environment-configuration)

## Frontend Deployment (GitHub Pages)

### Automatic Deployment with GitHub Actions

The repository includes a GitHub Actions workflow that automatically builds and deploys the frontend to GitHub Pages whenever you push to the `main` or `master` branch.

**Steps:**

1. Enable GitHub Pages in your repository settings:
   - Go to Settings → Pages
   - Set the source to "Deploy from a branch"
   - Select the `gh-pages` branch (it will be created automatically on first deploy)

2. (Optional) Configure a custom domain:
   - In Settings → Pages, add your custom domain
   - Update the `cname` field in `.github/workflows/deploy.yml`

3. Update the API URL in `.github/workflows/deploy.yml`:
   - Set `VITE_API_URL` to your backend URL

4. Push changes to trigger automatic deployment:
   ```bash
   git add .
   git commit -m "Update deployment config"
   git push origin main
   ```

### Manual Deployment

To manually build and deploy:

```bash
cd frontend
npm install
npm run build
```

Then upload the contents of the `dist` folder to your hosting service.

## Backend Deployment (Heroku)

### Prerequisites
- Heroku CLI installed
- Heroku account

### Steps

1. **Create a Heroku app:**
   ```bash
   heroku create your-app-name
   ```

2. **Set environment variables:**
   ```bash
   heroku config:set JWT_SECRET=your-secret-key
   heroku config:set NODE_ENV=production
   ```

3. **Create a PostgreSQL database (optional):**
   ```bash
   heroku addons:create heroku-postgresql:hobby-dev
   ```

4. **Deploy using Git:**
   ```bash
   git push heroku main
   ```

5. **View logs:**
   ```bash
   heroku logs --tail
   ```

### Using Railway.app

Alternative to Heroku:

1. Connect your GitHub repository
2. Set environment variables in the dashboard
3. Railway will automatically deploy on git push

### Using Render.com

1. Connect your GitHub repository
2. Create a new Web Service
3. Set build command: `cd backend && npm install`
4. Set start command: `npm start`
5. Add environment variables
6. Deploy

## Database Setup

### Local Development
The SQLite database is automatically created in `backend/blog.db` when the server starts.

### Production Databases

#### Option 1: PostgreSQL (Recommended for Production)

1. **Create a PostgreSQL database** on:
   - Heroku Postgres
   - Railway.app
   - Render.com
   - AWS RDS
   - DigitalOcean

2. **Update backend code to use PostgreSQL:**
   - Install `pg` package: `npm install pg`
   - Modify `db.js` to use PostgreSQL instead of SQLite

3. **Example PostgreSQL connection (db.js):**
   ```javascript
   const { Pool } = require('pg');
   
   const pool = new Pool({
     connectionString: process.env.DATABASE_URL,
   });
   
   module.exports = pool;
   ```

#### Option 2: MongoDB

1. **Create a MongoDB Atlas account** (free tier available)
2. **Get connection string**
3. **Install mongoose:** `npm install mongoose`
4. **Update database connection code**

#### Option 3: SQLite with Cloud Storage

For small deployments, keep SQLite and use cloud storage:
- Store `blog.db` in a cloud bucket (AWS S3, etc.)
- Back up regularly

## Environment Configuration

### Frontend

For production, update the API base URL in `frontend/src/services/api.js`:

```javascript
const API_URL = process.env.VITE_API_URL || 'http://localhost:5000/api';
```

Build with environment variable:
```bash
VITE_API_URL=https://your-backend-url/api npm run build
```

### Backend

Create a `.env` file in the backend directory:

```env
PORT=5000
JWT_SECRET=your-long-random-secret-key-here
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host/database
```

For security:
- Use strong JWT_SECRET (at least 32 characters)
- Keep `.env` out of version control
- Rotate secrets regularly
- Use HTTPS in production

## Domain Setup

### Frontend Domain
If using GitHub Pages:
- `https://username.github.io/Blog-Platform-with-Comments`
- Or custom domain by adding CNAME record

### Backend Domain
For your backend service:
- `https://blog-api.example.com`
- Update frontend API URL to match

## SSL/HTTPS

All hosting platforms mentioned above provide SSL certificates automatically:
- GitHub Pages: ✓ Automatic HTTPS
- Heroku: ✓ Automatic HTTPS
- Railway: ✓ Automatic HTTPS
- Render: ✓ Automatic HTTPS

## Monitoring and Logging

### Backend Logs
- **Heroku:** `heroku logs --tail`
- **Railway:** Check logs in dashboard
- **Render:** Check logs in dashboard

### Error Tracking (Optional)
Add services like:
- Sentry
- Rollbar
- LogRocket

## Performance Optimization

### Frontend
```bash
# Production build is already optimized
npm run build
# Check bundle size
npm install -g serve
serve dist
```

### Backend
- Enable compression middleware
- Use connection pooling for databases
- Cache frequently accessed data
- Monitor response times

## Backup and Recovery

### Database Backups
- Set up automated daily backups
- Store backups in multiple locations
- Test recovery procedure regularly

### Code Repository
- Keep git history clean
- Tag releases: `git tag -a v1.0.0 -m "Version 1.0.0"`
- Maintain changelog

## Troubleshooting

### Common Issues

**Frontend not loading:**
- Check if API_URL is correctly set
- Verify CORS is enabled on backend
- Check browser console for errors

**Backend connection error:**
- Verify backend is running
- Check environment variables
- Check database connection string
- Look at server logs

**Database connection error:**
- Verify database is running
- Check credentials
- Verify firewall rules allow connection
- Check connection string format

## Support

For issues:
1. Check error logs
2. Review GitHub Issues
3. Create a new issue with logs and steps to reproduce

---

Last updated: 2024
