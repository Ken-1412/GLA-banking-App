import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';

interface ScrollKnobProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  steps?: number;
  tierData?: { color: string; Icon: any }[];
}

export default function ScrollKnob({ min, max, value, onChange, steps = 8, tierData = [] }: ScrollKnobProps) {
  const knobRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const rotation = useMotionValue(0);
  
  // Calculate rotation based on value
  useEffect(() => {
    if (!isDragging) {
      const stepAngle = 360 / (max - min + 1);
      const targetRotation = (value - min) * stepAngle;
      animate(rotation, targetRotation, { type: "spring", stiffness: 200, damping: 20 });
    }
  }, [value, min, max, isDragging, rotation]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !knobRef.current) return;

    const rect = knobRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate angle from center to pointer
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
    
    // Normalize angle to 0-360 positive
    let normalizedAngle = angle + 90; // Offset so 12 o'clock is 0
    if (normalizedAngle < 0) normalizedAngle += 360;

    rotation.set(normalizedAngle);

    // Map angle to value
    const totalSteps = max - min + 1;
    const stepAngle = 360 / totalSteps;
    const newValue = Math.round(normalizedAngle / stepAngle) + min;
    
    // Clamp value
    const clampedValue = Math.min(Math.max(newValue, min), max);
    
    if (clampedValue !== value) {
      onChange(clampedValue);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
    
    // Snap to nearest step
    const stepAngle = 360 / steps;
    const currentAngle = rotation.get();
    const snappedAngle = Math.round(currentAngle / stepAngle) * stepAngle;
    
    animate(rotation, snappedAngle, { type: "spring", stiffness: 200, damping: 20 });
    
    // Update value to match snapped angle
    const newValue = Math.round(snappedAngle / stepAngle) + min;
    const clampedValue = Math.min(Math.max(newValue, min), max); // Ensure within bounds (though rotation is cyclic)
    
    // For cyclic 0-360, we might want to wrap around, but here min/max suggests a range.
    // Assuming 8 steps means 0-7 or 1-8. Let's stick to the passed min/max for now.
    // If min=0, max=360, steps=8, then values are 0, 45, 90...
    
    if (clampedValue !== value) {
      onChange(clampedValue);
    }
  };

  // Calculate current tier based on rotation/value
  const currentTier = Math.round(((value - min) / (max - min)) * (steps - 1)) + 1;

  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      {/* Outer Ring - Tech/Glow */}
      <div className="absolute inset-0 rounded-full border border-indigo-500/30 bg-slate-900/50 shadow-[0_0_30px_rgba(99,102,241,0.1)] backdrop-blur-sm"></div>
      
      {/* Ticks - Modern Lines */}
      {/* Ticks/Images - Modern Lines */}
      {Array.from({ length: steps }).map((_, i) => {
        const angle = (i * 360) / steps;
        // Map step index to value range
        const stepValue = Math.round(min + (i * (max - min)) / steps);
        // Check if current value is close to this step
        const isActive = Math.abs(value - stepValue) < (max - min) / (steps * 2);
        
        return (
          <div
            key={i}
            className="absolute origin-bottom transition-all duration-300 flex flex-col items-center justify-end"
            style={{
              top: '-35px', // Push out further to fit larger images
              left: '50%',
              height: '115px', // Increased radius for larger items
              transform: `translateX(-50%) rotate(${angle}deg)`,
              transformOrigin: '50% 115px' // Center of rotation matches height
            }}
          >
             {/* Image or Tick */}
             <div 
                className={`transition-all duration-300 ${isActive ? 'scale-125 z-20' : 'scale-90 opacity-70 z-10'}`}
                style={{ transform: `rotate(-${angle}deg)` }} // Counter-rotate image to keep it upright
             >
                {(() => {
                  const item = tierData[i];
                  if (item) {
                    const Icon = item.Icon;
                    return (
                      <div className={`
                        relative w-14 h-14 flex items-center justify-center rounded-full
                        bg-gradient-to-br ${item.color}
                        border-2 ${isActive ? 'border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]' : 'border-slate-600 shadow-lg'}
                      `}>
                          <div className="absolute inset-1 border border-white/30 rounded-full"></div>
                          <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-white/80'}`} />
                      </div>
                    );
                  }
                  return <div className={`w-1 ${isActive ? 'h-6 bg-cyan-400' : 'h-3 bg-slate-600'}`}></div>;
                })()}
             </div>
          </div>
        );
      })}

      {/* Knob - Metallic/Glass Tech Style */}
      <motion.div
        ref={knobRef}
        className="w-28 h-28 rounded-full bg-gradient-to-b from-slate-700 to-slate-900 shadow-[0_10px_25px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] flex items-center justify-center cursor-grab active:cursor-grabbing border border-slate-600 relative z-10"
        style={{ rotate: rotation }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Inner Detail - Brushed Metal effect */}
        <div className="absolute inset-1 rounded-full bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(255,255,255,0.1)_360deg)] opacity-30"></div>
        
        {/* Indicator - Glowing Dot */}
        <div className="absolute top-3 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)]"></div>
        
        {/* Center Cap */}
        <div className="w-16 h-16 rounded-full bg-slate-800 shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)] flex items-center justify-center border border-slate-700">
             {/* Value Display */}
            <div className="text-2xl font-bold font-sans text-white drop-shadow-md select-none">
            {currentTier}
            </div>
        </div>
      </motion.div>
    </div>
  );
}
