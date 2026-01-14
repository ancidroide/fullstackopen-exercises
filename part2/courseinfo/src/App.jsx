// comp resp for 
const Course = ( {course} ) => {
  const totalExercises = course.parts.reduce((total, part) => total + part.exercises, 0)
  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total total={totalExercises}/>
      
    </div>
  )
}

// comp resp for disp header of the course obj
const Header = ( {name} ) => <h1>{name}</h1>


// comp resp for disp content of each part of the course obj
const Content = ({ parts }) => (
  <div>
    {parts.map(part => (
      <Part key={part.id} part={part} />
    ))}
  </div>
)


// comp resp for format a single part of course obj (extracting name and exercises... NOT ID)
const Part = ( {part} ) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

// comp resp for calc and disp total n of exercises per part of course
const Total = ( {total} ) => <b>total of {total} exersises</b>



// main App comp
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