// src/popup/Onboarding.jsx
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import DateTimeSelector from "../components/DateTime"
import ReactSelect from "../components/ReactSelect"
import developerLanguages from "../configuration/devlanguages.json"

export default function Onboarding() {
  const navigate = useNavigate()
  const {
    plans: { quizDays, days, times, levels, skillset }
  } = useSelector((state) => state.plan)

  const [stepIndex, setStepIndex] = useState(0)
  const [languages, setLanguages] = useState(developerLanguages)
  const [formData, setFormData] = useState({
    languages: [],
    level: "",
    day: "",
    time: "",
    recapDay: ""
  })

  // Safe storage wrapper
  const safeGet = (keys) =>
    new Promise((resolve) => {
      if (chrome?.storage?.local) {
        chrome.storage.local.get(keys, resolve)
      } else {
        const res = {}
        keys.forEach((k) => {
          const val = localStorage.getItem(k)
          res[k] = val ? JSON.parse(val) : null
        })
        resolve(res)
      }
    })

  const safeSet = (obj) => {
    if (chrome?.storage?.local) {
      chrome.storage.local.set(obj)
    } else {
      Object.entries(obj).forEach(([k, v]) => {
        localStorage.setItem(k, JSON.stringify(v))
      })
    }
  }

  // Load saved data
  useEffect(() => {
    const fetchData = async () => {
      const res = await safeGet([
        "languages",
        "level",
        "day",
        "time",
        "recapDay"
      ])
      setFormData((prev) => ({
        ...prev,
        languages: res.languages || [],
        level: res.level || "",
        day: res.day || "",
        time: res.time || "",
        recapDay: res.recapDay || ""
      }))
    }
    fetchData()
  }, [])

  const nextStep = () => setStepIndex((prev) => Math.min(prev + 1, steps.length - 1))
  const prevStep = () => setStepIndex((prev) => Math.max(prev - 1, 0))

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
    safeSet({ [key]: value })
  }

  const steps = [
    {
      key: "languages",
      render: (
        <div>
          <h3>Select Languages</h3>
          <ReactSelect
            options={languages}
            selectedValues={formData.languages}
            onChange={(values) => handleChange("languages", values)}
            placeholder="Select developer languages..."
            maxSelect={skillset}
          />
        </div>
      ),
      isValid: formData.languages.length > 0
    },
    {
      key: "level",
      render: (
        <div>
          <h3>Select Your Level</h3>
          {levels?.map((lvl) => (
            <button
              key={lvl}
              style={{
                margin: 4,
                background: formData.level === lvl ? "lightblue" : "white"
              }}
              onClick={() => handleChange("level", lvl)}>
              {lvl}
            </button>
          ))}
        </div>
      ),
      isValid: formData.level !== ""
    },
    {
      key: "dayTime",
      render: (
        <DateTimeSelector
          days={days}
          quizDays={quizDays}
          times={times}
          selectedDay={formData.day}
          selectedTime={formData.time}
          selectedRecapDay={formData.recapDay}
          onChange={handleChange}
        />
      ),
      isValid:
        formData.day !== "" && formData.time !== "" && formData.recapDay !== ""
    },
    {
      key: "review",
      render: (
        <div>
          <h3>Review & Start Quiz</h3>
          <p>
            <strong>Languages:</strong> {formData.languages.join(", ")}
          </p>
          <p>
            <strong>Level:</strong> {formData.level}
          </p>
          <p>
            <strong>Day:</strong> {formData.day}
          </p>
          <p>
            <strong>Time:</strong> {formData.time}
          </p>
          <p>
            <strong>Recap Day:</strong> {formData.recapDay}
          </p>
        </div>
      ),
      isValid: true
    }
  ]

  return (
    <div style={{ padding: "16px" }}>
      {/* Step Content */}
      {steps[stepIndex].render}

      {/* Navigation Buttons */}
      <div style={{ marginTop: "16px" }}>
        {stepIndex > 0 && <button onClick={prevStep}>Back</button>}
        {stepIndex < steps.length - 1 && (
          <button
            onClick={nextStep}
            disabled={!steps[stepIndex].isValid}
            style={{ marginLeft: 8 }}>
            Next
          </button>
        )}
        {stepIndex === steps.length - 1 && (
          <button
            onClick={() => {
              safeSet(formData)
              navigate("/quiz")
            }}
            style={{ marginLeft: 8 }}>
            Start Quiz
          </button>
        )}
      </div>

      {/* Progress Indicator */}
      <div style={{ marginTop: "20px" }}>
        Step {stepIndex + 1} of {steps.length}
      </div>
    </div>
  )
}
