// QuizCard.jsx
import React from "react";
import Button from "./Button";

export default function QuizCard({
  question,
  options,
  onAnswer,
  disabled,
  selectedAnswer,
  correctAnswer
}) {

  console.error(disabled)
  return (
    <div style={{ padding: "16px", border: "1px solid #ccc", borderRadius: "8px", margin: "12px 0" }}>
      <h3>{question}</h3>
      {options.map((opt, i) => {
        let bg = "";
        if (disabled) {
          if (opt === selectedAnswer && opt === correctAnswer) bg = "lightgreen";
          else if (opt === selectedAnswer && opt !== correctAnswer) bg = "salmon";
        }
        return (
          <Button
            key={i}
            disabled={disabled}
            onClick={() => onAnswer(opt)}
            style={{ backgroundColor: bg }}
          >
            {opt}
          </Button>
        );
      })}
    </div>
  );
}
