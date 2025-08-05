# Quiz Question Form System

A comprehensive, model-based architecture for creating and managing quiz questions in React.

## 🚀 Features

### ✨ **Model-Based Architecture**

- **Question Model**: Robust data structure with validation
- **Type Safety**: Structured data with validation rules
- **Business Logic**: Centralized quiz operations and utilities

### 🎯 **Advanced Question Management**

- **Interactive Form**: Rich question creation interface
- **Live Preview**: Real-time question preview with styling
- **Validation**: Comprehensive error checking and user feedback
- **Multiple Options**: Support for 2-6 answer options
- **Rich Metadata**: Categories, difficulty, points, time limits

### 📊 **Smart Analytics**

- **Quiz Statistics**: Automatic calculation of quiz metrics
- **Difficulty Distribution**: Visual breakdown of question difficulties
- **Category Analysis**: Track questions across different topics
- **Validation Insights**: Smart recommendations for quiz improvement

### 🛠 **Developer Experience**

- **Reusable Components**: Modular, composable React components
- **Service Layer**: Clean separation of business logic
- **Type Definitions**: Clear interfaces and data structures
- **Error Handling**: Graceful error management

## 📁 Project Structure

```
src/
├── models/
│   ├── Question.js          # Question data model and utilities
│   └── index.js            # Model exports
├── services/
│   └── QuizService.js      # Quiz business logic and operations
├── components/
│   └── forms/
│       ├── QuestionForm.jsx        # Individual question editor
│       ├── QuestionsManager.jsx    # Question list management
│       ├── QuizPreview.jsx         # Quiz statistics and preview
│       └── index.js               # Component exports
├── pages/
│   └── forms/
│       └── QuizForm.jsx           # Main quiz creation form
└── examples/
    └── QuestionFormExamples.js   # Usage examples
```

## 🎯 Core Components

### 1. **Question Model** (`src/models/Question.js`)

```javascript
import { Question, CATEGORIES, DIFFICULTIES } from "../models/Question";

// Create a new question
const question = new Question({
  question: "What is the capital of France?",
  options: ["London", "Berlin", "Paris", "Madrid"],
  correctAnswer: 2,
  category: CATEGORIES.GEOGRAPHY,
  difficulty: DIFFICULTIES.EASY,
  explanation: "Paris is the capital city of France.",
  points: 1,
  timeLimit: 30,
});

// Validate question
const errors = question.getValidationErrors();
if (errors.length === 0) {
  console.log("Question is valid!");
}
```

### 2. **Question Form** (`QuestionForm.jsx`)

Interactive form for creating/editing individual questions:

- **Rich Text Editor**: Multi-line question input
- **Dynamic Options**: Add/remove answer options (2-6 options)
- **Visual Selection**: Radio buttons for correct answer
- **Metadata Fields**: Category, difficulty, points, time limit
- **Live Preview**: Real-time question preview
- **Validation**: Inline error display

### 3. **Questions Manager** (`QuestionsManager.jsx`)

Comprehensive question management interface:

- **Question List**: Overview of all questions with actions
- **Search & Filter**: Find questions by text, category, or difficulty
- **Bulk Operations**: Duplicate, edit, delete questions
- **Statistics**: Visual breakdown of question distribution
- **Smart UI**: Empty states, loading states, error handling

### 4. **Quiz Preview** (`QuizPreview.jsx`)

Analytics and validation dashboard:

- **Validation Status**: Real-time quiz validation
- **Statistics**: Question count, points, estimated duration
- **Distribution Charts**: Difficulty and category breakdowns
- **Recommendations**: Smart suggestions for quiz improvement
- **Publish Readiness**: Clear indicators for quiz completion

### 5. **Quiz Service** (`QuizService.js`)

Business logic and utilities:

```javascript
import QuizService from "../services/QuizService";

// Validate entire quiz
const errors = QuizService.validateQuiz(quizData);

// Get quiz statistics
const stats = QuizService.calculateQuizStats(quizData);

// Import/export questions
const questions = QuizService.importQuestionsFromJSON(jsonData);
const jsonOutput = QuizService.exportQuestionsToJSON(questions);

// Generate templates
const template = QuizService.generateQuestionTemplate("multiple_choice");
```

## 🚀 Quick Start

### 1. **Basic Usage**

