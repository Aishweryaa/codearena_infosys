import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Alert,
  Loader,
  formatDate,
} from "../components/Common.jsx";
import {
  SubmissionStatusBadge,
  getSubmissionId,
  getSubmissionStatus,
} from "../components/SubmissionCommon.jsx";
import { getErrorMessage } from "../api/http.js";
import {
  getMySubmissions,
} from "../api/submissionApi.js";

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [statusFilter, setStatusFilter] =
    useState("ALL");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMySubmissions()
      .then(setSubmissions)
      .catch((error) =>
        setMessage(
          getErrorMessage(
            error,
            "Unable to load your submissions"
          )
        )
      )
      .finally(() => setLoading(false));
  }, []);

  const filteredSubmissions = useMemo(() => {
    if (statusFilter === "ALL") {
      return submissions;
    }

    return submissions.filter(
      (submission) =>
        getSubmissionStatus(submission) ===
        statusFilter
    );
  }, [submissions, statusFilter]);

  if (loading) {
    return <Loader message="Loading submission history..." />;
  }

  return (
    <div className="page-stack">
      <header className="submission-page-header">
        <div>
          <p className="eyebrow">SUBMISSION HISTORY</p>
          <h1>Review your coding attempts</h1>
          <p>
            Inspect every submitted solution, language, verdict,
            and execution result.
          </p>
        </div>

        <label className="submission-filter">
          <span>Verdict</span>
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <option value="ALL">All verdicts</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="WRONG_ANSWER">
              Wrong answer
            </option>
            <option value="COMPILATION_ERROR">
              Compilation error
            </option>
            <option value="RUNTIME_ERROR">
              Runtime error
            </option>
            <option value="TIME_LIMIT_EXCEEDED">
              Time limit exceeded
            </option>
            <option value="PENDING">Pending</option>
            <option value="RUNNING">Running</option>
          </select>
        </label>
      </header>

      {message && <Alert>{message}</Alert>}

      {!message && filteredSubmissions.length === 0 && (
        <section className="submission-empty-state">
          <div className="submission-empty-icon">&lt;/&gt;</div>
          <h2>No submissions found</h2>
          <p>
            Open a coding problem, write a solution, and submit
            it to create your first result.
          </p>
          <Link
            className="button button-primary"
            to="/problems"
          >
            Browse problems
          </Link>
        </section>
      )}

      {filteredSubmissions.length > 0 && (
        <section className="submission-table-card">
          <div className="submission-table-scroll">
            <table className="submission-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Problem</th>
                  <th>Language</th>
                  <th>Verdict</th>
                  <th>Score</th>
                  <th>Submitted</th>
                  <th />
                </tr>
              </thead>

              <tbody>
                {filteredSubmissions.map(
                  (submission) => (
                    <tr
                      key={getSubmissionId(
                        submission
                      )}
                    >
                      <td>
                        #
                        {getSubmissionId(
                          submission
                        )}
                      </td>
                      <td>
                        <strong>
                          {submission.problemTitle ||
                            `Problem #${submission.problemId}`}
                        </strong>
                      </td>
                      <td>
                        {submission.language || "—"}
                      </td>
                      <td>
                        <SubmissionStatusBadge
                          status={submission.status}
                        />
                      </td>
                      <td>
                        {submission.score ?? 0}
                      </td>
                      <td>
                        {formatDate(
                          submission.createdAt
                        )}
                      </td>
                      <td>
                        <Link
                          className="button button-secondary button-small"
                          to={`/submissions/${getSubmissionId(
                            submission
                          )}`}
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
