import axios from "axios";

const API_URL = "http://localhost:8080/tasks";

export const getTasks = () => axios.get(API_URL);

export const createTask = (task) => axios.post(API_URL, task);

export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);

export const completeTask = (id) => axios.put(`${API_URL}/${id}/complete`);

export const uncompleteTask = (id) => axios.put(`${API_URL}/${id}/uncomplete`);

export const updateTask = (id, task) => axios.put(`${API_URL}/${id}`, task);
