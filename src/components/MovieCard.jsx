import "./MovieCard.css";
import { FaHeart, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const IMG = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie, isFav, toggleFav }) {
  const navigate = useNavigate();

  return (
    <div className="movie-card" onClick={() => navigate(`/movie/${movie.id}`)}>
      <img src={IMG + movie.poster_path} alt={movie.title} loading="lazy" />

      {/* overlay */}
      <div className="movie-overlay" />

      <div className="movie-info">
        <h3>{movie.title}</h3>

        <div className="movie-meta">
          <span className="rating">
            <FaStar /> {movie.vote_average.toFixed(1)}
          </span>

          <button
            className={isFav ? "fav active" : "fav"}
            onClick={(e) => {
              e.stopPropagation();
              toggleFav(movie);
            }}
          >
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  );
}
