import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="big-num">404</div>
      <h2>Page not found</h2>
      <p style={{ color: "var(--muted)" }}>
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link className="btn primary" to="/">Go back home</Link>
    </div>
  );
}
