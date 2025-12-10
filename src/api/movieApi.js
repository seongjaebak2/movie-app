import tmdbApi from "./tmdbApi";

export const getPopularMovies = (page = 1) =>
  tmdbApi.get("/movie/popular", { params: { page } }).then((res) => res.data);

export const searchMovies = (query) =>
  tmdbApi.get("/search/movie", { params: { query } }).then((res) => res.data);

export const getMovieDetail = (id) =>
  tmdbApi.get(`/movie/${id}`).then((res) => res.data);

export const getMovieVideos = (id) =>
  tmdbApi.get(`/movie/${id}/videos`).then((res) => res.data);

export const getMovieRecommendations = async (id) => {
  const res = await tmdbApi.get(`/movie/${id}/recommendations`);
  return res.data;
};
