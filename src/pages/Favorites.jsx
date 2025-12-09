import MovieCard from "../components/MovieCard";
import { FaHeart } from "react-icons/fa";
import "./Favorites.css";

export default function Favorites({ favorites, toggleFav }) {
  return (
    <main className="favorites-page">
      <section className="container">
        {/* ✅ Header */}
        <div className="favorites-header">
          <h1>
            <FaHeart /> My Favorites
          </h1>
          <p>{favorites.length} movies saved</p>
        </div>

        {/* ✅ Empty State */}
        {favorites.length === 0 ? (
          <div className="favorites-empty">
            <FaHeart className="empty-icon" />
            <h3>찜한 영화가 없습니다</h3>
            <p>마음에 드는 영화를 추가해보세요.</p>
          </div>
        ) : (
          <div className="grid fade">
            {favorites.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFav
                toggleFav={toggleFav}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
