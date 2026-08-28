import { useState } from 'react'

const Button = ({ text, onClick }) => {
  return (
    <button onClick = {onClick}>{text}</button>
  );
}

const Display = ({ text }) => {
  return (
    <p>{text}</p>
  );
}

const Header = ({ text }) => {
  return (
    <h1>{text}</h1>
  );
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }

  const changeAnecdote = () => {
    const idx = getRandomInt(anecdotes.length);
    // might get the same idx again
    // console.log("selected idx", idx);
    // console.log("Anecdote changing to, ", anecdotes[idx]);

    setSelected(idx);
  }

  const changeVotes = ( idx ) => {
    const copy = [ ...votes ];
    copy[idx] += 1;

    setVotes(copy);
  }

  const getMaxVotesIdx = () => {
    const maxVotes = Math.max(...votes);
    // spread operator gives arguments as max(1, 2, 3) whileas if we pass votes directly then it would be max([1, 2, 3]) which is not expected by Math.max

    return votes.indexOf(maxVotes);
  }

  const getMaxVotedAnecdote = () => {
    const idx = getMaxVotesIdx();

    return anecdotes[idx];
  }

  const getMaxVotes = () => {
    return Math.max(...votes);
  }

  return (
    <div>
      <Header text = "Anecdote of the day"/>
      <Display text = {anecdotes[selected]}/>
      <Display text = {`has ${votes[selected]} votes`}/>
      <Button text = "vote" onClick = {() => changeVotes(selected)}/>
      {/*Having the function in function here can work great because we want to pass the index whose vote we want to change*/}
      <Button text = "next anecdote" onClick = {changeAnecdote}/>
      <Header text = "Anecdote with most votes"/>
      <Display text = {`${getMaxVotedAnecdote()}`}/>
      <Display text = {`has ${getMaxVotes()} votes`}/>
    </div>
  )
}

export default App