import React, { useState } from "react"
import QuizCard from "../components/QuizCard"
import StepNav from "../components/StepNav"

const questions = [
  { q: "What is 2 + 2?", opts: ["3", "4", "5"], answer: "4" },
  { q: "What is the capital of France?", opts: ["Paris", "London", "Berlin"], answer: "Paris" }
]

export default function Quiz({ onNext }) {
  const [step, setStep] = useState(0)
  const [score, setScore] = useState(0)

  const handleAnswer = (opt) => {
    if (opt === questions[step].answer) setScore(score + 1)
    if (step + 1 < questions.length) {
      setStep(step + 1)
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
      />
      <StepNav current={step + 1} total={questions.length} />
    </div>
  )
}
