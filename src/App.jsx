import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Search from "./pages/Search";
import MovieDetail from "./pages/MovieDetail";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  const [favorites, setFavorites] = useLocalStorage("favorites", []);

  function toggleFav(movie) {
    setFavorites((prev) =>
      prev.some((m) => m.id === movie.id)
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie]
    );
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home favorites={favorites} toggleFav={toggleFav} />}
        />
        <Route
          path="/favorites"
          element={<Favorites favorites={favorites} toggleFav={toggleFav} />}
        />
        <Route
          path="/search"
          element={<Search toggleFav={toggleFav} favorites={favorites} />}
        />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
