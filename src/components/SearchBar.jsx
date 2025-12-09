import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ onSubmit, autoFocus = false }) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    if (!q.trim()) return;

    if (onSubmit) {
      onSubmit(q); // 부모 컴포넌트로 전달
    } else {
      navigate(`/search?q=${encodeURIComponent(q)}`);
    }
  }

  return (
    <form className="search-bar" onSubmit={submit}>
      <FaSearch className="search-icon" />
      <input
        placeholder="Search movies, actors, genres..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        autoFocus={autoFocus}
      />
      {q && (
        <button type="submit" className="search-btn">
          Search
        </button>
      )}
    </form>
  );
}
