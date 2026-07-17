import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Alert,
  Loader,
} from "../components/Common.jsx";
import {
  getProblemId,
  getProblemSummary,
  ProblemDifficultyBadge,
} from "../components/ProblemCommon.jsx";
import { getErrorMessage } from "../api/http.js";
import { getProblems } from "../api/problemApi.js";

export default function ProblemsPage() {
  const [problems, setProblems] = useState([]);
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProblems()
      .then(setProblems)
      .catch((error) =>
        setMessage(
          getErrorMessage(error, "Unable to load coding problems")
        )
      )
      .finally(() => setLoading(false));
  }, []);

  const filteredProblems = useMemo(() => {
    const search = query.trim().toLowerCase();

    return problems.filter((problem) => {
      const matchesSearch =
        !search ||
        problem.title?.toLowerCase().includes(search) ||
        problem.description?.toLowerCase().includes(search) ||
        problem.category?.toLowerCase().includes(search);

      const matchesDifficulty =
        difficulty === "ALL" ||
        String(problem.difficulty).toUpperCase() === difficulty;

      return matchesSearch && matchesDifficulty;
    });
  }, [problems, query, difficulty]);

  if (loading) {
    return <Loader message="Loading coding problems..." />;
  }

  return (
    <div className="page-stack">
      <header className="page-header problem-library-header">
        <div>
          <p className="eyebrow">PROBLEM LIBRARY</p>
          <h1>Choose your next coding challenge</h1>
          <p>
            Search CodeArena problems, filter by difficulty, and
            open a challenge to study the statement and examples.
          </p>
        </div>

        <article className="problem-count-card">
          <strong>{filteredProblems.length}</strong>
          <span>problems shown</span>
        </article>
      </header>

      <section className="problem-toolbar">
        <label className="problem-search-field">
          <span>⌕</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, topic, or description"
          />
        </label>

        <label className="problem-filter-field">
          <span>Difficulty</span>
          <select
            value={difficulty}
            onChange={(event) =>
              setDifficulty(event.target.value)
            }
          >
            <option value="ALL">All difficulties</option>
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
        </label>
      </section>

      {message && <Alert>{message}</Alert>}

      {!message && filteredProblems.length === 0 && (
        <section className="problem-empty-state">
          <span>&lt;/&gt;</span>
          <h2>No matching problems</h2>
          <p>
            Try a different keyword or difficulty filter. An
            administrator can also create a new challenge.
          </p>
        </section>
      )}

      <section className="problem-card-grid">
        {filteredProblems.map((problem) => {
          const problemId = getProblemId(problem);

          return (
            <article className="coding-problem-card" key={problemId}>
              <div className="coding-problem-card-top">
                <ProblemDifficultyBadge
                  difficulty={problem.difficulty}
                />
                <span>#{problemId}</span>
              </div>

              <div>
                <h2>{problem.title}</h2>
                <p>{getProblemSummary(problem)}</p>
              </div>

              <div className="problem-card-metadata">
                <span>
                  {problem.category || "General programming"}
                </span>
                <span>
                  {problem.timeLimit
                    ? `${problem.timeLimit} ms`
                    : "Standard limit"}
                </span>
              </div>

              <Link
                className="button button-primary button-block"
                to={`/problems/${problemId}`}
              >
                View challenge
              </Link>
            </article>
          );
        })}
      </section>
    </div>
  );
}
