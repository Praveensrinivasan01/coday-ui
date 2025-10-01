import React from "react"

export default function Button({ children, onClick ,disabled }) {
  return (
    <button
      type="button"  
      disabled={disabled} // 👈 this ensures it won’t submit or reload
      onClick={(e) => {
        e.preventDefault(); // 👈 prevents default form behavior
        e.stopPropagation(); // 👈 stops bubbling that could close popup
        onClick?.(e);
      }}
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
