import { Routes, Route } from "react-router-dom"
import Login from "./Login"
import Quiz from "./Quiz"
import Recap from "./Recap"
import Onboarding from "./Onboarding"
import withOnboardingCheck from "./HOC"

// Wrap the Quiz page with onboarding check
const QuizWithCheck = withOnboardingCheck(Quiz)

export default function App() {
  return (
    <Routes>
      {/* "/" will show Quiz if completed, otherwise Onboarding */}
      <Route path="/" element={<QuizWithCheck />} />

      <Route path="/login" element={<Login />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/recap" element={<Recap />} />
    </Routes>
  )
}
