'use client';

import React, { createContext, useContext, useState } from 'react';
import jsonData from './dashboard/quizzes.json';
const ThemeContext = createContext();

export function useThemContext(){
   return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
  const [quizzes, setQuizzes] = useState(jsonData);
  const [title, setTitle] = useState('Your Quizzes');
  const [quizName, setQuizName] = useState('Quiz Name');
  const [numQuestions, setNumQuestions] = useState(1);

  return (
    <ThemeContext.Provider value={{ quizzes, setQuizzes, title, setTitle, quizName, setQuizName, numQuestions, setNumQuestions}}>
      {children}
    </ThemeContext.Provider>
  );
}
