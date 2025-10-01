// src/popup/components/DateTimeSelector.jsx
import React from "react";

export default function DateTimeSelector({
  quizDays=[],
  days = [],
  times = [],
  selectedDay,
  selectedTime,
  selectedRecapDay,
  onChange,
}) {
  return (
    <div>
      <h3>Select Day & Time</h3>
      <div style={{ marginBottom: "10px" }}>
        <label>Day: </label>
        <select
          value={selectedDay}
          onChange={(e) => onChange("day", e.target.value)}
        >
          <option value="">Select Day</option>
          {quizDays.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Time: </label>
        <select
          value={selectedTime}
          onChange={(e) => onChange("time", e.target.value)}
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
        <label>Recap Day: </label>
        <select
          value={selectedRecapDay}
          onChange={(e) => onChange("recapDay", e.target.value)}
        >
          <option value="">Select Day</option>
          {days.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
