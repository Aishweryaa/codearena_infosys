import { Link } from "react-router-dom";
import { Brand } from "../components/Common.jsx";

export default function NotFoundPage() {
  return (
    <main className="not-found-page">
      <section className="not-found-card">
        <Brand />
        <p className="eyebrow">ERROR 404</p>
        <h1>Page not found</h1>
        <p>
          The page you requested does not exist in this CodeArena
          milestone.
        </p>
        <Link className="button button-primary" to="/">
          Return to CodeArena
        </Link>
      </section>
    </main>
  );
}
