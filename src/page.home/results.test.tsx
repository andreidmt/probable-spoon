import React from "react"
import render from "riteway/render-component"
import { describe } from "riteway"

import { ResultUI } from "./results.ui"

describe("UIDebug", async assert => {
  const $ = render(
    <ResultUI
      threshold={3}
      wordFrequencyMap={{
        lake: 1,
        over: 1,
        shines: 1,
        sun: 1,
        the: 2,
      }}
    />
  )

  assert({
    given: "words frequency obj and threshold",
    should: "render list of top words",
    actual: $("[data-test-id=highest-words]").text(),
    expected: "lake (1), over (1), shines (1)",
  })
})
