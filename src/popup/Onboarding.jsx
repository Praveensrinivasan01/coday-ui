// src/popup/Onboarding.jsx
import React,{ useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
const times = ["9-5", "2-11"]
const languages = ["JavaScript", "Java", "Python"]

export default function Onboarding() {
  const [step, setStep] = useState(1)
  const [language, setLanguage] = useState("")
  const [selectedDay, setSelectedDay] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [recapDay, setRecapDay] = useState("")

  const navigate = useNavigate()

  // Load saved data from chrome storage on mount

 
  const saveData = (key, value) => {
    chrome.storage.local.set({ [key]: value })
  }

  const nextStep = () => setStep((prev) => prev + 1)
  const prevStep = () => setStep((prev) => prev - 1)

  const handleFinish = () => {
    // final save
    chrome.storage.local.set(
      { language, day: selectedDay, time: selectedTime, recapDay },
      () => {
        navigate("/quiz") // move to Quiz page
      }
    )
  }

  return (
    <>Checking Onboarding</>
    // <div style={{ padding: "16px" }}>
    //   {step === 1 && (
    //     <div>
    //       <h3>Select Language</h3>
    //       {languages.map((lang) => (
    //         <button
    //           key={lang}
    //           style={{
    //             margin: 4,
    //             background: language === lang ? "lightblue" : "white",
    //           }}
    //           onClick={() => {
    //             setLanguage(lang)
    //             saveData("language", lang)
    //           }}
    //         >
    //           {lang}
    //         </button>
    //       ))}
    //       <div>
    //         <button onClick={nextStep} disabled={!language}>
    //           Next
    //         </button>
    //       </div>
    //     </div>
    //   )}

    //   {step === 2 && (
    //     <div>
    //       <h3>Select Day and Time</h3>
    //       <div>
    //         <label>Day: </label>
    //         <select
    //           value={selectedDay}
    //           onChange={(e) => {
    //             setSelectedDay(e.target.value)
    //             saveData("day", e.target.value)
    //           }}
    //         >
    //           <option value="">Select Day</option>
    //           {days.map((d) => (
    //             <option key={d} value={d}>
    //               {d}
    //             </option>
    //           ))}
    //         </select>
    //       </div>
    //       <div>
    //         <label>Time: </label>
    //         <select
    //           value={selectedTime}
    //           onChange={(e) => {
    //             setSelectedTime(e.target.value)
    //             saveData("time", e.target.value)
    //           }}
    //         >
    //           <option value="">Select Time</option>
    //           {times.map((t) => (
    //             <option key={t} value={t}>
    //               {t}
    //             </option>
    //           ))}
    //         </select>
    //       </div>
    //       <div>
    //         <button onClick={prevStep}>Back</button>
    //         <button
    //           onClick={nextStep}
    //           disabled={!selectedDay || !selectedTime}
    //         >
    //           Next
    //         </button>
    //       </div>
    //     </div>
    //   )}

    //   {step === 3 && (
    //     <div>
    //       <h3>Select Recap Day</h3>
    //       <select
    //         value={recapDay}
    //         onChange={(e) => {
    //           setRecapDay(e.target.value)
    //           saveData("recapDay", e.target.value)
    //         }}
    //       >
    //         <option value="">Select Day</option>
    //         {days.map((d) => (
    //           <option key={d} value={d}>
    //             {d}
    //           </option>
    //         ))}
    //       </select>
    //       <div>
    //         <button onClick={prevStep}>Back</button>
    //         <button onClick={nextStep} disabled={!recapDay}>
    //           Next
    //         </button>
    //       </div>
    //     </div>
    //   )}

    //   {step === 4 && (
    //     <div>
    //       <h3>Ready for Quiz</h3>
    //       <p>Language: {language}</p>
    //       <p>Day: {selectedDay}</p>
    //       <p>Time: {selectedTime}</p>
    //       <p>Recap Day: {recapDay}</p>
    //       <button onClick={prevStep}>Back</button>
    //       <button onClick={handleFinish}>Go to Quiz</button>
    //     </div>
    //   )}
    // </div>
  )
}
