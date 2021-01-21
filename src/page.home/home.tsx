const debug = require("debug")("ProbableSpoon:HomePage")

import React, { useState, useMemo, FunctionComponent } from "react"
import {
  toLower,
  trim,
  pipe,
  split,
  reduce,
  when,
  same,
  read,
  i,
  is,
  isEmpty,
} from "@asd14/m"

import { ResultUI } from "./results.ui"
import css from "./home.module.css"

export const HomePage: FunctionComponent = () => {
  const [text, setText] = useState("The sun shines over the lake")
  const [query, setQuery] = useState("")
  const [threshold, setThreshold] = useState(1)

  const frequencyByWordMap = useMemo(
    () =>
      pipe(
        trim(" "),
        when(isEmpty, same([]), [
          toLower,
          split(/[^A-Za-z]/),
          reduce((acc = {}, item) => ({
            ...acc,
            [item]: is(acc[item]) ? acc[item] + 1 : 1,
          })),
        ])
      )(text),
    [text]
  )

  const queryFrequency: number = useMemo(
    () =>
      pipe(
        toLower,
        source => read(source, null, frequencyByWordMap),
        when(is, i, same(0))
      )(query),
    [frequencyByWordMap, query]
  )

  return (
    <div className={css.home}>
      <div className={css.cell}>
        {`Frequency for "${query}": ${queryFrequency}`}
        <input
          placeholder="Type word"
          value={query}
          onChange={event => setQuery(event.currentTarget.value)}
        />
      </div>
      <div className={css.cell}>
        Top N words:
        <input
          value={isEmpty(threshold) ? "" : threshold}
          type="number"
          min={1}
          onChange={event =>
            setThreshold(Number.parseInt(event.currentTarget.value, 10))
          }
        />
      </div>
      <div className={css.cell}>
        <textarea
          rows={10}
          value={text}
          onChange={event => setText(event.currentTarget.value)}
        />
      </div>
      <div className={css.cell}>
        <ResultUI
          threshold={threshold}
          frequencyByWordMap={frequencyByWordMap}
        />
      </div>
    </div>
  )
}
