const Person = ({ name, number }) => {
  return (
    <div>{name} {number}</div>
  )
}

const Persons = ({ personsToShow }) => {
  return (
    <div>
      {personsToShow.map(person => <Person key={person.id} name={person.name} number={person.number} />)}
    </div>
  )
}

export default Persons
