import { useEffect, useMemo, useState } from "react";
import Editor from "@monaco-editor/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Alert, Loader } from "../components/Common.jsx";
import {
  ProblemDifficultyBadge,
} from "../components/ProblemCommon.jsx";
import {
  SubmissionStatusBadge,
  getSubmissionId,
} from "../components/SubmissionCommon.jsx";
import { getErrorMessage } from "../api/http.js";
import {
  getProblem,
  getProblemTestCases,
} from "../api/problemApi.js";
import { submitCode } from "../api/submissionApi.js";

const LANGUAGE_OPTIONS = [
  {
    value: "JAVA",
    label: "Java",
    editorLanguage: "java",
    starter: `public class Main {
    public static void main(String[] args) {
        // Write your solution here
    }
}`,
  },
  {
    value: "PYTHON",
    label: "Python",
    editorLanguage: "python",
    starter: `# Write your solution here
`,
  },
  {
    value: "CPP",
    label: "C++",
    editorLanguage: "cpp",
    starter: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // Write your solution here
    return 0;
}`,
  },
  {
    value: "JAVASCRIPT",
    label: "JavaScript",
    editorLanguage: "javascript",
    starter: `// Write your solution here
`,
  },
];

function StatementBlock({ title, value, code = false }) {
  if (!value) {
    return null;
  }

  return (
    <article className="problem-statement-block">
      <h2>{title}</h2>
      {code ? (
        <pre>{value}</pre>
      ) : (
        <p className="problem-preformatted-text">{value}</p>
      )}
    </article>
  );
}

export default function ProblemDetailPage() {
  const { problemId } = useParams();
  const navigate = useNavigate();

  const [problem, setProblem] = useState(null);
  const [testCases, setTestCases] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [language, setLanguage] = useState("JAVA");
  const [sourceCode, setSourceCode] = useState(
    LANGUAGE_OPTIONS[0].starter
  );
  const [submitting, setSubmitting] = useState(false);
  const [submission, setSubmission] = useState(null);
  const [submissionMessage, setSubmissionMessage] =
    useState("");

  const selectedLanguage = useMemo(
    () =>
      LANGUAGE_OPTIONS.find(
        (option) => option.value === language
      ) || LANGUAGE_OPTIONS[0],
    [language]
  );

  useEffect(() => {
    Promise.allSettled([
      getProblem(problemId),
      getProblemTestCases(problemId),
    ])
      .then(([problemResult, testCasesResult]) => {
        if (problemResult.status === "rejected") {
          throw problemResult.reason;
        }

        setProblem(problemResult.value);

        if (testCasesResult.status === "fulfilled") {
          setTestCases(testCasesResult.value);
        }
      })
      .catch((error) =>
        setMessage(
          getErrorMessage(error, "Unable to load this problem")
        )
      )
      .finally(() => setLoading(false));
  }, [problemId]);

  function changeLanguage(event) {
    const nextLanguage = event.target.value;
    const option = LANGUAGE_OPTIONS.find(
      (item) => item.value === nextLanguage
    );

    setLanguage(nextLanguage);
    setSourceCode(option?.starter || "");
    setSubmission(null);
    setSubmissionMessage("");
  }

  async function handleSubmit() {
    if (!sourceCode.trim()) {
      setSubmissionMessage("Source code cannot be empty");
      return;
    }

    try {
      setSubmitting(true);
      setSubmission(null);
      setSubmissionMessage("");

      const result = await submitCode({
        problemId: Number(problemId),
        language,
        sourceCode,
      });

      setSubmission(result);
    } catch (error) {
      setSubmissionMessage(
        getErrorMessage(
          error,
          "Unable to submit your solution"
        )
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <Loader message="Loading problem statement..." />;
  }

  return (
    <div className="page-stack">
      <Link className="problem-back-link" to="/problems">
        ← Back to problem library
      </Link>

      {message && <Alert>{message}</Alert>}

      {!message && problem && (
        <>
          <header className="problem-detail-header">
            <div>
              <p className="eyebrow">CODING CHALLENGE</p>
              <div className="problem-title-row">
                <h1>{problem.title}</h1>
                <ProblemDifficultyBadge
                  difficulty={problem.difficulty}
                />
              </div>
              <p>
                {problem.category || "General programming"}
                {problem.createdBy
                  ? ` · Created by ${problem.createdBy}`
                  : ""}
              </p>
            </div>

            <div className="problem-limit-card">
              <div>
                <span>Time limit</span>
                <strong>
                  {problem.timeLimit
                    ? `${problem.timeLimit} ms`
                    : "—"}
                </strong>
              </div>
              <div>
                <span>Memory limit</span>
                <strong>
                  {problem.memoryLimit
                    ? `${problem.memoryLimit} MB`
                    : "—"}
                </strong>
              </div>
            </div>
          </header>

          <section className="submission-workspace">
            <main className="panel-card problem-statement-panel">
              <StatementBlock
                title="Problem statement"
                value={problem.description}
              />
              <StatementBlock
                title="Input format"
                value={problem.inputFormat}
              />
              <StatementBlock
                title="Output format"
                value={problem.outputFormat}
              />
              <StatementBlock
                title="Constraints"
                value={problem.constraints}
                code
              />

              {(problem.sampleInput || problem.sampleOutput) && (
                <div className="problem-sample-grid">
                  <StatementBlock
                    title="Sample input"
                    value={problem.sampleInput || "—"}
                    code
                  />
                  <StatementBlock
                    title="Sample output"
                    value={problem.sampleOutput || "—"}
                    code
                  />
                </div>
              )}

              {testCases.length > 0 && (
                <article className="problem-statement-block">
                  <h2>Visible test cases</h2>
                  <div className="visible-test-case-list">
                    {testCases.map((testCase, index) => (
                      <section
                        className="visible-test-case-card"
                        key={testCase.id ?? index}
                      >
                        <strong>Test case {index + 1}</strong>
                        <div className="problem-sample-grid">
                          <div>
                            <span>Input</span>
                            <pre>{testCase.input || "—"}</pre>
                          </div>
                          <div>
                            <span>Expected output</span>
                            <pre>
                              {testCase.expectedOutput || "—"}
                            </pre>
                          </div>
                        </div>
                      </section>
                    ))}
                  </div>
                </article>
              )}
            </main>

            <aside className="panel-card code-editor-panel">
              <div className="code-editor-toolbar">
                <label>
                  <span>Language</span>
                  <select
                    value={language}
                    onChange={changeLanguage}
                  >
                    {LANGUAGE_OPTIONS.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <button
                  className="button button-primary"
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  {submitting
                    ? "Executing in Docker..."
                    : "Submit solution"}
                </button>
              </div>

              <div className="monaco-editor-wrapper">
                <Editor
                  height="560px"
                  theme="vs-dark"
                  language={selectedLanguage.editorLanguage}
                  value={sourceCode}
                  onChange={(value) =>
                    setSourceCode(value || "")
                  }
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    wordWrap: "on",
                    tabSize: 4,
                  }}
                />
              </div>

              {submissionMessage && (
                <Alert>{submissionMessage}</Alert>
              )}

              {submission && (
                <section className="submission-result-summary">
                  <div>
                    <p className="eyebrow">LATEST VERDICT</p>
                    <SubmissionStatusBadge
                      status={submission.status}
                    />
                  </div>

                  <div className="submission-result-actions">
                    <button
                      className="button button-secondary"
                      type="button"
                      disabled={!getSubmissionId(submission)}
                      onClick={() =>
                        navigate(
                          `/submissions/${getSubmissionId(
                            submission
                          )}`
                        )
                      }
                    >
                      View result
                    </button>

                    <button
                      className="button button-secondary"
                      type="button"
                      onClick={() => navigate("/submissions")}
                    >
                      Submission history
                    </button>
                  </div>
                </section>
              )}
            </aside>
          </section>
        </>
      )}
    </div>
  );
}
