import express from 'express';
import User from '../models/User.model.js';
import Account from '../models/Account.model.js';
import Transaction from '../models/Transaction.model.js';
import { authenticate, requireAdmin, AuthRequest } from '../middleware/auth.middleware.js';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authenticate);
router.use(requireAdmin);

// Get all users
router.get('/users', async (req: AuthRequest, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get all accounts
router.get('/accounts', async (req: AuthRequest, res) => {
  try {
    const accounts = await Account.find().populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(accounts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get all transactions
router.get('/transactions', async (req: AuthRequest, res) => {
  try {
    const { status, limit = 100 } = req.query;
    const query: any = {};
    if (status) query.status = status;

    const transactions = await Transaction.find(query)
      .populate('userId', 'name email')
      .populate('fromAccount', 'name accountNumber')
      .populate('toAccount', 'name accountNumber')
      .sort({ date: -1 })
      .limit(Number(limit));

    res.json(transactions);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Approve any transaction
router.post('/transactions/:id/approve', async (req: AuthRequest, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
      .populate('fromAccount')
      .populate('toAccount');

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    if (transaction.status !== 'pending') {
      return res.status(400).json({ message: 'Transaction is not pending' });
    }

    // Update balances
    if (transaction.fromAccount && transaction.toAccount) {
      const fromAccount = await Account.findById(transaction.fromAccount);
      const toAccount = await Account.findById(transaction.toAccount);

      if (fromAccount && toAccount) {
        if (fromAccount.balance < transaction.amount) {
          return res.status(400).json({ message: 'Insufficient balance' });
        }

        fromAccount.balance -= transaction.amount;
        toAccount.balance += transaction.amount;

        await fromAccount.save();
        await toAccount.save();
      }
    }

    transaction.status = 'approved';
    await transaction.save();
    await transaction.populate('userId', 'name email');
    await transaction.populate('fromAccount', 'name accountNumber');
    await transaction.populate('toAccount', 'name accountNumber');

    res.json(transaction);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Reject any transaction
router.post('/transactions/:id/reject', async (req: AuthRequest, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    if (transaction.status !== 'pending') {
      return res.status(400).json({ message: 'Transaction is not pending' });
    }

    transaction.status = 'rejected';
    await transaction.save();

    res.json(transaction);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get dashboard stats
router.get('/stats', async (req: AuthRequest, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAccounts = await Account.countDocuments({ status: 'active' });
    const totalTransactions = await Transaction.countDocuments();
    const pendingTransactions = await Transaction.countDocuments({ status: 'pending' });
    const totalBalance = await Account.aggregate([
      { $match: { status: 'active' } },
      { $group: { _id: null, total: { $sum: '$balance' } } }
    ]);

    res.json({
      totalUsers,
      totalAccounts,
      totalTransactions,
      pendingTransactions,
      totalBalance: totalBalance[0]?.total || 0
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

