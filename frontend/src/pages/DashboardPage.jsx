import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getUserDashboard } from "../api/userApi.js";
import { getErrorMessage } from "../api/http.js";
import {
  Alert,
  Loader,
  StatCard,
} from "../components/Common.jsx";
import { Icon } from "../components/Icons.jsx";
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

  const completion = useMemo(() => {
    const available = Number(dashboard?.availableProblems || 0);
    const solved = Number(dashboard?.problemsSolved || 0);

    if (!available) {
      return 0;
    }

    return Math.min(100, Math.round((solved / available) * 100));
  }, [dashboard]);

  if (loading) {
    return <Loader message="Preparing your coding workspace..." />;
  }

  return (
    <div className="page-stack dashboard-page">
      <section className="dashboard-hero">
        <div className="dashboard-hero-copy">
          <span className="hero-status-pill">
            <span className="hero-status-dot" />
            Docker judge ready
          </span>

          <p className="eyebrow">YOUR CODING WORKSPACE</p>
          <h1>
            Welcome back, <span>{user?.username}</span>
          </h1>
          <p>
            Solve challenges, submit code in multiple languages,
            and climb the CodeArena leaderboard.
          </p>

          <div className="hero-actions">
            <Link className="button button-primary" to="/problems">
              <Icon name="problems" size={18} />
              Start solving
              <Icon name="arrow" size={17} />
            </Link>

            <Link className="button button-secondary" to="/submissions">
              <Icon name="submissions" size={18} />
              My submissions
            </Link>

            {isAdmin && (
              <Link className="button button-ghost" to="/admin">
                <Icon name="admin" size={18} />
                Admin panel
              </Link>
            )}
          </div>

          <div className="hero-tech-row">
            <span>Java</span>
            <span>Python</span>
            <span>C++</span>
            <span>JavaScript</span>
          </div>
        </div>

        <article className="dashboard-progress-card">
          <div
            className="progress-ring"
            style={{ "--progress": `${completion * 3.6}deg` }}
          >
            <div>
              <strong>{completion}%</strong>
              <span>completed</span>
            </div>
          </div>

          <div className="progress-card-copy">
            <p className="eyebrow">YOUR PROGRESS</p>
            <strong>
              {dashboard?.problemsSolved ?? 0} of{" "}
              {dashboard?.availableProblems ?? 0} solved
            </strong>
            <p>
              Rank #{dashboard?.leaderboardRank || "—"} · Score{" "}
              {dashboard?.score ?? 0}
            </p>
          </div>
        </article>
      </section>

      {message && <Alert>{message}</Alert>}

      <section className="statistics-grid">
        <StatCard
          icon="problems"
          label="Available problems"
          value={dashboard?.availableProblems ?? 0}
          detail="Challenges ready to solve"
        />
        <StatCard
          icon="submissions"
          label="Total submissions"
          value={dashboard?.totalSubmissions ?? 0}
          detail="All coding attempts"
        />
        <StatCard
          icon="check"
          label="Problems solved"
          value={dashboard?.problemsSolved ?? 0}
          detail="Unique accepted challenges"
        />
        <StatCard
          icon="trophy"
          label="Current score"
          value={dashboard?.score ?? 0}
          detail={`Leaderboard rank: ${
            dashboard?.leaderboardRank || "—"
          }`}
        />
      </section>

      <section className="dashboard-content-grid dashboard-modern-grid">
        <article className="panel-card journey-card">
          <div className="panel-heading-row">
            <div>
              <p className="eyebrow">HOW CODEARENA WORKS</p>
              <h2>Your solution journey</h2>
            </div>
            <span className="panel-heading-icon">
              <Icon name="activity" size={22} />
            </span>
          </div>

          <div className="journey-timeline">
            <div>
              <span className="journey-step">01</span>
              <span className="journey-icon">
                <Icon name="search" size={19} />
              </span>
              <div>
                <strong>Choose a challenge</strong>
                <p>Search and filter the problem library.</p>
              </div>
            </div>

            <div>
              <span className="journey-step">02</span>
              <span className="journey-icon">
                <Icon name="code" size={19} />
              </span>
              <div>
                <strong>Write your solution</strong>
                <p>Use the Monaco editor with language highlighting.</p>
              </div>
            </div>

            <div>
              <span className="journey-step">03</span>
              <span className="journey-icon">
                <Icon name="shield" size={19} />
              </span>
              <div>
                <strong>Run in Docker</strong>
                <p>Your code executes inside an isolated container.</p>
              </div>
            </div>

            <div>
              <span className="journey-step">04</span>
              <span className="journey-icon">
                <Icon name="trophy" size={19} />
              </span>
              <div>
                <strong>Earn your rank</strong>
                <p>Accepted solutions update your leaderboard score.</p>
              </div>
            </div>
          </div>
        </article>

        <article className="panel-card quick-action-panel">
          <div className="panel-heading-row">
            <div>
              <p className="eyebrow">QUICK ACTIONS</p>
              <h2>Continue your practice</h2>
            </div>
            <span className="panel-heading-icon">
              <Icon name="sparkles" size={22} />
            </span>
          </div>

          <div className="quick-action-list">
            <Link to="/problems">
              <span className="quick-action-icon">
                <Icon name="problems" size={20} />
              </span>
              <span>
                <strong>Browse problems</strong>
                <small>Find your next coding challenge</small>
              </span>
              <Icon name="arrow" size={18} />
            </Link>

            <Link to="/submissions">
              <span className="quick-action-icon">
                <Icon name="submissions" size={20} />
              </span>
              <span>
                <strong>Review submissions</strong>
                <small>Inspect verdicts and test results</small>
              </span>
              <Icon name="arrow" size={18} />
            </Link>

            <Link to="/leaderboard">
              <span className="quick-action-icon">
                <Icon name="leaderboard" size={20} />
              </span>
              <span>
                <strong>View leaderboard</strong>
                <small>Compare your progress with other coders</small>
              </span>
              <Icon name="arrow" size={18} />
            </Link>
          </div>
        </article>
      </section>
    </div>
  );
}
