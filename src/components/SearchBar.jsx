import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SearchBar() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <form className="search-bar" onSubmit={submit}>
      <input
        placeholder="Search movies..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button type="submit">
        <FaSearch />
      </button>
    </form>
  );
}
