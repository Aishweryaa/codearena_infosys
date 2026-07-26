import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Loader,
} from "../components/Common.jsx";
import { Icon } from "../components/Icons.jsx";
import { getErrorMessage } from "../api/http.js";
import {
  getLeaderboard,
} from "../api/submissionApi.js";

function rankLabel(rank) {
  if (rank === 1) return "Champion";
  if (rank === 2) return "Runner-up";
  if (rank === 3) return "Third place";
  return `Rank ${rank}`;
}

export default function LeaderboardPage() {
  const [entries, setEntries] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLeaderboard()
      .then(setEntries)
      .catch((error) =>
        setMessage(
          getErrorMessage(
            error,
            "Unable to load leaderboard"
          )
        )
      )
      .finally(() => setLoading(false));
  }, []);

  const podiumEntries = useMemo(() => {
    if (entries.length >= 3) {
      return [entries[1], entries[0], entries[2]];
    }

    return entries;
  }, [entries]);

  if (loading) {
    return <Loader message="Calculating CodeArena rankings..." />;
  }

  return (
    <div className="page-stack leaderboard-page">
      <header className="submission-page-header leaderboard-header">
        <div>
          <span className="hero-status-pill">
            <span className="hero-status-dot" />
            Live rankings
          </span>
          <p className="eyebrow">CODEARENA RANKINGS</p>
          <h1>Leaderboard</h1>
          <p>
            Celebrate accepted solutions and see who is leading
            the CodeArena community.
          </p>
        </div>

        <div className="leaderboard-header-icon" aria-hidden="true">
          <Icon name="trophy" size={36} />
          <span />
        </div>
      </header>

      {message && <Alert>{message}</Alert>}

      {!message && entries.length === 0 && (
        <section className="submission-empty-state">
          <div className="submission-empty-icon">
            <Icon name="trophy" size={24} />
          </div>
          <h2>Leaderboard is empty</h2>
          <p>
            Rankings will appear after users submit accepted
            solutions.
          </p>
        </section>
      )}

      {entries.length > 0 && (
        <>
          <section className="leaderboard-podium">
            {podiumEntries.map((entry, index) => (
              <article
                key={entry.userId}
                className={`leaderboard-podium-card leaderboard-rank-${entry.rank}`}
                style={{ "--podium-index": index }}
              >
                <span className="podium-shine" aria-hidden="true" />
                <span className="leaderboard-crown" aria-hidden="true">
                  {entry.rank === 1 ? "♛" : entry.rank === 2 ? "◆" : "▲"}
                </span>
                <span className="leaderboard-rank">
                  #{entry.rank}
                </span>

                <span className="avatar avatar-large podium-avatar">
                  {entry.username
                    ?.charAt(0)
                    ?.toUpperCase() || "U"}
                </span>

                <strong>{entry.username}</strong>
                <span className="podium-label">{rankLabel(entry.rank)}</span>
                <span className="podium-score">
                  {entry.score} <small>points</small>
                </span>
                <span className="podium-solved">
                  <Icon name="check" size={15} />
                  {entry.problemsSolved} solved
                </span>
              </article>
            ))}
          </section>

          <section className="submission-table-card leaderboard-table-card">
            <div className="leaderboard-table-heading">
              <div>
                <p className="eyebrow">GLOBAL STANDINGS</p>
                <h2>All ranked coders</h2>
              </div>
              <span>{entries.length} competitors</span>
            </div>

            <div className="submission-table-scroll">
              <table className="submission-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Coder</th>
                    <th>Problems solved</th>
                    <th>Accepted</th>
                    <th>Total submissions</th>
                    <th>Score</th>
                  </tr>
                </thead>

                <tbody>
                  {entries.map((entry, index) => (
                    <tr
                      key={entry.userId}
                      style={{ "--row-index": index }}
                    >
                      <td>
                        <span className={`table-rank table-rank-${entry.rank}`}>
                          #{entry.rank}
                        </span>
                      </td>
                      <td>
                        <div className="table-user leaderboard-table-user">
                          <span className="avatar">
                            {entry.username
                              ?.charAt(0)
                              ?.toUpperCase() || "U"}
                          </span>
                          <strong>{entry.username}</strong>
                        </div>
                      </td>
                      <td>{entry.problemsSolved}</td>
                      <td>{entry.acceptedSubmissions}</td>
                      <td>{entry.totalSubmissions}</td>
                      <td>
                        <strong className="score-value">
                          {entry.score}
                        </strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
