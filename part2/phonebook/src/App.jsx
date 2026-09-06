import { useState, useEffect } from 'react'

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personServices from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

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
            })
      }
      else if (trimmedName !== '') alert(`${trimmedName} is already added to phonebook`);
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