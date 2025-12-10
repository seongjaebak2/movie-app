import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Search from "./pages/Search";
import MovieDetail from "./pages/MovieDetail";
import useLocalStorage from "./hooks/useLocalStorage";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";

export default function App() {
  const { user, loading } = useAuth();

  if (loading) return null;
  //로그인 전에는 빈 배열만 사용
  const storageKey = user ? `favorites_${user.email}` : null;

  const [favorites, setFavorites] = useLocalStorage(storageKey, []);

  useEffect(() => {
    if (!user) {
      setFavorites([]);
    }
  }, [user]);

  function toggleFav(movie) {
    if (!user) return; // 보호용

    setFavorites((prev) =>
      prev.some((m) => m.id === movie.id)
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie]
    );
  }

  return (
    <BrowserRouter>
      <Header favorites={favorites} />
      <Routes>
        <Route
          path="/"
          element={<Home favorites={favorites} toggleFav={toggleFav} />}
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites favorites={favorites} toggleFav={toggleFav} />
            </ProtectedRoute>
          }
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
