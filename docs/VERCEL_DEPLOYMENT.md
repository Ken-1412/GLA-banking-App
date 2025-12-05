# 🚀 Vercel Deployment Guide

## Quick Deploy to Vercel

### Step 1: Prepare Your Project

1. **Create `vercel.json`** (✅ Already created)
   - This file handles React Router routing
   - All routes are rewritten to `index.html`

2. **Environment Variables**
   - Set `VITE_API_URL` in Vercel dashboard
   - Example: `https://your-backend.railway.app/api`

### Step 2: Deploy Frontend

1. **Go to [vercel.com](https://vercel.com)**
2. **Click "New Project"**
3. **Import from GitHub**
   - Select: `Ken-1412/GLA-banking-App`
4. **Configure Project:**
   - **Framework Preset**: Vite
   - **Root Directory**: `.` (root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Environment Variables:**
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```

6. **Click "Deploy"**

### Step 3: Deploy Backend (Separate)

The backend needs to be deployed separately. Recommended platforms:

#### Option 1: Railway (Recommended)
1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select your repository
4. Set root directory: `server`
5. Add environment variables:
   ```
   MONGODB_URI=your-mongodb-atlas-uri
   JWT_SECRET=your-strong-secret
   NODE_ENV=production
   FRONTEND_URL=https://your-vercel-app.vercel.app
   ```
6. Deploy!

#### Option 2: Render
1. Go to [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub repo
4. Root Directory: `server`
5. Build: `npm install && npm run build`
6. Start: `npm start`
7. Add environment variables (same as Railway)

### Step 4: Update Environment Variables

After backend is deployed:

1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Update `VITE_API_URL`:
   ```
   VITE_API_URL=https://your-backend.railway.app/api
   ```
5. Redeploy

## Vercel Configuration

### vercel.json
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install"
}
```

This configuration:
- ✅ Rewrites all routes to `index.html` (for React Router)
- ✅ Sets build command
- ✅ Sets output directory
- ✅ Configures Vite framework

## Important Notes

### Frontend (Vercel)
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Automatic deployments on git push
- ✅ Preview deployments for PRs
- ✅ Free tier available

### Backend Requirements
- ⚠️ Must be deployed separately
- ⚠️ Must have CORS configured for Vercel domain
- ⚠️ Must whitelist Vercel IPs in MongoDB Atlas (if needed)

### CORS Configuration

Make sure your backend (`server/src/index.ts`) has CORS configured:

```typescript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
```

Set `FRONTEND_URL` to your Vercel URL in backend environment variables.

## Testing After Deployment

1. **Test Frontend:**
   - Visit your Vercel URL
   - Try navigating to different routes
   - Test login/register

2. **Test Backend Connection:**
   - Check browser console for API errors
   - Verify API calls are going to correct backend URL

3. **Test Features:**
   - Login/Register
   - Create account
   - Make transaction
   - Check rewards system

## Troubleshooting

### Routes Not Working
- ✅ `vercel.json` is created (check it exists)
- ✅ Build output is `dist` folder
- ✅ React Router is configured correctly

### API Connection Issues
- Check `VITE_API_URL` environment variable
- Verify backend is running
- Check CORS settings in backend
- Check browser console for errors

### Build Failures
- Check build logs in Vercel dashboard
- Verify all dependencies are in `package.json`
- Check for TypeScript errors

## Deployment Checklist

- [x] `vercel.json` created
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed (Railway/Render)
- [ ] Environment variables set
- [ ] CORS configured in backend
- [ ] MongoDB Atlas IP whitelist updated
- [ ] Test all routes
- [ ] Test API connections
- [ ] Test authentication
- [ ] Test all features

## Quick Commands

### Local Build Test
```bash
npm run build
# Check if dist/ folder is created
```

### Check vercel.json
```bash
cat vercel.json
```

## Support

- Vercel Docs: https://vercel.com/docs
- Vite Deployment: https://vitejs.dev/guide/static-deploy.html#vercel

---

**Your app is ready for Vercel deployment!** 🚀

