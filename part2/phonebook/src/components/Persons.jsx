const Person = ({ name, number, handleDelete }) => {
    return (
        <p>{name} {number} <button onClick = {handleDelete}>delete</button></p>
    );
}

const Persons = ({ persons, filter, handleDelete }) => {
    const getFilteredPersons = () => {
        const smallFilter = filter.trim().toLowerCase();
        // console.log("this is persons:", persons);

        const filtered = persons.filter(({ name }) => {
            name = name.toLowerCase();

            return name.startsWith(smallFilter);
        });

        return filtered;
    }

    return (
        <div>
            {getFilteredPersons().map(person => (
                <Person 
                    key = {person.name}
                    name = {person.name} 
                    number = {person.number}
                    handleDelete = {() => handleDelete(person.id)}
                />
            ))}
        </div>
    );
}

export default Persons;