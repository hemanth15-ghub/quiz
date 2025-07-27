import React from 'react';
import { Lock, CheckCircle, PlayCircle, Trophy } from 'lucide-react';
import { UserProgress } from '../types';

interface DashboardProps {
  progress: UserProgress;
  onLevelSelect: (level: string) => void;
}

export function Dashboard({ progress, onLevelSelect }: DashboardProps) {
  const levels = [
    { 
      id: 'beginner', 
      name: 'Beginner', 
      description: 'C basics & Python fundamentals',
      color: 'green',
      icon: PlayCircle
    },
    { 
      id: 'intermediate', 
      name: 'Intermediate', 
      description: 'JavaScript ES6+ & Java OOP',
      color: 'blue',
      icon: PlayCircle
    },
    { 
      id: 'advanced', 
      name: 'Advanced', 
      description: 'TypeScript, React & Node.js',
      color: 'purple',
      icon: PlayCircle
    },
    { 
      id: 'master', 
      name: 'Master', 
      description: 'SQL, React optimization & frameworks',
      color: 'red',
      icon: Trophy
    }
  ];

  const getLevelStatus = (levelId: string) => {
    // Ensure level progress exists
    if (!progress.levelProgress[levelId]) {
      return {
        completed: false,
        unlocked: levelId === 'beginner',
        current: progress.currentLevel === levelId,
        correctAnswers: 0,
        allQuestionsAnswered: false,
        hasMinimumScore: false
      };
    }
    
    const levelProgress = progress.levelProgress[levelId];
    const correctAnswers = levelProgress.filter(Boolean).length;
    const allQuestionsAnswered = levelProgress.every(answer => answer !== undefined);
    const hasMinimumScore = correctAnswers >= 3;
    const completed = allQuestionsAnswered && hasMinimumScore;
    
    // Check if level is unlocked
    let unlocked = levelId === 'beginner';
    if (levelId !== 'beginner') {
      const previousLevel = getPreviousLevel(levelId);
      if (previousLevel && progress.levelProgress[previousLevel]) {
        const prevCorrectAnswers = progress.levelProgress[previousLevel].filter(Boolean).length;
        unlocked = prevCorrectAnswers >= 3;
      }
    }
    
    const current = progress.currentLevel === levelId;

    return { completed, unlocked, current, correctAnswers, allQuestionsAnswered, hasMinimumScore };
  };

  const getPreviousLevel = (currentLevel: string): string => {
    const levelOrder = ['beginner', 'intermediate', 'advanced', 'master'];
    const currentIndex = levelOrder.indexOf(currentLevel);
    return currentIndex > 0 ? levelOrder[currentIndex - 1] : '';
  };

  const colorClasses = {
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      button: 'bg-green-600 hover:bg-green-700',
      progress: 'bg-green-500'
    },
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      button: 'bg-blue-600 hover:bg-blue-700',
      progress: 'bg-blue-500'
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-800',
      button: 'bg-purple-600 hover:bg-purple-700',
      progress: 'bg-purple-500'
    },
    red: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      button: 'bg-red-600 hover:bg-red-700',
      progress: 'bg-red-500'
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Progressive Quiz Dashboard</h1>
          <p className="text-gray-600">Welcome back, <span className="font-semibold">{progress.username}</span>!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {levels.map((level) => {
            const { completed, unlocked, current, correctAnswers, allQuestionsAnswered, hasMinimumScore } = getLevelStatus(level.id);
            const colors = colorClasses[level.color as keyof typeof colorClasses];
            const Icon = level.icon;

            return (
              <div
                key={level.id}
                className={`${colors.bg} ${colors.border} border-2 rounded-xl p-6 transition-all duration-200 ${
                  unlocked ? 'hover:shadow-lg cursor-pointer' : 'opacity-60'
                } ${current ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => unlocked && onLevelSelect(level.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-8 h-8 ${colors.text}`} />
                    <div>
                      <h3 className={`text-xl font-bold ${colors.text}`}>{level.name}</h3>
                      <p className="text-gray-600 text-sm">{level.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {completed && <CheckCircle className="w-6 h-6 text-blue-500" />}
                    {!unlocked && <Lock className="w-6 h-6 text-gray-400" />}
                    {current && (
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm text-gray-600">{correctAnswers} / 5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 ${colors.progress} rounded-full transition-all duration-500`}
                      style={{ width: `${(correctAnswers / 5) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    {completed ? 'Completed' : 
                     allQuestionsAnswered && !hasMinimumScore ? `Need ${3 - correctAnswers} more correct` :
                     unlocked ? 'Available' : 'Locked'}
                  </div>
                  {unlocked && (
                    <button
                      className={`${colors.button} text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onLevelSelect(level.id);
                      }}
                    >
                      {current ? 'Continue' : completed ? 'Review' : 'Start'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}