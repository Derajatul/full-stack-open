import { useEffect, useState } from "react";
import {
  createPerson,
  deletePerson,
  getAllPersons,
  updatePerson,
} from "./service";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchPersons = async () => {
      const response = await getAllPersons();
      setPersons(response.data);
    };

    fetchPersons();
  }, []);
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={(e) => setFilter(e.target.value)} />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={(e) => {
          e.preventDefault();
          if (persons.some((person) => person.name === newName)) {
            confirm(
              `${newName} is already added to phonebook, replace the old number with a new one?`
            ) &&
              (() => {
                const person = persons.find((p) => p.name === newName);
                const updatedPerson = { ...person, number: newNumber };
                updatePerson(person.id, updatedPerson).then((response) => {
                  setPersons(
                    persons.map((p) => (p.id !== person.id ? p : response.data))
                  );
                  setNewName("");
                  setNewNumber("");
                });
              })();
            return;
          }

          const createNewPerson = async () => {
            const response = await createPerson({
              name: newName,
              number: newNumber,
            });
            setPersons([...persons, response.data]);
            setNewName("");
            setNewNumber("");
            // clear input fields
            e.target.reset();
          };

          createNewPerson();
        }}
        onNameChange={(e) => {
          setNewName(e.target.value);
        }}
        onNumberChange={(e) => {
          setNewNumber(e.target.value);
        }}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )}
        onDelete={(id) => {
          setPersons(persons.filter((person) => person.id !== id));
        }}
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

const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      {persons.length > 0 ? (
        persons.map((person) => (
          <p key={person.name}>
            {person.name} {person.number}
            <button
              onClick={async () => {
                if (window.confirm(`Delete ${person.name}?`)) {
                  console.log("deleting", person.id);
                  await deletePerson(person.id);
                  onDelete(person.id);
                } else {
                  return;
                }
              }}
            >
              delete
            </button>
          </p>
        ))
      ) : (
        <p>No contacts found</p>
      )}
    </div>
  );
};

export default App;
