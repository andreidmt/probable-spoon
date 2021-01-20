const debug = require("debug")("ProbableSpoon:Index")

import React from "react"
import { render } from "react-dom"
import { App } from "./index.app"

render(<App />, document.getElementById("react-root"))

// activate debug logging when in development
if (process.env.NODE_ENV !== "production") {
  window.localStorage.setItem("debug", "ProbableSpoon:*")
}
