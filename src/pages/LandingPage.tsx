import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Shield, TrendingUp, Smartphone, Lock, Zap, Award, Sparkles, Wand2, Crown, Castle, Flame, Trophy } from 'lucide-react';
import { Button } from '../components/ui/button';
import Logo from '../components/ui/Logo';
import TierCarousel from '../components/TierCarousel';
import ScrollKnob from '../components/ScrollKnob';
import TierTimeline from '../components/TierTimeline';
import { calculateParallaxOffset, calculateRevealProgress } from '../utils/scrollUtils';
import '../styles/ParallaxLanding.css';
import '../styles/Hero3DCarousel.css';

// Tier data based on generated badges
const TIER_DATA = [
  { name: 'Bronze', image: '/assets/tiers/bronze.png', color: '#CD7F32', requirement: '₹0 - ₹50,000' },
  { name: 'Gold', image: '/assets/tiers/gold.png', color: '#FFD700', requirement: '₹50,001 - ₹2,00,000' },
  { name: 'Platinum', image: '/assets/tiers/platinum.png', color: '#00CED1', requirement: '₹2,00,001 - ₹5,00,000' },
  { name: 'Diamond', image: '/assets/tiers/diamond.png', color: '#9333EA', requirement: '₹5,00,001 - ₹10,00,000' },
  { name: 'Sapphire', image: '/assets/tiers/sapphire.png', color: '#1E40AF', requirement: '₹10,00,001+' },
];

