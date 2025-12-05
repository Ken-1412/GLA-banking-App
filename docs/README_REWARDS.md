# StudentBank Rewards: Gamified Financial Wellness & Loyalty System

## Overview

This feature implements a research-backed gamification system that rewards students for healthy financial behaviors. It includes points, levels, streaks, quests, and badges to increase engagement and build positive financial habits.

## Features

### 1. Points & Leveling System
- **XP/Points**: Users earn points for various financial actions
- **8 Levels**: From "Rookie Saver" (Level 1) to "Legendary Saver" (Level 8)
- **Level Progression**: Visual progress bar showing points needed for next level

### 2. Daily Check-In Streaks
- **Daily Check-In**: Users can check in once per day
- **Streak System**: Maintains current streak and tracks longest streak
- **Bonus Points**: Base 10 points + streak multiplier (2 points per day)
- **Reset Logic**: Streak resets if user misses a day

### 3. Quests & Challenges
- **4 Pre-configured Quests**:
  - **Weekly Saver**: Save ₹500 this week (100 points)
  - **Frugal Foodie**: Spend less than ₹1000 on Food this month (150 points)
  - **Deposit Champion**: Make a deposit of ₹1000+ (75 points)
  - **Balance Keeper**: Maintain ₹5000 balance for 7 days (200 points)
- **Progress Tracking**: Real-time progress updates based on transactions
- **Time-bound**: Each quest has start and end dates

### 4. Badges & Achievements
- **6 Badges** with different rarities:
  - **Common**: 7-Day Streak, First Steps (100 pts)
  - **Rare**: Savings Star (₹5000 saved)
  - **Epic**: Budget Ninja (Level 3)
  - **Legendary**: Quest Master (5 quests), 30-Day Champion
- **Auto-unlock**: Badges automatically unlock when conditions are met
- **Points Rewards**: Badges award bonus points based on rarity

### 5. Transaction Rewards
- **Deposit Bonuses**: 5 points per ₹100 deposited (minimum ₹100)
- **Automatic Tracking**: Points awarded automatically when transactions are approved

## How It Works

### Points Earning
1. **Daily Check-In**: 10 base points + streak bonus
2. **Deposits**: 5 points per ₹100 (e.g., ₹500 deposit = 25 points)
3. **Quest Completion**: Varies by quest (75-200 points)
4. **Badge Unlock**: 50-500 points based on rarity

### Level Calculation
Levels are calculated based on total points:
- Level 1: 0-499 points → "Rookie Saver"
- Level 2: 500-1499 points → "Smart Spender"
- Level 3: 1500-2999 points → "Budget Ninja"
- Level 4: 3000-4999 points → "Financial Wizard"
- Level 5: 5000-7499 points → "Money Master"
- Level 6: 7500-9999 points → "Wealth Builder"
- Level 7: 10000-14999 points → "Finance Guru"
- Level 8: 15000+ points → "Legendary Saver"

### Quest Evaluation
Quests are automatically evaluated when:
- Transactions are approved
- Account balances change
- Daily check-ins occur

### Badge Conditions
Badges check conditions on:
- Points/level changes
- Streak updates
- Quest completions
- Account balance changes

## Data Storage

All rewards data is persisted in localStorage:
- `glabank_rewards_profile`: User's reward profile
- `glabank_user_quests`: User's quest progress
- `glabank_user_badges`: Earned badges
- `glabank_reward_events`: Recent activity log (last 50 events)

## Adding New Quests

To add a new quest, edit `src/contexts/RewardsContext.tsx`:

```typescript
const SEED_QUESTS: Quest[] = [
  // ... existing quests
  {
    id: 'q5',
    name: 'Your Quest Name',
    description: 'Quest description',
    targetType: 'save_amount' | 'spend_less' | 'deposit_amount' | 'maintain_balance' | 'transaction_count',
    targetValue: 1000,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    rewardPoints: 150,
    isGlobal: true,
  },
];
```

Then add quest evaluation logic in the `useEffect` hook that monitors transactions.

## Adding New Badges

To add a new badge, edit `src/contexts/RewardsContext.tsx`:

```typescript
const SEED_BADGES: Badge[] = [
  // ... existing badges
  {
    id: 'b7',
    name: 'Badge Name',
    description: 'Badge description',
    conditionType: 'streak_days' | 'total_points' | 'savings_amount' | 'level' | 'quests_completed',
    conditionValue: 10,
    icon: '🎯',
    rarity: 'common' | 'rare' | 'epic' | 'legendary',
  },
];
```

The badge will automatically be checked when relevant conditions change.

## UI Components

### RewardsPage (`src/pages/RewardsPage.tsx`)
- Level overview card with progress bar
- Streak display
- Active quests list with progress
- Badges grid (earned vs locked)
- Recent activity feed

### Navigation
- Added "Rewards" link in sidebar (Trophy icon)
- Accessible at `/rewards` route

## Integration Points

### BankContext Integration
- Monitors `transactions` for deposit rewards
- Tracks `accounts` for balance-based quests
- Awards points when transactions are approved

### AuthContext Integration
- Uses `user.id` to track per-user rewards
- Initializes reward profile on first login

## Demo Instructions

1. **Login** to the app
2. **Navigate** to "Rewards" in the sidebar
3. **Check in** daily using the "Daily Check-In" button
4. **Make deposits** to earn points (5 points per ₹100)
5. **Complete quests** by meeting their requirements
6. **Unlock badges** by reaching milestones
7. **Watch your level** increase as you earn points

## Research Backing

This implementation is based on:
- Gamification research in banking (ScienceDirect, ResearchGate)
- Digital bank loyalty program studies (Jatit, Himalayan Journals)
- Neobank engagement patterns (Monzo, Revolut, Nubank)
- AI personalization in financial services

## Technical Notes

- **State Management**: React Context API
- **Persistence**: localStorage (can be migrated to backend)
- **Real-time Updates**: React hooks and effects
- **Type Safety**: Full TypeScript implementation
- **Animations**: Framer Motion for smooth transitions

## Future Enhancements

Potential additions:
- Leaderboard (anonymized top savers)
- Virtual rewards redemption
- More quest types
- Social features (share achievements)
- Backend API integration
- Push notifications for quest reminders

