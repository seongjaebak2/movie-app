import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getMovieDetail,
  getMovieVideos,
  getMovieRecommendations,
} from "../api/movieApi";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import TrailerModal from "../components/TrailerModal";
import MovieCard from "../components/MovieCard";
import { FaStar, FaPlay, FaFilm } from "react-icons/fa";
import "./MovieDetail.css";
import RecentMovies from "../components/RecentMovies";

const IMG = "https://image.tmdb.org/t/p/original";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoKey, setVideoKey] = useState(null);
  const [open, setOpen] = useState(false);
  const [recentMovies, setRecentMovies] = useState([]);

  useEffect(() => {
    if (!movie) return;
    const saved = JSON.parse(localStorage.getItem("recentMovies") || "[]");
    const updated = [movie, ...saved.filter((m) => m.id !== movie.id)].slice(
      0,
      10
    );
    localStorage.setItem("recentMovies", JSON.stringify(updated));
    setRecentMovies(updated);
  }, [movie]);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const [detail, rec] = await Promise.all([
          getMovieDetail(id),
          getMovieRecommendations(id),
        ]);
        setMovie(detail);
        setRelated(rec.results.slice(0, 8));
      } catch {
        setError("Failed to load movie detail.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const loadTrailer = async () => {
    try {
      if (videoKey) return setOpen(true);

      const data = await getMovieVideos(id);
      const trailer = data.results.find(
        (v) => v.site === "YouTube" && v.type === "Trailer"
      );
      if (!trailer) return alert("트레일러가 제공되지 않는 영화입니다.");
      setVideoKey(trailer.key);
      setOpen(true);
    } catch {
      alert("트레일러 로딩 실패");
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <section
        className="detail-hero"
        style={{ backgroundImage: `url(${IMG + movie.backdrop_path})` }}
      >
        <div className="detail-overlay" />
        <div className="detail container fade">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="detail-poster"
          />
          <div className="detail-info">
            <h1>{movie.title}</h1>
            <div className="detail-meta">
              <span>
                <FaStar /> {movie.vote_average.toFixed(1)}
              </span>
              <span>{movie.release_date?.slice(0, 4)}</span>
              <span>{movie.runtime} min</span>
            </div>
            <p className="overview">{movie.overview}</p>
            <button className="trailer-btn" onClick={loadTrailer}>
              <FaPlay /> Watch Trailer
            </button>
          </div>
        </div>
        {open && (
          <TrailerModal videoKey={videoKey} onClose={() => setOpen(false)} />
        )}
      </section>

      <section className="detail-related">
        <div className="container">
          <h2 className="row-title">Related Movies</h2>
          {related.length > 0 ? (
            <div className="row-scroll">
              {related.map((m) => (
                <MovieCard
                  key={m.id}
                  movie={m}
                  isFav={false}
                  toggleFav={() => {}}
                />
              ))}
            </div>
          ) : (
            <div className="no-related">
              <FaFilm size={48} className="no-related-icon" />
              <p>No related movies found.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
