import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAdminDashboard } from "../api/adminApi.js";
import { getErrorMessage } from "../api/http.js";
import {
  Alert,
  Loader,
  StatCard,
} from "../components/Common.jsx";

export default function AdminDashboardPage() {
  const [dashboard, setDashboard] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminDashboard()
      .then(setDashboard)
      .catch((error) =>
        setMessage(
          getErrorMessage(
            error,
            "Unable to load administrator dashboard"
          )
        )
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader message="Loading administrator dashboard..." />;
  }

  return (
    <div className="page-stack">
      <header className="page-header admin-page-heading">
        <div>
          <p className="eyebrow">ADMINISTRATION</p>
          <h1>CodeArena control center</h1>
          <p>
            Monitor platform accounts and verify role-based
            access from one professional dashboard.
          </p>
        </div>

        <Link
          className="button button-primary"
          to="/admin/users"
        >
          Manage users
        </Link>
      </header>

      {message && <Alert>{message}</Alert>}

      <section className="statistics-grid">
        <StatCard
          label="Registered accounts"
          value={dashboard?.totalUsers ?? 0}
          detail="All local and Google accounts"
        />
        <StatCard
          label="Regular users"
          value={dashboard?.regularUsers ?? 0}
          detail="Accounts with USER role"
        />
        <StatCard
          label="Administrators"
          value={dashboard?.adminUsers ?? 0}
          detail="Accounts with ADMIN role"
        />
        <StatCard
          label="Problem records"
          value={dashboard?.totalProblems ?? 0}
          detail="Milestone 1 database foundation"
        />
      </section>

      <section className="dashboard-content-grid">
        <article className="panel-card">
          <p className="eyebrow">ROLE MANAGEMENT</p>
          <h2>Control platform permissions</h2>
          <p>
            Administrators can view every registered account and
            update USER or ADMIN roles through protected backend
            endpoints.
          </p>

          <Link
            className="button button-primary"
            to="/admin/users"
          >
            Open user management
          </Link>
        </article>

        <article className="panel-card security-audit-card">
          <p className="eyebrow">SECURITY STATUS</p>
          <h2>Milestone 2 protections</h2>

          <ul>
            <li>BCrypt password hashing</li>
            <li>JWT request filtering</li>
            <li>Stateless Spring Security sessions</li>
            <li>ADMIN endpoint restrictions</li>
            <li>Frontend role guards</li>
            <li>CORS restricted to localhost:5173</li>
          </ul>
        </article>
      </section>
    </div>
  );
}
