export const allQuizzes = [
  {
    id: "general-knowledge",
    title: "General Knowledge",
    description:
      "Test your knowledge across various topics including geography, science, art, and history",
    category: "Mixed",
    icon: "🧠",
    timePerQuestion: 30,
    featured: true,
    rating: 4.8,
    totalPlayers: 15420,
    questions: [
      {
        id: 1,
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
        category: "Geography",
        difficulty: "easy",
        explanation: "Paris is the capital and most populous city of France.",
      },
      {
        id: 2,
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
        category: "Science",
        difficulty: "easy",
        explanation:
          "Mars appears red due to iron oxide (rust) on its surface.",
      },
      {
        id: 3,
        question: "Who painted the Mona Lisa?",
        options: [
          "Vincent van Gogh",
          "Pablo Picasso",
          "Leonardo da Vinci",
          "Michelangelo",
        ],
        correctAnswer: 2,
        category: "Art",
        difficulty: "medium",
        explanation:
          "Leonardo da Vinci painted the Mona Lisa between 1503-1519.",
      },
      {
        id: 4,
        question: "What is the largest mammal in the world?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
        correctAnswer: 1,
        category: "Biology",
        difficulty: "easy",
        explanation:
          "Blue whales can reach lengths of up to 100 feet and weigh up to 200 tons.",
      },
      {
        id: 5,
        question: "In which year did World War II end?",
        options: ["1944", "1945", "1946", "1947"],
        correctAnswer: 1,
        category: "History",
        difficulty: "medium",
        explanation:
          "World War II ended in 1945 with the surrender of Japan in September.",
      },
    ],
  },
  {
    id: "science-tech",
    title: "Science & Technology",
    description:
      "Challenge your scientific and technical knowledge with questions about physics, chemistry, biology, and modern technology",
    category: "Science",
    icon: "🔬",
    timePerQuestion: 45,
    featured: true,
    rating: 4.6,
    totalPlayers: 12890,
    questions: [
      {
        id: 1,
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: 2,
        category: "Chemistry",
        difficulty: "medium",
        explanation: "Au comes from the Latin word 'aurum' meaning gold.",
      },
      {
        id: 2,
        question: "Which programming language was created by Guido van Rossum?",
        options: ["Java", "Python", "C++", "JavaScript"],
        correctAnswer: 1,
        category: "Technology",
        difficulty: "medium",
        explanation:
          "Python was created by Guido van Rossum and first released in 1991.",
      },
      {
        id: 3,
        question: "What is the speed of light in vacuum?",
        options: [
          "299,792,458 m/s",
          "300,000,000 m/s",
          "299,000,000 m/s",
          "298,792,458 m/s",
        ],
        correctAnswer: 0,
        category: "Physics",
        difficulty: "hard",
        explanation:
          "The speed of light in vacuum is exactly 299,792,458 meters per second.",
      },
      {
        id: 4,
        question: "What does DNA stand for?",
        options: [
          "Deoxyribonucleic Acid",
          "Dynamic Nuclear Acid",
          "Deoxyribose Nucleic Acid",
          "Dinitrogen Acid",
        ],
        correctAnswer: 0,
        category: "Biology",
        difficulty: "medium",
        explanation:
          "DNA (Deoxyribonucleic Acid) carries genetic information in living organisms.",
      },
      {
        id: 5,
        question: "Which element has the atomic number 1?",
        options: ["Helium", "Hydrogen", "Lithium", "Carbon"],
        correctAnswer: 1,
        category: "Chemistry",
        difficulty: "easy",
        explanation:
          "Hydrogen is the first element on the periodic table with atomic number 1.",
      },
    ],
  },
  {
    id: "world-history",
    title: "World History",
    description:
      "Journey through time with historical events, figures, and civilizations from ancient times to modern era",
    category: "History",
    icon: "🏛️",
    timePerQuestion: 35,
    rating: 4.7,
    totalPlayers: 9650,
    questions: [
      {
        id: 1,
        question: "Who was the first President of the United States?",
        options: [
          "Thomas Jefferson",
          "George Washington",
          "John Adams",
          "Benjamin Franklin",
        ],
        correctAnswer: 1,
        category: "History",
        difficulty: "easy",
        explanation:
          "George Washington served as the first President from 1789 to 1797.",
      },
      {
        id: 2,
        question: "In which year did the Berlin Wall fall?",
        options: ["1987", "1988", "1989", "1990"],
        correctAnswer: 2,
        category: "History",
        difficulty: "medium",
        explanation:
          "The Berlin Wall fell on November 9, 1989, marking the end of the Cold War era.",
      },
      {
        id: 3,
        question:
          "Which ancient wonder of the world was located in Alexandria?",
        options: [
          "Colossus of Rhodes",
          "Lighthouse of Alexandria",
          "Hanging Gardens",
          "Temple of Artemis",
        ],
        correctAnswer: 1,
        category: "History",
        difficulty: "hard",
        explanation:
          "The Lighthouse of Alexandria was one of the Seven Wonders of the Ancient World.",
      },
      {
        id: 4,
        question:
          "The Roman Empire was divided into Eastern and Western parts in which year?",
        options: ["285 AD", "395 AD", "476 AD", "330 AD"],
        correctAnswer: 1,
        category: "History",
        difficulty: "hard",
        explanation:
          "The Roman Empire was permanently divided in 395 AD after Emperor Theodosius I's death.",
      },
    ],
  },
  {
    id: "sports-games",
    title: "Sports & Games",
    description:
      "Test your knowledge of sports, games, competitions, and athletic achievements from around the world",
    category: "Sports",
    icon: "⚽",
    timePerQuestion: 25,
    rating: 4.5,
    totalPlayers: 8340,
    questions: [
      {
        id: 1,
        question:
          "How many players are on a basketball team on the court at one time?",
        options: ["4", "5", "6", "7"],
        correctAnswer: 1,
        category: "Sports",
        difficulty: "easy",
        explanation:
          "Each basketball team has 5 players on the court at any given time.",
      },
      {
        id: 2,
        question: "Which country has won the most FIFA World Cups?",
        options: ["Germany", "Argentina", "Brazil", "Italy"],
        correctAnswer: 2,
        category: "Sports",
        difficulty: "medium",
        explanation:
          "Brazil has won the FIFA World Cup 5 times (1958, 1962, 1970, 1994, 2002).",
      },
      {
        id: 3,
        question: "In which sport would you perform a slam dunk?",
        options: ["Volleyball", "Basketball", "Tennis", "Badminton"],
        correctAnswer: 1,
        category: "Sports",
        difficulty: "easy",
        explanation:
          "A slam dunk is a basketball shot where the player jumps and scores by putting the ball directly through the basket.",
      },
      {
        id: 4,
        question: "How many holes are there in a standard round of golf?",
        options: ["16", "18", "20", "22"],
        correctAnswer: 1,
        category: "Sports",
        difficulty: "easy",
        explanation: "A standard round of golf consists of 18 holes.",
      },
    ],
  },
  {
    id: "movies-entertainment",
    title: "Movies & Entertainment",
    description:
      "Dive into the world of cinema, TV shows, celebrities, and entertainment industry trivia",
    category: "Entertainment",
    icon: "🎬",
    timePerQuestion: 30,
    rating: 4.4,
    totalPlayers: 11250,
    questions: [
      {
        id: 1,
        question: "Which movie won the Academy Award for Best Picture in 2020?",
        options: ["1917", "Joker", "Parasite", "Once Upon a Time in Hollywood"],
        correctAnswer: 2,
        category: "Movies",
        difficulty: "medium",
        explanation:
          "Parasite won the Academy Award for Best Picture in 2020, making history as the first non-English film to win.",
      },
      {
        id: 2,
        question: "Who directed the movie 'Inception'?",
        options: [
          "Steven Spielberg",
          "Christopher Nolan",
          "Martin Scorsese",
          "Quentin Tarantino",
        ],
        correctAnswer: 1,
        category: "Movies",
        difficulty: "medium",
        explanation: "Christopher Nolan directed Inception, released in 2010.",
      },
      {
        id: 3,
        question: "Which TV series features the character Walter White?",
        options: ["Better Call Saul", "Breaking Bad", "The Sopranos", "Dexter"],
        correctAnswer: 1,
        category: "TV Shows",
        difficulty: "easy",
        explanation:
          "Walter White is the main character in the TV series Breaking Bad.",
      },
    ],
  },
  {
    id: "geography",
    title: "World Geography",
    description:
      "Explore countries, capitals, landmarks, and geographical features from around the globe",
    category: "Geography",
    icon: "🌍",
    timePerQuestion: 30,
    rating: 4.6,
    totalPlayers: 7890,
    questions: [
      {
        id: 1,
        question: "What is the longest river in the world?",
        options: [
          "Amazon River",
          "Nile River",
          "Yangtze River",
          "Mississippi River",
        ],
        correctAnswer: 1,
        category: "Geography",
        difficulty: "medium",
        explanation:
          "The Nile River is generally considered the longest river in the world at about 6,650 km.",
      },
      {
        id: 2,
        question: "Which country has the most time zones?",
        options: ["Russia", "United States", "China", "France"],
        correctAnswer: 3,
        category: "Geography",
        difficulty: "hard",
        explanation:
          "France has 12 time zones due to its overseas territories, more than any other country.",
      },
      {
        id: 3,
        question: "What is the smallest country in the world?",
        options: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"],
        correctAnswer: 2,
        category: "Geography",
        difficulty: "easy",
        explanation:
          "Vatican City is the smallest country in the world with an area of just 0.17 square miles.",
      },
    ],
  },
  {
    id: "literature",
    title: "Literature & Books",
    description:
      "Test your knowledge of classic and modern literature, authors, and literary works",
    category: "Literature",
    icon: "📚",
    timePerQuestion: 35,
    rating: 4.3,
    totalPlayers: 5670,
    questions: [
      {
        id: 1,
        question: "Who wrote the novel '1984'?",
        options: [
          "Aldous Huxley",
          "George Orwell",
          "Ray Bradbury",
          "Kurt Vonnegut",
        ],
        correctAnswer: 1,
        category: "Literature",
        difficulty: "medium",
        explanation:
          "George Orwell wrote the dystopian novel '1984', published in 1949.",
      },
      {
        id: 2,
        question: "Which Shakespeare play features the character Hamlet?",
        options: ["Macbeth", "Romeo and Juliet", "Hamlet", "Othello"],
        correctAnswer: 2,
        category: "Literature",
        difficulty: "easy",
        explanation:
          "Hamlet is the main character in Shakespeare's tragedy 'Hamlet'.",
      },
      {
        id: 3,
        question: "Who wrote 'Pride and Prejudice'?",
        options: [
          "Charlotte Brontë",
          "Emily Brontë",
          "Jane Austen",
          "George Eliot",
        ],
        correctAnswer: 2,
        category: "Literature",
        difficulty: "medium",
        explanation:
          "Jane Austen wrote 'Pride and Prejudice', published in 1813.",
      },
    ],
  },
  {
    id: "music",
    title: "Music & Artists",
    description:
      "From classical to contemporary, test your knowledge of music, artists, and musical history",
    category: "Music",
    icon: "🎵",
    timePerQuestion: 25,
    rating: 4.5,
    totalPlayers: 9120,
    questions: [
      {
        id: 1,
        question: "Which band released the album 'Abbey Road'?",
        options: [
          "The Rolling Stones",
          "The Beatles",
          "Led Zeppelin",
          "Pink Floyd",
        ],
        correctAnswer: 1,
        category: "Music",
        difficulty: "easy",
        explanation:
          "The Beatles released 'Abbey Road' in 1969, their penultimate studio album.",
      },
      {
        id: 2,
        question: "Who composed 'The Four Seasons'?",
        options: [
          "Johann Sebastian Bach",
          "Wolfgang Amadeus Mozart",
          "Antonio Vivaldi",
          "Ludwig van Beethoven",
        ],
        correctAnswer: 2,
        category: "Music",
        difficulty: "medium",
        explanation:
          "Antonio Vivaldi composed 'The Four Seasons', a set of four violin concertos.",
      },
      {
        id: 3,
        question: "Which instrument does Yo-Yo Ma famously play?",
        options: ["Violin", "Piano", "Cello", "Flute"],
        correctAnswer: 2,
        category: "Music",
        difficulty: "medium",
        explanation: "Yo-Yo Ma is a world-renowned cellist.",
      },
    ],
  },
];
