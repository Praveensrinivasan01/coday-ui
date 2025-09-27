import React, { useState } from "react"
import LanguageSelector from "../components/LanguageSelector"
import Button from "../components/Button"

export default function Onboarding({ onNext }) {
  const [lang, setLang] = useState("en")

  return (
    <div>
      <h2>Choose Language</h2>
      <LanguageSelector value={lang} onChange={setLang} />
      <Button onClick={() => onNext(lang)}>Start Quiz</Button>
    </div>
  )
}
