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
import { Icon } from "../components/Icons.jsx";

export default function ProblemsPage() {
  const [problems, setProblems] = useState([]);
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProblems()
      .then((response) => {
        /*
         * Supports different API response formats:
         * 1. Direct array: [...]
         * 2. { content: [...] }
         * 3. { data: [...] }
         * 4. { problems: [...] }
         */
        const problemList = Array.isArray(response)
          ? response
          : Array.isArray(response?.content)
            ? response.content
            : Array.isArray(response?.data)
              ? response.data
              : Array.isArray(response?.problems)
                ? response.problems
                : [];

        setProblems(problemList);
      })
      .catch((error) => {
        setMessage(
          getErrorMessage(
            error,
            "Unable to load coding problems"
          )
        );

        setProblems([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredProblems = useMemo(() => {
    const safeProblems = Array.isArray(problems)
      ? problems
      : [];

    const searchText = query
      .trim()
      .toLowerCase();

    return safeProblems.filter((problem) => {
      const title = String(
        problem?.title ?? ""
      ).toLowerCase();

      const problemDifficulty = String(
        problem?.difficulty ?? ""
      ).toUpperCase();

      // Search only by problem title.
      const matchesSearch =
        searchText === "" ||
        title.includes(searchText);

      const matchesDifficulty =
        difficulty === "ALL" ||
        problemDifficulty === difficulty;

      return matchesSearch && matchesDifficulty;
    });
  }, [problems, query, difficulty]);

  const clearFilters = () => {
    setQuery("");
    setDifficulty("ALL");
  };

  const filtersApplied =
    query.trim() !== "" ||
    difficulty !== "ALL";

  if (loading) {
    return (
      <Loader message="Loading coding problems..." />
    );
  }

  return (
    <div className="page-stack">
      <header className="page-header problem-library-header">
        <div>
          <p className="eyebrow">
            PROBLEM LIBRARY
          </p>

          <h1>
            Choose your next coding challenge
          </h1>

          <p>
            Search CodeArena problems by title,
            filter by difficulty and open a challenge
            to start solving.
          </p>
        </div>

        <article className="problem-count-card">
          <span className="problem-count-icon">
            <Icon name="code" size={20} />
          </span>

          <strong>
            {filteredProblems.length}
          </strong>

          <span>
            {filteredProblems.length === 1
              ? "problem shown"
              : "problems shown"}
          </span>
        </article>
      </header>

      <section className="problem-toolbar">
        <label className="problem-search-field">
          <Icon name="search" size={19} />

          <input
            type="search"
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            placeholder="Search problems by title"
            aria-label="Search problems by title"
          />
        </label>

        <label className="problem-filter-field">
          <span>
            <Icon name="filter" size={15} />
            Difficulty
          </span>

          <select
            value={difficulty}
            onChange={(event) =>
              setDifficulty(event.target.value)
            }
            aria-label="Filter by difficulty"
          >
            <option value="ALL">
              All difficulties
            </option>

            <option value="EASY">
              Easy
            </option>

            <option value="MEDIUM">
              Medium
            </option>

            <option value="HARD">
              Hard
            </option>
          </select>
        </label>

        {filtersApplied && (
          <button
            type="button"
            className="button button-secondary"
            onClick={clearFilters}
          >
            Clear filters
          </button>
        )}
      </section>

      {message && (
        <Alert>
          {message}
        </Alert>
      )}

      {!message &&
        filteredProblems.length === 0 && (
          <section className="problem-empty-state">
            <span>
              &lt;/&gt;
            </span>

            <h2>
              No problems found
            </h2>

            <p>
              No coding problem matches your
              current title search and difficulty
              selection.
            </p>

            <button
              type="button"
              className="button button-primary"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </section>
        )}

      {!message &&
        filteredProblems.length > 0 && (
          <section className="problem-card-grid">
            {filteredProblems.map(
              (problem, index) => {
                const problemId =
                  getProblemId(problem);

                return (
                  <article
                    className="coding-problem-card"
                    key={problemId}
                    style={{
                      "--card-index": index,
                    }}
                  >
                    <div className="coding-problem-card-top">
                      <ProblemDifficultyBadge
                        difficulty={
                          problem.difficulty
                        }
                      />

                      <span>
                        #{problemId}
                      </span>
                    </div>

                    <div>
                      <h2>
                        {problem.title}
                      </h2>

                      <p>
                        {getProblemSummary(problem)}
                      </p>
                    </div>

                    <div className="problem-card-metadata">
                      <span>
                        {problem.category ||
                          "General programming"}
                      </span>

                      <span>
                        {problem.timeLimit
                          ? `${problem.timeLimit} ms`
                          : "Standard limit"}
                      </span>
                    </div>

                    <Link
                      className={
                        "button button-primary " +
                        "button-block"
                      }
                      to={`/problems/${problemId}`}
                    >
                      View challenge

                      <Icon
                        name="arrow"
                        size={17}
                      />
                    </Link>
                  </article>
                );
              }
            )}
          </section>
        )}
    </div>
  );
}