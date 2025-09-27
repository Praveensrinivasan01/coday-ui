import React, { useState } from "react"
import QuizCard from "../components/QuizCard"
import StepNav from "../components/StepNav"

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

export default function Quiz({ onNext }) {
  const [step, setStep] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null)

  const handleAnswer = (opt) => {
    const isCorrect = opt === questions[step].answer
    if (isCorrect) {
      setScore(score + 1)
    }
    setFeedback({
      isCorrect,
      correctAnswer: questions[step].answer,
      reason: questions[step].reason
    })
  }

  const goNext = () => {
    if (step + 1 < questions.length) {
      setStep(step + 1)
      setFeedback(null)
    } else {
      onNext(score)
    }
  }

  return (
    <div>
      <QuizCard
        question={questions[step].q}
        options={questions[step].opts}
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
          }}
        >
          <p>
            {feedback.isCorrect ? "✅ Correct!" : "❌ Wrong!"} <br />
            The correct answer is: <strong>{feedback.correctAnswer}</strong>
          </p>
          <p><em>Reason: {feedback.reason}</em></p>

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
            }}
          >
            Next
          </button>
        </div>
      )}

      <StepNav current={step + 1} total={questions.length} />
    </div>
  )
}
