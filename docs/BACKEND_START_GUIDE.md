# 🔧 Backend Server Start Guide

## The Error You're Seeing

```
Cannot connect to server at http://localhost:5000/api. 
Please make sure the backend is running on http://localhost:5000
```

**This means the backend server is NOT running!**

---

## ✅ Solution: Start the Backend Server

### Step 1: Open a New Terminal

**Important**: You need a separate terminal for the backend!

### Step 2: Navigate to Server Directory

```bash
cd server
```

### Step 3: Start the Server

```bash
npm run dev
```

---

## 📋 What You Should See

When the server starts successfully, you'll see:

```
✅ Connected to MongoDB Atlas
📦 Database: glabank
🚀 Server running on http://localhost:5000
📊 API Health: http://localhost:5000/api/health
🌐 Frontend URL: http://localhost:5173
```

---

## ⚠️ Common Issues

### Issue 1: "npm run dev" not found

**Solution:**
```bash
cd server
npm install
npm run dev
```

### Issue 2: Port 5000 already in use

**Solution:**
```bash
# Find what's using port 5000
netstat -ano | findstr :5000

# Kill the process (replace <PID> with actual number)
taskkill /PID <PID> /F

# Then try again
npm run dev
```

### Issue 3: MongoDB connection error

**Solution:**
1. Check `server/.env` file exists
2. Verify `MONGODB_URI` is correct
3. Check MongoDB Atlas is accessible

### Issue 4: Dependencies not installed

**Solution:**
```bash
cd server
npm install
npm run dev
```

---

## 🎯 Quick Test

After starting the backend, test it:

1. Open browser
2. Go to: http://localhost:5000/api/health
3. Should see: `{"status":"ok","message":"GLA Bank API is running"}`

If you see this, backend is working! ✅

---

## 📝 Important Notes

1. **Keep the terminal open** - Don't close it while using the app
2. **Two terminals needed** - One for backend, one for frontend
3. **Backend must start first** - Start backend before frontend
4. **Check for errors** - Look at terminal output for any errors

---

## 🚀 Complete Setup

### Terminal 1 (Backend):
```bash
cd server
npm run dev
```

### Terminal 2 (Frontend):
```bash
npm run dev
```

### Then:
- Go to http://localhost:5173
- Try registration
- Should work now! ✅

---

## 💡 Still Not Working?

1. **Check backend terminal** - Look for error messages
2. **Check MongoDB connection** - Should see "✅ Connected to MongoDB Atlas"
3. **Check port 5000** - Make sure nothing else is using it
4. **Restart both servers** - Sometimes helps

The backend MUST be running for registration to work! 🎯

