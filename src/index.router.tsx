const debug = require("debug")("ProbableSpoon:AppRouter")

import React, { FunctionComponent } from "react"
import { Route, BrowserRouter, Switch } from "react-router-dom"

import { HomePage } from "./page.home/home"
import { NotFoundPage } from "./page.404/404"

export const AppRouter: FunctionComponent = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/probable-spoon">
        <HomePage />
      </Route>

      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  </BrowserRouter>
)
