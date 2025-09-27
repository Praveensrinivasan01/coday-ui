// src/popup/Onboarding.jsx
import React, { useEffect, useState } from "react"
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

  // Safe wrapper: use chrome.storage if available, otherwise fallback to localStorage
  const safeGet = (keys) => {
    return new Promise((resolve) => {
      if (chrome?.storage?.local) {
        chrome.storage.local.get(keys, resolve)
      } else {
        // fallback: pull values from localStorage
        const res = {}
        keys.forEach((k) => {
          res[k] = localStorage.getItem(k) || ""
        })
        resolve(res)
      }
    })
  }

  const safeSet = (obj) => {
    if (chrome?.storage?.local) {
      chrome.storage.local.set(obj)
    } else {
      // fallback: save in localStorage
      Object.entries(obj).forEach(([k, v]) => {
        localStorage.setItem(k, v)
      })
    }
  }

  // Load saved data on mount
  useEffect(() => {
    const fetchData = async () => {
      const res = await safeGet(["language", "day", "time", "recapDay"])
      if (res.language) setLanguage(res.language)
      if (res.day) setSelectedDay(res.day)
      if (res.time) setSelectedTime(res.time)
      if (res.recapDay) setRecapDay(res.recapDay)
    }
    fetchData()
  }, [])

  const saveData = (key, value) => safeSet({ [key]: value })

  const nextStep = () => setStep((prev) => prev + 1)
  const prevStep = () => setStep((prev) => prev - 1)

  const handleFinish = () => {
    // final save
    safeSet({ language, day: selectedDay, time: selectedTime, recapDay })
    navigate("/quiz") // move to Quiz page
  }

  return (
    <div style={{ padding: "16px" }}>
      {step === 1 && (
        <div>
          <h3>Select Language</h3>
          {languages.map((lang) => (
            <button
              key={lang}
              style={{
                margin: 4,
                background: language === lang ? "lightblue" : "white",
              }}
              onClick={() => {
                setLanguage(lang)
                saveData("language", lang)
              }}
            >
              {lang}
            </button>
          ))}
          <div>
            <button onClick={nextStep} disabled={!language}>
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3>Select Day and Time</h3>
          <div>
            <label>Day: </label>
            <select
              value={selectedDay}
              onChange={(e) => {
                setSelectedDay(e.target.value)
                saveData("day", e.target.value)
              }}
            >
              <option value="">Select Day</option>
              {days.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Time: </label>
            <select
              value={selectedTime}
              onChange={(e) => {
                setSelectedTime(e.target.value)
                saveData("time", e.target.value)
              }}
            >
              <option value="">Select Time</option>
              {times.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button onClick={prevStep}>Back</button>
            <button
              onClick={nextStep}
              disabled={!selectedDay || !selectedTime}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3>Select Recap Day</h3>
          <select
            value={recapDay}
            onChange={(e) => {
              setRecapDay(e.target.value)
              saveData("recapDay", e.target.value)
            }}
          >
            <option value="">Select Day</option>
            {days.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <div>
            <button onClick={prevStep}>Back</button>
            <button onClick={nextStep} disabled={!recapDay}>
              Next
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h3>Ready for Quiz</h3>
          <p>Language: {language}</p>
          <p>Day: {selectedDay}</p>
          <p>Time: {selectedTime}</p>
          <p>Recap Day: {recapDay}</p>
          <button onClick={prevStep}>Back</button>
          <button onClick={handleFinish}>Go to Quiz</button>
        </div>
      )}
    </div>
  )
}
