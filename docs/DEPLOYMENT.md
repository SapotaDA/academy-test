# Deployment Guide

## Pre-Deployment Checklist

- [ ] Run `npm install` to ensure all dependencies are installed
- [ ] Run `npm run lint` to check for TypeScript errors
- [ ] Run `npm run build` to create production build
- [ ] Test locally with `npm run start` (after building)
- [ ] Review and fix any vulnerabilities with `npm audit fix`
- [ ] Create `.env` file based on `.env.example`
- [ ] For production, create `.env.production` based on `.env.production.example`

## Build & Test Locally

```bash
# Install dependencies
npm install

# Check for TypeScript errors
npm run lint

# Build the project
npm run build

# Test production build
npm run start
```

The app will be available at `http://localhost:5000`

## Deployment Options

### Option 1: Deploy to Azure App Service
1. Create an Azure App Service (Node.js runtime)
2. Connect your Git repository
3. Set environment variables in Azure Portal
4. Push to main branch to trigger deployment

### Option 2: Deploy to Vercel
1. Connect your repository to Vercel
2. Set build command to `npm run build`
3. Set start command to `npm run start`
4. Add environment variables in Vercel dashboard

### Option 3: Deploy to Railway/Render
1. Connect your Git repository
2. Set start command to `npm run start`
3. Configure environment variables
4. Deploy

### Option 4: Self-Hosted (VPS)
1. Install Node.js on your server
2. Clone repository
3. Run `npm install && npm run build`
4. Use PM2 to manage the process:
   ```bash
   npm install -g pm2
   pm2 start dist/index.cjs --name "academy"
   pm2 save
   ```

## Environment Variables for Production

- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Set to `production`
- `CORS_ORIGIN`: Your production domain URL
- Database credentials (if applicable)
- API keys and secrets

## Post-Deployment

1. Monitor logs for errors
2. Test all API endpoints
3. Check performance metrics
4. Set up automated backups (if using database)
5. Configure monitoring/alerting

## Monitoring Commands

```bash
# Check application logs
pm2 logs

# Monitor performance
pm2 monit
```

## Rollback

If issues occur after deployment:
1. Roll back to previous version
2. Check logs for errors
3. Fix issues locally
4. Rebuild and redeploy
