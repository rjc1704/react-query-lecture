import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTodo } from "../api/todoList";

export default function Detail() {
  const { id } = useParams();
  const { data: todo, isLoading } = useQuery(["todo", id], () => getTodo(id));
  console.log("todo: ", todo);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <h1>투두 상세 "id: {id}"</h1>
      <h2>{todo.content}</h2>
    </div>
  );
}
