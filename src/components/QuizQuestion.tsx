import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question, Difficulty, getDifficultyConfig } from '@/data/quizData';
import { QuizTimer } from './QuizTimer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Flag } from 'lucide-react';

interface QuizQuestionProps {
  questions: Question[];
  currentIndex: number;
  difficulty: Difficulty;
  categoryName: string;
  answers: (number | null)[];
  timeSpent: number[];
  onAnswer: (questionIndex: number, answerIndex: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onNavigate: (index: number) => void;
  onTimeUp: () => void;
  onSubmit: () => void;
}

export const QuizQuestion = ({
  questions,
  currentIndex,
  difficulty,
  categoryName,
  answers,
  timeSpent,
  onAnswer,
  onNext,
  onPrev,
  onNavigate,
  onTimeUp,
  onSubmit,
}: QuizQuestionProps) => {
  const [startTime, setStartTime] = useState<number>(Date.now());
  const currentQuestion = questions[currentIndex];
  const selectedAnswer = answers[currentIndex];
  const difficultyConfig = getDifficultyConfig(difficulty);
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSelectAnswer = useCallback((answerIndex: number) => {
    const elapsed = (Date.now() - startTime) / 1000;
    onAnswer(currentIndex, answerIndex);
  }, [currentIndex, onAnswer, startTime]);

  const handleTimeUp = useCallback(() => {
    onTimeUp();
  }, [onTimeUp]);

  const handleNavigate = useCallback((index: number) => {
    setStartTime(Date.now());
    onNavigate(index);
  }, [onNavigate]);

  const handleNext = useCallback(() => {
    setStartTime(Date.now());
    onNext();
  }, [onNext]);

  const handlePrev = useCallback(() => {
    setStartTime(Date.now());
    onPrev();
  }, [onPrev]);

  const allAnswered = answers.every((a) => a !== null);

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-gradient">{categoryName}</span>
          <span
            className={cn(
              'px-3 py-1 rounded-full text-xs font-semibold',
              difficulty === 'easy'
                ? 'bg-success/20 text-success'
                : difficulty === 'medium'
                ? 'bg-accent/20 text-accent'
                : 'bg-destructive/20 text-destructive'
            )}
          >
            {difficultyConfig.label}
          </span>
        </div>
        <QuizTimer
          timeLimit={currentQuestion.timeLimit}
          onTimeUp={handleTimeUp}
          questionIndex={currentIndex}
        />
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Navigation Dots */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {questions.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavigate(index)}
            className={cn(
              'w-8 h-8 md:w-10 md:h-10 rounded-full text-xs font-semibold transition-all duration-200',
              'border-2 flex items-center justify-center',
              index === currentIndex
                ? 'bg-primary text-primary-foreground border-primary shadow-glow'
                : answers[index] !== null
                ? 'bg-success/20 text-success border-success'
                : 'bg-card text-card-foreground border-border hover:border-primary/50'
            )}
          >
            {index + 1}
          </motion.button>
        ))}
      </div>

      {/* Question Card */}
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl"
          >
            <div className="bg-card rounded-2xl shadow-xl p-6 md:p-8 border border-border">
              <h2 className="text-xl md:text-2xl font-bold text-card-foreground mb-8 text-center">
                {currentQuestion.question}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectAnswer(index)}
                    className={cn(
                      'p-4 md:p-5 rounded-xl text-left transition-all duration-200',
                      'border-2 font-medium',
                      selectedAnswer === index
                        ? 'bg-primary text-primary-foreground border-primary shadow-glow'
                        : 'bg-secondary text-secondary-foreground border-transparent hover:border-primary/50 hover:shadow-md'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0',
                          selectedAnswer === index
                            ? 'bg-primary-foreground/20 text-primary-foreground'
                            : 'bg-primary/10 text-primary'
                        )}
                      >
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        {currentIndex === questions.length - 1 ? (
          <Button
            onClick={onSubmit}
            disabled={!allAnswered}
            className="gap-2 gradient-primary text-primary-foreground px-8"
          >
            <Flag className="w-4 h-4" />
            Submit Quiz
          </Button>
        ) : (
          <Button onClick={handleNext} className="gap-2">
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
