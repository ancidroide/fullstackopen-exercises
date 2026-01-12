const Header = ( {course} ) => {
  return (
    <h1>{course.name}</h1>
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
        <Part key={part.name} name={part.name} exercises={part.exercises} />
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
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}


export default App
