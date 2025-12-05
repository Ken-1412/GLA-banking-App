# 🚀 Deploy Backend to Vercel

## Overview

Vercel can host Express.js backends as serverless functions. This guide shows you how to deploy your backend to Vercel.

## ⚠️ Important Considerations

### Vercel vs Other Platforms

**Vercel Pros:**
- ✅ Easy deployment
- ✅ Automatic HTTPS
- ✅ Free tier available
- ✅ Git integration

**Vercel Cons:**
- ⚠️ Serverless functions (cold starts possible)
- ⚠️ 10-second timeout on free tier
- ⚠️ Not ideal for long-running processes
- ⚠️ May need MongoDB Atlas IP whitelist: `0.0.0.0/0`

**Alternative Platforms (Better for Backend):**
- **Railway** ⭐ (Recommended for backend)
- **Render**
- **Heroku**
- **DigitalOcean App Platform**

## 📋 Setup for Vercel

### 1. Files Created

- ✅ `server/vercel.json` - Vercel configuration
- ✅ `server/api/index.ts` - Serverless function entry point

### 2. Configuration

The `vercel.json` file configures:
- Build settings for Node.js
- Routes to serverless function
- Environment variables

## 🚀 Deployment Steps

### Step 1: Prepare Repository

Make sure all files are committed:
```bash
git add .
git commit -m "Add Vercel backend configuration"
git push origin master
```

### Step 2: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)**
2. **Click "New Project"**
3. **Import from GitHub**
   - Select: `Ken-1412/GLA-banking-App`
4. **Configure Project:**
   - **Root Directory**: `server` ⚠️ Important!
   - **Framework Preset**: Other (or leave blank)
   - **Build Command**: `npm run build` (optional, Vercel auto-detects)
   - **Output Directory**: Leave blank
   - **Install Command**: `npm install`

5. **Environment Variables:**
   Add these in Vercel dashboard:
   ```
   MONGODB_URI=mongodb+srv://ketansingh00001412_db_user:ikGUWyNAyVKnqRze@cluster0.d9uhq9b.mongodb.net/glabank?retryWrites=true&w=majority
   JWT_SECRET=your-strong-secret-key-here
   JWT_EXPIRES_IN=7d
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend.vercel.app
   VERCEL=1
   ```

6. **Click "Deploy"**

### Step 3: Update MongoDB Atlas

1. Go to MongoDB Atlas Dashboard
2. **Network Access** → **Add IP Address**
3. Add: `0.0.0.0/0` (Allow from anywhere)
   - ⚠️ This is needed for Vercel's dynamic IPs
   - ⚠️ Only do this if you're okay with allowing all IPs

### Step 4: Update Frontend

After backend is deployed, update frontend `VITE_API_URL`:
```
VITE_API_URL=https://your-backend.vercel.app/api
```

## 📝 Vercel Configuration Files

### `server/vercel.json`
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "api/index.ts"
    }
  ]
}
```

### `server/api/index.ts`
This is the serverless function entry point that exports your Express app.

## ⚙️ Environment Variables in Vercel

Go to: **Project Settings** → **Environment Variables**

Add:
- `MONGODB_URI` - Your MongoDB Atlas connection string
- `JWT_SECRET` - Strong random string
- `JWT_EXPIRES_IN` - Token expiration (e.g., `7d`)
- `FRONTEND_URL` - Your frontend URL
- `NODE_ENV` - `production`
- `VERCEL` - `1` (tells app it's running on Vercel)

## 🔍 Testing After Deployment

1. **Check Health Endpoint:**
   ```
   https://your-backend.vercel.app/api/health
   ```
   Should return: `{"status":"ok","message":"GLA Bank API is running"}`

2. **Test API:**
   ```bash
   curl https://your-backend.vercel.app/api/health
   ```

3. **Check Logs:**
   - Go to Vercel Dashboard
   - Click on your project
   - Go to "Logs" tab
   - Check for errors

## ⚠️ Limitations & Considerations

### Cold Starts
- First request after inactivity may be slow (1-3 seconds)
- Subsequent requests are fast
- Consider using Railway/Render for better performance

### Timeout
- Free tier: 10 seconds max
- Pro tier: 60 seconds max
- Long operations may timeout

### Database Connections
- MongoDB Atlas must allow `0.0.0.0/0` for Vercel
- Or use MongoDB Atlas connection string with proper IP whitelist

## 🎯 Recommended Setup

### Option 1: Vercel for Both (Simple)
- **Frontend**: Vercel ✅
- **Backend**: Vercel ⚠️ (works but has limitations)

### Option 2: Hybrid (Recommended)
- **Frontend**: Vercel ✅
- **Backend**: Railway ⭐ (better for backend)

### Option 3: All-in-One
- **Frontend**: Vercel
- **Backend**: Render (free tier available)

## 📚 Alternative: Railway (Recommended for Backend)

Railway is better suited for Express backends:

1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select repository
4. Set root directory: `server`
5. Add environment variables
6. Deploy!

**Advantages:**
- ✅ No cold starts
- ✅ Better for long-running processes
- ✅ Easier MongoDB Atlas integration
- ✅ More predictable performance

## 🔧 Troubleshooting

### Build Fails
- Check `server/package.json` has correct scripts
- Verify TypeScript compilation works
- Check Vercel build logs

### Function Timeout
- Reduce operation time
- Use background jobs for long operations
- Consider Railway instead

### MongoDB Connection Issues
- Add `0.0.0.0/0` to MongoDB Atlas IP whitelist
- Verify connection string is correct
- Check environment variables in Vercel

### CORS Errors
- Update `FRONTEND_URL` in Vercel environment variables
- Restart deployment after changing env vars

## ✅ Deployment Checklist

- [ ] `server/vercel.json` created
- [ ] `server/api/index.ts` created
- [ ] Code committed to GitHub
- [ ] Vercel project created
- [ ] Root directory set to `server`
- [ ] Environment variables added
- [ ] MongoDB Atlas IP whitelist updated
- [ ] Deployed successfully
- [ ] Health endpoint tested
- [ ] Frontend `VITE_API_URL` updated

## 🎉 After Deployment

Your backend will be available at:
```
https://your-project.vercel.app
```

API endpoints:
```
https://your-project.vercel.app/api/auth/register
https://your-project.vercel.app/api/auth/login
https://your-project.vercel.app/api/accounts
... etc
```

---

**Note**: While Vercel works for backends, Railway or Render are often better choices for Express.js applications due to better performance and fewer limitations.

