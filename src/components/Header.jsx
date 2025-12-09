import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          MyMovie
        </Link>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/favorites">Favorites</Link>
        </nav>
      </div>
    </header>
  );
}
