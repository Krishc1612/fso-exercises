const express = require('express');

const app = express();
app.use(express.json());

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.get("/", (req, res) => {
    res.send("<h3>this is phonebook server</h3>");
})

app.get("/info", (req, res) => {
    const currTime = Date().toString();
    const content = `<p>Phonebook has content for ${persons.length} people</p><p>${currTime}</p>`;

    // console.log(content);
    res.send(content);
})

app.get("/api/persons", (req, res) => {
    res.json(persons);
})

app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    const person = persons.find(person => person.id === id);

    if (person) return res.status(200).json(person);
    else return res.status(404).json({
        error: `No person found`
    })
})

app.post('/api/persons', (req, res) => {
    const generateId = () => {
        return String(Math.floor(Math.random() * 1e9));
    }

    const newPerson = {
        name: req.body.name,
        number: req.body.number,
        id: generateId()
    }

    if (
        newPerson.name === undefined || 
        newPerson.number === undefined
    ){
        return res.status(400).json({
            error: "Name and number are required fields"
        });
    }

    const smallNewName = newPerson.name.toLowerCase();
    const exists = persons.find(person => {
        const smallName = person.name.toLowerCase();
        return smallName === smallNewName;
    })

    if (exists) {
        return res.status(400).json({
            error: "Name must be unique."
        });
    }

    persons = persons.concat(newPerson);

    console.log(persons);

    return res.status(201).json({
        message: `${newPerson.name} successfully added to the phonebook`
    });
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find(person => person.id === id);

    if (person) {
        persons = persons.filter(person => person.id !== id);
        console.log(persons); 

        return res.status(204).end();
    }
    else return res.status(404).json({
        error: `No person found with id ${id}`
    });
})

PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})