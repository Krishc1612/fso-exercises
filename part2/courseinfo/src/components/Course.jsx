const Header = ({ text }) => <h1>{text}</h1>

const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  );
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => 
        <Part key = {part.id} part = {part}/>
      )}
    </div>
  );
}

const Total = ({ parts }) => {
  // init -> 0
  const total = parts.reduce((acc, curr) => {
    // console.log("what is happening!?", acc, curr);
    // curr is basically the current iteration element of the array, here it is an object. As we only want exercises sum, adding curr.exercises rather than curr makes sense.

    // no need to worry about acc because it is assigned the initial value "init" first 
    return acc + curr.exercises;

    // if we had kept acc + curr, then it would be number + object, which wont give desirable results.
  }, 0); // the 0 is init here.

  return (
    <strong>total of {total} exercises</strong>
  );
}

const Course = ({ course }) => {
  return (
    <div>
      <Header text = {course.name}/>
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>
    </div>
  );
}

export default Course;