import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserDashboard } from "../api/userApi.js";
import { getErrorMessage } from "../api/http.js";
import {
  Alert,
  Loader,
  StatCard,
} from "../components/Common.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function DashboardPage() {
  const { user, isAdmin } = useAuth();

  const [dashboard, setDashboard] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserDashboard()
      .then(setDashboard)
      .catch((error) =>
        setMessage(
          getErrorMessage(
            error,
            "Unable to load dashboard information"
          )
        )
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader message="Preparing your dashboard..." />;
  }

  return (
    <div className="page-stack">
      <section className="dashboard-hero">
        <div>
          <p className="eyebrow">MILESTONE 2 DASHBOARD</p>
          <h1>
            Welcome back, <span>{user?.username}</span>
          </h1>
          <p>
            Your account is protected using JWT authentication
            and role-based authorization.
          </p>

          <div className="hero-actions">
            <Link
              className="button button-primary"
              to="/profile"
            >
              View my profile
            </Link>

            {isAdmin && (
              <Link
                className="button button-secondary"
                to="/admin"
              >
                Open admin panel
              </Link>
            )}
          </div>
        </div>

        <article className="security-status-card">
          <span className="security-check">✓</span>
          <div>
            <strong>Session secured</strong>
            <p>Authenticated using a valid JWT bearer token.</p>
          </div>
        </article>
      </section>

      {message && <Alert>{message}</Alert>}

      <section className="statistics-grid">
        <StatCard
          label="Available problems"
          value={dashboard?.availableProblems ?? 0}
          detail="Problem foundation from Milestone 1"
        />
        <StatCard
          label="Total submissions"
          value={dashboard?.totalSubmissions ?? 0}
          detail="Ready for execution milestone"
        />
        <StatCard
          label="Problems solved"
          value={dashboard?.problemsSolved ?? 0}
          detail="Accepted unique problems"
        />
        <StatCard
          label="Current score"
          value={dashboard?.score ?? 0}
          detail={`Leaderboard rank: ${
            dashboard?.leaderboardRank || "—"
          }`}
        />
      </section>

      <section className="dashboard-content-grid">
        <article className="panel-card">
          <p className="eyebrow">COMPLETED IN MILESTONE 2</p>
          <h2>Authentication and authorization</h2>

          <div className="checklist">
            <div>
              <span>✓</span>
              <div>
                <strong>Local registration and login</strong>
                <p>
                  New users can register and log in using email
                  and password.
                </p>
              </div>
            </div>

            <div>
              <span>✓</span>
              <div>
                <strong>Google authentication</strong>
                <p>
                  Google ID tokens are verified by the backend.
                </p>
              </div>
            </div>

            <div>
              <span>✓</span>
              <div>
                <strong>JWT protected APIs</strong>
                <p>
                  Protected endpoints require a valid bearer
                  token.
                </p>
              </div>
            </div>

            <div>
              <span>✓</span>
              <div>
                <strong>USER and ADMIN roles</strong>
                <p>
                  Administrator resources are restricted by
                  Spring Security.
                </p>
              </div>
            </div>
          </div>
        </article>

        <article className="panel-card next-milestone-card">
          <p className="eyebrow">NEXT DEVELOPMENT PHASE</p>
          <h2>Milestone 3 readiness</h2>
          <p>
            Your entity, repository, authentication, and role
            foundation is ready for problem CRUD, test cases, and
            submissions.
          </p>

          <div className="readiness-list">
            <span>Problem entity and repository</span>
            <span>Test-case entity and repository</span>
            <span>Submission entity and repository</span>
            <span>Leaderboard entity and repository</span>
          </div>
        </article>
      </section>
    </div>
  );
}
