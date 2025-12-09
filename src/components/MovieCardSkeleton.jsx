export default function MovieCardSkeleton() {
  return (
    <div className="movie-card skeleton">
      <div className="poster" />
      <div className="info">
        <div className="title" />
        <div className="rating" />
      </div>
    </div>
  );
}
