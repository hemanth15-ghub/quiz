import React, { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { QuestionCard } from './QuestionCard';
import { questionData } from '../data/questions';
import { validateAnswer, getNextLevel } from '../utils/validation';
import { UserProgress } from '../types';
import { ResultsModal } from './ResultsModal';

interface QuizProps {
  level: string;
  progress: UserProgress;
  onUpdateProgress: (updates: Partial<UserProgress>) => void;
  onBackToDashboard: () => void;
  onLevelComplete: () => void;
  onReset: () => void;
}

export function Quiz({ 
  level, 
  progress, 
  onUpdateProgress, 
  onBackToDashboard, 
  onLevelComplete,
  onReset 
}: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [showScoreboard, setShowScoreboard] = useState(false);

  const questions = questionData[level as keyof typeof questionData];
  const currentQuestion = questions[currentQuestionIndex];

  // Only reset currentQuestionIndex when the level changes
  useEffect(() => {
    setCurrentQuestionIndex(0);
  }, [level]);

  const handleAnswer = (answers: number[]) => {
    const correct = validateAnswer(answers, currentQuestion.correctAnswers);
    setIsCorrect(correct);
    setShowResult(true);

    // Update progress - track both correct and incorrect answers
    const updatedLevelProgress = { ...progress.levelProgress };
    if (!updatedLevelProgress[level]) {
      updatedLevelProgress[level] = [false, false, false, false, false];
    }
    updatedLevelProgress[level][currentQuestionIndex] = correct;
    
    // Remove the 3 correct answers requirement logic
    // (Delete all code that checks for hasMinimumScore or requires 3 correct answers)
    // Only check if all questions are answered for level completion
    const allQuestionsAnswered = updatedLevelProgress[level].every((answer, index) => 
      index < questions.length ? answer !== undefined : true
    );
    
    let completedLevels = [...progress.completedLevels];
    if (allQuestionsAnswered && !completedLevels.includes(level)) {
      completedLevels.push(level);
    }

    onUpdateProgress({
      levelProgress: updatedLevelProgress,
      completedLevels
    });

    // Show scoreboard if all questions are answered
    if (currentQuestionIndex === questions.length - 1 && allQuestionsAnswered) {
      setTimeout(() => {
        setShowScoreboard(true);
      }, 800);
    }
    // (No auto-advance or hasMinimumScore logic)
  };

  const handleNextQuestion = () => {
    // Allow progression to next question regardless of correctness
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowResult(false);
      setIsCorrect(false);
    }
  };
  const correctAnswers = progress.levelProgress[level].filter(Boolean).length;
  const totalAnswered = progress.levelProgress[level] ? progress.levelProgress[level].length : 0;
  const progressPercentage = (correctAnswers / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBackToDashboard}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          
          <button
            onClick={() => setShowResetDialog(true)}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Reset Progress</span>
          </button>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800 capitalize">{level} Level</h1>
            <div className="text-gray-600">
              {correctAnswers} of {questions.length} correct ({totalAnswered} answered)
            </div>
          </div>
          
          <div className="mb-2 text-sm text-gray-600">
            Complete all questions to finish this level
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                correctAnswers >= 3 ? 'bg-blue-500' : 'bg-orange-400'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <QuestionCard
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          level={level}
          onAnswer={handleAnswer}
          showResult={showResult}
          isCorrect={isCorrect}
        />

        {/* Navigation */}
        {showResult && currentQuestionIndex < questions.length - 1 && (
          <div className="mt-6 text-center">
            <button
              onClick={handleNextQuestion}
              className={`py-3 px-6 rounded-lg font-semibold transition-colors 
                ${isCorrect ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
            >
              Next Question
            </button>
          </div>
        )}
        {/* Scoreboard Modal */}
        {showScoreboard && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl text-center">
              <h2 className="text-3xl font-bold mb-4">Level Complete!</h2>
              <div className="text-6xl font-bold mb-2 text-blue-600">{correctAnswers} / {questions.length}</div>
              <div className="text-gray-600 mb-6">Correct Answers</div>
              <div className="mb-6">
                <span className="text-lg font-semibold">{progress.username}</span>, you scored <span className="font-bold">{correctAnswers}</span> out of <span className="font-bold">{questions.length}</span> in the <span className="capitalize">{level}</span> level.
              </div>
              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => {
                    setShowScoreboard(false);
                    onBackToDashboard();
                    // Always call onLevelComplete when user leaves the scoreboard
                    onLevelComplete();
                  }}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Back to Dashboard
                </button>
                <button
                  onClick={() => {
                    setShowScoreboard(false);
                    setCurrentQuestionIndex(0);
                    setShowResult(false);
                    setIsCorrect(false);
                  }}
                  className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Retry Level
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reset Confirmation Dialog */}
      {showResetDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Reset Progress?</h3>
            <p className="text-gray-600 mb-6">
              This will clear all your progress and you'll need to start from the beginning. This action cannot be undone.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowResetDialog(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onReset();
                  setShowResetDialog(false);
                }}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}