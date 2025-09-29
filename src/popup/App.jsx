import { Routes, Route } from "react-router-dom"
import Login from "./Login"
import Quiz from "./Quiz"
import Recap from "./Recap"
import Onboarding from "./Onboarding"
import withOnboardingCheck from "./HOC"
import { useDispatch, useSelector } from "react-redux"
import { setPlan } from "src/slice/plan.slice"
import configuration from "../configuration/configuration.json"

// Wrap the Quiz page with onboarding check
const QuizWithCheck = withOnboardingCheck(Quiz)

export default function App() {

  //Need to implement 2 API's Here
  //1. getting user tier from api if tier is basic/permium
  const tierPlan = useSelector(state=>state.tier);
  //Also need to write a api to fetch configuration file. later (Low Priority)
  const dispatch = useDispatch();
  dispatch(setPlan(configuration[tierPlan['tier']]));

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
