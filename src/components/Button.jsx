import React from "react"

export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 16px",
        marginTop: "12px",
        borderRadius: "6px",
        border: "none",
        backgroundColor: "#007bff",
        color: "#fff",
        cursor: "pointer"
      }}
    >
      {children}
    </button>
  )
}
