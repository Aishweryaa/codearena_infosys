import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Alert,
  Loader,
  formatDate,
} from "../components/Common.jsx";
import {
  SubmissionStatusBadge,
} from "../components/SubmissionCommon.jsx";
import { getErrorMessage } from "../api/http.js";
import {
  getSubmission,
} from "../api/submissionApi.js";

export default function SubmissionDetailPage() {
  const { submissionId } = useParams();

  const [submission, setSubmission] =
    useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSubmission(submissionId)
      .then(setSubmission)
      .catch((error) =>
        setMessage(
          getErrorMessage(
            error,
            "Unable to load submission details"
          )
        )
      )
      .finally(() => setLoading(false));
  }, [submissionId]);

  if (loading) {
    return <Loader message="Loading submission result..." />;
  }

  return (
    <div className="page-stack">
      <Link className="problem-back-link" to="/submissions">
        ← Back to submission history
      </Link>

      {message && <Alert>{message}</Alert>}

      {!message && submission && (
        <>
          <header className="submission-detail-header">
            <div>
              <p className="eyebrow">
                SUBMISSION #{submission.id}
              </p>
              <h1>{submission.problemTitle}</h1>
              <p>
                Submitted by {submission.username}
                {" · "}
                {formatDate(submission.createdAt)}
              </p>
            </div>

            <SubmissionStatusBadge
              status={submission.status}
            />
          </header>

          <section className="submission-stat-grid">
            <article>
              <span>Language</span>
              <strong>{submission.language}</strong>
            </article>
            <article>
              <span>Score</span>
              <strong>{submission.score ?? 0}</strong>
            </article>
            <article>
              <span>Execution time</span>
              <strong>
                {submission.executionTime ?? "—"}
                {submission.executionTime != null
                  ? " ms"
                  : ""}
              </strong>
            </article>
            <article>
              <span>Test cases</span>
              <strong>
                {submission.results?.length ?? 0}
              </strong>
            </article>
          </section>

          <section className="panel-card">
            <div className="submission-section-heading">
              <div>
                <p className="eyebrow">SOURCE CODE</p>
                <h2>Submitted solution</h2>
              </div>
            </div>

            <pre className="submission-source-code">
              {submission.sourceCode}
            </pre>
          </section>

          {submission.compilerOutput && (
            <section className="panel-card">
              <div className="submission-section-heading">
                <div>
                  <p className="eyebrow">
                    COMPILER OUTPUT
                  </p>
                  <h2>Compilation details</h2>
                </div>
              </div>

              <pre className="submission-error-output">
                {submission.compilerOutput}
              </pre>
            </section>
          )}

          <section className="panel-card">
            <div className="submission-section-heading">
              <div>
                <p className="eyebrow">
                  TEST CASE RESULTS
                </p>
                <h2>Execution breakdown</h2>
              </div>
              <span className="submission-count">
                {submission.results?.length ?? 0}
              </span>
            </div>

            {!submission.results?.length ? (
              <p className="muted">
                No detailed test results are available.
              </p>
            ) : (
              <div className="submission-test-result-list">
                {submission.results.map(
                  (result, index) => (
                    <article
                      className="submission-test-result-card"
                      key={result.id ?? index}
                    >
                      <div className="submission-test-result-heading">
                        <strong>
                          Test case {index + 1}
                        </strong>
                        <SubmissionStatusBadge
                          status={result.status}
                        />
                      </div>

                      <div className="submission-output-grid">
                        <div>
                          <span>Actual output</span>
                          <pre>
                            {result.actualOutput || "—"}
                          </pre>
                        </div>

                        <div>
                          <span>Expected output</span>
                          <pre>
                            {result.expectedOutput ||
                              "—"}
                          </pre>
                        </div>
                      </div>

                      {result.errorMessage && (
                        <pre className="submission-error-output">
                          {result.errorMessage}
                        </pre>
                      )}
                    </article>
                  )
                )}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
