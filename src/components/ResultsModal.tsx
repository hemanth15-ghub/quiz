import React from 'react';
import { Trophy, Star, RotateCcw, Home } from 'lucide-react';
import { getScoreMessage } from '../utils/validation';

interface ResultsModalProps {
  score: number;
  username: string;
  onRestart: () => void;
  onBackToDashboard: () => void;
}

export function ResultsModal({ score, username, onRestart, onBackToDashboard }: ResultsModalProps) {
  const message = getScoreMessage(score, username);
  const isExceptional = score >= 90;
  const isGood = score >= 70;

  const getScoreColor = () => {
    if (score >= 90) return 'text-yellow-600';
    if (score >= 80) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreIcon = () => {
    if (score >= 90) return <Trophy className="w-16 h-16 text-yellow-500" />;
    if (score >= 70) return <Star className="w-16 h-16 text-blue-500" />;
    return <Star className="w-16 h-16 text-gray-500" />;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center">
          {/* Icon */}
          <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-gray-50 rounded-full">
            {getScoreIcon()}
          </div>

          {/* Score */}
          <div className="mb-6">
            <div className={`text-6xl font-bold mb-2 ${getScoreColor()}`}>
              {score}%
            </div>
            <div className="text-gray-600">Final Score</div>
          </div>

          {/* Message */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {message.split(' - ')[0]}
            </h3>
            <p className="text-gray-600">
              {message.split(' - ')[1]}
            </p>
          </div>

          {/* Special Achievement */}
          {isExceptional && (
            <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center justify-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                <span className="text-yellow-800 font-semibold">Outstanding Achievement!</span>
              </div>
            </div>
          )}

          {/* Performance Breakdown */}
          <div className="mb-8 text-left">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-2">Performance Breakdown:</div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Total Questions:</span>
                  <span className="font-semibold">20</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Correct Answers:</span>
                  <span className="font-semibold">{Math.round(score * 20 / 100)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Accuracy:</span>
                  <span className={`font-semibold ${getScoreColor()}`}>{score}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onBackToDashboard}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center space-x-2"
            >
              <Home className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
            
            <button
              onClick={onRestart}
              className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Start Over</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}