import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={(e) => setFilter(e.target.value)} />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={(e) => {
          e.preventDefault();
          if (persons.some((person) => person.name === newName)) {
            alert(`${newName} is already added to phonebook`);
            return;
          }
          setPersons([
            ...persons,
            {
              name: newName,
              number: newNumber,
              id: persons.length + 1,
            },
          ]);
          setNewName("");
          setNewNumber("");
        }}
        onNameChange={(e) => setNewName(e.target.value)}
        onNumberChange={(e) => setNewNumber(e.target.value)}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )}
      />
    </div>
  );
};

const Filter = ({ onChange }) => {
  return (
    <p>
      filter shown with <input type="text" onChange={onChange} />
    </p>
  );
};

const PersonForm = ({ onSubmit, onNameChange, onNumberChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input onChange={onNameChange} />
        <br />
        number: <input onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.length > 0 ? (
        persons.map((person) => (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        ))
      ) : (
        <p>No contacts found</p>
      )}
    </div>
  );
};

export default App;
