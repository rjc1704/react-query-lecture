export default function Pagination({ currentPage, totalPages, onClick }) {
  console.log("currentPage: ", currentPage);
  return (
    <div>
      <span className="page-click" onClick={() => onClick("prev")}>
        {"<"}
      </span>
      {Array(totalPages)
        .fill(0)
        .map((_, idx) => {
          if (idx < 5) {
            return (
              <span
                className={`page-click ${
                  currentPage === idx + 1 && "active-page"
                }`}
                key={idx}
                onClick={() => onClick(idx + 1)}
              >
                {idx + 1}
              </span>
            );
          } else if (idx >= 5 && idx + 1 === totalPages) {
            return (
              <span key={idx}>
                <span style={{ marginLeft: 5, marginRight: 5 }}>...</span>
                <span
                  className={`page-click ${
                    (currentPage === idx + 1 || currentPage === 500) &&
                    "active-page"
                  }`}
                  onClick={() => onClick(totalPages > 500 ? 500 : totalPages)}
                >
                  {/* TMDB API는 페이지 번호 요청을 최대 500까지만 할 수 있게 제한되어있음 */}
                  {totalPages > 500 ? 500 : totalPages}
                </span>
              </span>
            );
          }
        })}
      <span className="page-click" onClick={() => onClick("next")}>
        {">"}
      </span>
    </div>
  );
}
