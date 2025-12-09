import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaSearch, FaHeart } from "react-icons/fa";
import SearchBar from "./SearchBar";
import "./Header.css";

export default function Header({ favorites = [] }) {
  const [open, setOpen] = useState(false); // 모바일 메뉴
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (query) => {
    setSearchOpen(false);
    if (query.trim()) navigate(`/search?q=${query}`);
  };

  return (
    <>
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="container header-inner">
          <Link to="/" className="logo">
            MyMovie
          </Link>

          <nav className={`nav ${open ? "open" : ""}`}>
            <Link to="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link to="/favorites" onClick={() => setOpen(false)}>
              Favorites
            </Link>
          </nav>

          <div className="header-right">
            {/* 즐겨찾기 아이콘 */}
            <Link to="/favorites" className="fav-icon">
              <FaHeart />
              {favorites.length > 0 && (
                <span className="fav-count">{favorites.length}</span>
              )}
            </Link>

            {/* 검색 아이콘 */}
            <button
              className="search-btn"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <FaSearch />
            </button>

            {/* 모바일 메뉴 버튼 */}
            <button className="menu-btn" onClick={() => setOpen(!open)}>
              {open ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      {/* 검색 모달 */}
      {searchOpen && (
        <div className="search-modal">
          <div
            className="search-overlay"
            onClick={() => setSearchOpen(false)}
          />
          <div className="search-content">
            <SearchBar onSubmit={handleSearchSubmit} autoFocus />
          </div>
        </div>
      )}
    </>
  );
}
