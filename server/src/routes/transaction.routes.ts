import express from 'express';
import Transaction from '../models/Transaction.model.js';
import Account from '../models/Account.model.js';
import { authenticate, AuthRequest } from '../middleware/auth.middleware.js';
import { rewardsService } from '../services/rewards.service.js';

const router = express.Router();

// Get all transactions for user
router.get('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const { status, type, limit = 50 } = req.query;
    const query: any = { userId: req.userId };

    if (status) query.status = status;
    if (type) query.type = type;

    const transactions = await Transaction.find(query)
      .populate('fromAccount', 'name accountNumber')
      .populate('toAccount', 'name accountNumber')
      .sort({ date: -1 })
      .limit(Number(limit));

    res.json(transactions);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Get single transaction
router.get('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const transaction = await Transaction.findOne({ _id: req.params.id, userId: req.userId })
      .populate('fromAccount', 'name accountNumber')
      .populate('toAccount', 'name accountNumber');

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Create transaction (send money, request money, etc.)
router.post('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const { fromAccount, toAccount, amount, description, type, category } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Valid amount is required' });
    }

    if (!description) {
      return res.status(400).json({ message: 'Description is required' });
    }

    // Verify accounts belong to user
    if (fromAccount) {
      const fromAcc = await Account.findOne({ _id: fromAccount, userId: req.userId });
      if (!fromAcc) {
        return res.status(404).json({ message: 'From account not found' });
      }
      if (fromAcc.balance < amount && type === 'send') {
        return res.status(400).json({ message: 'Insufficient balance' });
      }
    }

    if (toAccount) {
      const toAcc = await Account.findOne({ _id: toAccount, userId: req.userId });
      if (!toAcc) {
        return res.status(404).json({ message: 'To account not found' });
      }
    }

    const transaction = new Transaction({
      userId: req.userId,
      fromAccount: fromAccount || undefined,
      toAccount: toAccount || undefined,
      amount,
      description,
      type: type || 'transfer',
      status: 'pending',
      category,
      date: new Date()
    });

    await transaction.save();
    await transaction.populate('fromAccount', 'name accountNumber');
    await transaction.populate('toAccount', 'name accountNumber');

    res.status(201).json(transaction);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Approve transaction
router.post('/:id/approve', authenticate, async (req: AuthRequest, res) => {
  try {
    const transaction = await Transaction.findOne({ _id: req.params.id, userId: req.userId });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    if (transaction.status !== 'pending') {
      return res.status(400).json({ message: 'Transaction is not pending' });
    }

    // Update balances if it's a transfer
    if (transaction.fromAccount && transaction.toAccount) {
      const fromAccount = await Account.findById(transaction.fromAccount);
      const toAccount = await Account.findById(transaction.toAccount);

      if (!fromAccount || !toAccount) {
        return res.status(404).json({ message: 'Account not found' });
      }

      if (fromAccount.balance < transaction.amount) {
        return res.status(400).json({ message: 'Insufficient balance' });
      }

      fromAccount.balance -= transaction.amount;
      toAccount.balance += transaction.amount;

      await fromAccount.save();
      await toAccount.save();

      // Trigger rewards for savings
      if (String(toAccount.userId) === String(transaction.userId) && toAccount.type === 'savings') {
        await rewardsService.updateQuestProgress(String(transaction.userId), 'save_amount', transaction.amount);
      }
    } else if (transaction.type === 'receive' && transaction.toAccount) {
      // Deposit
      const toAccount = await Account.findById(transaction.toAccount);
      if (toAccount) {
        toAccount.balance += transaction.amount;
        await toAccount.save();

        // Trigger rewards for deposit
        await rewardsService.updateQuestProgress(String(transaction.userId), 'deposit_amount', transaction.amount);
      }
    } else if (transaction.type === 'withdrawal' && transaction.fromAccount) {
      // Withdrawal
      const fromAccount = await Account.findById(transaction.fromAccount);
      if (fromAccount && fromAccount.balance >= transaction.amount) {
        fromAccount.balance -= transaction.amount;
        await fromAccount.save();
      } else {
        return res.status(400).json({ message: 'Insufficient balance' });
      }
    }

    transaction.status = 'approved';
    await transaction.save();
    await transaction.populate('fromAccount', 'name accountNumber');
    await transaction.populate('toAccount', 'name accountNumber');

    res.json(transaction);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Reject transaction
router.post('/:id/reject', authenticate, async (req: AuthRequest, res) => {
  try {
    const transaction = await Transaction.findOne({ _id: req.params.id, userId: req.userId });

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

export default router;

