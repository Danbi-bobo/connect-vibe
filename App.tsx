import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Quiz } from './components/Quiz';
import { ResultPage } from './components/ResultPage';
import { AudioPlayer } from './components/AudioPlayer';
import { QuizResult } from './types';
import { supabase } from '@/src/integrations/supabase/client';

type ViewState = 'landing' | 'quiz' | 'result';

function App() {
  const [view, setView] = useState<ViewState>('landing');
  const [result, setResult] = useState<QuizResult | null>(null);

  const handleStart = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setView('quiz');
  };

  const saveQuizResult = async (quizResult: QuizResult) => {
    try {
      const { error } = await supabase
        .from('quiz_results')
        .insert({
          email: quizResult.email || null,
          archetype: quizResult.archetype,
          sub_need: quizResult.subNeed,
          preference: quizResult.preference,
          zodiac: quizResult.zodiac || null,
          answers: quizResult.answers ? JSON.parse(JSON.stringify(quizResult.answers)) : null,
        } as any);

      if (error) {
        console.error('Error saving quiz result:', error);
      }
    } catch (err) {
      console.error('Failed to save quiz result:', err);
    }
  };

  const handleQuizComplete = async (quizResult: QuizResult) => {
    setResult(quizResult);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setView('result');
    
    // Save to database
    await saveQuizResult(quizResult);
  };

  const handleRetake = () => {
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setView('landing');
  };

  return (
    <main className="w-full min-h-screen text-stone-800 font-sans selection:bg-stone-200 selection:text-stone-900">
      <AudioPlayer />
      {view === 'landing' && <LandingPage onStart={handleStart} />}
      {view === 'quiz' && <Quiz onComplete={handleQuizComplete} />}
      {view === 'result' && result && <ResultPage result={result} onRetake={handleRetake} />}
    </main>
  );
}

export default App;
