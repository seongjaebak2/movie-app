import { useEffect, useState, useCallback } from "react";
import { getPopularMovies } from "../api/movieApi";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import ErrorMessage from "../components/ErrorMessage";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import MovieCardSkeleton from "../components/MovieCardSkeleton";
import HeroSlider from "../components/HeroSlider";
import RecentMovies from "../components/RecentMovies";
import "./Home.css";

export default function Home({ favorites, toggleFav }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentMovies, setRecentMovies] = useState([]);
  const [sortOption, setSortOption] = useState("popular");

  const sortMovies = (arr, option) => {
    const sorted = [...arr];
    if (option === "rating")
      sorted.sort((a, b) => b.vote_average - a.vote_average);
    else if (option === "title")
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    else if (option === "release")
      sorted.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date)
      );
    return sorted;
  };

  const sortLabels = {
    popular: "POPULAR",
    rating: "RATING",
    release: "RELEASE DATE",
    title: "TITLE",
  };

  // Popular 영화 초기 및 추가 로드
  const loadPopularMovies = useCallback(
    async (reset = false) => {
      if (loading) return;
      try {
        setLoading(true);
        const data = await getPopularMovies(reset ? 1 : page);
        setMovies((prev) =>
          reset ? data.results : [...prev, ...data.results]
        );
        setPage((prev) => (reset ? 2 : prev + 1));
      } catch {
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    },
    [loading, page]
  );

  // 초기 로드
  useEffect(() => {
    loadPopularMovies(true);
  }, []);

  // 최근 본 영화
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("recentMovies") || "[]");
    setRecentMovies(saved);
  }, []);

  // 정렬 옵션 변경
  useEffect(() => {
    if (sortOption === "popular") {
      loadPopularMovies(true); // Popular로 돌아오면 새로 API 호출
    } else {
      setMovies((prev) => sortMovies(prev, sortOption));
    }
  }, [sortOption]);

  const bottomRef = useInfiniteScroll(() => {
    if (sortOption === "popular") loadPopularMovies();
  });

  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <HeroSlider />
      <RecentMovies
        recentMovies={recentMovies}
        setRecentMovies={setRecentMovies}
        toggleFav={toggleFav}
      />

      <main className="home">
        <section className="search-section">
          <SearchBar />
        </section>

        <section className="container movie-section">
          <div className="sort-container">
            <label>Sort by:</label>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="popular">Popular</option>
              <option value="rating">Rating</option>
              <option value="release">Release Date</option>
              <option value="title">Title</option>
            </select>
          </div>

          <h2 className="section-title">🔥 {sortLabels[sortOption]}</h2>

          <div className="grid fade">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFav={favorites.some((f) => f.id === movie.id)}
                toggleFav={toggleFav}
              />
            ))}
          </div>

          {sortOption === "popular" && (
            <div ref={bottomRef} className="scroll-sentinel" />
          )}

          {loading && (
            <div className="grid">
              {Array.from({ length: 8 }).map((_, i) => (
                <MovieCardSkeleton key={i} />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
