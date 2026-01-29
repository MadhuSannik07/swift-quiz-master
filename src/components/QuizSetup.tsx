import { motion } from 'framer-motion';
import { QuizCategory, Difficulty, getDifficultyConfig } from '@/data/quizData';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface QuizSetupProps {
  categories: QuizCategory[];
  selectedCategory: QuizCategory | null;
  selectedDifficulty: Difficulty | null;
  onSelectCategory: (category: QuizCategory) => void;
  onSelectDifficulty: (difficulty: Difficulty) => void;
  onStartQuiz: () => void;
}

const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

export const QuizSetup = ({
  categories,
  selectedCategory,
  selectedDifficulty,
  onSelectCategory,
  onSelectDifficulty,
  onStartQuiz,
}: QuizSetupProps) => {
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          <span className="text-gradient">QuizMaster</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto">
          Challenge yourself with timed quizzes across various topics
        </p>
      </motion.div>

      {/* Category Selection */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl mb-10"
      >
        <motion.h2
          variants={itemVariants}
          className="text-xl font-semibold text-center mb-6 text-foreground"
        >
          Choose a Category
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectCategory(category)}
              className={cn(
                'p-5 rounded-xl transition-all duration-300 flex flex-col items-center gap-3',
                'bg-card border-2 shadow-md hover:shadow-lg',
                selectedCategory?.id === category.id
                  ? 'border-primary shadow-glow ring-2 ring-primary/20'
                  : 'border-transparent hover:border-primary/30'
              )}
            >
              <span className="text-4xl">{category.icon}</span>
              <span className="font-semibold text-sm text-card-foreground">
                {category.name}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Difficulty Selection */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: selectedCategory ? 1 : 0.4 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md mb-10"
      >
        <h2 className="text-xl font-semibold text-center mb-6 text-foreground">
          Select Difficulty
        </h2>
        <div className="flex gap-4 justify-center">
          {difficulties.map((difficulty) => {
            const config = getDifficultyConfig(difficulty);
            return (
              <motion.button
                key={difficulty}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                disabled={!selectedCategory}
                onClick={() => onSelectDifficulty(difficulty)}
                className={cn(
                  'px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300',
                  'border-2 disabled:opacity-50 disabled:cursor-not-allowed',
                  selectedDifficulty === difficulty
                    ? difficulty === 'easy'
                      ? 'bg-success text-success-foreground border-success shadow-md'
                      : difficulty === 'medium'
                      ? 'bg-accent text-accent-foreground border-accent shadow-md'
                      : 'bg-destructive text-destructive-foreground border-destructive shadow-md'
                    : 'bg-card text-card-foreground border-border hover:border-primary/50'
                )}
              >
                {config.label}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Start Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: selectedCategory && selectedDifficulty ? 1 : 0.4,
          scale: selectedCategory && selectedDifficulty ? 1 : 0.95,
        }}
        transition={{ duration: 0.3 }}
      >
        <Button
          size="lg"
          disabled={!selectedCategory || !selectedDifficulty}
          onClick={onStartQuiz}
          className="px-12 py-6 text-lg font-bold gradient-primary text-primary-foreground shadow-lg hover:shadow-glow transition-all duration-300 disabled:opacity-50"
        >
          Start Quiz
        </Button>
      </motion.div>

      {/* Info */}
      {selectedCategory && selectedDifficulty && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-sm text-muted-foreground text-center"
        >
          {selectedCategory.questions[selectedDifficulty].length} questions •{' '}
          {getDifficultyConfig(selectedDifficulty).multiplier}x score multiplier
        </motion.p>
      )}
    </div>
  );
};
