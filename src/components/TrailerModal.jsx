export default function TrailerModal({ videoKey, onClose }) {
  if (!videoKey) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>
          ✕
        </button>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoKey}`}
          title="Trailer"
          allowFullScreen
        />
      </div>
    </div>
  );
}
