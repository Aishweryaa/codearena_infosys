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
  getAdminSubmissions,
} from "../api/submissionApi.js";

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("ALL");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminSubmissions()
      .then(setSubmissions)
      .catch((error) =>
        setMessage(
          getErrorMessage(
            error,
            "Unable to load platform submissions"
          )
        )
      )
      .finally(() => setLoading(false));
  }, []);

  const filteredSubmissions = useMemo(() => {
    const normalizedQuery =
      query.trim().toLowerCase();

    return submissions.filter((submission) => {
      const matchesQuery =
        !normalizedQuery ||
        submission.username
          ?.toLowerCase()
          .includes(normalizedQuery) ||
        submission.problemTitle
          ?.toLowerCase()
          .includes(normalizedQuery) ||
        String(
          getSubmissionId(submission)
        ).includes(normalizedQuery);

      const matchesStatus =
        statusFilter === "ALL" ||
        getSubmissionStatus(submission) ===
          statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [submissions, query, statusFilter]);

  if (loading) {
    return <Loader message="Loading all submissions..." />;
  }

  return (
    <div className="page-stack">
      <header className="admin-problem-header">
        <div>
          <p className="eyebrow">
            SUBMISSION MONITORING
          </p>
          <h1>Review platform submissions</h1>
          <p>
            Inspect users, problems, languages, verdicts, and
            execution details.
          </p>
        </div>
      </header>

      <section className="admin-problem-toolbar">
        <input
          type="search"
          value={query}
          onChange={(event) =>
            setQuery(event.target.value)
          }
          placeholder="Search by user, problem, or submission ID"
        />

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
        </select>
      </section>

      {message && <Alert>{message}</Alert>}

      {!message &&
        filteredSubmissions.length === 0 && (
          <section className="submission-empty-state">
            <div className="submission-empty-icon">
              &lt;/&gt;
            </div>
            <h2>No submissions found</h2>
            <p>
              No coding submission matches the current filters.
            </p>
          </section>
        )}

      {filteredSubmissions.length > 0 && (
        <section className="submission-table-card">
          <div className="submission-table-scroll">
            <table className="submission-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Problem</th>
                  <th>Language</th>
                  <th>Verdict</th>
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
                      <td>{submission.username}</td>
                      <td>
                        {submission.problemTitle}
                      </td>
                      <td>{submission.language}</td>
                      <td>
                        <SubmissionStatusBadge
                          status={submission.status}
                        />
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
                          Inspect
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
