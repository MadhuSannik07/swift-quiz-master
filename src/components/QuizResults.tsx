import { motion } from 'framer-motion';
import { Question, Difficulty, getDifficultyConfig } from '@/data/quizData';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { RotateCcw, Home, CheckCircle, XCircle, Clock, Trophy, Target, TrendingUp } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface QuizResultsProps {
  questions: Question[];
  answers: (number | null)[];
  timeSpent: number[];
  difficulty: Difficulty;
  categoryName: string;
  onRestart: () => void;
  onHome: () => void;
}

export const QuizResults = ({
  questions,
  answers,
  timeSpent,
  difficulty,
  categoryName,
  onRestart,
  onHome,
}: QuizResultsProps) => {
  const difficultyConfig = getDifficultyConfig(difficulty);
  
  const correctCount = questions.reduce((count, question, index) => {
    return count + (answers[index] === question.correctAnswer ? 1 : 0);
  }, 0);
  
  const incorrectCount = questions.length - correctCount;
  const percentage = Math.round((correctCount / questions.length) * 100);
  const baseScore = correctCount * 100;
  const finalScore = Math.round(baseScore * difficultyConfig.multiplier);
  const totalTime = timeSpent.reduce((sum, t) => sum + t, 0);
  const avgTime = totalTime / questions.length;

  const pieData = [
    { name: 'Correct', value: correctCount, color: 'hsl(145, 65%, 42%)' },
    { name: 'Incorrect', value: incorrectCount, color: 'hsl(0, 72%, 51%)' },
  ];

  const barData = questions.map((q, index) => ({
    name: `Q${index + 1}`,
    time: timeSpent[index],
    limit: q.timeLimit,
    isCorrect: answers[index] === q.correctAnswer,
  }));

  const getPerformanceMessage = () => {
    if (percentage >= 90) return { text: 'Outstanding!', emoji: '🏆' };
    if (percentage >= 70) return { text: 'Great Job!', emoji: '🎉' };
    if (percentage >= 50) return { text: 'Good Effort!', emoji: '👍' };
    return { text: 'Keep Practicing!', emoji: '💪' };
  };

  const performance = getPerformanceMessage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="text-6xl mb-4"
          >
            {performance.emoji}
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-2">
            <span className="text-gradient">{performance.text}</span>
          </h1>
          <p className="text-muted-foreground">
            {categoryName} • {difficultyConfig.label}
          </p>
        </motion.div>

        {/* Score Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
        >
          <div className="bg-card rounded-xl p-5 text-center shadow-lg border border-border">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-accent" />
            <p className="text-3xl font-bold text-card-foreground">{finalScore}</p>
            <p className="text-sm text-muted-foreground">Total Score</p>
          </div>
          <div className="bg-card rounded-xl p-5 text-center shadow-lg border border-border">
            <Target className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-3xl font-bold text-card-foreground">{percentage}%</p>
            <p className="text-sm text-muted-foreground">Accuracy</p>
          </div>
          <div className="bg-card rounded-xl p-5 text-center shadow-lg border border-border">
            <CheckCircle className="w-8 h-8 mx-auto mb-2 text-success" />
            <p className="text-3xl font-bold text-card-foreground">{correctCount}/{questions.length}</p>
            <p className="text-sm text-muted-foreground">Correct</p>
          </div>
          <div className="bg-card rounded-xl p-5 text-center shadow-lg border border-border">
            <Clock className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-3xl font-bold text-card-foreground">{avgTime.toFixed(1)}s</p>
            <p className="text-sm text-muted-foreground">Avg. Time</p>
          </div>
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Pie Chart */}
          <motion.div
            variants={itemVariants}
            className="bg-card rounded-xl p-6 shadow-lg border border-border"
          >
            <h3 className="text-lg font-semibold mb-4 text-card-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Answer Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Bar Chart */}
          <motion.div
            variants={itemVariants}
            className="bg-card rounded-xl p-6 shadow-lg border border-border"
          >
            <h3 className="text-lg font-semibold mb-4 text-card-foreground flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Time Per Question
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar
                  dataKey="time"
                  name="Time (s)"
                  radius={[4, 4, 0, 0]}
                >
                  {barData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.isCorrect ? 'hsl(145, 65%, 42%)' : 'hsl(0, 72%, 51%)'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Question Review */}
        <motion.div variants={itemVariants} className="mb-10">
          <h3 className="text-xl font-semibold mb-6 text-foreground">Question Review</h3>
          <div className="space-y-4">
            {questions.map((question, index) => {
              const isCorrect = answers[index] === question.correctAnswer;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    'bg-card rounded-xl p-5 border-l-4 shadow-md',
                    isCorrect ? 'border-l-success' : 'border-l-destructive'
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-success shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-destructive shrink-0" />
                        )}
                        <span className="font-semibold text-card-foreground">
                          Question {index + 1}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({timeSpent[index].toFixed(1)}s)
                        </span>
                      </div>
                      <p className="text-card-foreground mb-3">{question.question}</p>
                      <div className="flex flex-wrap gap-2 text-sm">
                        <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground">
                          Your answer: {answers[index] !== null ? question.options[answers[index]] : 'No answer'}
                        </span>
                        {!isCorrect && (
                          <span className="px-3 py-1 rounded-full bg-success/20 text-success">
                            Correct: {question.options[question.correctAnswer]}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div variants={itemVariants} className="flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={onHome}
            className="gap-2 px-6"
          >
            <Home className="w-4 h-4" />
            Home
          </Button>
          <Button
            onClick={onRestart}
            className="gap-2 px-6 gradient-primary text-primary-foreground"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};
