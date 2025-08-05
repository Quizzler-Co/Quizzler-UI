/**
 * Usage Examples for the Question Form System
 *
 * This file demonstrates how to use the model-based question form architecture
 */

import { Question, CATEGORIES, DIFFICULTIES } from "../models/Question";
import QuizService from "../services/QuizService";

// Example 1: Creating a new question
export const createNewQuestion = () => {
  const question = new Question({
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
    category: CATEGORIES.GEOGRAPHY,
    difficulty: DIFFICULTIES.EASY,
    explanation: "Paris is the capital and most populous city of France.",
    points: 1,
    timeLimit: 30,
  });

  return question;
};

// Example 2: Validating a question
export const validateQuestion = (questionData) => {
  const question = Question.fromJSON(questionData);
  const errors = question.getValidationErrors();

  if (errors.length > 0) {
    console.log("Validation errors:", errors);
    return false;
  }

  console.log("Question is valid!");
  return true;
};

// Example 3: Using the Quiz Service
export const validateCompleteQuiz = (quizData) => {
  const errors = QuizService.validateQuiz(quizData);
  const stats = QuizService.calculateQuizStats(quizData);
  const preview = QuizService.generateQuizPreview(quizData);

  return {
    isValid: errors.length === 0,
    errors,
    stats,
    preview,
  };
};

// Example 4: Importing questions from JSON
export const importQuestionsExample = () => {
  const jsonData = [
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 1,
      category: "math",
      difficulty: "easy",
      explanation: "2 + 2 equals 4",
      points: 1,
      timeLimit: 15,
    },
  ];

  try {
    const questions = QuizService.importQuestionsFromJSON(jsonData);
    console.log("Imported questions:", questions);
    return questions;
  } catch (error) {
    console.error("Import failed:", error.message);
    return [];
  }
};

// Example 5: Creating question templates
export const createQuestionTemplates = () => {
  const multipleChoice =
    QuizService.generateQuestionTemplate("multiple_choice");
  const trueFalse = QuizService.generateQuestionTemplate("true_false");

  return {
    multipleChoice,
    trueFalse,
  };
};

// Example usage in a React component:
/*
import { useState } from 'react';
import { QuestionsManager } from '../components/forms';
import { Question } from '../models/Question';

const MyQuizForm = () => {
  const [questions, setQuestions] = useState([]);

  const handleQuestionsChange = (newQuestions) => {
    setQuestions(newQuestions);
  };

  return (
    <div>
      <QuestionsManager
        questions={questions}
        onQuestionsChange={handleQuestionsChange}
      />
    </div>
  );
};
*/
