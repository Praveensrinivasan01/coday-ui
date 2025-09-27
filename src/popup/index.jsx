import React from "react"
import { createRoot } from "react-dom/client"
import { HashRouter } from "react-router-dom"

import App from "./App"

let container = document.getElementById("root")
if (!container) {
  container = document.createElement("div")
  container.id = "root"
  document.body.appendChild(container)
}

const root = createRoot(container)
root.render(
  <React.StrictMode>
    <HashRouter>
      <div style={{ width: "300px", height: "250px", overflow: "auto" }}>
        <App />
      </div>
    </HashRouter>
  </React.StrictMode>
)
