import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
            t("dashboardLoadError")
          )
        )
      )
      .finally(() => setLoading(false));
  }, []);

  const completion = useMemo(() => {
    const available = Number(
      dashboard?.availableProblems || 0
    );

    const solved = Number(
      dashboard?.problemsSolved || 0
    );

    if (!available) {
      return 0;
    }

    return Math.min(
      100,
      Math.round(
        (solved / available) * 100
      )
    );
  }, [dashboard]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="page-stack">
      <section className="dashboard-hero">
        <div>
          <span className="hero-status-pill">
            <span className="hero-status-dot" />
            {t("dockerJudgeReady")}
          </span>

          <p className="eyebrow">
            {t("codingWorkspace")}
          </p>

          <h1>
            {t("welcomeBackPrefix")}{" "}
            <span>{user?.username}</span>
          </h1>

          <p>
            {t("dashboardHeroDescription")}
          </p>

          <div className="hero-actions">
            <Link
              className="button button-primary"
              to="/problems"
            >
              <Icon
                name="problems"
                size={18}
              />

              {t("startSolving")}

              <Icon
                name="arrow"
                size={17}
              />
            </Link>

            <Link
              className="button button-secondary"
              to="/submissions"
            >
              <Icon
                name="submissions"
                size={18}
              />

              {t("mySubmissions")}
            </Link>

            {isAdmin && (
              <Link
                className="button button-ghost"
                to="/admin"
              >
                <Icon
                  name="admin"
                  size={18}
                />

                {t("adminPanel")}
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
            style={{
              "--progress":
                `${completion * 3.6}deg`,
            }}
          >
            <div>
              <strong>
                {completion}%
              </strong>

              <span>
                {t("completed")}
              </span>
            </div>
          </div>

          <div className="progress-card-copy">
            <p className="eyebrow">
              {t("yourProgress")}
            </p>

            <strong>
              {t("solvedOutOf", {
                solved:
                  dashboard?.problemsSolved ??
                  0,
                available:
                  dashboard?.availableProblems ??
                  0,
              })}
            </strong>

            <p>
              {t("rankAndScore", {
                rank:
                  dashboard?.leaderboardRank ||
                  "—",
                score:
                  dashboard?.score ?? 0,
              })}
            </p>
          </div>
        </article>
      </section>

      {message && (
        <Alert>
          {message}
        </Alert>
      )}

      <section className="statistics-grid">
        <StatCard
          icon="problems"
          label={t("availableProblems")}
          value={
            dashboard?.availableProblems ??
            0
          }
          detail={t(
            "availableProblemsDetail"
          )}
        />

        <StatCard
          icon="submissions"
          label={t("totalSubmissions")}
          value={
            dashboard?.totalSubmissions ??
            0
          }
          detail={t(
            "totalSubmissionsDetail"
          )}
        />

        <StatCard
          icon="check"
          label={t("problemsSolved")}
          value={
            dashboard?.problemsSolved ??
            0
          }
          detail={t(
            "problemsSolvedDetail"
          )}
        />

        <StatCard
          icon="trophy"
          label={t("currentScore")}
          value={dashboard?.score ?? 0}
          detail={t(
            "leaderboardRankDetail",
            {
              rank:
                dashboard?.leaderboardRank ||
                "—",
            }
          )}
        />
      </section>

      <section className="dashboard-content-grid dashboard-modern-grid">
        <article className="panel-card journey-card">
          <div className="panel-heading-row">
            <div>
              <p className="eyebrow">
                {t("howCodeArenaWorks")}
              </p>

              <h2>
                {t("solutionJourney")}
              </h2>
            </div>

            <span className="panel-heading-icon">
              <Icon
                name="activity"
                size={22}
              />
            </span>
          </div>

          <div className="journey-timeline">
            <div>
              <span className="journey-step">
                01
              </span>

              <span className="journey-icon">
                <Icon
                  name="search"
                  size={19}
                />
              </span>

              <div>
                <strong>
                  {t("chooseChallenge")}
                </strong>

                <p>
                  {t(
                    "chooseChallengeDashboardText"
                  )}
                </p>
              </div>
            </div>

            <div>
              <span className="journey-step">
                02
              </span>

              <span className="journey-icon">
                <Icon
                  name="code"
                  size={19}
                />
              </span>

              <div>
                <strong>
                  {t("writeSolution")}
                </strong>

                <p>
                  {t("writeSolutionText")}
                </p>
              </div>
            </div>

            <div>
              <span className="journey-step">
                03
              </span>

              <span className="journey-icon">
                <Icon
                  name="shield"
                  size={19}
                />
              </span>

              <div>
                <strong>
                  {t("runInDocker")}
                </strong>

                <p>
                  {t("runInDockerText")}
                </p>
              </div>
            </div>

            <div>
              <span className="journey-step">
                04
              </span>

              <span className="journey-icon">
                <Icon
                  name="trophy"
                  size={19}
                />
              </span>

              <div>
                <strong>
                  {t("earnRank")}
                </strong>

                <p>
                  {t("earnRankText")}
                </p>
              </div>
            </div>
          </div>
        </article>

        <article className="panel-card quick-action-panel">
          <div className="panel-heading-row">
            <div>
              <p className="eyebrow">
                {t("quickActions")}
              </p>

              <h2>
                {t("continuePractice")}
              </h2>
            </div>

            <span className="panel-heading-icon">
              <Icon
                name="sparkles"
                size={22}
              />
            </span>
          </div>

          <div className="quick-action-list">
            <Link to="/problems">
              <span className="quick-action-icon">
                <Icon
                  name="problems"
                  size={20}
                />
              </span>

              <span>
                <strong>
                  {t("browseProblems")}
                </strong>

                <small>
                  {t("browseProblemsText")}
                </small>
              </span>

              <Icon
                name="arrow"
                size={18}
              />
            </Link>

            <Link to="/submissions">
              <span className="quick-action-icon">
                <Icon
                  name="submissions"
                  size={20}
                />
              </span>

              <span>
                <strong>
                  {t(
                    "reviewSubmissions"
                  )}
                </strong>

                <small>
                  {t(
                    "reviewSubmissionsText"
                  )}
                </small>
              </span>

              <Icon
                name="arrow"
                size={18}
              />
            </Link>

            <Link to="/leaderboard">
              <span className="quick-action-icon">
                <Icon
                  name="leaderboard"
                  size={20}
                />
              </span>

              <span>
                <strong>
                  {t("viewLeaderboard")}
                </strong>

                <small>
                  {t(
                    "viewLeaderboardText"
                  )}
                </small>
              </span>

              <Icon
                name="arrow"
                size={18}
              />
            </Link>
          </div>
        </article>
      </section>
    </div>
  );
}