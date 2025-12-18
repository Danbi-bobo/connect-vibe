import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Quiz } from './components/Quiz';
import { ResultPage } from './components/ResultPage';
import { AudioPlayer } from './components/AudioPlayer';
import { QuizResult } from './types';

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
    // Note: Database saving functionality is disabled (Supabase not configured)
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
