import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface QuizTimerProps {
  timeLimit: number;
  onTimeUp: () => void;
  isPaused?: boolean;
  questionIndex: number;
}

export const QuizTimer = ({ timeLimit, onTimeUp, isPaused = false, questionIndex }: QuizTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    setTimeLeft(timeLimit);
  }, [timeLimit, questionIndex]);

  useEffect(() => {
    if (isPaused || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, timeLeft, onTimeUp, questionIndex]);

  const percentage = (timeLeft / timeLimit) * 100;
  const isLow = percentage <= 33;
  const isMedium = percentage > 33 && percentage <= 66;

  return (
    <div className="relative flex items-center justify-center">
      {/* Background circle */}
      <svg className="w-20 h-20 md:w-24 md:h-24 transform -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r="45%"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          className="text-muted"
        />
        <motion.circle
          cx="50%"
          cy="50%"
          r="45%"
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 45}`}
          strokeDashoffset={`${2 * Math.PI * 45 * (1 - percentage / 100)}`}
          className={cn(
            'transition-all duration-300',
            isLow ? 'text-destructive' : isMedium ? 'text-accent' : 'text-primary'
          )}
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: `${2 * Math.PI * 45 * (1 - percentage / 100)}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </svg>

      {/* Pulsing ring when low */}
      {isLow && (
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-destructive"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}

      {/* Time display */}
      <div className="absolute flex flex-col items-center">
        <motion.span
          key={timeLeft}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className={cn(
            'text-2xl md:text-3xl font-bold',
            isLow ? 'text-destructive' : isMedium ? 'text-accent' : 'text-primary'
          )}
        >
          {timeLeft}
        </motion.span>
        <span className="text-xs text-muted-foreground">seconds</span>
      </div>
    </div>
  );
};
