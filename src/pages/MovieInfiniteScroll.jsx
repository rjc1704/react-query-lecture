import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { fetchMovieData } from "../api/movie";

export default function MovieInfiniteScroll() {
  const {
    data: movies,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["movies"],
    queryFn: fetchMovieData,
    getNextPageParam: (lastPage) => {
      console.log("getNextPageParam 호출");
      console.log("lastPage: ", lastPage);
      if (lastPage.page < lastPage.total_pages) {
        console.log("다음 페이지로 pageParam 저장");
        return lastPage.page + 1;
      }
    },
    select: (data) => {
      return data.pages.map((pageData) => pageData.results).flat();
    },
  });
  console.log("hasNextPage:", hasNextPage);
  console.log("movies: ", movies);
  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    },
  });

  return (
    <div>
      {console.log("무한스크롤 UI 렌더링")}
      <h1>영화 무한스크롤 예제</h1>

      <ul style={{ marginBottom: 300 }}>
        {movies?.map((movie, idx) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
      <div
        style={{
          textAlign: "center",
          backgroundColor: "green",
          color: "white",
          width: "100%",
          height: 50,
        }}
        ref={ref}
      >
        Trigger to Fetch Here
      </div>
    </div>
  );
}
