import { useState, useEffect } from 'react'
import personsService from './services/persons.js'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import Notification from './components/Notification.jsx'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

  useEffect(() => {

    personsService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  )

  const sendNotification = (message, messageType) => {
    setMessageType(messageType)
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      const shouldModify = window.confirm(`${existingPerson.name} is already added to the phonebook, replace the old number with a new one?`)
      if (shouldModify) {
        const modifiedExistingPerson = { ...existingPerson, name: personObject.name, number: personObject.number }
        personsService
          .update(existingPerson.id, modifiedExistingPerson)
          .then(updatedPerson => {
            setPersons(
              persons.map(person => person.id === updatedPerson.id
                ? updatedPerson
                : person
              )
            )
            setNewName('')
            setNewNumber('')
            sendNotification(
              `Updated ${updatedPerson.name}`,
              'success'
            )
          })
          .catch(error => {
            setPersons(persons.filter(person => person.id !== existingPerson.id))
            sendNotification(
              `Information of ${existingPerson.name} has already been removed from the server`,
              'error'
            )
          })
      }
    } else {
      personsService.create(personObject)
        .then(person => {
          setPersons(persons.concat(person))
          setNewName('')
          setNewNumber('')
          sendNotification(
            `Added ${person.name}`,
            'success'
          )
        })
    }
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService
        .remove(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
          sendNotification(
            `Deleted ${response.name}`,
            'success'
          )
        })
        .catch(error => {
          sendNotification(
            `Information of ${name} has already been removed from the server`,
            'error'
          )
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageType={messageType} />
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        addNewPerson={addNewPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
