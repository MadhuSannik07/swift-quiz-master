export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  timeLimit: number; // in seconds
}

export interface QuizCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  questions: {
    easy: Question[];
    medium: Question[];
    hard: Question[];
  };
}

export const quizCategories: QuizCategory[] = [
  {
    id: 'science',
    name: 'Science',
    icon: '🔬',
    description: 'Test your knowledge of the natural world',
    color: 'primary',
    questions: {
      easy: [
        { id: 1, question: 'What planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], correctAnswer: 1, timeLimit: 15 },
        { id: 2, question: 'What is the chemical symbol for water?', options: ['WA', 'H2O', 'HO2', 'W'], correctAnswer: 1, timeLimit: 15 },
        { id: 3, question: 'How many legs does a spider have?', options: ['6', '8', '10', '12'], correctAnswer: 1, timeLimit: 15 },
        { id: 4, question: 'What is the largest organ in the human body?', options: ['Heart', 'Brain', 'Skin', 'Liver'], correctAnswer: 2, timeLimit: 15 },
        { id: 5, question: 'What gas do plants absorb from the atmosphere?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'], correctAnswer: 2, timeLimit: 15 },
      ],
      medium: [
        { id: 1, question: 'What is the speed of light in vacuum?', options: ['300,000 km/s', '150,000 km/s', '500,000 km/s', '1,000,000 km/s'], correctAnswer: 0, timeLimit: 20 },
        { id: 2, question: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi Body'], correctAnswer: 2, timeLimit: 20 },
        { id: 3, question: 'What element has the atomic number 79?', options: ['Silver', 'Gold', 'Platinum', 'Copper'], correctAnswer: 1, timeLimit: 20 },
        { id: 4, question: 'How many bones are in the adult human body?', options: ['186', '206', '226', '246'], correctAnswer: 1, timeLimit: 20 },
        { id: 5, question: 'What is the most abundant gas in Earth\'s atmosphere?', options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Argon'], correctAnswer: 2, timeLimit: 20 },
      ],
      hard: [
        { id: 1, question: 'What is the Schwarzschild radius associated with?', options: ['Quantum Entanglement', 'Black Holes', 'Nuclear Fusion', 'Dark Matter'], correctAnswer: 1, timeLimit: 25 },
        { id: 2, question: 'What is the half-life of Carbon-14?', options: ['5,730 years', '1,500 years', '10,000 years', '50,000 years'], correctAnswer: 0, timeLimit: 25 },
        { id: 3, question: 'Which particle has no electric charge?', options: ['Proton', 'Electron', 'Neutron', 'Positron'], correctAnswer: 2, timeLimit: 25 },
        { id: 4, question: 'What is the Chandrasekhar limit?', options: ['1.4 solar masses', '2.5 solar masses', '0.5 solar masses', '3.0 solar masses'], correctAnswer: 0, timeLimit: 25 },
        { id: 5, question: 'What is the pH of pure water at 25°C?', options: ['6', '7', '8', '7.4'], correctAnswer: 1, timeLimit: 25 },
      ],
    },
  },
  {
    id: 'history',
    name: 'History',
    icon: '📜',
    description: 'Journey through the events of the past',
    color: 'accent',
    questions: {
      easy: [
        { id: 1, question: 'Who was the first President of the United States?', options: ['Abraham Lincoln', 'George Washington', 'Thomas Jefferson', 'John Adams'], correctAnswer: 1, timeLimit: 15 },
        { id: 2, question: 'In which year did World War II end?', options: ['1943', '1944', '1945', '1946'], correctAnswer: 2, timeLimit: 15 },
        { id: 3, question: 'What ancient civilization built the pyramids?', options: ['Greeks', 'Romans', 'Egyptians', 'Mayans'], correctAnswer: 2, timeLimit: 15 },
        { id: 4, question: 'Who discovered America in 1492?', options: ['Vasco da Gama', 'Christopher Columbus', 'Ferdinand Magellan', 'Marco Polo'], correctAnswer: 1, timeLimit: 15 },
        { id: 5, question: 'What wall divided Berlin?', options: ['Great Wall', 'Berlin Wall', 'Hadrian\'s Wall', 'Western Wall'], correctAnswer: 1, timeLimit: 15 },
      ],
      medium: [
        { id: 1, question: 'When did the French Revolution begin?', options: ['1776', '1789', '1799', '1815'], correctAnswer: 1, timeLimit: 20 },
        { id: 2, question: 'Who was the first Emperor of Rome?', options: ['Julius Caesar', 'Augustus', 'Nero', 'Caligula'], correctAnswer: 1, timeLimit: 20 },
        { id: 3, question: 'Which country was NOT part of the Axis powers in WWII?', options: ['Germany', 'Italy', 'Japan', 'Spain'], correctAnswer: 3, timeLimit: 20 },
        { id: 4, question: 'What year did the Titanic sink?', options: ['1910', '1912', '1914', '1916'], correctAnswer: 1, timeLimit: 20 },
        { id: 5, question: 'Who wrote the Declaration of Independence?', options: ['Benjamin Franklin', 'John Adams', 'Thomas Jefferson', 'James Madison'], correctAnswer: 2, timeLimit: 20 },
      ],
      hard: [
        { id: 1, question: 'What treaty ended World War I?', options: ['Treaty of Paris', 'Treaty of Versailles', 'Treaty of Vienna', 'Treaty of Ghent'], correctAnswer: 1, timeLimit: 25 },
        { id: 2, question: 'Who was the last Tsar of Russia?', options: ['Alexander III', 'Nicholas II', 'Peter I', 'Ivan IV'], correctAnswer: 1, timeLimit: 25 },
        { id: 3, question: 'In which year was the Magna Carta signed?', options: ['1066', '1215', '1348', '1453'], correctAnswer: 1, timeLimit: 25 },
        { id: 4, question: 'What was the capital of the Byzantine Empire?', options: ['Rome', 'Athens', 'Constantinople', 'Alexandria'], correctAnswer: 2, timeLimit: 25 },
        { id: 5, question: 'Who led the Mongol Empire at its peak?', options: ['Genghis Khan', 'Kublai Khan', 'Tamerlane', 'Attila'], correctAnswer: 0, timeLimit: 25 },
      ],
    },
  },
  {
    id: 'geography',
    name: 'Geography',
    icon: '🌍',
    description: 'Explore countries, capitals, and landmarks',
    color: 'success',
    questions: {
      easy: [
        { id: 1, question: 'What is the largest continent?', options: ['Africa', 'North America', 'Asia', 'Europe'], correctAnswer: 2, timeLimit: 15 },
        { id: 2, question: 'What is the capital of France?', options: ['London', 'Berlin', 'Madrid', 'Paris'], correctAnswer: 3, timeLimit: 15 },
        { id: 3, question: 'Which ocean is the largest?', options: ['Atlantic', 'Indian', 'Pacific', 'Arctic'], correctAnswer: 2, timeLimit: 15 },
        { id: 4, question: 'What is the longest river in the world?', options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'], correctAnswer: 1, timeLimit: 15 },
        { id: 5, question: 'How many continents are there?', options: ['5', '6', '7', '8'], correctAnswer: 2, timeLimit: 15 },
      ],
      medium: [
        { id: 1, question: 'What is the smallest country in the world?', options: ['Monaco', 'Vatican City', 'San Marino', 'Liechtenstein'], correctAnswer: 1, timeLimit: 20 },
        { id: 2, question: 'Which country has the most islands?', options: ['Indonesia', 'Philippines', 'Sweden', 'Japan'], correctAnswer: 2, timeLimit: 20 },
        { id: 3, question: 'What is the capital of Australia?', options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'], correctAnswer: 2, timeLimit: 20 },
        { id: 4, question: 'Mount Everest is located in which mountain range?', options: ['Alps', 'Andes', 'Rockies', 'Himalayas'], correctAnswer: 3, timeLimit: 20 },
        { id: 5, question: 'Which desert is the largest hot desert?', options: ['Gobi', 'Kalahari', 'Sahara', 'Arabian'], correctAnswer: 2, timeLimit: 20 },
      ],
      hard: [
        { id: 1, question: 'What is the deepest point in the ocean?', options: ['Puerto Rico Trench', 'Mariana Trench', 'Java Trench', 'Tonga Trench'], correctAnswer: 1, timeLimit: 25 },
        { id: 2, question: 'Which country has the most time zones?', options: ['Russia', 'USA', 'France', 'China'], correctAnswer: 2, timeLimit: 25 },
        { id: 3, question: 'What is the capital of Kazakhstan?', options: ['Almaty', 'Astana', 'Nur-Sultan', 'Shymkent'], correctAnswer: 1, timeLimit: 25 },
        { id: 4, question: 'Which African country was never colonized?', options: ['Ghana', 'Nigeria', 'Ethiopia', 'Kenya'], correctAnswer: 2, timeLimit: 25 },
        { id: 5, question: 'What strait separates Europe from Africa?', options: ['Bosphorus', 'Dardanelles', 'Gibraltar', 'Hormuz'], correctAnswer: 2, timeLimit: 25 },
      ],
    },
  },
  {
    id: 'technology',
    name: 'Technology',
    icon: '💻',
    description: 'Discover the world of tech and innovation',
    color: 'primary',
    questions: {
      easy: [
        { id: 1, question: 'What does CPU stand for?', options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Program Utility', 'Core Processing Unit'], correctAnswer: 0, timeLimit: 15 },
        { id: 2, question: 'Who founded Microsoft?', options: ['Steve Jobs', 'Bill Gates', 'Mark Zuckerberg', 'Elon Musk'], correctAnswer: 1, timeLimit: 15 },
        { id: 3, question: 'What year was the first iPhone released?', options: ['2005', '2006', '2007', '2008'], correctAnswer: 2, timeLimit: 15 },
        { id: 4, question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'], correctAnswer: 0, timeLimit: 15 },
        { id: 5, question: 'Which company makes the PlayStation?', options: ['Microsoft', 'Nintendo', 'Sony', 'Sega'], correctAnswer: 2, timeLimit: 15 },
      ],
      medium: [
        { id: 1, question: 'What programming language was created by Guido van Rossum?', options: ['Java', 'Ruby', 'Python', 'JavaScript'], correctAnswer: 2, timeLimit: 20 },
        { id: 2, question: 'What does RAM stand for?', options: ['Random Access Memory', 'Read Access Memory', 'Rapid Access Module', 'Random Action Memory'], correctAnswer: 0, timeLimit: 20 },
        { id: 3, question: 'Which company developed the Android operating system?', options: ['Apple', 'Google', 'Microsoft', 'Samsung'], correctAnswer: 1, timeLimit: 20 },
        { id: 4, question: 'What is the name of Linux\'s mascot?', options: ['Penguin Pete', 'Tux', 'Linux Lion', 'Chip'], correctAnswer: 1, timeLimit: 20 },
        { id: 5, question: 'What year was Google founded?', options: ['1996', '1998', '2000', '2002'], correctAnswer: 1, timeLimit: 20 },
      ],
      hard: [
        { id: 1, question: 'Who invented the World Wide Web?', options: ['Vint Cerf', 'Tim Berners-Lee', 'Marc Andreessen', 'Robert Kahn'], correctAnswer: 1, timeLimit: 25 },
        { id: 2, question: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correctAnswer: 1, timeLimit: 25 },
        { id: 3, question: 'What protocol does HTTPS use for encryption?', options: ['SSH', 'TLS/SSL', 'IPSec', 'PGP'], correctAnswer: 1, timeLimit: 25 },
        { id: 4, question: 'Which company created the first commercial computer?', options: ['IBM', 'Apple', 'UNIVAC', 'HP'], correctAnswer: 2, timeLimit: 25 },
        { id: 5, question: 'What is the maximum value of a 32-bit signed integer?', options: ['2,147,483,647', '4,294,967,295', '1,073,741,823', '65,535'], correctAnswer: 0, timeLimit: 25 },
      ],
    },
  },
  {
    id: 'math',
    name: 'Mathematics',
    icon: '🔢',
    description: 'Challenge your mathematical skills',
    color: 'warning',
    questions: {
      easy: [
        { id: 1, question: 'What is 12 × 8?', options: ['84', '96', '88', '92'], correctAnswer: 1, timeLimit: 15 },
        { id: 2, question: 'What is the square root of 144?', options: ['10', '11', '12', '13'], correctAnswer: 2, timeLimit: 15 },
        { id: 3, question: 'What is 15% of 200?', options: ['25', '30', '35', '40'], correctAnswer: 1, timeLimit: 15 },
        { id: 4, question: 'How many sides does a hexagon have?', options: ['5', '6', '7', '8'], correctAnswer: 1, timeLimit: 15 },
        { id: 5, question: 'What is 7³?', options: ['243', '343', '441', '512'], correctAnswer: 1, timeLimit: 15 },
      ],
      medium: [
        { id: 1, question: 'What is the value of π (pi) to two decimal places?', options: ['3.12', '3.14', '3.16', '3.18'], correctAnswer: 1, timeLimit: 20 },
        { id: 2, question: 'What is the derivative of x²?', options: ['x', '2x', 'x²', '2'], correctAnswer: 1, timeLimit: 20 },
        { id: 3, question: 'If a triangle has angles 60° and 80°, what is the third angle?', options: ['30°', '40°', '50°', '60°'], correctAnswer: 1, timeLimit: 20 },
        { id: 4, question: 'What is the sum of the first 10 positive integers?', options: ['45', '50', '55', '60'], correctAnswer: 2, timeLimit: 20 },
        { id: 5, question: 'What is log₁₀(1000)?', options: ['2', '3', '4', '10'], correctAnswer: 1, timeLimit: 20 },
      ],
      hard: [
        { id: 1, question: 'What is the integral of 1/x?', options: ['x', 'ln|x| + C', '1/x² + C', 'e^x + C'], correctAnswer: 1, timeLimit: 25 },
        { id: 2, question: 'What is the factorial of 7?', options: ['720', '5040', '40320', '362880'], correctAnswer: 1, timeLimit: 25 },
        { id: 3, question: 'In the Fibonacci sequence, what is the 10th number?', options: ['34', '55', '89', '144'], correctAnswer: 1, timeLimit: 25 },
        { id: 4, question: 'What is the value of e (Euler\'s number) to 2 decimal places?', options: ['2.71', '2.72', '2.73', '2.74'], correctAnswer: 0, timeLimit: 25 },
        { id: 5, question: 'How many degrees are in a radian?', options: ['45°', '57.3°', '90°', '180°'], correctAnswer: 1, timeLimit: 25 },
      ],
    },
  },
];

export const getDifficultyConfig = (difficulty: Difficulty) => {
  const configs = {
    easy: { label: 'Easy', color: 'success', multiplier: 1 },
    medium: { label: 'Medium', color: 'accent', multiplier: 1.5 },
    hard: { label: 'Hard', color: 'destructive', multiplier: 2 },
  };
  return configs[difficulty];
};
