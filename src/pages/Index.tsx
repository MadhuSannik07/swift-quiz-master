import { useState, useCallback } from 'react';
import { QuizSetup } from '@/components/QuizSetup';
import { QuizQuestion } from '@/components/QuizQuestion';
import { QuizResults } from '@/components/QuizResults';
import { quizCategories, QuizCategory, Difficulty, Question } from '@/data/quizData';

type QuizState = 'setup' | 'playing' | 'results';

const Index = () => {
  const [quizState, setQuizState] = useState<QuizState>('setup');
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeSpent, setTimeSpent] = useState<number[]>([]);
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);

  const questions: Question[] = selectedCategory && selectedDifficulty
    ? selectedCategory.questions[selectedDifficulty]
    : [];

  const handleStartQuiz = useCallback(() => {
    if (!selectedCategory || !selectedDifficulty) return;
    
    const questionCount = selectedCategory.questions[selectedDifficulty].length;
    setAnswers(new Array(questionCount).fill(null));
    setTimeSpent(new Array(questionCount).fill(0));
    setCurrentQuestionIndex(0);
    setQuestionStartTime(Date.now());
    setQuizState('playing');
  }, [selectedCategory, selectedDifficulty]);

  const handleAnswer = useCallback((questionIndex: number, answerIndex: number) => {
    const elapsed = (Date.now() - questionStartTime) / 1000;
    
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = answerIndex;
      return newAnswers;
    });
    
    setTimeSpent((prev) => {
      const newTimeSpent = [...prev];
      if (newTimeSpent[questionIndex] === 0) {
        newTimeSpent[questionIndex] = elapsed;
      }
      return newTimeSpent;
    });
  }, [questionStartTime]);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      const elapsed = (Date.now() - questionStartTime) / 1000;
      setTimeSpent((prev) => {
        const newTimeSpent = [...prev];
        if (newTimeSpent[currentQuestionIndex] === 0) {
          newTimeSpent[currentQuestionIndex] = elapsed;
        }
        return newTimeSpent;
      });
      setCurrentQuestionIndex((prev) => prev + 1);
      setQuestionStartTime(Date.now());
    }
  }, [currentQuestionIndex, questions.length, questionStartTime]);

  const handlePrev = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setQuestionStartTime(Date.now());
    }
  }, [currentQuestionIndex]);

  const handleNavigate = useCallback((index: number) => {
    const elapsed = (Date.now() - questionStartTime) / 1000;
    setTimeSpent((prev) => {
      const newTimeSpent = [...prev];
      if (newTimeSpent[currentQuestionIndex] === 0) {
        newTimeSpent[currentQuestionIndex] = elapsed;
      }
      return newTimeSpent;
    });
    setCurrentQuestionIndex(index);
    setQuestionStartTime(Date.now());
  }, [currentQuestionIndex, questionStartTime]);

  const handleTimeUp = useCallback(() => {
    const currentQuestion = questions[currentQuestionIndex];
    setTimeSpent((prev) => {
      const newTimeSpent = [...prev];
      newTimeSpent[currentQuestionIndex] = currentQuestion.timeLimit;
      return newTimeSpent;
    });
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setQuestionStartTime(Date.now());
    } else {
      setQuizState('results');
    }
  }, [currentQuestionIndex, questions]);

  const handleSubmit = useCallback(() => {
    const elapsed = (Date.now() - questionStartTime) / 1000;
    setTimeSpent((prev) => {
      const newTimeSpent = [...prev];
      if (newTimeSpent[currentQuestionIndex] === 0) {
        newTimeSpent[currentQuestionIndex] = elapsed;
      }
      return newTimeSpent;
    });
    setQuizState('results');
  }, [currentQuestionIndex, questionStartTime]);

  const handleRestart = useCallback(() => {
    handleStartQuiz();
  }, [handleStartQuiz]);

  const handleHome = useCallback(() => {
    setQuizState('setup');
    setSelectedCategory(null);
    setSelectedDifficulty(null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setTimeSpent([]);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {quizState === 'setup' && (
        <QuizSetup
          categories={quizCategories}
          selectedCategory={selectedCategory}
          selectedDifficulty={selectedDifficulty}
          onSelectCategory={setSelectedCategory}
          onSelectDifficulty={setSelectedDifficulty}
          onStartQuiz={handleStartQuiz}
        />
      )}

      {quizState === 'playing' && selectedCategory && selectedDifficulty && (
        <QuizQuestion
          questions={questions}
          currentIndex={currentQuestionIndex}
          difficulty={selectedDifficulty}
          categoryName={selectedCategory.name}
          answers={answers}
          timeSpent={timeSpent}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrev={handlePrev}
          onNavigate={handleNavigate}
          onTimeUp={handleTimeUp}
          onSubmit={handleSubmit}
        />
      )}

      {quizState === 'results' && selectedCategory && selectedDifficulty && (
        <QuizResults
          questions={questions}
          answers={answers}
          timeSpent={timeSpent}
          difficulty={selectedDifficulty}
          categoryName={selectedCategory.name}
          onRestart={handleRestart}
          onHome={handleHome}
        />
      )}
    </div>
  );
};

export default Index;
