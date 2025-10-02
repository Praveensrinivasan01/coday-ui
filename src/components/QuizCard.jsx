// QuizCard.jsx
import React from "react";
import Button from "./Button";

export default function QuizCard({
  question,
  onAnswer,
}) {

  return (
    <div style={{ padding: "16px", border: "1px solid #ccc", borderRadius: "8px", margin: "12px 0" }}>
      <h3>{question['question']}</h3>
      {question['options'].map((opt, i) => {
        return (
          <Button
            key={i}
            disabled={question.attended}
            onClick={() => onAnswer(opt)}
            style={{ backgroundColor: question.attended && (opt.id === question.selectedAnswer ? "lightgreen":"salmon" )}}>
            {opt['text']}
          </Button>
        );
      })}
    </div>
  );
}
