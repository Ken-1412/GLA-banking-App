# Complete MongoDB Integration Guide

## Quick Start

1. **Install MongoDB** (see `SETUP_MONGODB.md` for detailed instructions)
   - Local: Install MongoDB Community Edition
   - Cloud: Use MongoDB Atlas (free tier available)

2. **Set up Backend:**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   npm run seed  # Optional: Create test users
   npm run dev
   ```

3. **Update Frontend:**
   - The frontend will automatically connect to `http://localhost:5000/api`
   - Or set `VITE_API_URL` in your `.env` file

4. **Start Frontend:**
   ```bash
   npm run dev
   ```

## What's Changed

### Backend (New)
- ✅ Express.js server with TypeScript
- ✅ MongoDB with Mongoose ODM
- ✅ JWT authentication
- ✅ RESTful API endpoints
- ✅ Data models for all entities
- ✅ Admin routes
- ✅ Rewards system backend

### Frontend (Updated)
- ✅ API service layer (`src/lib/api.ts`)
- ✅ AuthContext now uses API
- ⏳ BankContext - needs API integration
- ⏳ RewardsContext - needs API integration

## API Endpoints

All endpoints are prefixed with `/api`

### Authentication
- `POST /auth/register` - Register
- `POST /auth/login` - Login
- `GET /auth/me` - Get current user

### Accounts
- `GET /accounts` - List user accounts
- `POST /accounts` - Create account
- `GET /accounts/:id` - Get account
- `PUT /accounts/:id` - Update account
- `DELETE /accounts/:id` - Close account

### Transactions
- `GET /transactions` - List transactions
- `POST /transactions` - Create transaction
- `POST /transactions/:id/approve` - Approve
- `POST /transactions/:id/reject` - Reject

### Rewards
- `GET /rewards/profile` - Get profile
- `POST /rewards/check-in` - Daily check-in
- `GET /rewards/quests` - Get quests
- `GET /rewards/badges` - Get badges
- `GET /rewards/events` - Get events

### Admin
- `GET /admin/users` - All users
- `GET /admin/accounts` - All accounts
- `GET /admin/transactions` - All transactions
- `GET /admin/stats` - Dashboard stats

## Environment Variables

### Backend (`server/.env`)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/glabank
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

## Testing

1. **Register a new user:**
   - Go to `/register`
   - Create account
   - Should automatically login

2. **Or use seeded users:**
   - Admin: `admin@glabank.com` / `admin123`
   - User: `test@glabank.com` / `test123`

3. **Test features:**
   - Create accounts
   - Make transactions
   - Check in daily
   - Earn rewards

## Migration from localStorage

The system now uses MongoDB instead of localStorage. All data is:
- ✅ Stored in MongoDB
- ✅ User-specific
- ✅ Persistent across sessions
- ✅ Secure with authentication

## Next Steps

1. Complete BankContext API integration
2. Complete RewardsContext API integration
3. Add error handling and loading states
4. Add optimistic updates
5. Add offline support (optional)

