const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function getPopularMovies(page = 1) {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${page}`
  );
  return res.json();
}

export async function searchMovies(query) {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${query}`
  );
  return res.json();
}

export async function getMovieDetail(id) {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ko-KR`
  );
  return res.json();
}

export async function getMovieVideos(id) {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=ko-KR`
  );
  return res.json();
}
