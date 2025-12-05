# 🔧 Troubleshooting Registration Error

## Error: "Registration failed. Please check your connection and try again."

### Common Causes & Solutions

#### 1. Backend Server Not Running ⚠️

**Check:**
```bash
# Check if backend is running
cd server
npm run dev
```

**Solution:**
- Make sure backend is running on `http://localhost:5000`
- Check terminal for errors
- Verify MongoDB connection

#### 2. MongoDB Not Connected ⚠️

**Check:**
- Look for "✅ Connected to MongoDB Atlas" in backend terminal
- Check `server/.env` file has correct `MONGODB_URI`

**Solution:**
```bash
# Verify MongoDB connection string in server/.env
MONGODB_URI=mongodb+srv://your-connection-string
```

#### 3. CORS Error ⚠️

**Check:**
- Open browser console (F12)
- Look for CORS errors

**Solution:**
- Verify `FRONTEND_URL` in `server/.env` is `http://localhost:5173`
- Restart backend server after changing .env

#### 4. Port Conflict ⚠️

**Check:**
- Backend should be on port 5000
- Frontend should be on port 5173

**Solution:**
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill process if needed (Windows)
taskkill /PID <process_id> /F
```

#### 5. API URL Mismatch ⚠️

**Check:**
- Frontend API URL should be `http://localhost:5000/api`
- Check browser Network tab for failed requests

**Solution:**
- Create `.env` file in root:
  ```
  VITE_API_URL=http://localhost:5000/api
  ```
- Restart frontend dev server

### Step-by-Step Debugging

#### Step 1: Check Backend
```bash
cd server
npm run dev
```

**Expected output:**
```
✅ Connected to MongoDB Atlas
📦 Database: glabank
🚀 Server running on http://localhost:5000
```

#### Step 2: Test Backend API
Open browser and go to:
```
http://localhost:5000/api/health
```

**Expected response:**
```json
{
  "status": "ok",
  "message": "GLA Bank API is running"
}
```

#### Step 3: Check Frontend
```bash
npm run dev
```

**Expected output:**
```
VITE v6.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

#### Step 4: Test Registration
1. Open browser console (F12)
2. Go to Network tab
3. Try to register
4. Check the request to `/api/auth/register`
5. See the error response

### Common Error Messages

#### "Cannot connect to server"
- **Cause**: Backend not running
- **Fix**: Start backend with `cd server && npm run dev`

#### "User already exists"
- **Cause**: Email already registered
- **Fix**: Use different email or login instead

#### "Password must be at least 6 characters"
- **Cause**: Password too short
- **Fix**: Use stronger password (8+ chars, uppercase, lowercase, numbers)

#### "MongoDB connection error"
- **Cause**: MongoDB Atlas connection failed
- **Fix**: Check connection string, IP whitelist, network

#### "CORS policy"
- **Cause**: CORS not configured correctly
- **Fix**: Check `FRONTEND_URL` in backend `.env`

### Quick Fix Checklist

- [ ] Backend server running on port 5000
- [ ] MongoDB Atlas connected
- [ ] Frontend running on port 5173
- [ ] `server/.env` file exists with correct values
- [ ] CORS configured in backend
- [ ] No port conflicts
- [ ] Browser console shows no errors
- [ ] Network tab shows API requests

### Test Registration Manually

```bash
# Test with curl (if available)
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!","name":"Test User"}'
```

**Expected response:**
```json
{
  "message": "User created successfully",
  "token": "...",
  "user": {
    "id": "...",
    "email": "test@example.com",
    "name": "Test User",
    "role": "user"
  }
}
```

### Still Not Working?

1. **Check browser console** for detailed errors
2. **Check backend terminal** for server errors
3. **Check Network tab** in browser DevTools
4. **Verify environment variables** are set correctly
5. **Restart both servers** (backend and frontend)

### Updated Error Messages

The registration form now shows:
- ✅ Actual error messages from backend
- ✅ Connection errors with helpful tips
- ✅ User-friendly messages for common issues

Check the error message shown in the form for specific guidance!

