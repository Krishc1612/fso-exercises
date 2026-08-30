import { useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

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

          setPersons(persons.concat(newPerson));
      }
      else if (trimmedName !== '') alert(`${trimmedName} is already added to phonebook`);
  }

  const handleNumChange = (event) => setNewNumber(event.target.value);

  // console.log(persons);

  const handleFilter = (event) => setFilter(event.target.value); 

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
      <Persons persons = {persons} filter = {filter}/>
    </div>
  )
}

export default App