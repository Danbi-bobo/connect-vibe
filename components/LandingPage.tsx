import React from 'react';
import { Heart, Sparkles, Flower2 } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col bg-warm-100 relative overflow-hidden">
      
      {/* Soft organic background shapes */}
      <div className="absolute inset-0 paper-texture pointer-events-none"></div>
      
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-olive-200/40 blob-shape animate-blob"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-terracotta-200/30 blob-shape animate-blob" style={{ animationDelay: '-2s' }}></div>
      <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-dusty-200/30 blob-shape animate-blob" style={{ animationDelay: '-4s' }}></div>
      <div className="absolute bottom-20 right-10 w-28 h-28 bg-sand-300/30 blob-shape animate-blob" style={{ animationDelay: '-6s' }}></div>

      {/* Navbar */}
      <nav className="px-8 py-8 flex justify-center items-center relative z-10 animate-fade-in">
        <div className="flex items-center gap-3">
          <Flower2 className="w-5 h-5 text-olive-400" strokeWidth={1.5} />
          <span className="font-serif text-xl tracking-wide font-medium text-clay-500">etheria</span>
        </div>
      </nav>

      {/* Main Content */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 relative z-10 pb-20">
        
        <div className="max-w-lg mx-auto text-center">
          
          {/* Small decorative element */}
          <div className="flex justify-center items-center gap-4 mb-8 animate-slide-up opacity-0" style={{ animationDelay: '0.1s' }}>
            <div className="w-12 h-px bg-sand-400/50"></div>
            <Heart className="w-4 h-4 text-terracotta-400 animate-float" fill="currentColor" />
            <div className="w-12 h-px bg-sand-400/50"></div>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl md:text-6xl text-clay-500 leading-tight mb-6 animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
            discover your
            <br />
            <span className="italic text-terracotta-400">inner energy</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base md:text-lg text-clay-400 leading-relaxed max-w-sm mx-auto mb-12 animate-slide-up opacity-0 font-light" style={{ animationDelay: '0.3s' }}>
            a gentle journey to understand yourself better through mindful reflection
          </p>

          {/* Illustration placeholder - decorative card */}
          <div className="mb-12 animate-slide-up opacity-0" style={{ animationDelay: '0.4s' }}>
            <div className="inline-flex items-center gap-4 px-8 py-5 bg-warm-50 hand-drawn cozy-shadow">
              <div className="w-12 h-12 bg-olive-200/50 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-olive-500" />
              </div>
              <div className="text-left">
                <p className="text-sm text-clay-400 font-medium">2 minute quiz</p>
                <p className="text-xs text-clay-300">9 thoughtful questions</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="animate-slide-up opacity-0" style={{ animationDelay: '0.5s' }}>
            <button 
              onClick={onStart} 
              className="group relative px-10 py-4 bg-clay-500 text-warm-50 hand-drawn transition-all duration-300 hover:bg-terracotta-400 cozy-shadow cozy-shadow-hover"
            >
              <span className="relative z-10 text-sm tracking-wider font-medium flex items-center gap-2">
                begin your journey
                <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </span>
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex items-center justify-center gap-6 animate-fade-in opacity-0" style={{ animationDelay: '0.7s' }}>
            <span className="text-xs text-clay-300">✦ self-discovery</span>
            <span className="text-xs text-clay-300">✦ mindfulness</span>
            <span className="text-xs text-clay-300">✦ growth</span>
          </div>
        </div>

      </section>

      {/* Footer */}
      <div className="relative z-10 py-8 text-center animate-fade-in opacity-0" style={{ animationDelay: '0.8s' }}>
        <p className="text-xs text-clay-300 tracking-wide">
          made with care © 2024
        </p>
      </div>
    </div>
  );
};
