const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = ( {name, exercises} ) => {
  return (
    <p>Course: {name}, Exercises: {exercises}</p>
  )
}

const Content = ( {parts} ) => {
  return (
    <div>
      {parts.map((part) => (
        <Part name={part.name} exercises={part.exercises} />
      ))}
    </div>
  )
}

const Total = ( {parts})  => {
  const sum = parts[0].exercises + parts[1].exercises + parts[2].exercises
  return (
    <p>Total number of exercises: {sum}</p>
  )
}



const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]


  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}


export default App
