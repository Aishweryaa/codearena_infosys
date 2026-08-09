import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Alert,
  Loader,
} from "../components/Common.jsx";

import {
  getProblemId,
  getProblemSummary,
  ProblemDifficultyBadge,
} from "../components/ProblemCommon.jsx";

import {
  getErrorMessage,
} from "../api/http.js";

import {
  getProblems,
} from "../api/problemApi.js";

import {
  Icon,
} from "../components/Icons.jsx";

export default function ProblemsPage() {
  const { t } = useTranslation();

  const [
    problems,
    setProblems,
  ] = useState([]);

  const [
    query,
    setQuery,
  ] = useState("");

  const [
    difficulty,
    setDifficulty,
  ] = useState("ALL");

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {
    getProblems()
      .then(setProblems)
      .catch((error) =>
        setMessage(
          getErrorMessage(
            error,
            t("problemLoadError")
          )
        )
      )
      .finally(() =>
        setLoading(false)
      );
  }, []);

  const filteredProblems =
    useMemo(() => {
      const search = query
        .trim()
        .toLowerCase();

      return problems.filter(
        (problem) => {
          const matchesSearch =
            !search ||
            problem.title
              ?.toLowerCase()
              .includes(search) ||
            problem.description
              ?.toLowerCase()
              .includes(search) ||
            problem.category
              ?.toLowerCase()
              .includes(search);

          const matchesDifficulty =
            difficulty === "ALL" ||
            String(
              problem.difficulty
            ).toUpperCase() ===
              difficulty;

          return (
            matchesSearch &&
            matchesDifficulty
          );
        }
      );
    }, [
      problems,
      query,
      difficulty,
    ]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="page-stack">
      <header className="page-header problem-library-header">
        <div>
          <p className="eyebrow">
            {t("problemLibrary")}
          </p>

          <h1>
            {t(
              "chooseNextChallenge"
            )}
          </h1>

          <p>
            {t(
              "problemLibraryDescription"
            )}
          </p>
        </div>

        <article className="problem-count-card">
          <span className="problem-count-icon">
            <Icon
              name="code"
              size={20}
            />
          </span>

          <strong>
            {filteredProblems.length}
          </strong>

          <span>
            {t("problemsShown")}
          </span>
        </article>
      </header>

      <section className="problem-toolbar">
        <label className="problem-search-field">
          <Icon
            name="search"
            size={19}
          />

          <input
            type="search"
            value={query}
            onChange={(event) =>
              setQuery(
                event.target.value
              )
            }
            placeholder={t(
              "searchProblemsPlaceholder"
            )}
          />
        </label>

        <label className="problem-filter-field">
          <span>
            <Icon
              name="filter"
              size={15}
            />{" "}
            {t("difficulty")}
          </span>

          <select
            value={difficulty}
            onChange={(event) =>
              setDifficulty(
                event.target.value
              )
            }
          >
            <option value="ALL">
              {t("allDifficulties")}
            </option>

            <option value="EASY">
              {t("easy")}
            </option>

            <option value="MEDIUM">
              {t("medium")}
            </option>

            <option value="HARD">
              {t("hard")}
            </option>
          </select>
        </label>
      </section>

      {message && (
        <Alert>
          {message}
        </Alert>
      )}

      {!message &&
        filteredProblems.length ===
          0 && (
          <section className="problem-empty-state">
            <span>
              &lt;/&gt;
            </span>

            <h2>
              {t(
                "noMatchingProblems"
              )}
            </h2>

            <p>
              {t(
                "noMatchingProblemsText"
              )}
            </p>
          </section>
        )}

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
                  "--card-index":
                    index,
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
                    {getProblemSummary(
                      problem
                    )}
                  </p>
                </div>

                <div className="problem-card-metadata">
                  <span>
                    {problem.category ||
                      t(
                        "generalProgramming"
                      )}
                  </span>

                  <span>
                    {problem.timeLimit
                      ? `${problem.timeLimit} ms`
                      : t(
                          "standardLimit"
                        )}
                  </span>
                </div>

                <Link
                  className="button button-primary button-block"
                  to={`/problems/${problemId}`}
                >
                  {t("viewChallenge")}

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
    </div>
  );
}