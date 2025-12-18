import React from 'react';
import { Heart, Sparkles, Moon, Star } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col cosmic-texture relative overflow-hidden" style={{ backgroundImage: 'url(/celestial-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>

      {/* Cosmic overlay for readability */}
      <div className="absolute inset-0 bg-cosmic-600/35 backdrop-blur-sm pointer-events-none"></div>

      {/* Floating stars */}
      <div className="absolute top-20 left-10 text-gold-400 star-sparkle"><Star size={20} fill="currentColor" /></div>
      <div className="absolute top-40 right-20 text-gold-500 star-sparkle" style={{ animationDelay: '-1s' }}><Star size={16} fill="currentColor" /></div>
      <div className="absolute bottom-40 left-1/4 text-ethereal-200 star-sparkle" style={{ animationDelay: '-0.5s' }}><Star size={18} fill="currentColor" /></div>
      <div className="absolute bottom-20 right-10 text-gold-300 star-sparkle" style={{ animationDelay: '-1.5s' }}><Star size={14} fill="currentColor" /></div>

      {/* Navbar */}
      <nav className="px-8 py-8 flex justify-center items-center relative z-10 animate-fade-in">
        <div className="flex items-center gap-3">
          <Moon className="w-5 h-5 text-gold-400" strokeWidth={1.5} />
          <span className="font-display text-xl tracking-wide font-medium text-gold-300">ETHERIA</span>
        </div>
      </nav>

      {/* Main Content */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 relative z-10 pb-20">

        <div className="max-w-lg mx-auto text-center">

          {/* Small decorative element */}
          <div className="flex justify-center items-center gap-4 mb-8 animate-slide-up opacity-0" style={{ animationDelay: '0.1s' }}>
            <div className="w-12 h-px bg-gold-400/60"></div>
            <Heart className="w-4 h-4 text-gold-300 animate-float star-sparkle" fill="currentColor" />
            <div className="w-12 h-px bg-gold-400/60"></div>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl md:text-6xl text-white leading-tight mb-6 animate-slide-up opacity-0 drop-shadow-lg" style={{ animationDelay: '0.2s' }}>
            discover your
            <br />
            <span className="font-display text-gold-300 celestial-glow">inner energy</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base md:text-lg text-white leading-relaxed max-w-sm mx-auto mb-12 animate-slide-up opacity-0 drop-shadow-md" style={{ animationDelay: '0.3s' }}>
            a gentle journey to understand yourself better through mindful reflection
          </p>

          {/* Illustration placeholder - decorative card */}
          <div className="mb-12 animate-slide-up opacity-0" style={{ animationDelay: '0.4s' }}>
            <div className="inline-flex items-center gap-4 px-8 py-5 bg-cosmic-400/50 rounded-xl mystical-border backdrop-blur-md cosmic-shadow">
              <div className="w-12 h-12 bg-gold-500/30 rounded-full flex items-center justify-center mystical-border">
                <Sparkles className="w-5 h-5 text-gold-300" />
              </div>
              <div className="text-left">
                <p className="text-sm text-white font-medium">2 minute quiz</p>
                <p className="text-xs text-moon-200">9 thoughtful questions</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="animate-slide-up opacity-0" style={{ animationDelay: '0.5s' }}>
            <button
              onClick={onStart}
              className="group relative px-10 py-4 bg-gradient-to-r from-gold-600 to-gold-500 text-cosmic-600 rounded-lg transition-all duration-300 hover:from-gold-500 hover:to-gold-400 cosmic-shadow cosmic-shadow-hover celestial-glow"
            >
              <span className="relative z-10 text-sm tracking-wider font-medium flex items-center gap-2">
                begin your journey
                <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </span>
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex items-center justify-center gap-6 animate-fade-in opacity-0" style={{ animationDelay: '0.7s' }}>
            <span className="text-xs text-gold-200">✦ self-discovery</span>
            <span className="text-xs text-gold-200">✦ mindfulness</span>
            <span className="text-xs text-gold-200">✦ growth</span>
          </div>
        </div>

      </section>

      {/* Footer */}
      <div className="relative z-10 py-8 text-center animate-fade-in opacity-0" style={{ animationDelay: '0.8s' }}>
        <p className="text-xs text-moon-300 tracking-wide">
          made with care © 2024
        </p>
      </div>
    </div>
  );
};
