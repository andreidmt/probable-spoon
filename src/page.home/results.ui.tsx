import React from "react"
import {
  sort,
  pipe,
  map,
  join,
  first,
  filter,
  when,
  read,
  top,
  is,
} from "@asd14/m"

const joinWords = pipe(
  map(([word, frequency]) => `${word} (${frequency})`),
  join(", ")
)

interface ResultUIType {
  threshold?: number;
  frequencyByWordMap: { [key: string]: number };
}

const ResultUI = ({ threshold, frequencyByWordMap }: ResultUIType) => {
  const wordFrequencyTupleArray = pipe(
    Object.entries,
    sort(([aWord, aFrequency], [bWord, bFrequency]) =>
      aFrequency === bFrequency ? aWord > bWord : aFrequency < bFrequency
    )
  )(frequencyByWordMap)

  const highestFrequency: number = pipe(
    first,
    when(is, read(1))
  )(wordFrequencyTupleArray)

  return (
    <div data-test-id="component">
      <strong>Highest frequency: </strong> {highestFrequency}
      <br />
      <strong>Highest frequency word(s): </strong>{" "}
      {pipe(
        filter(([, frequency]) => frequency === highestFrequency),
        joinWords
      )(wordFrequencyTupleArray)}
      <br />
      {is(threshold) ? (
        <React.Fragment>
          <strong>Highest {threshold} words: </strong>
          <span data-test-id="highest-words">
            {pipe(top(threshold), joinWords)(wordFrequencyTupleArray)}
          </span>
        </React.Fragment>
      ) : null}
    </div>
  )
}

ResultUI.defaultProps = {
  threshold: null,
}

const memo = React.memo(ResultUI)

export { memo as ResultUI }
