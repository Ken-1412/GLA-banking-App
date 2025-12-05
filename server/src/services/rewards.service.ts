import UserQuest from '../models/UserQuest.model.js';
import UserBadge from '../models/UserBadge.model.js';
import RewardProfile from '../models/RewardProfile.model.js';
import RewardEvent from '../models/RewardEvent.model.js';
import { SEED_QUESTS, SEED_BADGES, getLevelFromPoints } from '../utils/rewards.utils.js';

export const rewardsService = {
    updateQuestProgress: async (userId: string, type: string, value: number) => {
        try {
            const activeQuests = await UserQuest.find({ userId, status: 'active' });

            for (const userQuest of activeQuests) {
                const questDef = SEED_QUESTS.find(q => q.id === userQuest.questId);
                if (!questDef) continue;

                if (questDef.targetType === type) {
                    // Update progress
                    userQuest.progressValue += value;

                    // Check completion
                    if (userQuest.progressValue >= questDef.targetValue) {
                        userQuest.status = 'completed';
                        userQuest.completedAt = new Date();

                        // Award points
                        await rewardsService.awardPoints(userId, questDef.rewardPoints, `Completed quest: ${questDef.name}`);

                        // Create event
                        await new RewardEvent({
                            userId,
                            type: 'quest_completed',
                            points: questDef.rewardPoints,
                            description: `Completed quest: ${questDef.name}`,
                            timestamp: new Date()
                        }).save();
                    }

                    await userQuest.save();
                }
            }
        } catch (error) {
            console.error('Error updating quest progress:', error);
        }
    },

    awardPoints: async (userId: string, points: number, reason: string) => {
        try {
            let profile = await RewardProfile.findOne({ userId });
            if (!profile) return;

            const oldLevel = profile.currentLevel;
            profile.totalPoints += points;
            profile.currentLevel = getLevelFromPoints(profile.totalPoints);

            await profile.save();

            // Check for level up
            if (profile.currentLevel > oldLevel) {
                await new RewardEvent({
                    userId,
                    type: 'level_up',
                    description: `Leveled up to Level ${profile.currentLevel}!`,
                    timestamp: new Date()
                }).save();
            }
        } catch (error) {
            console.error('Error awarding points:', error);
        }
    }
};
