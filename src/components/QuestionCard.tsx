import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Info } from 'lucide-react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  level: string;
  onAnswer: (answers: number[]) => void;
  showResult: boolean;
  isCorrect: boolean;
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  level,
  onAnswer,
  showResult,
  isCorrect
}: QuestionCardProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSelectedAnswers([]);
    setSubmitted(false);
  }, [question.id]);

  const handleOptionChange = (optionIndex: number) => {
    if (submitted) return;

    if (question.type === 'single') {
      setSelectedAnswers([optionIndex]);
    } else {
      setSelectedAnswers(prev => 
        prev.includes(optionIndex)
          ? prev.filter(i => i !== optionIndex)
          : [...prev, optionIndex]
      );
    }
  };

  const handleSubmit = () => {
    if (selectedAnswers.length === 0) return;
    setSubmitted(true);
    onAnswer(selectedAnswers);
  };

  const getOptionClassName = (optionIndex: number) => {
    const baseClasses = "flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200";
    
    if (!submitted) {
      return `${baseClasses} ${
        selectedAnswers.includes(optionIndex)
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      }`;
    }

    // Show results
    if (question.correctAnswers.includes(optionIndex)) {
      return `${baseClasses} border-green-500 bg-green-50`;
    } else if (selectedAnswers.includes(optionIndex)) {
      return `${baseClasses} border-red-500 bg-red-50`;
    }
    
    return `${baseClasses} border-gray-200 bg-gray-50 opacity-60`;
  };

  const levelColors = {
    beginner: 'text-blue-600',
    intermediate: 'text-blue-600',
    advanced: 'text-blue-700',
    master: 'text-blue-800'
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className={`text-lg font-semibold capitalize ${levelColors[level as keyof typeof levelColors]}`}>
            {level} Level
          </span>
          <span className="text-gray-600 font-medium">
            Question {questionNumber} of {totalQuestions}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="h-2 bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-start space-x-3 mb-4">
          <Info className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
          <div className="text-sm text-gray-600">
            {question.type === 'single' ? (
              <span>Select <strong>one</strong> answer (○)</span>
            ) : (
              <span>Select <strong>all that apply</strong> (☐)</span>
            )}
          </div>
        </div>
        
        <h2 className="text-xl font-semibold text-gray-800 leading-relaxed">
          {question.text}
        </h2>
      </div>

      <div className="space-y-3 mb-8">
        {question.options.map((option, index) => (
          <label
            key={index}
            className={getOptionClassName(index)}
            onClick={() => handleOptionChange(index)}
          >
            <div className="flex items-center space-x-3">
              {question.type === 'single' ? (
                <div className="relative">
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    checked={selectedAnswers.includes(index)}
                    onChange={() => {}}
                    className="w-5 h-5 text-blue-600"
                    disabled={submitted}
                  />
                  {submitted && question.correctAnswers.includes(index) && (
                    <CheckCircle className="absolute -top-1 -right-1 w-4 h-4 text-green-500" />
                  )}
                  {submitted && selectedAnswers.includes(index) && !question.correctAnswers.includes(index) && (
                    <XCircle className="absolute -top-1 -right-1 w-4 h-4 text-red-500" />
                  )}
                </div>
              ) : (
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={selectedAnswers.includes(index)}
                    onChange={() => {}}
                    className="w-5 h-5 text-blue-600 rounded"
                    disabled={submitted}
                  />
                  {submitted && question.correctAnswers.includes(index) && (
                    <CheckCircle className="absolute -top-1 -right-1 w-4 h-4 text-green-500" />
                  )}
                  {submitted && selectedAnswers.includes(index) && !question.correctAnswers.includes(index) && (
                    <XCircle className="absolute -top-1 -right-1 w-4 h-4 text-red-500" />
                  )}
                </div>
              )}
              <span className="text-gray-800 flex-1">{option}</span>
            </div>
          </label>
        ))}
      </div>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={selectedAnswers.length === 0}
          className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Answer
        </button>
      ) : (
        <div className="space-y-4">
          <div className={`p-4 rounded-lg flex items-center space-x-3 ${
            isCorrect ? 'bg-blue-50 border border-blue-200' : 'bg-red-50 border border-red-200'
          }`}>
            {isCorrect ? (
              <CheckCircle className="w-6 h-6 text-blue-600" />
            ) : (
              <XCircle className="w-6 h-6 text-red-600" />
            )}
            <span className={`font-semibold ${isCorrect ? 'text-blue-800' : 'text-red-800'}`}>
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </span>
          </div>
          
          {question.explanation && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800">{question.explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}