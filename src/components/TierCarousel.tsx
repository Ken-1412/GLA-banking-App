import React from 'react';
import { Star, Trophy, Zap, Gift, Shield, TrendingUp } from 'lucide-react';
import './ThreeDCarousel.css';

const LEVELS = [
  { level: 1, name: 'Rookie Saver', minPoints: 0, maxPoints: 499, color: 'from-gray-400 to-gray-600' },
  { level: 2, name: 'Smart Spender', minPoints: 500, maxPoints: 1499, color: 'from-blue-400 to-blue-600' },
  { level: 3, name: 'Budget Ninja', minPoints: 1500, maxPoints: 2999, color: 'from-green-400 to-green-600' },
  { level: 4, name: 'Financial Wizard', minPoints: 3000, maxPoints: 4999, color: 'from-purple-400 to-purple-600' },
  { level: 5, name: 'Money Master', minPoints: 5000, maxPoints: 7499, color: 'from-pink-400 to-pink-600' },
  { level: 6, name: 'Wealth Builder', minPoints: 7500, maxPoints: 9999, color: 'from-orange-400 to-orange-600' },
  { level: 7, name: 'Finance Guru', minPoints: 10000, maxPoints: 14999, color: 'from-red-400 to-red-600' },
  { level: 8, name: 'Legendary Saver', minPoints: 15000, maxPoints: Infinity, color: 'from-yellow-400 to-yellow-600' },
];

interface TierCarouselProps {
  rotation?: number;
}

export default function TierCarousel({ rotation }: TierCarouselProps) {
  const isManual = rotation !== undefined;

  return (
    <div className="carousel-container tier-carousel h-[400px] w-full">
        <div 
            className="slider" 
            style={{ 
                '--quantity': LEVELS.length,
                animation: isManual ? 'none' : 'autoRun 20s linear infinite',
                transform: isManual ? `perspective(1000px) rotateX(-5deg) rotateY(${rotation}deg)` : undefined,
                transition: isManual ? 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
            } as React.CSSProperties}
        >
            {LEVELS.map((level, index) => (
                <div 
                    key={level.level} 
                    className="item" 
                    style={{ '--position': index + 1 } as React.CSSProperties}
                >
                    <div className={`card-content bg-gradient-to-br ${level.color} h-full flex flex-col justify-between relative overflow-hidden border border-white/10 shadow-lg`}>
                        {/* Clean Glass Overlay instead of Leather */}
                        <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]"></div>
                        
                        <div className="relative z-10 flex justify-between items-start w-full p-4">
                            <div className="bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20 font-sans tracking-wide">
                                Rank {level.level}
                            </div>
                            <Star className="text-white w-5 h-5 drop-shadow-md" fill="currentColor" />
                        </div>
                        
                        <div className="relative z-10 text-center my-2 px-2">
                            <h3 className="text-xl font-bold text-white mb-1 font-sans tracking-wide drop-shadow-md">{level.name}</h3>
                            <p className="text-white/80 text-xs font-medium">
                                {level.maxPoints === Infinity 
                                  ? `${level.minPoints.toLocaleString()}+ Gold` 
                                  : `${level.minPoints.toLocaleString()} - ${level.maxPoints.toLocaleString()} Gold`}
                            </p>
                        </div>

                        <div className="relative z-10 grid grid-cols-2 gap-2 w-full text-xs text-white p-4 pt-0">
                            <div className="bg-black/30 p-2 rounded border border-white/10 text-center backdrop-blur-sm">
                                <Zap className="w-4 h-4 mx-auto mb-1 text-yellow-300" />
                                <span className="font-bold">{1 + (level.level * 0.1)}x Points</span>
                            </div>
                            <div className="bg-black/30 p-2 rounded border border-white/10 text-center backdrop-blur-sm">
                                <Gift className="w-4 h-4 mx-auto mb-1 text-purple-300" />
                                <span className="font-bold">Perks</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className="content">
            <h1 data-content="TIERS" className="opacity-10 dark:opacity-20">
                TIERS
            </h1>
        </div>
    </div>
  );
}
