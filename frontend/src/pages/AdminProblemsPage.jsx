import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Alert,
  Loader,
} from "../components/Common.jsx";
import {
  getProblemId,
  ProblemDifficultyBadge,
} from "../components/ProblemCommon.jsx";
import { getErrorMessage } from "../api/http.js";
import {
  deleteProblem,
  getProblems,
} from "../api/problemApi.js";

export default function AdminProblemsPage() {
  const [problems, setProblems] = useState([]);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const [deletingId, setDeletingId] = useState(null);
  const [loading, setLoading] = useState(true);

  function loadProblems() {
    setLoading(true);
    setMessage("");

    getProblems()
      .then(setProblems)
      .catch((error) => {
        setMessageType("error");
        setMessage(
          getErrorMessage(error, "Unable to load problem management")
        );
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadProblems();
  }, []);

  const filteredProblems = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return problems;
    }

    return problems.filter(
      (problem) =>
        problem.title?.toLowerCase().includes(search) ||
        problem.category?.toLowerCase().includes(search)
    );
  }, [problems, query]);

  async function handleDelete(problem) {
    const problemId = getProblemId(problem);
    const confirmed = window.confirm(
      `Delete “${problem.title}” permanently?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(problemId);
      setMessage("");
      await deleteProblem(problemId);

      setProblems((current) =>
        current.filter(
          (currentProblem) =>
            getProblemId(currentProblem) !== problemId
        )
      );

      setMessageType("success");
      setMessage("Problem deleted successfully.");
    } catch (error) {
      setMessageType("error");
      setMessage(
        getErrorMessage(error, "Unable to delete problem")
      );
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return <Loader message="Loading problem management..." />;
  }

  return (
    <div className="page-stack">
      <header className="page-header admin-page-heading">
        <div>
          <p className="eyebrow">PROBLEM MANAGEMENT</p>
          <h1>Manage coding challenges</h1>
          <p>
            Create, inspect, update, or delete problems that are
            available in the user problem library.
          </p>
        </div>

        <Link
          className="button button-primary"
          to="/admin/problems/create"
        >
          + Create problem
        </Link>
      </header>

      <section className="management-toolbar">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by title or category"
        />
      </section>

      {message && <Alert type={messageType}>{message}</Alert>}

      {filteredProblems.length === 0 ? (
        <section className="problem-empty-state">
          <span>+</span>
          <h2>No problems available</h2>
          <p>
            Create your first professional coding challenge for
            CodeArena users.
          </p>
          <Link
            className="button button-primary"
            to="/admin/problems/create"
          >
            Create problem
          </Link>
        </section>
      ) : (
        <section className="table-card">
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Difficulty</th>
                  <th>Category</th>
                  <th>Time limit</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProblems.map((problem) => {
                  const problemId = getProblemId(problem);

                  return (
                    <tr key={problemId}>
                      <td>#{problemId}</td>
                      <td className="problem-title-cell">
                        <strong>{problem.title}</strong>
                      </td>
                      <td>
                        <ProblemDifficultyBadge
                          difficulty={problem.difficulty}
                        />
                      </td>
                      <td>
                        {problem.category || "General programming"}
                      </td>
                      <td>
                        {problem.timeLimit
                          ? `${problem.timeLimit} ms`
                          : "—"}
                      </td>
                      <td>
                        <div className="problem-table-actions">
                          <Link
                            className="button button-secondary button-small"
                            to={`/problems/${problemId}`}
                          >
                            View
                          </Link>
                          <Link
                            className="button button-secondary button-small"
                            to={`/admin/problems/${problemId}/edit`}
                          >
                            Edit
                          </Link>
                          <button
                            className="button button-danger button-small"
                            type="button"
                            disabled={deletingId === problemId}
                            onClick={() => handleDelete(problem)}
                          >
                            {deletingId === problemId
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
