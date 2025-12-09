import { FaHeart, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const IMG = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie, isFav, toggleFav }) {
  const navigate = useNavigate();

  return (
    <div className="movie-card">
      <img
        src={IMG + movie.poster_path}
        onClick={() => navigate(`/movie/${movie.id}`)}
      />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <div className="movie-meta">
          <span>
            <FaStar /> {movie.vote_average}
          </span>
          <button
            className={isFav ? "fav active" : "fav"}
            onClick={() => toggleFav(movie)}
          >
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  );
}
