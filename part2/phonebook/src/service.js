import axios from "axios";

const BASE_URL = "http://localhost:3001";

const getAllPersons = () => {
  return axios.get(`${BASE_URL}/persons`);
};
const createPerson = (newPerson) => {
  return axios.post(`${BASE_URL}/persons`, newPerson);
};
const deletePerson = (id) => {
  return axios.delete(`${BASE_URL}/persons/${id}`);
};
const updatePerson = (id, updatedPerson) => {
  return axios.put(`${BASE_URL}/persons/${id}`, updatedPerson);
};
export { getAllPersons, createPerson, deletePerson, updatePerson };
