import { useEffect, useState, useRef } from "react";
import { getPopularMovies } from "../api/movieApi";
import { useNavigate } from "react-router-dom";
import { GENRE_MAP } from "../api/genreMap";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import HeroSkeleton from "./HeroSkeleton";
import "./HeroSlider.css";

const BG = "https://image.tmdb.org/t/p/original";
const SLIDE_DURATION = 4500;

export default function HeroSlider() {
  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  /* -------------------------------
     데이터 로드
  -------------------------------- */
  useEffect(() => {
    getPopularMovies(1).then((data) => {
      setMovies(data.results.slice(0, 5));
    });
  }, []);

  /* -------------------------------
     자동 슬라이드 + Progress
  -------------------------------- */
  useEffect(() => {
    if (!movies.length) return;

    startAutoSlide();
    return stopAutoSlide;
  }, [movies, index]);

  const startAutoSlide = () => {
    stopAutoSlide();
    setProgress(0);
    const startTime = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percent = Math.min((elapsed / SLIDE_DURATION) * 100, 100);

      setProgress(percent);

      if (elapsed >= SLIDE_DURATION) {
        setIndex((prev) => (prev + 1) % movies.length);
      }
    }, 50);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  /* -------------------------------
     수동 네비게이션
  -------------------------------- */
  const prevSlide = () => {
    stopAutoSlide();
    setIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  const nextSlide = () => {
    stopAutoSlide();
    setIndex((prev) => (prev + 1) % movies.length);
  };

  if (!movies.length) return <HeroSkeleton />;

  const movie = movies[index];
  const genres = movie.genre_ids
    ?.slice(0, 3)
    .map((id) => GENRE_MAP[id])
    .filter(Boolean);

  return (
    <section
      className="hero slider"
      style={{
        backgroundImage: `url(${BG + movie.backdrop_path})`,
      }}
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      {/* Overlay */}
      <div className="hero-overlay" />

      {/* Left Nav */}
      <button className="hero-nav left" onClick={prevSlide}>
        <FaChevronLeft />
      </button>

      {/* Content */}
      <div key={movie.id} className="hero-content fade">
        <span className="hero-badge">
          <FaStar /> {movie.vote_average.toFixed(1)}
        </span>

        <h1>{movie.title}</h1>

        <div className="hero-genres">
          {genres.map((g) => (
            <span key={g}>{g}</span>
          ))}
          <span className="year">{movie.release_date?.slice(0, 4)}</span>
        </div>

        <p>{movie.overview}</p>

        <button onClick={() => navigate(`/movie/${movie.id}`)}>
          ▶ 자세히 보기
        </button>
      </div>

      {/* Right Nav */}
      <button className="hero-nav right" onClick={nextSlide}>
        <FaChevronRight />
      </button>

      {/* Netflix Progress Bar */}
      <div className="hero-progress">
        <div
          className="hero-progress-bar"
          style={{
            transform: `scaleX(${progress / 100})`,
          }}
        />
      </div>
    </section>
  );
}
