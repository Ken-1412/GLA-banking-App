# ⚡ IMMEDIATE FIX - Start Backend Server

## 🚨 The Problem

You're seeing:
```
Cannot connect to server at http://localhost:5000/api
```

**This means your backend server is NOT running!**

---

## ✅ QUICK FIX (Do This Now!)

### Open a NEW Terminal Window

**Important**: You need a separate terminal for the backend!

### Run These Commands:

```bash
cd server
npm run dev
```

---

## 📋 What Should Happen

After running `npm run dev`, you should see:

```
✅ Connected to MongoDB Atlas
📦 Database: glabank
🚀 Server running on http://localhost:5000
📊 API Health: http://localhost:5000/api/health
🌐 Frontend URL: http://localhost:5173
```

**If you see this, the backend is running! ✅**

---

## 🎯 Then Test Registration

1. **Keep the backend terminal open** (don't close it!)
2. Go to http://localhost:5173/register
3. Try registering again
4. **It should work now!** ✅

---

## ⚠️ If You See Errors

### Error: "npm run dev" not found
```bash
cd server
npm install
npm run dev
```

### Error: Port 5000 already in use
```bash
# Find what's using port 5000
netstat -ano | findstr :5000

# Kill it (replace <PID> with the number you see)
taskkill /PID <PID> /F

# Then try again
npm run dev
```

### Error: MongoDB connection error
- Check `server/.env` file exists
- Verify MongoDB Atlas connection string is correct

---

## 💡 Remember

**You need TWO terminals running:**

1. **Terminal 1**: Backend (`cd server && npm run dev`)
2. **Terminal 2**: Frontend (`npm run dev`)

**Both must be running at the same time!**

---

## ✅ Quick Test

After starting backend, open browser:
```
http://localhost:5000/api/health
```

Should show:
```json
{"status":"ok","message":"GLA Bank API is running"}
```

If you see this, backend is working! 🎉

---

**Start the backend now and registration will work!** 🚀

