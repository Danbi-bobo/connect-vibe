import React, { useState, useEffect } from 'react';
import { QUESTIONS } from '../constants';
import { ArchetypeID, SubNeedID, QuizResult } from '../types';
import { calculateArchetype, calculateSubNeed } from '../utils/quizLogic';
import { ArrowLeft, Minus, Sparkles } from 'lucide-react';
import { Button } from './Button';
import { FloatingParticles } from './FloatingParticles';

interface QuizProps {
  onComplete: (result: QuizResult) => void;
}

export const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: number; optionId: string; mapsTo?: SubNeedID }[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Email Capture State
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentQIndex]);

  const currentQuestion = QUESTIONS[currentQIndex];
  const progress = ((currentQIndex + 1) / QUESTIONS.length) * 100;

  const handleOptionSelect = (option: any) => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      const newAnswers = [...answers, { questionId: currentQuestion.id, optionId: option.id, mapsTo: option.mapsTo }];
      setAnswers(newAnswers);

      if (currentQIndex < QUESTIONS.length - 1) {
        setCurrentQIndex(currentQIndex + 1);
        setIsTransitioning(false);
      } else {
        setShowEmailCapture(true);
        setIsTransitioning(false);
      }
    }, 600);
  };

  const finishQuiz = (finalAnswers: typeof answers, email?: string) => {
    const archetype = calculateArchetype(finalAnswers);
    const subNeed = calculateSubNeed(finalAnswers);
    const preference = finalAnswers.find(a => a.questionId === 8)?.optionId || 'A';
    const zodiac = finalAnswers.find(a => a.questionId === 9)?.optionId;
    
    onComplete({
      archetype,
      subNeed,
      preference,
      zodiac,
      email
    });
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail || !userEmail.includes('@')) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    finishQuiz(answers, userEmail);
  };

  const handleEmailSkip = () => {
    finishQuiz(answers, undefined);
  };

  const handleBack = () => {
    if (showEmailCapture) {
      setShowEmailCapture(false);
      setAnswers(answers.slice(0, -1)); 
      setIsTransitioning(false);
      return;
    }
    if (currentQIndex > 0) {
      setCurrentQIndex(currentQIndex - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const isZodiacQuestion = currentQuestion && currentQuestion.id === 9;

  // --- VIEW: EMAIL CAPTURE ---
  if (showEmailCapture) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans animate-fade-in bg-stone-50 text-stone-900">
        
        {/* Cosmic Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-indigo/[0.04] via-cosmic-ethereal/[0.06] to-transparent pointer-events-none"></div>
        <FloatingParticles intensity="light" />
        
        <div className="max-w-md w-full relative z-10 text-center">
          <div className="mb-12">
             {/* Cosmic ornament */}
             <div className="flex items-center justify-center gap-3 mb-6">
               <Sparkles className="w-4 h-4 text-cosmic-gold/50 animate-twinkle" />
               <div className="w-16 h-px bg-gradient-to-r from-transparent via-cosmic-gold/30 to-transparent"></div>
               <Sparkles className="w-4 h-4 text-cosmic-gold/50 animate-twinkle" style={{ animationDelay: '1.5s' }} />
             </div>
             
             <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6 font-light italic text-glow">Your Guide Awaits</h2>
             <p className="text-stone-600 font-reading leading-relaxed">
               Enter your email to receive your full energetic blueprint, ritual recommendations, and a copy of your results.
             </p>
          </div>

          <form onSubmit={handleEmailSubmit} className="space-y-8">
             <div className="relative">
               <input 
                 type="email" 
                 placeholder="name@example.com"
                 className="w-full p-4 bg-transparent border-b border-stone-300 focus:border-cosmic-indigo outline-none transition-colors text-stone-900 placeholder:text-stone-400 text-center font-serif text-xl"
                 value={userEmail}
                 onChange={(e) => { setUserEmail(e.target.value); setEmailError(''); }}
               />
               {emailError && <p className="text-red-500 text-xs mt-4">{emailError}</p>}
             </div>
             
             <div className="pt-4">
                <button 
                  type="submit" 
                  className="w-full py-4 uppercase tracking-[0.2em] text-xs font-medium bg-stone-900 text-stone-50 hover:bg-cosmic-indigo border-none transition-all duration-700 cosmic-glow rounded-full"
                >
                  Reveal My Results
                </button>
             </div>
          </form>

          <button 
            onClick={handleEmailSkip}
            className="mt-8 text-[10px] text-stone-400 hover:text-cosmic-gold transition-colors uppercase tracking-[0.15em]"
          >
            Skip for now
          </button>
        </div>
      </div>
    );
  }

  // --- VIEW: QUIZ ---
  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden font-sans selection:bg-stone-200 selection:text-stone-900 bg-stone-50 text-stone-900">
      
       {/* Cosmic Background Layers */}
       <div className="absolute inset-0 ethereal-gradient pointer-events-none"></div>
       <FloatingParticles intensity="light" />

       {/* Progress Line with cosmic gradient */}
       <div className="absolute top-0 left-0 w-full h-[2px] bg-stone-100 z-20">
          <div 
              className="h-full bg-gradient-to-r from-cosmic-indigo via-cosmic-ethereal to-cosmic-gold transition-all duration-[1.5s] ease-out"
              style={{ width: `${progress}%` }}
          ></div>
       </div>

       {/* Top Nav */}
       <div className="w-full max-w-5xl mx-auto px-6 py-8 flex justify-between items-center relative z-20">
          <button 
            onClick={handleBack}
            disabled={currentQIndex === 0}
            className={`text-stone-400 hover:text-stone-900 transition-colors duration-500 ${currentQIndex === 0 ? 'opacity-0 pointer-events-none' : ''}`}
          >
             <ArrowLeft size={16} strokeWidth={1} />
          </button>

          <div className="flex items-center gap-2">
            <Sparkles className="w-2 h-2 text-cosmic-gold/40 animate-twinkle" />
            <span className="font-serif text-lg tracking-[0.2em] text-stone-400">
               {currentQIndex + 1} <span className="text-stone-300">/</span> {QUESTIONS.length}
            </span>
            <Sparkles className="w-2 h-2 text-cosmic-gold/40 animate-twinkle" style={{ animationDelay: '2s' }} />
          </div>
          
          {/* Spacer */}
          <div className="w-4"></div>
       </div>

      <div className={`flex-1 flex flex-col justify-center w-full relative z-10 px-6 pb-20 transition-all duration-700 ease-out ${isTransitioning ? 'opacity-0 translate-y-4 scale-[0.98]' : 'opacity-100 translate-y-0 scale-100'}`}>
        
        <div className={`mx-auto ${isZodiacQuestion ? 'max-w-4xl' : 'max-w-xl'} w-full`}>
            
            {/* Question */}
            <div className="mb-12 md:mb-16 text-center">
              <h2 className="text-3xl md:text-5xl font-serif text-stone-900 leading-[1.2] font-light">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Options */}
            <div className={isZodiacQuestion ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "flex flex-col border-t border-stone-200"}>
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option)}
                  className={`group w-full text-left transition-all duration-500 ease-out
                    ${isZodiacQuestion 
                      ? "p-6 border border-stone-200 hover:border-cosmic-indigo hover:shadow-lg hover:shadow-cosmic-indigo/10 bg-white/80 backdrop-blur-sm flex items-center gap-6" 
                      : "py-6 border-b border-stone-200 hover:pl-4 flex items-baseline justify-between hover:bg-cosmic-indigo/[0.03]"
                    }`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  {isZodiacQuestion ? (
                    // --- ZODIAC STYLE ---
                    <>
                      <span className="font-serif text-4xl text-stone-900 font-light group-hover:text-cosmic-indigo transition-colors">{option.symbol}</span>
                      <div>
                        <span className="block font-serif text-xl text-stone-900 mb-1 group-hover:text-cosmic-indigo transition-colors">{option.text}</span>
                        <span className="block text-[10px] uppercase tracking-widest text-stone-500">{option.detail}</span>
                      </div>
                    </>
                  ) : (
                    // --- STANDARD STYLE ---
                    <>
                      <div className="flex items-baseline gap-4">
                        <span className="text-[10px] font-mono text-stone-400 group-hover:text-cosmic-gold transition-colors">0{idx + 1}</span>
                        <span className="font-reading text-lg md:text-xl text-stone-600 group-hover:text-stone-900 transition-colors leading-relaxed">
                          {option.text}
                        </span>
                      </div>
                      <Sparkles className="w-3 h-3 text-cosmic-gold/0 group-hover:text-cosmic-gold/60 transition-all duration-500" />
                    </>
                  )}
                </button>
              ))}
            </div>

        </div>

      </div>
    </div>
  );
};
