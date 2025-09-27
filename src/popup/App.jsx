import React, { useState } from "react"
// import Login from "./Login"
import Quiz from "./Quiz"
import Recap from "./Recap"
import Onboarding from "./OnBoarding"

export default function App() {
  const [step, setStep] = useState("login")

  const renderStep = () => {
    switch (step) {
    //   case "login":
    //     return <Login onNext={() => setStep("onboarding")} />
      case "onboarding":
        return <Onboarding onNext={() => setStep("quiz")} />
      case "quiz":
        return <Quiz onNext={() => setStep("recap")} />
      case "recap":
        return <Recap onRestart={() => setStep("login")} />
      default:
        return <Login onNext={() => setStep("onboarding")} />
    }
  }

  return (
    <div style={{ width: 300, padding: 16 }}>
      {renderStep()}
    </div>
  )
}
