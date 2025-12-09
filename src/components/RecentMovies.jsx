import MovieCard from "./MovieCard";
import { FaHistory, FaTimes } from "react-icons/fa";
import "./RecentMovies.css";

export default function RecentMovies({
  recentMovies = [],
  setRecentMovies,
  toggleFav,
}) {
  if (!recentMovies || recentMovies.length === 0) {
    return (
      <section className="recent-movies">
        <div className="recent-container">
          <div className="no-recent">
            <FaHistory size={48} />
            <p>No recently viewed movies</p>
          </div>
        </div>
      </section>
    );
  }

  const removeMovie = (id) => {
    const updated = recentMovies.filter((movie) => movie.id !== id);
    setRecentMovies(updated);
    localStorage.setItem("recentMovies", JSON.stringify(updated));
  };

  const clearAll = () => {
    setRecentMovies([]);
    localStorage.removeItem("recentMovies");
  };

  return (
    <section className="recent-movies">
      <div className="recent-container">
        <div className="recent-header">
          <h2 className="section-title">🕒 Recently Viewed</h2>
          <button className="clear-btn" onClick={clearAll}>
            Clear All
          </button>
        </div>
        <div className="row-scroll fade">
          {recentMovies.map((movie) => (
            <div key={movie.id} className="recent-item">
              <MovieCard movie={movie} isFav={false} toggleFav={toggleFav} />
              <button
                className="remove-btn"
                onClick={() => removeMovie(movie.id)}
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
