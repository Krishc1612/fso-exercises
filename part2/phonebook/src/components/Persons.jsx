const Person = ({ name, number }) => {
    return (
        <p>{name} {number}</p>
    );
}

const Persons = ({ persons, filter }) => {
    const getFilteredPersons = () => {
        const smallFilter = filter.trim().toLowerCase();

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
                />
            ))}
        </div>
    );
}

export default Persons;