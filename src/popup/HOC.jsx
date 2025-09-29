// src/hoc/withOnboardingCheck.jsx
import React, { useEffect, useState } from "react"
import Onboarding from "../popup/Onboarding"

// Small helper to check both chrome.storage.local and localStorage
const getStoredData = async () => {
  if (typeof chrome !== "undefined" && chrome.storage?.local) {
    return await new Promise((resolve) =>
      chrome.storage.local.get(["language", "day", "time", "recapDay"], resolve)
    )
  } else {
    return {
      language: localStorage.getItem("language"),
      day: localStorage.getItem("day"),
      time: localStorage.getItem("time"),
      recapDay: localStorage.getItem("recapDay"),
    }
  }
}

export default function withOnboardingCheck(WrappedComponent) {
  return function OnboardingCheckWrapper(props) {
    const [loading, setLoading] = useState(true)
    const [completed, setCompleted] = useState(false)

    useEffect(() => {
      const checkOnboarding = async () => {
        const res = await getStoredData()
        const isCompleted = res.language && res.day && res.time && res.recapDay
        setCompleted(!!isCompleted)
        setLoading(false)
      }

      checkOnboarding()
    }, [])
    console.log("sdadj")
    if (loading) return <div>Loading...</div>
    if (!completed) return <Onboarding />

    return <WrappedComponent {...props} />
  }
}
