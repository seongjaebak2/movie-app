import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaSearch, FaHeart } from "react-icons/fa";
import SearchBar from "./SearchBar";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import "./Header.css";

export default function Header({ favorites = [] }) {
  const [open, setOpen] = useState(false); // 모바일 메뉴
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

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
  if (loading) return null;
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
            <Link
              to={user ? "/favorites" : "#"}
              className="fav-icon"
              onClick={(e) => {
                if (!user) {
                  e.preventDefault();
                  setLoginOpen(true);
                }
              }}
            >
              <FaHeart />
            </Link>
            {/* 검색 아이콘 */}
            <button
              className="search-btn"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <FaSearch />
            </button>
            {/* 로그인 영역 */}
            {user ? (
              <div className="user-box">
                <span className="user-email">{user.email}</span>
                <button onClick={logout}>Logout</button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setLoginOpen(true);
                  setSignupOpen(false);
                }}
              >
                Login
              </button>
            )}

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

      {loginOpen && (
        <LoginModal
          onClose={() => setLoginOpen(false)}
          onSwitch={() => {
            setLoginOpen(false);
            setSignupOpen(true);
          }}
        />
      )}

      {signupOpen && (
        <SignUpModal
          onClose={() => setSignupOpen(false)}
          onSwitch={() => {
            setSignupOpen(false);
            setLoginOpen(true);
          }}
        />
      )}
    </>
  );
}
