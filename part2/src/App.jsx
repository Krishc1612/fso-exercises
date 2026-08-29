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
  let total = 0;
  parts.forEach(part => total += part.exercises);

  return (
    <p>Number of exercises {total}</p>
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

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App