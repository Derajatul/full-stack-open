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
  const [message, setMessage] = useState({
    type: null,
    message: null,
  });

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
      <Notification message={message?.message} type={message?.type} />
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
                  setMessage({
                    type: "success",
                    message: `Updated ${newName}'s number`,
                  });
                  setTimeout(() => {
                    setMessage({
                      type: null,
                      message: null,
                    });
                  }, 5000);
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
            setMessage({
              type: "success",
              message: `Added ${newName}`,
            });
            setTimeout(() => {
              setMessage({
                type: null,
                message: null,
              });
            }, 5000);
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
          setMessage({
            type: "error",
            message: `Information of ${
              persons.find((p) => p.id === id).name
            } has already been removed from server`,
          });
          setTimeout(() => {
            setMessage({
              type: null,
              message: null,
            });
          }, 5000);
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

const Notification = ({ message, type }) => {
  if (message === null && type === null) {
    return null;
  }

  return (
    <div
      className={`notification ${type}`}
      style={{
        color: type === "error" ? "red" : "green",
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
      }}
    >
      {message}
    </div>
  );
};
export default App;