```jsx
import { QuestionsManager } from "../components/forms";
import { Question } from "../models/Question";

const MyQuizForm = () => {
  const [questions, setQuestions] = useState([]);

  const handleQuestionsChange = (newQuestions) => {
    setQuestions(newQuestions);
  };

  return (
    <QuestionsManager
      questions={questions}
      onQuestionsChange={handleQuestionsChange}
    />
  );
};
```

### 2. **With Quiz Preview**

```jsx
import { QuestionsManager, QuizPreview } from "../components/forms";

const CompleteQuizForm = () => {
  const [quizData, setQuizData] = useState({
    title: "",
    category: "",
    difficulty: "",
    questions: [],
  });

  return (
    <div>
      <QuestionsManager
        questions={quizData.questions}
        onQuestionsChange={(questions) =>
          setQuizData((prev) => ({ ...prev, questions }))
        }
      />
      {quizData.questions.length > 0 && <QuizPreview quizData={quizData} />}
    </div>
  );
};
```

## 🎨 Features in Detail

### **Question Types Supported**

- ✅ Multiple Choice (2-6 options)
- ✅ True/False
- 🔄 Fill in the Blank (planned)

### **Question Metadata**

- **Categories**: Science, History, Sports, Entertainment, Geography, Technology, Literature, Music, Art, Mixed
- **Difficulties**: Easy, Medium, Hard
- **Points**: 1-10 points per question
- **Time Limits**: 10-300 seconds per question
- **Explanations**: Optional detailed explanations

### **Validation Rules**

- ✅ Question text required
- ✅ All options must be filled
- ✅ Valid correct answer selected
- ✅ Category and difficulty required
- ✅ Reasonable time limits and points

### **Smart Features**

- 🔍 **Search**: Find questions by content
- 🏷️ **Filtering**: Filter by category and difficulty
- 📊 **Analytics**: Real-time statistics
- 💡 **Recommendations**: Smart quiz improvement suggestions
- 🔄 **Templates**: Pre-built question templates
- 📋 **Duplication**: Easy question copying
- 💾 **Import/Export**: JSON data exchange

## 🎯 Advanced Usage

### **Custom Validation**

```javascript
// Add custom validation rules
const customQuestion = new Question(data);
const baseErrors = customQuestion.getValidationErrors();

// Add custom checks
if (customQuestion.timeLimit < 10) {
  baseErrors.push("Time limit must be at least 10 seconds");
}
```

### **Bulk Operations**

```javascript
// Filter questions
const easyQuestions = QuizService.filterQuestions(questions, {
  difficulty: "easy",
});

// Shuffle questions
const shuffled = QuizService.shuffleQuestions(questions);

// Export filtered questions
const exportData = QuizService.exportQuestionsToJSON(easyQuestions);
```

## 🎨 Styling & Theming

The components use Tailwind CSS with a consistent design system:

- **Colors**: Black/white theme with accent colors
- **Shadows**: Neumorphism-inspired depth
- **Transitions**: Smooth hover and focus states
- **Responsive**: Mobile-first responsive design
- **Accessibility**: ARIA labels and keyboard navigation

## 🔧 Customization

### **Custom Categories**

```javascript
// Extend categories in Question.js
export const CATEGORIES = {
  ...existing,
  CUSTOM_CATEGORY: "custom_category",
};
```

### **Custom Validation**

```javascript
// Override validation in Question class
isValid() {
  const baseValid = super.isValid();
  // Add custom validation logic
  return baseValid && this.customValidation();
}
```

## 📈 Performance

- **Lazy Loading**: Components load on demand
- **Memoization**: Optimized re-renders
- **Virtual Scrolling**: Efficient large lists (planned)
- **Debounced Search**: Smooth search experience

## 🧪 Testing

```javascript
// Test question creation
const question = new Question(testData);
expect(question.isValid()).toBe(true);

// Test validation
const invalidQuestion = new Question({});
expect(invalidQuestion.getValidationErrors()).toHaveLength(4);

// Test quiz service
const stats = QuizService.calculateQuizStats(testQuizData);
expect(stats.totalQuestions).toBe(5);
```

## 🤝 Contributing

1. Follow the model-based architecture pattern
2. Add comprehensive validation for new features
3. Include error handling and user feedback
4. Write tests for new functionality
5. Update documentation

## 📝 License

This quiz system is part of the Quizzler-UI project.

---

**Built with ❤️ using React, Tailwind CSS, and modern JavaScript**
