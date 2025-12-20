import React, { useState, useEffect } from 'react';
import { QUESTIONS } from '../constants';
import { ArchetypeID, SubNeedID, QuizResult, DetailedAnswer } from '../types';
import { calculateArchetype, calculateSubNeed } from '../utils/quizLogic';
import { ArrowLeft, Moon, Star, Sparkles, Send } from 'lucide-react';
import { trackEvent, trackCustomEvent } from '../utils/facebookPixel';

interface QuizProps {
  onComplete: (result: QuizResult) => void;
}

export const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: number; optionId: string; mapsTo?: SubNeedID; questionText: string; answerText: string }[]>([]);
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

    // Track question completion with Meta Pixel - unique event name per question
    const questionNumber = currentQIndex + 1;
    trackCustomEvent(`QuizQuestion${questionNumber}Completed`, {
      question_number: questionNumber,
      question_id: currentQuestion.id,
      question_text: currentQuestion.question,
      answer_id: option.id,
      answer_text: option.text
    });

    setTimeout(() => {
      const newAnswers = [...answers, {
        questionId: currentQuestion.id,
        optionId: option.id,
        mapsTo: option.mapsTo,
        questionText: currentQuestion.question,
        answerText: option.text
      }];
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

    // Build detailed answers array
    const detailedAnswers: DetailedAnswer[] = finalAnswers.map(a => ({
      questionId: a.questionId,
      questionText: a.questionText,
      answerId: a.optionId,
      answerText: a.answerText
    }));

    onComplete({
      archetype,
      subNeed,
      preference,
      zodiac,
      email,
      answers: detailedAnswers
    });
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail || !userEmail.includes('@')) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    
    // Track Lead event with Meta Pixel
    trackEvent('Lead', {
      content_name: 'Quiz Email Capture',
      content_category: 'Quiz Completion',
      email_provided: true
    });
    
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
      <div className="min-h-screen flex flex-col items-center justify-center p-6 pb-20 relative overflow-hidden cosmic-texture animate-fade-in" style={{ backgroundImage: 'url(/celestial-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>

        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-cosmic-600/50 backdrop-blur-sm"></div>

        {/* Floating stars */}
        <div className="absolute top-20 left-20 text-gold-500 star-sparkle" style={{ animationDelay: '0s' }}>
          <Star size={16} fill="currentColor" />
        </div>
        <div className="absolute top-40 right-32 text-gold-400 star-sparkle" style={{ animationDelay: '0.5s' }}>
          <Star size={12} fill="currentColor" />
        </div>
        <div className="absolute bottom-32 left-1/4 text-gold-300 star-sparkle" style={{ animationDelay: '1s' }}>
          <Star size={14} fill="currentColor" />
        </div>

        <div className="max-w-sm w-full relative z-10 text-center">

          {/* Moon icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 bg-cosmic-400/50 rounded-full flex items-center justify-center celestial-glow mystical-border">
              <Send className="w-8 h-8 text-gold-400" />
            </div>
          </div>

          {/* Moon phases decoration */}
          <div className="mb-6 flex justify-center opacity-60">
            <img src="/moon-phases.png" alt="" className="h-8" />
          </div>

          <h2 className="text-4xl md:text-5xl font-display text-gold-300 mb-4 celestial-glow">Almost There</h2>
          <p className="text-white leading-relaxed mb-10 text-sm font-light">
            Enter your email to receive your complete energy blueprint and personalized cosmic guidance
          </p>

          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full p-4 bg-cosmic-400/40 border-2 mystical-border focus:border-gold-500 outline-none transition-all text-white placeholder:text-moon-300 text-center rounded-lg backdrop-blur-md"
                value={userEmail}
                onChange={(e) => { setUserEmail(e.target.value); setEmailError(''); }}
              />
              {emailError && <p className="text-gold-200 text-xs mt-3">{emailError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-gold-600 to-gold-500 text-cosmic-600 rounded-lg transition-all duration-300 hover:from-gold-500 hover:to-gold-400 cosmic-shadow cosmic-shadow-hover text-sm tracking-wider font-medium celestial-glow"
            >
              Reveal My Results ✨
            </button>
          </form>

          <button
            onClick={handleEmailSkip}
            className="mt-6 text-xs text-moon-400 hover:text-gold-400 transition-colors"
          >
            skip for now
          </button>
        </div>
      </div>
    );
  }

  // --- VIEW: QUIZ ---
  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden cosmic-texture pb-20" style={{ backgroundImage: 'url(/celestial-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>

      {/* Overlay */}
      <div className="absolute inset-0 bg-cosmic-600/50 backdrop-blur-sm pointer-events-none"></div>

      {/* Floating stars */}
      <div className="absolute top-24 left-16 text-gold-500 star-sparkle" style={{ animationDelay: '0s' }}>
        <Star size={20} fill="currentColor" />
      </div>
      <div className="absolute top-48 right-20 text-gold-400 star-sparkle" style={{ animationDelay: '0.7s' }}>
        <Star size={16} fill="currentColor" />
      </div>
      <div className="absolute bottom-40 left-1/3 text-gold-300 star-sparkle" style={{ animationDelay: '1.2s' }}>
        <Star size={18} fill="currentColor" />
      </div>
      <div className="absolute top-1/3 right-1/4 text-ethereal-200 star-sparkle" style={{ animationDelay: '0.3s' }}>
        <Star size={12} fill="currentColor" />
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-cosmic-700/50 z-20 backdrop-blur-sm">
        <div
          className="h-full bg-gradient-to-r from-ethereal-400 via-gold-500 to-gold-400 transition-all duration-700 ease-out celestial-glow"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Top Nav */}
      <div className="w-full max-w-2xl mx-auto px-6 py-8 flex justify-between items-center relative z-20">
        <button
          onClick={handleBack}
          disabled={currentQIndex === 0}
          className={`p-2 text-gold-400 hover:text-gold-300 transition-colors ${currentQIndex === 0 ? 'opacity-0 pointer-events-none' : ''}`}
        >
          <ArrowLeft size={22} strokeWidth={1.5} />
        </button>

        <div className="flex items-center gap-3 px-5 py-2.5 bg-cosmic-400/40 rounded-full mystical-border backdrop-blur-md">
          <Moon className="w-4 h-4 text-gold-400" />
          <span className="font-serif text-sm text-moon-200">
            {currentQIndex + 1} of {QUESTIONS.length}
          </span>
        </div>

        <div className="w-10"></div>
      </div>

      <div className={`flex-1 flex flex-col justify-center w-full relative z-10 px-4 py-8 md:px-6 md:py-16 transition-all duration-500 ease-out max-h-screen ${isTransitioning ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'}`}>

        <div className={`mx-auto ${isZodiacQuestion ? 'max-w-3xl' : 'max-w-lg'} w-full`}>

          {/* Question Card */}
          <div className="mb-6 md:mb-10 bg-cosmic-400/50 rounded-2xl p-5 md:p-10 cosmic-shadow mystical-border backdrop-blur-md">
            <div className="flex items-center gap-2 mb-3 md:mb-5">
              <Sparkles className="w-4 h-4 text-gold-300" />
              <span className="text-xs font-medium text-gold-200 tracking-widest uppercase">
                Question {currentQIndex + 1}
              </span>
            </div>
            <h2 className="text-xl md:text-3xl font-serif text-white leading-relaxed">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Options */}
          <div className={`${isZodiacQuestion ? 'grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4' : 'flex flex-col gap-3 md:gap-4'} max-h-[50vh] overflow-y-auto`}>
            {currentQuestion.options.map((option, idx) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option)}
                className={`group w-full text-left transition-all duration-300 ease-out bg-cosmic-400/40 mystical-border rounded-xl cosmic-shadow cosmic-shadow-hover backdrop-blur-md hover:bg-cosmic-300/60 hover:border-gold-400
                    ${isZodiacQuestion ? "p-4 md:p-5 flex flex-col items-center text-center" : "p-3 md:p-5 flex items-center gap-3 md:gap-4"}`}
              >
                {isZodiacQuestion ? (
                  // --- ZODIAC STYLE ---
                  <>
                    <span className="font-serif text-2xl md:text-3xl text-gold-300 mb-2 md:mb-3 group-hover:text-gold-200 transition-colors group-hover:scale-110 transform duration-300">{option.symbol}</span>
                    <span className="block font-serif text-sm md:text-base text-white mb-1 group-hover:text-gold-100 transition-colors">{option.text}</span>
                    <span className="block text-xs text-moon-200">{option.detail}</span>
                  </>
                ) : (
                  // --- STANDARD STYLE ---
                  <>
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-cosmic-300/60 mystical-border flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500/40 group-hover:border-gold-400 transition-all">
                      <span className="text-xs md:text-sm font-semibold text-gold-300 group-hover:text-gold-200">{String.fromCharCode(65 + idx)}</span>
                    </div>
                    <span className="text-sm md:text-base text-white group-hover:text-gold-100 transition-colors leading-relaxed flex-1">
                      {option.text}
                    </span>
                    <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-gold-500 transition-all opacity-0 group-hover:opacity-100 star-sparkle" />
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
