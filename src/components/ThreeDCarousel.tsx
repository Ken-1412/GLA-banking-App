import React from 'react';
import { CreditCard, Gift, TrendingUp, Shield, Zap, Globe, Wallet, PiggyBank, Smartphone, Award } from 'lucide-react';
import './ThreeDCarousel.css';

const cards = [
  { id: 1, title: "Smart Spending", icon: CreditCard, color: "from-green-400 to-emerald-600", desc: "Earn 2x points" },
  { id: 2, title: "Global Access", icon: Globe, color: "from-blue-400 to-indigo-600", desc: "No foreign fees" },
  { id: 3, title: "Instant Rewards", icon: Gift, color: "from-purple-400 to-pink-600", desc: "Redeem instantly" },
  { id: 4, title: "Secure Banking", icon: Shield, color: "from-red-400 to-orange-600", desc: "Bank grade security" },
  { id: 5, title: "Fast Transfers", icon: Zap, color: "from-yellow-400 to-amber-600", desc: "Instant movement" },
  { id: 6, title: "Wealth Growth", icon: TrendingUp, color: "from-teal-400 to-cyan-600", desc: "High yield savings" },
  { id: 7, title: "Digital Wallet", icon: Wallet, color: "from-pink-400 to-rose-600", desc: "Pay with phone" },
  { id: 8, title: "Goal Savings", icon: PiggyBank, color: "from-cyan-400 to-blue-600", desc: "Auto-save goals" },
  { id: 9, title: "Mobile App", icon: Smartphone, color: "from-violet-400 to-purple-600", desc: "Bank anywhere" },
  { id: 10, title: "Elite Status", icon: Award, color: "from-orange-400 to-red-600", desc: "VIP benefits" },
];

export default function ThreeDCarousel() {
  return (
    <div className="carousel-container h-[400px] w-full">
        <div className="slider" style={{ '--quantity': cards.length } as React.CSSProperties}>
            {cards.map((card, index) => (
                <div 
                    key={card.id} 
                    className="item" 
                    style={{ '--position': index + 1 } as React.CSSProperties}
                >
                    <div className={`card-content bg-gradient-to-br ${card.color} opacity-90`}>
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-3 backdrop-blur-md">
                            <card.icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-base font-bold mb-1 text-white">{card.title}</h3>
                        <p className="text-white/90 text-[10px] leading-tight">{card.desc}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className="content">
            <h1 data-content="GLA BANK" className="opacity-10 dark:opacity-20">
                GLA BANK
            </h1>
        </div>
    </div>
  );
}
