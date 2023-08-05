import { useQueryClient } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import { fetchMovieData } from "../api/movie";

export default function Header() {
  const { pathname } = useLocation();

  const queryClient = useQueryClient();
  const onMouseOver = () => {
    if (pathname !== "/") return;

    queryClient.prefetchQuery({
      queryKey: ["movies", 1],
      queryFn: fetchMovieData,
    });
  };
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        padding: 20,
        backgroundColor: "whitesmoke",
      }}
    >
      <Link to={"/"}>TODO LIST</Link>
      <Link to={"/pagination"} onMouseOver={onMouseOver}>
        페이지네이션
      </Link>
      <Link to={"/fetchmore"}>더보기</Link>
      <Link to={"/infinite"}>무한스크롤</Link>
    </div>
  );
}
