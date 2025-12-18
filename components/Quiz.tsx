import React, { useState, useEffect } from 'react';
import { QUESTIONS } from '../constants';
import { ArchetypeID, SubNeedID, QuizResult } from '../types';
import { calculateArchetype, calculateSubNeed } from '../utils/quizLogic';
import { ArrowLeft, Heart, Flower2, Send, Sparkles } from 'lucide-react';

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
    }, 400);
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

  // Option colors for variety
  const optionColors = [
    'hover:bg-olive-100/50 hover:border-olive-300',
    'hover:bg-terracotta-100/50 hover:border-terracotta-300',
    'hover:bg-dusty-100/50 hover:border-dusty-300',
    'hover:bg-sand-200/50 hover:border-sand-400',
    'hover:bg-olive-100/50 hover:border-olive-300',
  ];

  // --- VIEW: EMAIL CAPTURE ---
  if (showEmailCapture) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-warm-100 animate-fade-in">

        {/* Background shapes */}
        <div className="absolute inset-0 paper-texture pointer-events-none"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-olive-200/30 blob-shape animate-blob"></div>
        <div className="absolute bottom-32 left-16 w-24 h-24 bg-terracotta-200/30 blob-shape animate-blob" style={{ animationDelay: '-3s' }}></div>

        <div className="max-w-sm w-full relative z-10 text-center">
          
          {/* Icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-16 h-16 bg-warm-200 rounded-full flex items-center justify-center cozy-shadow">
              <Send className="w-6 h-6 text-terracotta-400" />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-serif text-clay-600 mb-4">almost there!</h2>
          <p className="text-clay-500 leading-relaxed mb-10 text-sm">
            enter your email to receive your complete energy blueprint and personalized recommendations
          </p>

          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full p-4 bg-warm-50 border-2 border-sand-300 hand-drawn focus:border-terracotta-400 outline-none transition-colors text-clay-500 placeholder:text-clay-300 text-center"
                value={userEmail}
                onChange={(e) => { setUserEmail(e.target.value); setEmailError(''); }}
              />
              {emailError && <p className="text-terracotta-500 text-xs mt-3">{emailError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-clay-500 text-warm-50 hand-drawn transition-all duration-300 hover:bg-terracotta-400 cozy-shadow text-sm tracking-wider font-medium"
            >
              reveal my results ✨
            </button>
          </form>

          <button
            onClick={handleEmailSkip}
            className="mt-6 text-xs text-clay-300 hover:text-terracotta-400 transition-colors"
          >
            skip for now
          </button>
        </div>
      </div>
    );
  }

  // --- VIEW: QUIZ ---
  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden bg-warm-100">

      {/* Background */}
      <div className="absolute inset-0 paper-texture pointer-events-none"></div>
      
      {/* Decorative blobs */}
      <div className="absolute top-32 left-8 w-20 h-20 bg-olive-200/30 blob-shape animate-blob"></div>
      <div className="absolute top-60 right-12 w-16 h-16 bg-dusty-200/30 blob-shape animate-blob" style={{ animationDelay: '-2s' }}></div>
      <div className="absolute bottom-40 left-1/3 w-24 h-24 bg-terracotta-200/20 blob-shape animate-blob" style={{ animationDelay: '-4s' }}></div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-warm-200 z-20">
        <div
          className="h-full bg-gradient-to-r from-olive-400 via-terracotta-400 to-dusty-400 transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Top Nav */}
      <div className="w-full max-w-2xl mx-auto px-6 py-6 flex justify-between items-center relative z-20">
        <button
          onClick={handleBack}
          disabled={currentQIndex === 0}
          className={`p-2 text-clay-400 hover:text-clay-500 transition-colors ${currentQIndex === 0 ? 'opacity-0 pointer-events-none' : ''}`}
        >
          <ArrowLeft size={20} strokeWidth={1.5} />
        </button>

        <div className="flex items-center gap-2 px-4 py-2 bg-warm-50 hand-drawn">
          <Flower2 className="w-3 h-3 text-olive-400" />
          <span className="font-serif text-sm text-clay-400">
            {currentQIndex + 1} of {QUESTIONS.length}
          </span>
        </div>

        <div className="w-9"></div>
      </div>

      <div className={`flex-1 flex flex-col justify-center w-full relative z-10 px-6 pb-16 transition-all duration-500 ease-out ${isTransitioning ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'}`}>

        <div className={`mx-auto ${isZodiacQuestion ? 'max-w-3xl' : 'max-w-lg'} w-full`}>

          {/* Question Card */}
          <div className="mb-8 bg-warm-50 hand-drawn p-6 md:p-8 cozy-shadow">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-4 h-4 text-terracotta-400" fill="currentColor" />
              <span className="text-xs font-medium text-clay-400 tracking-wide">
                question {currentQIndex + 1}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-serif text-clay-600 leading-relaxed">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Options */}
          <div className={`${isZodiacQuestion ? 'grid grid-cols-2 md:grid-cols-3 gap-3' : 'flex flex-col gap-3'}`}>
            {currentQuestion.options.map((option, idx) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option)}
                className={`group w-full text-left transition-all duration-300 ease-out bg-warm-50 border-2 border-warm-300 hand-drawn cozy-shadow cozy-shadow-hover ${optionColors[idx % optionColors.length]}
                    ${isZodiacQuestion ? "p-4 flex flex-col items-center text-center" : "p-4 flex items-center gap-4"}`}
              >
                {isZodiacQuestion ? (
                  // --- ZODIAC STYLE ---
                  <>
                    <span className="font-serif text-2xl text-clay-500 mb-2 group-hover:text-terracotta-500 transition-colors">{option.symbol}</span>
                    <span className="block font-serif text-sm text-clay-600 mb-1 group-hover:text-clay-500 transition-colors">{option.text}</span>
                    <span className="block text-[10px] text-clay-400">{option.detail}</span>
                  </>
                ) : (
                  // --- STANDARD STYLE ---
                  <>
                    <div className="w-8 h-8 rounded-full bg-warm-200 flex items-center justify-center flex-shrink-0 group-hover:bg-terracotta-200 transition-colors">
                      <span className="text-xs font-semibold text-clay-500 group-hover:text-terracotta-600">{String.fromCharCode(65 + idx)}</span>
                    </div>
                    <span className="text-sm md:text-base text-clay-600 group-hover:text-clay-500 transition-colors leading-relaxed flex-1">
                      {option.text}
                    </span>
                    <Sparkles className="w-4 h-4 text-clay-200 group-hover:text-terracotta-400 transition-colors opacity-0 group-hover:opacity-100" />
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
