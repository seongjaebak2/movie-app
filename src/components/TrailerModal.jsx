import { useEffect } from "react";
import "./TrailerModal.css";

export default function TrailerModal({ videoKey, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <iframe
          src={`https://www.youtube.com/embed/${videoKey}`}
          title="Trailer"
          allowFullScreen
        />
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
}
