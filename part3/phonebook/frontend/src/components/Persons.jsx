const Person = ({ id, name, number, deletePerson }) => {
  return (
    <div>
      {name} {number}
      <span> </span>
      <button type="button" onClick={() => deletePerson(id, name)}>delete</button>
    </div>
  )
}

const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <div>
      {personsToShow.map(person =>
        <Person
          key={person.id}
          id={person.id}
          name={person.name}
          number={person.number}
          deletePerson={deletePerson}
        />
      )}
    </div>
  )
}

export default Persons
