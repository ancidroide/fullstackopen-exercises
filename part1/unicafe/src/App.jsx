import { useState } from 'react'

const Statisics = (props) => {
  const total = props.good + props.neutral + props.bad

  if (total === 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given yet</p>
      </div>
    );
  }

  const average = (props.good - props.bad) / total
  const positivePercentage = (props.good / total)

  return (
    <div>
      <h2>statistics</h2>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>

      <p>all {total}</p>
      <p>average {average}</p>
      <p>positive {positivePercentage}%</p>
    </div>      
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <Statisics good={good} neutral={neutral} bad={bad} />      
     
    </div>
  )
}

export default App