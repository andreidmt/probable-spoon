const debug = require("debug")("ProbableSpoon:IndexApp")

import React from "react"
import { hot } from "react-hot-loader/root"
import { Helmet } from "react-helmet"

import { AppRouter } from "./index.router"

import "core.ui/index.css"

// React hot reloading
export const App = hot(() => (
  <React.Fragment>
    <Helmet titleTemplate="%s | Probable Spoon" defaultTitle="Probable Spoon" />
    <AppRouter />
  </React.Fragment>
))
