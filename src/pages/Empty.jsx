import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../api/todoList";

export default function Empty() {
  const { data, isFetching } = useQuery(["todos"], getTodos);
  console.log("빈페이지에서 todos: ", data);
  //   console.log("isFetching: ", isFetching);
  return <h1>빈 페이지입니다.</h1>;
}
