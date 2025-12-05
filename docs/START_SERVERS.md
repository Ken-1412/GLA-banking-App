# 🚀 Start Both Servers - Quick Guide

## ⚠️ You Need TWO Terminal Windows

### Terminal 1: Backend Server

```bash
# Navigate to server directory
cd server

# Start backend (if not already started)
npm run dev
```

**Look for:**
```
✅ Connected to MongoDB Atlas
🚀 Server running on http://localhost:5000
```

**Keep this terminal open!**

---

### Terminal 2: Frontend Server

```bash
# Navigate to project root (if not already there)
cd ..

# Start frontend
npm run dev
```

**Look for:**
```
➜  Local:   http://localhost:5173/
```

**Keep this terminal open!**

---

## ✅ Verify Both Are Running

### Backend Check
Open browser: http://localhost:5000/api/health
Should show: `{"status":"ok","message":"GLA Bank API is running"}`

### Frontend Check
Open browser: http://localhost:5173
Should show: Login/Register page

---

## 🔧 If Backend Won't Start

### Check 1: Dependencies
```bash
cd server
npm install
```

### Check 2: Environment File
```bash
# Make sure server/.env exists
# Should have MONGODB_URI, JWT_SECRET, etc.
```

### Check 3: Port 5000 Available
```bash
# Windows
netstat -ano | findstr :5000

# If something is using it, kill it:
taskkill /PID <process_id> /F
```

### Check 4: MongoDB Connection
- Verify `MONGODB_URI` in `server/.env` is correct
- Check MongoDB Atlas is accessible

---

## 📝 Quick Commands

### Start Backend
```bash
cd server
npm run dev
```

### Start Frontend
```bash
npm run dev
```

### Stop Servers
Press `Ctrl+C` in each terminal

---

## 🎯 After Starting

1. ✅ Backend running on http://localhost:5000
2. ✅ Frontend running on http://localhost:5173
3. ✅ Go to http://localhost:5173/register
4. ✅ Registration should work now!

---

## 💡 Pro Tip

Use two terminal windows/tabs:
- **Terminal 1**: Backend (cd server && npm run dev)
- **Terminal 2**: Frontend (npm run dev)

Both must be running at the same time!

