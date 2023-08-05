import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { memo, useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addTodo, getTodos } from "../api/todoList";

function Main() {
  const navigate = useNavigate();

  const {
    isLoading,
    isFetching,
    data: todos,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
  // console.log("isLoading, isFetching:", isLoading, isFetching);
  console.log("todos: ", todos); // undefined -> [{}, {}, {}]

  const queryClient = useQueryClient();

  const addMutation = useMutation(addTodo, {
    // onSuccess: () => {
    //   queryClient.invalidateQueries(["todos"]);
    // },
    onMutate: async (newTodo) => {
      console.log("onMutate 호출");
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData(["todos"]);

      queryClient.setQueryData(["todos"], (old) => [...old, newTodo]);

      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      console.log("onError");
      console.log("context:", context);
      queryClient.setQueryData(["todos"], context.previousTodos);
    },
    onSettled: () => {
      console.log("onSettled");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const [content, setContent] = useState("");

  const handleChange = (e) => {
    setContent(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addMutation.mutate({ content });
  };

  const cancelQuery = () => {
    queryClient.cancelQueries(["todos"]);
  };

  if (isLoading) {
    console.log("Main return Loading");
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {console.log("Main return UI")}
      <h1>투두리스트</h1>

      <button style={{ display: "block" }} onClick={cancelQuery}>
        todos 쿼리취소
      </button>
      <Link to={"/empty"}>빈 화면으로 이동</Link>
      <form onSubmit={handleSubmit} style={{ marginTop: 10 }}>
        <input value={content} onChange={handleChange} />
        <button>투두 추가</button>
      </form>
      <ul>
        {todos.map((todo, idx) => (
          <li key={todo.id}>
            <div style={{ width: 300, display: "flex", gap: 20 }}>
              <span>
                {idx}: {todo.content}
              </span>
              <button onClick={() => navigate(`/${todo.id}`)}>상세보기</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(Main);
