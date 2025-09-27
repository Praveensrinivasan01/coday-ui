import { Routes, Route, useNavigate } from "react-router-dom"
import Login from "./Login"
import Quiz from "./Quiz"
import Recap from "./Recap"
import Onboarding from "./Onboarding"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Onboarding />} />
      <Route path="/login" element={<Login />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/recap" element={<Recap />} />
    </Routes>
  )
}
