import { useState, useEffect } from 'react'

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personServices from './services/persons'
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personServices
      .getAll()
      .then(data => {
        // console.log("response after get:",response.data);
        setPersons(data);
      })
  }, []);

  const handleNameChange = (event) => {
  // console.log(event.target.value);
      setNewName(event.target.value);
  }

  const handleSubmit = (event) => {
      event.preventDefault();

      const trimmedName = newName.trim();
      const trimmedNumber = newNumber.trim();

      const matches = persons.filter(person => person.name === trimmedName);

      setNewName('');
      setNewNumber('');

      if (trimmedName !== '' && matches.length === 0){
          const newPerson = {
              name : trimmedName,
              number: trimmedNumber
          }

          personServices
            .create(newPerson)
            .then(data => {
              // console.log("response after post:", response.data);
              setPersons(persons.concat(data));
              setMessage(`Added ${trimmedName}`);

              setTimeout(() => {
                setMessage(null);
              }, 5000);
            })
      }
      else if (trimmedName !== '') {
        const msg = `${matches[0].name} is already added to the phonebook, replace the old number with a new one?`;

        if (window.confirm(msg)) {
          const modPerson = { ...matches[0], number: trimmedNumber};
          const newPersons = persons.map(person => person.id === matches[0].id ? modPerson : person);

          personServices
            .update(matches[0].id, modPerson)
            .then(data => {
              console.log("Number changed");
              setPersons(newPersons);
              setMessage(`Changed number of ${matches[0].name}`);

              setTimeout(() => {
                setMessage(null);
              }, 5000);
            })
        }
      } 
  }

  const handleNumChange = (event) => setNewNumber(event.target.value);

  // console.log(persons);

  const handleFilter = (event) => setFilter(event.target.value);
  
  const handleDelete = (id) => {
    // console.log(`${id} needs to be deleted.`);
    const toDelete = persons.find(person => person.id === id);
    
    if(window.confirm(`Delete ${toDelete.name}?`)){
      const newPersons = persons.filter(person => person.id !== id);

      personServices
        .deletePerson(id)
        .then(data => {
          console.log(data);
          setPersons(newPersons);
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {message}/>
      <Filter value = {filter} onChange = {handleFilter}/>
      <h2>add a new</h2>
      <PersonForm 
        newName = {newName}
        newNumber = {newNumber}
        handleNameChange = {handleNameChange}
        handleNumChange = {handleNumChange}
        handleSubmit = {handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons 
        persons = {persons} 
        filter = {filter}
        handleDelete = {handleDelete} 
      />
    </div>
  )
}

export default App