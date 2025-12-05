# MongoDB Setup Guide for GLA Bank

This guide will help you set up MongoDB for the GLA Bank application.

## Option 1: Local MongoDB Installation

### Windows

1. **Download MongoDB:**
   - Visit https://www.mongodb.com/try/download/community
   - Download the Windows installer
   - Run the installer and follow the setup wizard

2. **Start MongoDB:**
   - MongoDB should start automatically as a Windows service
   - Or start manually: `net start MongoDB`

3. **Verify Installation:**
   ```bash
   mongod --version
   ```

### macOS

1. **Install using Homebrew:**
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community
   ```

2. **Start MongoDB:**
   ```bash
   brew services start mongodb-community
   ```

### Linux (Ubuntu/Debian)

1. **Install MongoDB:**
   ```bash
   sudo apt-get update
   sudo apt-get install -y mongodb
   ```

2. **Start MongoDB:**
   ```bash
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

## Option 2: MongoDB Atlas (Cloud - Recommended for Production)

1. **Create Account:**
   - Visit https://www.mongodb.com/cloud/atlas
   - Sign up for a free account

2. **Create Cluster:**
   - Click "Build a Database"
   - Choose the free tier (M0)
   - Select your preferred region
   - Click "Create"

3. **Create Database User:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and password
   - Set user privileges to "Atlas admin" (for development)

4. **Whitelist IP Address:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Or add your specific IP address

5. **Get Connection String:**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/glabank`

## Configuration

1. **Update `.env` file in `server/` directory:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/glabank
   # OR for Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/glabank
   ```

2. **Install server dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Seed the database (optional):**
   ```bash
   npm run seed
   ```
   This creates:
   - Admin user: `admin@glabank.com` / `admin123`
   - Test user: `test@glabank.com` / `test123`

4. **Start the server:**
   ```bash
   npm run dev
   ```

## Verify Setup

1. **Check MongoDB connection:**
   - The server should log: `✅ Connected to MongoDB`
   - If you see errors, check:
     - MongoDB is running
     - Connection string is correct
     - Firewall allows connections

2. **Test API:**
   - Visit: `http://localhost:5000/api/health`
   - Should return: `{ "status": "ok", "message": "GLA Bank API is running" }`

## Troubleshooting

### Connection Refused
- Ensure MongoDB is running
- Check if port 27017 is available
- Verify connection string in `.env`

### Authentication Failed
- Check username and password
- Verify database user has correct permissions
- For Atlas, ensure IP is whitelisted

### Database Not Found
- MongoDB will create the database automatically on first use
- Or create manually: `use glabank`

## Next Steps

1. Start the backend server: `cd server && npm run dev`
2. Start the frontend: `npm run dev`
3. Register a new user or login with seeded credentials
4. Start using the banking system!

## Production Considerations

- Use MongoDB Atlas for production
- Set up proper authentication and authorization
- Enable MongoDB authentication
- Use environment variables for sensitive data
- Set up database backups
- Monitor database performance
- Use connection pooling
- Implement rate limiting

