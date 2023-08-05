import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMovieData } from "../api/movie";

export default function MovieFetchMore() {
  const {
    data: movies,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["movies"],
    queryFn: fetchMovieData,
    getNextPageParam: (lastPage) => {
      console.log("lastPage: ", lastPage);
      //   console.log("pages: ", pages);
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
    },
    select: (data) => {
      return data.pages.map((pageData) => pageData.results).flat();
    },
  });
  console.log("movies: ", movies);

  const fetchMore = () => {
    if (!hasNextPage) return;
    fetchNextPage();
  };

  return (
    <div>
      <h1>영화 더보기 예제</h1>

      <ul>
        {movies?.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
      <button style={{ width: "100%" }} onClick={fetchMore}>
        더보기
      </button>
    </div>
  );
}
