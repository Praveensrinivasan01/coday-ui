import React from "react"
import Button from "./Button"

export default function QuizCard({ question, options, onAnswer }) {
  return (
    <div
      style={{
        padding: "16px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        margin: "12px 0"
      }}
    >
      <h3>{question}</h3>
      {options.map((opt, i) => (
        <Button key={i} onClick={() => onAnswer(opt)}>
          {opt}
        </Button>
      ))}
    </div>
  )
}
