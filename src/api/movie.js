export async function fetchMovieData({ queryKey, pageParam = 1 }) {
  console.log("fetchMovieData 호출");
  const [_, page] = queryKey;
  // useQuery 에서 사용될 때는 queryKey 에서 page 추출
  // useInfiniteQuery에서 사용될 때는 pageParam 에서 page 추출
  const pageToFetch = page ?? pageParam;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NThhODc2ZTY5NDA4NWY4YTA1MmQyNjc5MTRhY2RlMiIsInN1YiI6IjYxYzNjZjY5MzdiM2E5MDBjMzQ2YzYyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pPkre3BdMQtujbkqtPmW7TC_022A-ZR2M_ZShzd_kDU",
    },
  };
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageToFetch}&include_adult=false`,
    options
  );

  return response.json();
}
