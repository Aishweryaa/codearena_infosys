import { useEffect, useState } from "react";
import {
  Alert,
  Loader,
} from "../components/Common.jsx";
import { getErrorMessage } from "../api/http.js";
import {
  getLeaderboard,
} from "../api/submissionApi.js";

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

  if (loading) {
    return <Loader message="Calculating CodeArena rankings..." />;
  }

  return (
    <div className="page-stack">
      <header className="submission-page-header">
        <div>
          <p className="eyebrow">CODEARENA RANKINGS</p>
          <h1>Leaderboard</h1>
          <p>
            Rankings are calculated from accepted problems and
            total score.
          </p>
        </div>
      </header>

      {message && <Alert>{message}</Alert>}

      {!message && entries.length === 0 && (
        <section className="submission-empty-state">
          <div className="submission-empty-icon">★</div>
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
            {entries.slice(0, 3).map((entry) => (
              <article
                key={entry.userId}
                className={`leaderboard-podium-card leaderboard-rank-${entry.rank}`}
              >
                <span className="leaderboard-rank">
                  #{entry.rank}
                </span>

                <span className="avatar avatar-large">
                  {entry.username
                    ?.charAt(0)
                    ?.toUpperCase() || "U"}
                </span>

                <strong>{entry.username}</strong>
                <span>{entry.score} points</span>
              </article>
            ))}
          </section>

          <section className="submission-table-card">
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
                  {entries.map((entry) => (
                    <tr key={entry.userId}>
                      <td>
                        <strong>#{entry.rank}</strong>
                      </td>
                      <td>{entry.username}</td>
                      <td>{entry.problemsSolved}</td>
                      <td>{entry.acceptedSubmissions}</td>
                      <td>{entry.totalSubmissions}</td>
                      <td>
                        <strong>{entry.score}</strong>
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
