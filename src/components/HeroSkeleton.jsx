import "./HeroSkeleton.css";

export default function HeroSkeleton() {
  return (
    <section className="hero skeleton">
      <div className="hero-overlay" />

      <div className="hero-content">
        <div className="skeleton badge" />
        <div className="skeleton title" />
        <div className="skeleton genres" />
        <div className="skeleton text" />
        <div className="skeleton button" />
      </div>
    </section>
  );
}
