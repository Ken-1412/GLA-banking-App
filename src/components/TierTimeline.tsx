import React from 'react';
import { Shield, Zap, Sparkles, Wand2, Crown, Castle, Flame, Trophy } from 'lucide-react';

const TIER_ICONS = [
  Shield,    // 1 - Rookie Saver
  Zap,       // 2 - Smart Spender
  Sparkles,  // 3 - Budget Ninja
  Wand2,     // 4 - Financial Wizard
  Crown,     // 5 - Money Master
  Castle,    // 6 - Wealth Builder
  Flame,     // 7 - Finance Guru
  Trophy,    // 8 - Legendary Saver
];

const LEVELS = [
  { level: 1, name: 'Rookie Saver', minPoints: 0, maxPoints: 499, color: 'from-gray-400 to-gray-600', iconBg: 'bg-gray-500' },
  { level: 2, name: 'Smart Spender', minPoints: 500, maxPoints: 1499, color: 'from-blue-400 to-blue-600', iconBg: 'bg-blue-500' },
  { level: 3, name: 'Budget Ninja', minPoints: 1500, maxPoints: 2999, color: 'from-green-400 to-green-600', iconBg: 'bg-green-500' },
  { level: 4, name: 'Financial Wizard', minPoints: 3000, maxPoints: 4999, color: 'from-purple-400 to-purple-600', iconBg: 'bg-purple-500' },
  { level: 5, name: 'Money Master', minPoints: 5000, maxPoints: 7499, color: 'from-pink-400 to-pink-600', iconBg: 'bg-pink-500' },
  { level: 6, name: 'Wealth Builder', minPoints: 7500, maxPoints: 9999, color: 'from-orange-400 to-orange-600', iconBg: 'bg-orange-500' },
  { level: 7, name: 'Finance Guru', minPoints: 10000, maxPoints: 14999, color: 'from-red-400 to-red-600', iconBg: 'bg-red-500' },
  { level: 8, name: 'Legendary Saver', minPoints: 15000, maxPoints: Infinity, color: 'from-yellow-400 to-yellow-600', iconBg: 'bg-yellow-500' },
];

export default function TierTimeline() {
  return (
    <div className="w-full overflow-x-auto py-12">
      <div className="min-w-[800px] mx-auto px-6">
        {/* Timeline Container */}
        <div className="relative">
          {/* Connection Line - Map Path Style */}
          <div className="absolute top-16 left-0 right-0 h-2 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] bg-[#4A2C20] border-y border-[#D4AF37] shadow-inner opacity-80 rounded-full"></div>
          
          {/* Tier Nodes */}
          <div className="flex justify-between items-start relative">
            {LEVELS.map((tier, index) => {
              const Icon = TIER_ICONS[index];
              return (
                <div key={tier.level} className="flex flex-col items-center group" style={{ flex: 1 }}>
                  {/* Tier Card - Wax Seal Style */}
                  <div className={`
                    relative w-24 h-28 flex flex-col items-center justify-center 
                    transform group-hover:scale-110 transition-transform duration-300
                    cursor-pointer
                  `}>
                    {/* Seal Background */}
                    <div className={`
                      absolute inset-0 rounded-full bg-gradient-to-br ${tier.color}
                      border-4 border-[color:var(--gold-primary)] shadow-[0_4px_10px_rgba(0,0,0,0.5)]
                      flex items-center justify-center
                    `}>
                      <div className="absolute inset-1 border border-white/30 rounded-full"></div>
                    </div>

                    {/* Icon */}
                    <div className="relative z-10 drop-shadow-md">
                      <Icon className="w-10 h-10 text-[color:var(--gold-light)]" />
                    </div>
                    
                    {/* Level Badge */}
                    <div className="absolute -bottom-2 bg-[color:var(--ink-black)] text-[color:var(--gold-light)] px-3 py-0.5 rounded-full text-xs font-bold font-cinzel border border-[color:var(--gold-primary)] z-20">
                      Rank {tier.level}
                    </div>
                  </div>
                  
                  {/* Tier Info Below */}
                  <div className="mt-6 text-center">
                    <h4 className="font-bold text-sm font-cinzel text-[color:var(--ink-black)] dark:text-[color:var(--gold-light)]">{tier.name}</h4>
                    <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 font-serif italic">
                      {tier.maxPoints === Infinity 
                        ? `${tier.minPoints.toLocaleString()}+ Gold` 
                        : `${tier.minPoints.toLocaleString()} - ${tier.maxPoints.toLocaleString()}`}
                    </p>
                  </div>
                  
                  {/* Connection Node */}
                  <div className={`absolute top-16 w-4 h-4 bg-[color:var(--gold-primary)] rounded-full border-2 border-[color:var(--ink-black)] shadow-lg z-0`} 
                       style={{ left: `${(index / (LEVELS.length - 1)) * 100}%`, transform: 'translate(-50%, -50%)' }}>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
