export default function ErrorMessage({ message }) {
  return (
    <div
      className="container"
      style={{ color: "red", textAlign: "center", padding: "40px" }}
    >
      <p>{message}</p>
    </div>
  );
}
