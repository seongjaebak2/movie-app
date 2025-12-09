import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import { searchMovies } from "../api/movieApi";
import MovieCardSkeleton from "../components/MovieCardSkeleton";
import ErrorMessage from "../components/ErrorMessage";
import "./Search.css";

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
        setError(null);
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

  return (
    <main className="search-page">
      {/* Search Header */}
      <section className="search-header">
        <SearchBar />
      </section>

      {/* Error */}
      {error && <ErrorMessage message={error} />}

      <section className="container search-result">
        {/* Title */}
        {query && !loading && (
          <div className="search-title">
            <h2>
              검색 결과 <span>“{query}”</span>
            </h2>
            <p>{movies.length} results found</p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && query && movies.length === 0 && (
          <div className="search-empty">
            <h3>검색 결과가 없습니다</h3>
            <p>다른 키워드로 다시 검색해보세요.</p>
          </div>
        )}

        {/* Result */}
        <div className="grid fade">
          {!loading &&
            movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFav={favorites.some((f) => f.id === movie.id)}
                toggleFav={toggleFav}
              />
            ))}
        </div>
      </section>
    </main>
  );
}
