import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Quiz } from './components/Quiz';
import { ResultPage } from './components/ResultPage';
import { AudioPlayer } from './components/AudioPlayer';
import { QuizResult } from './types';
import { supabase } from './src/integrations/supabase/client';
import type { Json } from './src/integrations/supabase/types';

type ViewState = 'landing' | 'quiz' | 'result';

function App() {
  const [view, setView] = useState<ViewState>('landing');
  const [result, setResult] = useState<QuizResult | null>(null);

  const handleStart = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setView('quiz');
  };



  const handleQuizComplete = async (quizResult: QuizResult) => {
    setResult(quizResult);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setView('result');
    
    // Save quiz result to database
    try {
      const { error } = await supabase
        .from('quiz_results')
        .insert([{
          archetype: quizResult.archetype,
          sub_need: quizResult.subNeed,
          preference: quizResult.preference || null,
          zodiac: quizResult.zodiac || null,
          email: quizResult.email || null,
          answers: (quizResult.answers as unknown as Json) || null
        }]);
      
      if (error) {
        console.error('Error saving quiz result:', error);
      } else {
        console.log('✅ Quiz result saved successfully');
      }
    } catch (err) {
      console.error('Failed to save quiz result:', err);
    }
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
