import React from "react"

export default function LanguageSelector({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        padding: "8px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        width: "100%",
        marginTop: "8px"
      }}
    >
      <option value="javascript">Javascript</option>
      <option value="java">Java</option>
      <option value="python">Python</option>
      <option value="nodejs">Node Js</option>
    </select>
  )
}
