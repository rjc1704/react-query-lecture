import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Empty from "./pages/Empty";
import MoviePagination from "./pages/MoviePagination";
import MovieFetchMore from "./pages/MovieFetchMore";
import MovieInfiniteScroll from "./pages/MovieInfiniteScroll";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/:id" element={<Detail />} />
          <Route path="/empty" element={<Empty />} />
          <Route path="/pagination" element={<MoviePagination />} />
          <Route path="/fetchmore" element={<MovieFetchMore />} />
          <Route path="/infinite" element={<MovieInfiniteScroll />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
