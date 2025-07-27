export function validateAnswer(userAnswers: number[], correctAnswers: number[]): boolean {
  if (userAnswers.length !== correctAnswers.length) {
    return false;
  }
  
  const sortedUser = [...userAnswers].sort();
  const sortedCorrect = [...correctAnswers].sort();
  
  return sortedUser.every((answer, index) => answer === sortedCorrect[index]);
}

export function calculateScore(levelProgress: { [key: string]: boolean[] }): number {
  const totalQuestions = Object.values(levelProgress).flat().length;
  const correctAnswers = Object.values(levelProgress).flat().filter(Boolean).length;
  
  return Math.round((correctAnswers / totalQuestions) * 100);
}

export function getScoreMessage(score: number, username: string): string {
  if (score < 50) return `Poor Performance - Keep practicing, ${username}!`;
  if (score < 70) return `Not Bad - You're making progress, ${username}!`;
  if (score < 80) return `Good - Well done, ${username}!`;
  if (score < 90) return `Great - Excellent work, ${username}!`;
  return `Stanford University Level - Outstanding achievement, ${username}!`;
}

export function getNextLevel(currentLevel: string): string | null {
  const levels = ['beginner', 'intermediate', 'advanced', 'master'];
  const currentIndex = levels.indexOf(currentLevel);
  return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : null;
}

export function canUnlockNextLevel(levelProgress: boolean[]): boolean {
  const correctAnswers = levelProgress.filter(Boolean).length;
  return correctAnswers >= 3;
}