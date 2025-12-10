import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./LoginModal.css"; // 같은 스타일 재사용

export default function SignUpModal({ onClose, onSwitch }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      setError("Passwords do not match");
      return;
    }

    // 추후 API → signup 으로 교체
    login(email, password); // 가입 후 자동 로그인
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Sign Up</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />

          {error && <p style={{ color: "red", fontSize: 13 }}>{error}</p>}

          <button type="submit" className="login-submit">
            Create Account
          </button>
        </form>

        <div style={{ marginTop: 14, textAlign: "center", fontSize: 14 }}>
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitch}
            style={{
              color: "#ff2d55",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
