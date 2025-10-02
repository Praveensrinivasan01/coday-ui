import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ScoreCard from "src/components/ScoreCard"
import apiService from "src/service/apiService"

// import ScoreCard from "src/components/ScoreCard"

import QuizCard from "../components/QuizCard"
import StepNav from "../components/StepNav"
import WrapperHOC from "../hoc/WrapperHOC"
import { getTodayKey, getWeekRange } from "../utils/date"
import { loadData, saveData } from "../utils/storage"

const quote = {
  gif: "https://img.freepik.com/free-vector/goal-achievement-teamwork-business-concept-career-growth-cooperation-development-project_107791-29.jpg?semt=ais_hybrid&w=740&q=80",
  meme: "Just a rough day in coding does not mean u can able to do it",
  quote:
    "even though u can able to do it, does not mean it can be done by everyone",
  type: "meme"
}

export default function Quiz() {
  const [step, setStep] = useState(0)
  const [score, setScore] = useState(0)
  const [questions, setQuestions] = useState([])
  const [isCompletedQuiz, setIsCompletedQuiz] = useState(false)
  const {
    plans: { previous }
  } = useSelector((state) => state.plan);
  console.log("previous",previous);

  const fetchQuestion = async () => {
    try {
      let {
        data: { questions }
      } = await apiService({
        method: "GET",
        url: "/ai/get-questions/yutfytfvvy"
      })
      await questions?.forEach((ele) => {
        ele.attended = false
        ele.selectedAnswer = null
        ele.isCorrect = false
      })
      setQuestions(questions);

    } catch (err) {
      console.error("Failed to fetch user:", err)
    }
  };

  useEffect(() => {
      fetchQuestion()
  }, [])

  const handleAnswer = (opt) => {
  const isCorrect = opt.id === questions[step].correctOptionId;

  setQuestions((prev) => {
    const newQuestions = [...prev]; // shallow copy of array
    newQuestions[step] = {
      ...newQuestions[step], // copy the object at that index
      attended: true,
      selectedAnswer: opt.id,
      isCorrect
    };
    return newQuestions;
  });

  setScore((prev) => (isCorrect ? prev + 1 : prev));
};

  const goNext = () => {
    console.log({"step":step,"questions":questions.length})
    if (step < questions.length-1) setStep((prev) => prev + 1)
    else setIsCompletedQuiz(true)
  }
  const goPrev = () => setStep((prev) => prev - 1)

  function Prev() {
    return (
      previous &&
      step > 0 && (
        <button
          onClick={goPrev}
          style={{
            marginTop: "8px",
            marginLeft: "3px",
            padding: "8px 16px",
            background: "orange",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}>
          {"Previous"}
        </button>
      )
    )
  }

  return (
    <div>
      {questions.length && !isCompletedQuiz ? (
        <>
          <QuizCard question={questions[step]} onAnswer={handleAnswer} />
          {questions[step]?.attended && (
            <div
              style={{
                marginTop: "16px",
                padding: "12px",
                border: `1px solid ${questions[step].isCorrect ? "green" : "red"}`,
                borderRadius: "6px",
                backgroundColor: questions[step].isCorrect
                  ? "#e6ffe6"
                  : "#ffe6e6"
              }}>
              <p>
                {questions[step].isCorrect ? "✅ Correct!" : "❌ Wrong!"} <br />
                The correct answer is:{" "}
                <strong>{questions[step]["options"].filter((ele)=>ele.id == questions[step]['correctOptionId'])[0]['text']}</strong>
              </p>
              <p>
                <em>Reason: {questions[step].explanation}</em>
              </p>
              <button
                onClick={goNext}
                style={{
                  marginTop: "8px",
                  padding: "8px 16px",
                  background: questions[step].isCorrect ? "green" : "red",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}>
                {step == questions.length-1 ? "Complete the quiz" : "Next"}
              </button>
            </div>
          )}
          {<></>}
          {Prev()}
          <StepNav current={step + 1} total={questions.length} />
        </>
      ) : (
        <>
          <ScoreCard
            scoreCard={score}
            quote={quote}
            access={{ key: "showUpgrade", skip: false }}
          />
        </>
      )}
    </div>
  )
}
