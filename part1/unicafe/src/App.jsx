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

const StatisticLine = ({ text, value }) => {
  return (
    <p>{text} {value}</p>
  );
}

const Statistics = ({ good, neutral, bad }) => {
  const getSum = () => {
    return good + neutral + bad;
  }

  const getAverage = () => {
    const sum = getSum();

    if (sum !== 0) return (good - bad)/sum;
    else return 0;
  }

  const getPositivePercent = () => {
    const sum = getSum();

    if (sum !== 0) return (good/sum) * 100;
    else return 0;
  }

  if (getSum() !== 0){
    return (
      <div>
        <h1>Statistics</h1>
        <StatisticLine text = "good" value = {good}/>
        <StatisticLine text = "neutral" value = {neutral}/>
        <StatisticLine text = "bad" value = {bad}/>
        <StatisticLine text = "all" value = {getSum()}/>
        <StatisticLine text = "average" value = {getAverage()}/>
        <StatisticLine text = "positive" value = {`${getPositivePercent()} %`}/>
      </div>
    );
  } 
  else {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
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