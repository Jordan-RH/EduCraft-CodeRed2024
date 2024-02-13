"use client";
import Link from "next/link";
import styles from "../../styles/dashboard.module.css";
import { CirclePlus, TrashCan, Edit } from "akar-icons";
import { Input } from "@chakra-ui/react";
import jsonData from "./quizzes.json";
import { useEffect, useState } from "react";
import { useThemContext } from "../theme-provider";

function Dashboard() {
  const [quizzes, setQuizzes] = useState(null);
  const theme = useThemContext();
  theme.setTitle("Your Quizzes");
  useEffect(() => {
    // Simulating an asynchronous data fetching operation
    const fetchData = async () => {
      // Replace this setTimeout with your actual data fetching logic
      setTimeout(() => {
        setQuizzes(jsonData);
      }); // Simulating 1 second delay
    };

    fetchData();
  }, []);

  if (!quizzes) {
    return <div>Loading...</div>; // Render a loading indicator while waiting for data
  }

  function deleteQuiz(index) {
    // Create a new array without the quiz at the specified index
    const newQuizzes = theme.quizzes.filter((_, i) => i !== index);
    // Update the state with the new array
    theme.setQuizzes(newQuizzes);
  }

  const quizzesComponent = theme.quizzes.map((quizData, index) => (
    <QuizCard
      key={index}
      index={index}
      quizname={quizData.quizName}
      numquestions={quizData.numQuestions}
      gradelevel={quizData.gradeLevel}
      date={quizData.date}
      setQuizzes={setQuizzes}
      quizzes={quizzes}
      deleteQuiz={deleteQuiz}
    />
  ));

  return (
    <section className={styles.dashboard}>
      {/* <div className={styles.searchbar}><Input htmlSize={120} width='auto' /></div> */}
      <div className={styles.cards}>
        <CreateNewQuizCard />
        {quizzesComponent}
      </div>
    </section>
  );
}

function CreateNewQuizCard() {
  function createNewQuiz() {}
  return (
    <Link href="/createquiz">
      <div className={`${styles.card} ${styles.createnew}`}>
        <div>
          <p>Create a new Quiz</p>
          <CirclePlus strokeWidth={2} size={36} />
        </div>
      </div>
    </Link>
  );
}

function QuizCard(props) {
  return (
    
      <div className={styles.card}>
        <div className={styles.header}>
          <h3>{props.quizname}</h3>
        </div>
        <div className={styles.middle}>
          <p>{props.numquestions} questions</p>
          <p>{props.gradelevel}</p>
        </div>

        <div className={styles.footer}>
          <p>{props.date}</p>

          <div className={styles.icons}>
            <TrashCan
              strokeWidth={2}
              size={25}
              className={styles.trashicon}
              onClick={() => props.deleteQuiz(props.index)}
            />
            <Link href="/takequiz">
            <Edit strokeWidth={2} size={25} className={styles.edit} />
            </Link>
          </div>
        </div>
      </div>
  
  );
}

export default Dashboard;
