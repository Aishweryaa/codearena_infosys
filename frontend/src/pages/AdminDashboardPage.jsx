import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAdminDashboard } from "../api/adminApi.js";
import { getErrorMessage } from "../api/http.js";
import {
  Alert,
  Loader,
  StatCard,
} from "../components/Common.jsx";
import { Icon } from "../components/Icons.jsx";

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
    return <Loader message="Loading administrator control center..." />;
  }

  return (
    <div className="page-stack admin-dashboard-page">
      <header className="page-header admin-page-heading admin-dashboard-hero">
        <div>
          <span className="hero-status-pill admin-status-pill">
            <span className="hero-status-dot" />
            Administrator access verified
          </span>
          <p className="eyebrow">PLATFORM CONTROL CENTER</p>
          <h1>Manage CodeArena with confidence</h1>
          <p>
            Create coding challenges, manage accounts, inspect
            submissions, and monitor the platform from one workspace.
          </p>

          <div className="hero-actions">
            <Link className="button button-primary" to="/admin/problems/create">
              <Icon name="plus" size={18} />
              Create problem
            </Link>
            <Link className="button button-secondary" to="/admin/submissions">
              <Icon name="submissions" size={18} />
              Review submissions
            </Link>
          </div>
        </div>

        <div className="admin-hero-visual" aria-hidden="true">
          <span className="admin-orbit admin-orbit-one" />
          <span className="admin-orbit admin-orbit-two" />
          <span className="admin-core">
            <Icon name="admin" size={38} />
          </span>
          <span className="admin-node admin-node-one">
            <Icon name="users" size={18} />
          </span>
          <span className="admin-node admin-node-two">
            <Icon name="database" size={18} />
          </span>
          <span className="admin-node admin-node-three">
            <Icon name="code" size={18} />
          </span>
        </div>
      </header>

      {message && <Alert>{message}</Alert>}

      <section className="statistics-grid">
        <StatCard
          icon="users"
          label="Registered accounts"
          value={dashboard?.totalUsers ?? 0}
          detail="Local and Google accounts"
        />
        <StatCard
          icon="profile"
          label="Regular users"
          value={dashboard?.regularUsers ?? 0}
          detail="Accounts with USER role"
        />
        <StatCard
          icon="admin"
          label="Administrators"
          value={dashboard?.adminUsers ?? 0}
          detail="Privileged platform accounts"
        />
        <StatCard
          icon="problems"
          label="Problem records"
          value={dashboard?.totalProblems ?? 0}
          detail="Published coding challenges"
        />
      </section>

      <section className="admin-action-grid">
        <Link className="admin-action-card" to="/admin/problems">
          <span className="admin-action-icon">
            <Icon name="problems" size={22} />
          </span>
          <div>
            <strong>Problem management</strong>
            <p>Create, edit, delete, and organize coding challenges.</p>
          </div>
          <Icon name="arrow" size={20} />
        </Link>

        <Link className="admin-action-card" to="/admin/users">
          <span className="admin-action-icon">
            <Icon name="users" size={22} />
          </span>
          <div>
            <strong>User management</strong>
            <p>Search registered accounts and control platform roles.</p>
          </div>
          <Icon name="arrow" size={20} />
        </Link>

        <Link className="admin-action-card" to="/admin/submissions">
          <span className="admin-action-icon">
            <Icon name="submissions" size={22} />
          </span>
          <div>
            <strong>Submission monitoring</strong>
            <p>Inspect submitted source code, verdicts, and test results.</p>
          </div>
          <Icon name="arrow" size={20} />
        </Link>
      </section>

      <section className="dashboard-content-grid">
        <article className="panel-card security-audit-card">
          <div className="panel-heading-row">
            <div>
              <p className="eyebrow">SECURITY STATUS</p>
              <h2>Protection layers active</h2>
            </div>
            <span className="panel-heading-icon success-icon">
              <Icon name="shield" size={22} />
            </span>
          </div>

          <ul className="security-feature-list">
            <li><Icon name="check" size={17} /> BCrypt password hashing</li>
            <li><Icon name="check" size={17} /> JWT request filtering</li>
            <li><Icon name="check" size={17} /> Stateless security sessions</li>
            <li><Icon name="check" size={17} /> ADMIN endpoint restrictions</li>
            <li><Icon name="check" size={17} /> Frontend role guards</li>
            <li><Icon name="check" size={17} /> Isolated Docker execution</li>
          </ul>
        </article>

        <article className="panel-card admin-demo-card">
          <p className="eyebrow">DEMO READY</p>
          <h2>End-to-end coding workflow</h2>
          <p>
            Your platform is ready to demonstrate the complete flow
            from problem creation to code execution and leaderboard update.
          </p>

          <div className="demo-flow">
            <span>Problem</span>
            <Icon name="arrow" size={16} />
            <span>Code</span>
            <Icon name="arrow" size={16} />
            <span>Docker</span>
            <Icon name="arrow" size={16} />
            <span>Verdict</span>
          </div>

          <Link className="button button-secondary" to="/dashboard">
            Open user experience
            <Icon name="arrow" size={17} />
          </Link>
        </article>
      </section>
    </div>
  );
}
