import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchMovieData } from "../api/movie";
import Pagination from "../components/Pagination";

export default function MoviePagination() {
  // TMDB 에서 영화정보 가져와서 페이지네이션 적용하기
  const [page, setPage] = useState(1);
  const { data: movies, isLoading } = useQuery({
    queryKey: ["movies", page], // initial queryKey:["movie", 1]
    queryFn: fetchMovieData,
    select: ({ total_pages, results }) => ({
      total_pages,
      results,
    }),
    keepPreviousData: true,
  });
  console.log("movies:", movies);

  const onClickPage = (selected) => {
    // 같은 페이지를 그대로 클릭시 함수종료
    if (page === selected) return;
    if (typeof selected === "number") {
      setPage(selected);
      return;
    }
    if (selected === "prev" && page > 1) {
      setPage((prev) => prev - 1);
      return;
    }
    if (selected === "next" && page < movies.total_pages) {
      setPage((prev) => prev + 1);
      return;
    }
  };

  return (
    <div>
      <h1>영화 페이지네이션 예제</h1>
      {isLoading ? (
        <h2>로딩중...</h2>
      ) : (
        <ul>
          {movies?.results?.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      )}

      <Pagination
        currentPage={page}
        totalPages={movies?.total_pages ?? 1}
        onClick={onClickPage}
      />
    </div>
  );
}
