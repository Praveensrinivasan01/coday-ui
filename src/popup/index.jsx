import React from "react"
import { createRoot } from "react-dom/client"
import { HashRouter } from "react-router-dom"
import {Provider} from "react-redux";

import App from "./App"
import { store } from "src/store";

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
      <div style={{ width: "300px", height: "250px", overflow: "auto" }}>
        <App />
      </div>
    </HashRouter>
    </Provider>
  </React.StrictMode>
)
