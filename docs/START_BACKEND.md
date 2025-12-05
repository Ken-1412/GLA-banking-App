# 🚀 How to Start Backend Server

## Quick Start

### Step 1: Navigate to Server Directory
```bash
cd server
```

### Step 2: Check Environment File
Make sure `server/.env` exists with:
```env
MONGODB_URI=mongodb+srv://ketansingh00001412_db_user:ikGUWyNAyVKnqRze@cluster0.d9uhq9b.mongodb.net/glabank?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=glabank-super-secret-jwt-key-2024-change-in-production
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### Step 3: Install Dependencies (if not done)
```bash
npm install
```

### Step 4: Start Server
```bash
npm run dev
```

## Expected Output

You should see:
```
✅ Connected to MongoDB Atlas
📦 Database: glabank
🚀 Server running on http://localhost:5000
📊 API Health: http://localhost:5000/api/health
🌐 Frontend URL: http://localhost:5173
```

## Troubleshooting

### Port 5000 Already in Use
```bash
# Windows - Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### MongoDB Connection Error
- Check `MONGODB_URI` in `server/.env`
- Verify MongoDB Atlas cluster is running
- Check IP whitelist in MongoDB Atlas

### Dependencies Not Installed
```bash
cd server
npm install
```

## Test Backend

Open in browser:
```
http://localhost:5000/api/health
```

Should return:
```json
{
  "status": "ok",
  "message": "GLA Bank API is running"
}
```

## Keep Server Running

- Keep the terminal window open
- Don't close it while using the app
- Press `Ctrl+C` to stop the server

