import React from "react"

export default function StepNav({ current, total }) {
  return (
    <div style={{ marginTop: "8px", fontSize: "12px", color: "#555" }}>
      Step {current} of {total}
    </div>
  )
}
