import React from 'react';

interface FloatingParticlesProps {
  intensity?: 'light' | 'medium' | 'dense';
  className?: string;
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({ 
  intensity = 'medium',
  className = '' 
}) => {
  const opacityMap = {
    light: { layer1: 0.03, layer2: 0.04, layer3: 0.05 },
    medium: { layer1: 0.05, layer2: 0.06, layer3: 0.08 },
    dense: { layer1: 0.08, layer2: 0.1, layer3: 0.12 }
  };
  
  const opacity = opacityMap[intensity];
  
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Layer 1: Large, slow-moving gold stars */}
      <div 
        className="absolute inset-0 floating-stars-1" 
        style={{ opacity: opacity.layer1 }} 
      />
      {/* Layer 2: Medium silver stars */}
      <div 
        className="absolute inset-0 floating-stars-2" 
        style={{ opacity: opacity.layer2 }} 
      />
      {/* Layer 3: Small, fast-moving mixed stars */}
      <div 
        className="absolute inset-0 floating-stars-3" 
        style={{ opacity: opacity.layer3 }} 
      />
    </div>
  );
};