const TIER_BADGES = [
  { color: 'from-gray-400 to-gray-600', Icon: Shield },
  { color: 'from-blue-400 to-blue-600', Icon: Zap },
  { color: 'from-green-400 to-green-600', Icon: Sparkles },
  { color: 'from-purple-400 to-purple-600', Icon: Wand2 },
  { color: 'from-pink-400 to-pink-600', Icon: Crown },
  { color: 'from-orange-400 to-orange-600', Icon: Castle },
  { color: 'from-red-400 to-red-600', Icon: Flame },
  { color: 'from-yellow-400 to-yellow-600', Icon: Trophy },
];

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const targetScrollY = useRef(0);
  
  // State for ScrollKnob controlling TierCarousel
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const scrollSpeed = 0.3;
      targetScrollY.current += e.deltaY * scrollSpeed;
      
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetScrollY.current = Math.max(0, Math.min(targetScrollY.current, maxScroll));
      
      window.scrollTo(0, targetScrollY.current);
    };

    // Add passive: false to allow preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    const onScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', onScroll);
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="parallax-container" ref={containerRef}>
      {/* CSS-Only 3D Hero Banner with Tier Carousel */}
      <section className="hero-3d-banner">
        {/* Navigation overlay */}
        <div className="hero-3d-nav">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <Logo size="md" />
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-200 hover:text-indigo-300 transition-colors font-medium">
                Features
              </a>
              <a href="#security" className="text-gray-200 hover:text-indigo-300 transition-colors font-medium">
                Security
              </a>
              <a href="#tiers" className="text-gray-200 hover:text-indigo-300 transition-colors font-medium">
                Membership
              </a>
            </div>

            <div className="flex gap-4">
              <Link to="/login">
                <Button variant="ghost" className="text-gray-200 hover:text-white">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                  Get Started <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* 3D Rotating Tier Cards */}
        <div className="tier-3d-slider" style={{ '--quantity': 10 } as React.CSSProperties}>
          <div className="tier-3d-item" style={{ '--position': 1 } as React.CSSProperties}>
            <img src="/assets/tiers/bronze.png" alt="Bronze Tier" />
          </div>
          <div className="tier-3d-item" style={{ '--position': 2 } as React.CSSProperties}>
            <img src="/assets/tiers/gold.png" alt="Gold Tier" />
          </div>
          <div className="tier-3d-item" style={{ '--position': 3 } as React.CSSProperties}>
            <img src="/assets/tiers/platinum.png" alt="Platinum Tier" />
          </div>
          <div className="tier-3d-item" style={{ '--position': 4 } as React.CSSProperties}>
            <img src="/assets/tiers/diamond.png" alt="Diamond Tier" />
          </div>
          <div className="tier-3d-item" style={{ '--position': 5 } as React.CSSProperties}>
            <img src="/assets/tiers/sapphire.png" alt="Sapphire Tier" />
          </div>
          <div className="tier-3d-item" style={{ '--position': 6 } as React.CSSProperties}>
            <img src="/assets/tiers/bronze.png" alt="Bronze Tier" />
          </div>
          <div className="tier-3d-item" style={{ '--position': 7 } as React.CSSProperties}>
            <img src="/assets/tiers/gold.png" alt="Gold Tier" />
          </div>
          <div className="tier-3d-item" style={{ '--position': 8 } as React.CSSProperties}>
            <img src="/assets/tiers/platinum.png" alt="Platinum Tier" />
          </div>
          <div className="tier-3d-item" style={{ '--position': 9 } as React.CSSProperties}>
            <img src="/assets/tiers/diamond.png" alt="Diamond Tier" />
          </div>
          <div className="tier-3d-item" style={{ '--position': 10 } as React.CSSProperties}>
            <img src="/assets/tiers/sapphire.png" alt="Sapphire Tier" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="hero-3d-content">
          <h1 className="hero-3d-title" data-content="GLA BANK">
            GLA BANK
          </h1>
          <div className="hero-3d-author">
            <h2>Membership Tiers</h2>
            <p><b>Smart. Secure. Seamless Banking.</b></p>
            <p>
              Experience premium banking with exclusive rewards at every tier. Join thousands of satisfied customers today.
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <Link to="/register">
                <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                  Open Account <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* 3D Model Effect */}
        <div className="tier-3d-model"></div>
      </section>

      {/* Section 1: Why GLA Bank */}
      <section ref={section1Ref} id="features" className="content-section bg-slate-900 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="section-title text-center mb-16">Why Choose GLA Bank</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card group">
              <div className="feature-icon-wrapper">
                <Zap className="w-8 h-8 text-yellow-400 group-hover:scale-110 transition-transform" />
              </div>
              <h3>Instant Transfers</h3>
              <p>Send and receive money instantly with zero fees on all domestic transactions.</p>
            </div>
            
            <div className="feature-card group">
              <div className="feature-icon-wrapper">
                <Smartphone className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" />
              </div>
              <h3>Mobile First</h3>
              <p>Bank on the go with our award-winning mobile app designed for your lifestyle.</p>
            </div>
            
            <div className="feature-card group">
              <div className="feature-icon-wrapper">
                <TrendingUp className="w-8 h-8 text-green-400 group-hover:scale-110 transition-transform" />
              </div>
              <h3>High Returns</h3>
              <p>Earn industry-leading interest rates on savings with flexible investment options.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Membership Tiers */}
      <section ref={section2Ref} id="tiers" className="content-section bg-slate-950 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="section-title text-center mb-8">Membership Tiers</h2>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">
            Unlock exclusive rewards and benefits as you grow with us. Every transaction brings you closer to the next tier.
          </p>

          {/* Tier Timeline */}
          <div className="mb-20">
            <TierTimeline />
          </div>

          {/* 3D Tier Carousel & Scroll Knob */}
          <div className="flex flex-col items-center gap-12">
            <div className="w-full max-w-4xl h-[400px] relative perspective-1000">
              <TierCarousel rotation={rotation} />
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <p className="text-indigo-300 font-medium uppercase tracking-wider text-sm">
                Rotate to Explore Tiers
              </p>
              <ScrollKnob 
                value={rotation} 
                onChange={setRotation} 
                min={0} 
                max={360} 
                steps={8}
                tierData={TIER_BADGES}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Loyalty Points Explanation */}
      <section className="content-section bg-indigo-950/30 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title text-left mb-6">How to Earn Points</h2>
              <p className="text-lg text-gray-300 mb-8">
                Earning loyalty points is simple and automatic. The more you bank, the more you earn.
              </p>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-indigo-600/20 p-3 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">Transactions</h4>
                    <p className="text-gray-400">Earn 1 point for every ₹100 spent on debit/credit cards.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-purple-600/20 p-3 rounded-lg">
                    <Award className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">Savings Balance</h4>
                    <p className="text-gray-400">Earn 50 points monthly for maintaining minimum balance.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-blue-600/20 p-3 rounded-lg">
                    <Zap className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">Referrals</h4>
                    <p className="text-gray-400">Get 500 bonus points for every friend who joins GLA Bank.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-3xl opacity-20 rounded-full"></div>
              <div className="relative bg-slate-900 border border-indigo-500/30 rounded-2xl p-8 shadow-2xl">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-bold text-white">Your Potential Rewards</h3>
                  <Award className="w-8 h-8 text-yellow-400" />
                </div>
                
                <div className="space-y-6">
                  <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Monthly Spend</span>
                      <span>₹25,000</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 w-[40%]"></div>
                    </div>
                    <div className="text-right text-indigo-400 font-bold mt-1">+250 Points</div>
                  </div>
                  
                  <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Avg Balance</span>
                      <span>₹1,00,000</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 w-[70%]"></div>
                    </div>
                    <div className="text-right text-purple-400 font-bold mt-1">+500 Points</div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-slate-700">
                    <div className="flex justify-between items-end">
                      <span className="text-gray-400">Total Monthly Potential</span>
                      <span className="text-3xl font-bold text-white">750 <span className="text-sm text-indigo-400">pts</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Security */}
      <section ref={section3Ref} id="security" className="content-section bg-slate-900 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="section-title text-center mb-16">Bank-Grade Security</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-indigo-500 transition-colors">
              <Shield className="w-12 h-12 text-indigo-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">256-bit Encryption</h3>
              <p className="text-gray-400 leading-relaxed">
                Your data is protected by the same level of security used by the world's largest financial institutions.
                We use advanced encryption protocols to ensure your information never falls into the wrong hands.
              </p>
            </div>
            
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-indigo-500 transition-colors">
              <Lock className="w-12 h-12 text-indigo-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Multi-Factor Authentication</h3>
              <p className="text-gray-400 leading-relaxed">
                Add an extra layer of security to your account with our advanced MFA system.
                Biometric verification and real-time alerts keep your account safe from unauthorized access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-slate-800 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <Logo size="md" />
              <p className="text-gray-500 mt-4 max-w-xs">
                Smart. Secure. Seamless Banking for the modern world.
              </p>
            </div>
            
            <div className="flex gap-8">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Support</a>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-gray-600 text-sm">
            © 2024 GLA Bank. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
