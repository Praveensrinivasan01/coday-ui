import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { HashRouter } from "react-router-dom"
import { store } from "src/store"

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
    <Provider store={store}>
      <HashRouter>
        <div style={{ width: "400px", height: "280px", overflow: "auto" }}>
          <App />
        </div>
      </HashRouter>
    </Provider>
  </React.StrictMode>
)
