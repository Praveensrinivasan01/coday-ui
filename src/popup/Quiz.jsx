import React, { useState } from "react"
import { useSelector } from "react-redux"

import QuizCard from "../components/QuizCard"
import StepNav from "../components/StepNav"
import ShowUpgrade from "src/components/ShowUpgrade"

const questions = [
  {
    q: "What is 2 + 2?",
    opts: ["3", "4", "5"],
    answer: "4",
    reason: "Because 2 added to 2 equals 4."
  },
  // {
  //   q: "What is the capital of France?",
  //   opts: ["Paris", "London", "Berlin"],
  //   answer: "Paris",
  //   reason: "Paris is the official capital city of France."
  // }
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

export default function Quiz({ onNext }) {
  const [step, setStep] = useState(1)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [isCompletedQuiz, setIsCompletedQuiz] = useState(false)

  //monday,isCompleted - chrome.local.storage;
  //
  const tierInfo = useSelector((state) => state.tier)

  console.log("tierInfo", tierInfo)

  const handleAnswer = (opt) => {
    const isCorrect = opt === questions[step - 1].answer
    if (isCorrect) {
      setScore(score + 1)
    }
    setFeedback({
      isCorrect,
      correctAnswer: questions[step - 1].answer,
      reason: questions[step - 1].reason
    })
  }

  const goNext = () => {
    if (step < questions.length) {
      setStep(step + 1)
      setFeedback(null)
    } else {
      setIsCompletedQuiz(true)
    }
  }

  return (
    <div>
      {!isCompletedQuiz ? (
        <>
          <QuizCard
            question={questions[step - 1].q}
            options={questions[step - 1].opts}
            onAnswer={handleAnswer}
            disabled={!!feedback} // prevent multiple clicks after answering
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
            </div>
          )}
          <StepNav current={step} total={questions.length} />
        </>
      ) : (
        <>
        <ShowUpgrade/>
          {/* <div>Score Card</div>
          <img
            src={quote.gif}
            alt="Description of image"
            height={200}
            width="100%"
          />
          {quote.type ? quote.quote : quote.meme} */}
        </>
      )}
    </div>
  )
}
