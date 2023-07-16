import axios from "axios";

export const getTodos = async () => {
  console.log("getTodos 호출");
  const response = await axios.get("http://localhost:5000/todos");
  return response.data;
};

export const getTodo = async (id) => {
  console.log("getTodo 호출!");
  const response = await axios.get(`http://localhost:5000/todos/${id}`);
  return response.data;
};

export const addTodo = (todo) => {
  return axios.post("http://localhost:5000/todos", todo);
};
