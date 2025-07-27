import React, { useState, useEffect } from 'react';
import { UsernameModal } from './components/UsernameModal';
import { Dashboard } from './components/Dashboard';
import { Quiz } from './components/Quiz';
import { ResultsModal } from './components/ResultsModal';
import { useQuizProgress } from './hooks/useLocalStorage';
import { calculateScore, getNextLevel } from './utils/validation';

type AppState = 'username' | 'dashboard' | 'quiz' | 'results';

function App() {
  const [appState, setAppState] = useState<AppState>('username');
  const [currentLevel, setCurrentLevel] = useState<string>('beginner');
  const { progress, updateProgress, resetProgress, initializeProgress } = useQuizProgress();

  useEffect(() => {
    if (progress && appState === 'username') {
      setAppState('dashboard');
    }
  }, [progress]);

  const handleUsernameSubmit = (username: string) => {
    initializeProgress(username);
    setAppState('dashboard');
  };

  const handleLevelSelect = (level: string) => {
    setCurrentLevel(level);
    updateProgress({ currentLevel: level });
    setAppState('quiz');
  };

  const handleBackToDashboard = () => {
    setAppState('dashboard');
  };

  const handleLevelComplete = () => {
    if (!progress) return;

    // Check if all levels are completed
    const allLevelsCompleted = ['beginner', 'intermediate', 'advanced', 'master'].every(level =>
      progress.levelProgress[level].length === 5 && progress.levelProgress[level].every(answer => answer !== undefined)
    );

    if (allLevelsCompleted) {
      // Calculate average score across all levels
      const allLevels = ['beginner', 'intermediate', 'advanced', 'master'];
      let totalScore = 0;
      allLevels.forEach(level => {
        const levelAnswers = progress.levelProgress[level];
        const correct = levelAnswers.filter(Boolean).length;
        totalScore += (correct / levelAnswers.length) * 100;
      });
      const averageScore = Math.round(totalScore / allLevels.length);
      updateProgress({ totalScore: averageScore });
      setAppState('results');
    } else {
      // Move to next level if available
      const nextLevel = getNextLevel(currentLevel);
      if (nextLevel) {
        setCurrentLevel(nextLevel);
        updateProgress({ currentLevel: nextLevel });
        setAppState('dashboard');
      } else {
        setAppState('dashboard');
      }
    }
  };

  const handleReset = () => {
    resetProgress();
    setAppState('username');
  };

  const handleRestart = () => {
    resetProgress();
    setAppState('username');
  };

  if (!progress && appState !== 'username') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {appState === 'username' && (
        <UsernameModal onSubmit={handleUsernameSubmit} />
      )}

      {appState === 'dashboard' && progress && (
        <Dashboard
          progress={progress}
          onLevelSelect={handleLevelSelect}
        />
      )}

      {appState === 'quiz' && progress && (
        <Quiz
          level={currentLevel}
          progress={progress}
          onUpdateProgress={updateProgress}
          onBackToDashboard={handleBackToDashboard}
          onLevelComplete={handleLevelComplete}
          onReset={handleReset}
        />
      )}

      {appState === 'results' && progress && (
        <ResultsModal
          score={progress.totalScore}
          username={progress.username}
          onRestart={handleRestart}
          onBackToDashboard={handleBackToDashboard}
        />
      )}
    </div>
  );
}

export default App;