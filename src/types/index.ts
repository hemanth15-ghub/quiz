export interface Question {
  id: string;
  text: string;
  type: 'single' | 'multiple';
  options: string[];
  correctAnswers: number[];
  explanation?: string;
}

export interface QuizLevel {
  id: string;
  name: string;
  questions: Question[];
  unlocked: boolean;
  completed: boolean;
  score: number;
}

export interface UserProgress {
  username: string;
  currentLevel: string;
  currentQuestion: number;
  levelProgress: {
    [key: string]: boolean[];
  };
  completedLevels: string[];
  totalScore: number;
}

export interface QuizState {
  levels: QuizLevel[];
  currentLevel: string | null;
  currentQuestion: number;
  userAnswers: number[];
  showResults: boolean;
  userProgress: UserProgress | null;
}