# 🚀 Quick Deployment Guide

## Deploy in 5 Minutes

### Option 1: Railway (Recommended - Easiest)

#### Backend Deployment
1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Add environment variables:
   ```
   MONGODB_URI=mongodb+srv://ketansingh00001412_db_user:ikGUWyNAyVKnqRze@cluster0.d9uhq9b.mongodb.net/glabank?retryWrites=true&w=majority
   JWT_SECRET=<generate-strong-random-string>
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```
5. Set root directory to `server`
6. Set start command to `npm start`
7. Deploy!

#### Frontend Deployment
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project" → Import from GitHub
3. Select your repository
4. Add environment variable:
   ```
   VITE_API_URL=https://your-backend.railway.app/api
   ```
5. Set build command: `npm run build`
6. Set output directory: `dist`
7. Deploy!

---

### Option 2: Render

#### Backend
1. Go to [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub repo
4. Settings:
   - Root Directory: `server`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
5. Add environment variables (same as Railway)
6. Deploy!

#### Frontend
1. New → Static Site
2. Connect GitHub repo
3. Settings:
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
4. Add environment variable: `VITE_API_URL`
5. Deploy!

---

## Pre-Deployment Checklist

### Backend
- [ ] Generate strong JWT_SECRET
- [ ] Update FRONTEND_URL
- [ ] Test build: `cd server && npm run build`
- [ ] Verify .env variables

### Frontend
- [ ] Set VITE_API_URL
- [ ] Test build: `npm run build`
- [ ] Verify dist folder created

### Database
- [ ] Whitelist deployment server IPs in Atlas
- [ ] Test connection from deployment server
- [ ] Verify data integrity

---

## Post-Deployment

1. Test login/register
2. Test account creation
3. Test transactions
4. Test rewards system
5. Monitor logs for errors

---

## Troubleshooting

**Backend won't start:**
- Check environment variables
- Verify MongoDB connection
- Check build output

**Frontend can't connect:**
- Verify VITE_API_URL
- Check CORS settings
- Verify backend is running

**Database errors:**
- Check IP whitelist
- Verify connection string
- Check Atlas cluster status

---

## Support

See `DEPLOYMENT_CHECKLIST.md` for detailed information.

