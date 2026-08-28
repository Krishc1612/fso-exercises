import { useState } from 'react'

const Display = ({ text }) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  );
}

const Button = ({ text, onClick }) => {
  return (
    <button onClick = {onClick}>{text}</button>
  );
}

const Statistics = ({ good, neutral, bad }) => {
  return (
    <div>
      <h1>Statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  );
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const header = "give feedback";

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  return (
    <div>
      <Display text = {header}/>
      <Button text = "good" onClick = {handleGood}/>
      <Button text = "neutral" onClick = {handleNeutral}/>
      <Button text = "bad" onClick = {handleBad}/>
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

export default App