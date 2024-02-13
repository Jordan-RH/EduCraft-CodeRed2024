"use client";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Question } from "akar-icons";
import jsonData from "./quizcontent.json";
import styles from "../../styles/takequiz.module.css";
import { useEffect, useState } from "react";
import { useThemContext } from "../theme-provider";

export default function TakeQuiz() {
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState(new Array(jsonData.length).fill(""));
  const [correctAnswersCount, setCorrectAnswersCount] = useState(null);
  const theme = useThemContext();
  theme.setTitle(theme.quizName);
  const questionComponents = jsonData
    .slice(0, theme.numQuestions)
    .map((questionData, index) => (
      <QuestionComponent
        key={index}
        index={index}
        data={questionData}
        submitted={submitted}
        selectedAnswer={answers[index]}
        setSelectedAnswer={(selectedAnswer) =>
          handleAnswerChange(index, selectedAnswer)
        }
      />
    ));

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional - adds smooth scrolling effect
    });
  };

  const countCorrectAnswers = () => {
    let count = 0;
    for (let i = 0; i < jsonData.length; i++) {
      if (answers[i] === jsonData[i].correct_answer) {
        count++;
      }
    }
    setCorrectAnswersCount(count);
    console.log("Number of correct answers:", count);
  };

  const handleSubmit = () => {
    countCorrectAnswers();
    scrollToTop(); // Call the scrollToTop function after setting submitted to true
    setSubmitted(true);
  };

  const handleAnswerChange = (index, selectedAnswer) => {
    const newAnswers = [...answers];
    newAnswers[index] = selectedAnswer;
    setAnswers(newAnswers);
  };

  return (
    <section className={styles.takequiz}>
      {questionComponents}
      <div className={styles.thebottoms}>
        <button className={styles.button66} onClick={handleSubmit}>
          Submit
        </button>
        <div>
          <h2>Your Score</h2>
          <h3>{correctAnswersCount === null ? '?' : correctAnswersCount}/{theme.numQuestions}</h3>
        </div>
      </div>
    </section>
  );
}

function QuestionComponent({
  index,
  data,
  submitted,
  selectedAnswer,
  setSelectedAnswer,
}) {
  const isCorrect = submitted && selectedAnswer === data.correct_answer;

  return (
    <div className={styles.questionbox}>
      <FormControl>
        <h4>
          {index + 1}. {data.question}
        </h4>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={selectedAnswer}
          onChange={(e) => setSelectedAnswer(e.target.value)}
        >
          <FormControlLabel
            value="A"
            control={<Radio />}
            label={`A. ${data.options.A}`}
            disabled={submitted}
          />
          <FormControlLabel
            value="B"
            control={<Radio />}
            label={`B. ${data.options.B}`}
            disabled={submitted}
          />
          <FormControlLabel
            value="C"
            control={<Radio />}
            label={`C. ${data.options.C}`}
            disabled={submitted}
          />
          <FormControlLabel
            value="D"
            control={<Radio />}
            label={`D. ${data.options.D}`}
            disabled={submitted}
          />
        </RadioGroup>
        {submitted && (
          <p className={isCorrect ? styles.correctAnswer : styles.wrongAnswer}>
            {isCorrect ? "Correct!" : `Correct answer: ${data.correct_answer}`}
          </p>
        )}
      </FormControl>
    </div>
  );
}
