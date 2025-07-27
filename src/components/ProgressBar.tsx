import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  level: string;
  className?: string;
}

export function ProgressBar({ current, total, level, className = '' }: ProgressBarProps) {
  const percentage = (current / total) * 100;
  
  const levelColors = {
    beginner: 'bg-blue-500',
    intermediate: 'bg-blue-500',
    advanced: 'bg-blue-600',
    master: 'bg-blue-700'
  };

  const levelBgColors = {
    beginner: 'bg-blue-100',
    intermediate: 'bg-blue-100',
    advanced: 'bg-blue-100',
    master: 'bg-blue-100'
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 capitalize">
          {level} Level
        </span>
        <span className="text-sm text-gray-600">
          {current} / {total}
        </span>
      </div>
      <div className={`w-full h-3 ${levelBgColors[level as keyof typeof levelBgColors]} rounded-full overflow-hidden`}>
        <div
          className={`h-full ${levelColors[level as keyof typeof levelColors]} transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}