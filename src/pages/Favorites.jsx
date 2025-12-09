import MovieCard from "../components/MovieCard";

export default function Favorites({ favorites, toggleFav }) {
  return (
    <div className="container">
      <h2>Favorites</h2>

      {favorites.length === 0 ? (
        <p>No favorite movies</p>
      ) : (
        <div className="grid">
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
    </div>
  );
}
