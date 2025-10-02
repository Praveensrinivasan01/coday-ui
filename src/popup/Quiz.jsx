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

const questions = [
  {
    q: "What is 2 + 2?",
    opts: ["3", "4", "5"],
    answer: "4",
    reason: "Because 2 added to 2 equals 4."
  },
  {
    q: "What is the capital of France?",
    opts: ["Paris", "London", "Berlin"],
    answer: "Paris",
    reason: "Paris is the official capital city of France."
  }
]

const quote = {
  gif: "https://img.freepik.com/free-vector/goal-achievement-teamwork-business-concept-career-growth-cooperation-development-project_107791-29.jpg?semt=ais_hybrid&w=740&q=80",
  meme: "Just a rough day in coding does not mean u can able to do it",
  quote:
    "even though u can able to do it, does not mean it can be done by everyone",
  type: "meme"
}

{
  // monday: {
  //   isCompleted: true,
  //   isStarted: true,
  //   noOfQs:4,
  //   correctAnswer:[1,2,4],
  //   wrongAnswer:[3],
  //   questions:[],
  // }
}

export default function Quiz() {
  const [step, setStep] = useState(1)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [answers, setAnswers] = useState({})
  const [isCompletedQuiz, setIsCompletedQuiz] = useState(false)
  const [userAnswers, setUserAnswers] = useState({});
  // const [questions, setQuestions] = useState({})
  const {
    plans: { previous }
  } = useSelector((state) => state.plan)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("QUIZ COMPLETED")
        const data = await apiService({ method: "GET", url: "/ai/get-questions/yutfytfvvy" })
        // setUser(data)
      } catch (err) {
        console.error("Failed to fetch user:", err)
      }
    }

    fetchUser()
  }, [])

  useEffect(() => {
    ;(async () => {
      const saved = await loadData("quizData")
      if (saved) {
        const dayKey = getTodayKey()
        const savedDay = saved.recap?.[dayKey]
        if (savedDay?.answers) {
          setUserAnswers(savedDay.answers)

          // restore feedback if user already answered current step
          if (savedDay.answers[step]) {
            setFeedback(savedDay.answers[step])
          }
        }
      }
    })()
  }, [])

  const handleAnswer = async (opt) => {
    const isCorrect = opt === questions[step - 1].answer

    setScore((prev) => (isCorrect ? prev + 1 : prev))

    setFeedback({
      isCorrect,
      selectedAnswer: opt,
      correctAnswer: questions[step - 1].answer,
      reason: questions[step - 1].reason
    })

    setUserAnswers((prev) => ({
      ...prev,
      [step]: {
        selected: opt,
        isCorrect,
        correctAnswer: questions[step - 1].answer,
        reason: questions[step - 1].reason
      }
    }))

    const prevData = (await loadData("quizData")) || {}
    const weekRange = getWeekRange()
    const dayKey = getTodayKey()

    const prevDay = prevData?.recap?.[dayKey] || {
      isCompleted: false,
      isStarted: true,
      noOfQs: questions.length,
      answers: {}, // 🔥 store all here
      questions
    }
    // debugger
    const answers = {
      ...prevDay.answers,
      [step]: {
        selected: opt,
        isCorrect,
        correctAnswer: questions[step - 1].answer,
        reason: questions[step - 1].reason
      }
    }

    const quizData = {
      date: weekRange,
      recap: {
        ...prevData.recap,
        [dayKey]: {
          ...prevDay,
          answers
        }
      }
    }

    saveData("quizData", quizData)
  }

  const goNext = () => {
    if (step < questions.length) {
      const nextStep = step + 1
      setStep(nextStep)
      setFeedback(userAnswers[nextStep] || null) // restore feedback
    } else {
      setIsCompletedQuiz(true)
    }
  }

  function goPrev() {
    if (step > 1) {
      const prevStep = step - 1
      setStep(prevStep)
      setFeedback(userAnswers[prevStep] || null) // restore feedback
    }
  }

  function Prev() {
    return (
      previous &&
      step - 1 > 0 && (
        <>
          <button
            onClick={goPrev}
            style={{
              marginTop: "8px",
              marginLeft: "3px",
              padding: "8px 16px",
              background: "#C1856D",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}>
            {step == questions.length ? "Complete the quiz" : "Next"}
          </button>
        </>
      )
    )
  }

  // console.log(feedback, userAnswers)

  return (
    <div>
      {!isCompletedQuiz ? (
        <>
          <QuizCard
            question={questions[step - 1].q}
            options={questions[step - 1].opts}
            onAnswer={handleAnswer}
            disabled={!!feedback} // prevent multiple clicks after answering
            selectedAnswer={feedback?.selectedAnswer}
            correctAnswer={questions[step - 1].answer}
          />
          {feedback && (
            <div
              style={{
                marginTop: "16px",
                padding: "12px",
                border: `1px solid ${feedback.isCorrect ? "green" : "red"}`,
                borderRadius: "6px",
                backgroundColor: feedback.isCorrect ? "#e6ffe6" : "#ffe6e6"
              }}>
              <p>
                {feedback.isCorrect ? "✅ Correct!" : "❌ Wrong!"} <br />
                The correct answer is: <strong>{feedback.correctAnswer}</strong>
              </p>
              <p>
                <em>Reason: {feedback.reason}</em>
              </p>
              <button
                onClick={goNext}
                style={{
                  marginTop: "8px",
                  padding: "8px 16px",
                  background: feedback.isCorrect ? "green" : "red",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}>
                {step == questions.length ? "Complete the quiz" : "Next"}
              </button>

              {/* {Prev()} */}
            </div>
          )}
          {<></>}
          <StepNav current={step} total={questions.length} />
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
