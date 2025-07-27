import { useState, useEffect } from 'react';
import { UserProgress } from '../types';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

export function useQuizProgress() {
  const [progress, setProgress] = useLocalStorage<UserProgress | null>('quizProgress', null);

  const updateProgress = (updates: Partial<UserProgress>) => {
    if (progress) {
      setProgress({ ...progress, ...updates });
    }
  };

  const resetProgress = () => {
    setProgress(null);
    localStorage.removeItem('quizProgress');
  };

  const initializeProgress = (username: string): UserProgress => {
    const newProgress: UserProgress = {
      username,
      currentLevel: 'beginner',
      currentQuestion: 0,
      levelProgress: {
        beginner: [],
        intermediate: [],
        advanced: [],
        master: []
      },
      completedLevels: [],
      totalScore: 0
    };
    setProgress(newProgress);
    return newProgress;
  };

  return { progress, updateProgress, resetProgress, initializeProgress };
}