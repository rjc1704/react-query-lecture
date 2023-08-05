import axios from "axios";

export const getTodos = async ({ signal }) => {
  console.log("getTodos 호출");
  const response = await axios.get("http://localhost:5000/todos", { signal });
  return response.data;
};

export const getTodo = async (id) => {
  console.log("getTodo 호출!");
  const response = await axios.get(`http://localhost:5000/todos/${id}`);
  return response.data;
};

export const addTodo = (newTodo) => {
  console.log("addTodo 호출");

  return axios.post("http://localhost:5000/todos", newTodo);
};
