import React from "react"
import Button from "../components/Button"

export default function Recap({ score, onRestart }) {
  return (
    <div>
      <h2>Quiz Complete 🎉</h2>
      <p>Your score: {score}</p>
      <Button onClick={onRestart}>Restart</Button>
    </div>
  )
}
