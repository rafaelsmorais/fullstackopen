const Header = ({ name }) =>
  <h1>{name}</h1>

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => {
        return (
          <Part
            key={part.id}
            name={part.name}
            exercises={part.exercises}
          />
        )
      })}
    </div>
  )
}

const Part = ({ name, exercises }) => (
  <p>{name} {exercises}</p>
)

const Total = ({ course }) => {
  const exercises = course.parts.map(part => part.exercises)
  const total = exercises.reduce((sum, exercise) => sum + exercise, 0)
  return (
    <div>
      <strong>{"total of " + total + " exercises"}</strong>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default Course
