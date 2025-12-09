import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetail } from "../api/movieApi";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import TrailerModal from "../components/TrailerModal";
import { getMovieVideos } from "../api/movieApi";

const IMG = "https://image.tmdb.org/t/p/w500";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoKey, setVideoKey] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setError(null);
        setLoading(true);
        const data = await getMovieDetail(id);
        setMovie(data);
      } catch {
        setError("Failed to load movie detail.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  const loadTrailer = async () => {
    const data = await getMovieVideos(id);
    const trailer = data.results.find(
      (v) => v.site === "YouTube" && v.type === "Trailer"
    );
    if (trailer) {
      setVideoKey(trailer.key);
      setOpen(true);
    }
  };

  return (
    <div className="container detail">
      <img src={IMG + movie.poster_path} alt={movie.title} />
      <div>
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        <p>⭐ {movie.vote_average}</p>
        <p>Release: {movie.release_date}</p>
      </div>
      <button onClick={loadTrailer}>▶ Trailer</button>

      {open && (
        <TrailerModal videoKey={videoKey} onClose={() => setOpen(false)} />
      )}
    </div>
  );
}
