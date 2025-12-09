import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import { searchMovies } from "../api/movieApi";

export default function Search({ favorites, toggleFav }) {
  const [movies, setMovies] = useState([]);
  const [params] = useSearchParams();
  const query = params.get("q");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    async function load() {
      try {
        setLoading(true);
        const data = await searchMovies(query);
        setMovies(data.results);
      } catch {
        setError("Search failed.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [query]);
  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  return (
    <div className="container">
      <SearchBar />
      <h2>Search: {query}</h2>

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
    </div>
  );
}
