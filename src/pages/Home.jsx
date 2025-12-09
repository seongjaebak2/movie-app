import { useEffect, useState, useCallback } from "react";
import { getPopularMovies } from "../api/movieApi";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

export default function Home({ favorites, toggleFav }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadMore = useCallback(async () => {
    if (loading) return;

    try {
      setLoading(true);
      const data = await getPopularMovies(page);
      setMovies((prev) => [...prev, ...data.results]);
      setPage((prev) => prev + 1);
    } catch {
      setError("Failed to load movies.");
    } finally {
      setLoading(false);
    }
  }, [page, loading]);

  useEffect(() => {
    loadMore(); // 최초 로딩
  }, []);

  const bottomRef = useInfiniteScroll(loadMore);

  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container">
      <SearchBar />
      <div className="grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFav={favorites.some((f) => f.id === movie.id)}
            toggleFav={toggleFav}
          />
        ))}
      </div>

      {/* ✅ 감시 대상 */}
      <div ref={bottomRef} style={{ height: 40 }} />

      {loading && <Loading />}
    </div>
  );
}
