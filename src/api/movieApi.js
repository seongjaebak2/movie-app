import api from "./axios";

export const getPopularMovies = (page = 1) =>
  api.get("/movie/popular", { params: { page } }).then((res) => res.data);

export const searchMovies = (query) =>
  api.get("/search/movie", { params: { query } }).then((res) => res.data);

export const getMovieDetail = (id) =>
  api.get(`/movie/${id}`).then((res) => res.data);

export const getMovieVideos = (id) =>
  api.get(`/movie/${id}/videos`).then((res) => res.data);

export const getMovieRecommendations = async (id) => {
  const res = await api.get(`/movie/${id}/recommendations`);
  return res.data;
};
