import express from 'express';
import User from '../models/User.model.js';
import jwt from 'jsonwebtoken';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = new User({
      email: email.toLowerCase(),
      password,
      name,
      role: 'user'
    });

    await user.save();

    // Generate token (require JWT_SECRET to be set at startup)
    const jwtSecret = process.env.JWT_SECRET as string;
    const token = jwt.sign({ userId: user._id.toString() }, jwtSecret, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as any);

    // Return both a flat and nested response for compatibility. Frontend will prefer `user` but also accept flat fields.
    res.status(201).json({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token (require JWT_SECRET to be set at startup)
    const jwtSecret = process.env.JWT_SECRET as string;
    const token = jwt.sign({ userId: user._id.toString() }, jwtSecret, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as any);

    res.json({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get current user
router.get('/me', authenticate, async (req: any, res) => {
  try {
    // Return a simple flat object for the current user
    res.json({
      id: req.user._id.toString(),
      email: req.user.email,
      name: req.user.name,
      role: req.user.role
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

