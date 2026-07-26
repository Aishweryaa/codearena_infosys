import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  Alert,
  Loader,
} from "../components/Common.jsx";
import {
  getProblemId,
  getTestCaseId,
} from "../components/ProblemCommon.jsx";
import { getErrorMessage } from "../api/http.js";
import {
  createProblem,
  createProblemTestCase,
  getProblem,
  getProblemTestCases,
  updateProblem,
} from "../api/problemApi.js";

const EMPTY_PROBLEM = {
  title: "",
  description: "",
  difficulty: "EASY",
  category: "",
  inputFormat: "",
  outputFormat: "",
  constraints: "",
  sampleInput: "",
  sampleOutput: "",
  timeLimit: 2000,
  memoryLimit: 256,
};

const EMPTY_TEST_CASE = {
  input: "",
  expectedOutput: "",
  hidden: false,
  displayOrder: 1,
};

function Field({
  label,
  name,
  value,
  onChange,
  textarea = false,
  type = "text",
  required = false,
  wide = false,
  placeholder = "",
}) {
  return (
    <label className={`problem-form-field${wide ? " field-wide" : ""}`}>
      <span>{label}</span>
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows="6"
          placeholder={placeholder}
          required={required}
        />
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
      )}
    </label>
  );
}

export default function AdminProblemFormPage() {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(problemId);

  const [form, setForm] = useState(EMPTY_PROBLEM);
  const [newTestCases, setNewTestCases] = useState([
    { ...EMPTY_TEST_CASE },
  ]);
  const [existingTestCases, setExistingTestCases] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(editing);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!editing) {
      return;
    }

    Promise.allSettled([
      getProblem(problemId),
      getProblemTestCases(problemId),
    ])
      .then(([problemResult, testCasesResult]) => {
        if (problemResult.status === "rejected") {
          throw problemResult.reason;
        }

        const problem = problemResult.value;
        setForm({
          title: problem.title || "",
          description: problem.description || "",
          difficulty: problem.difficulty || "EASY",
          category: problem.category || "",
          inputFormat: problem.inputFormat || "",
          outputFormat: problem.outputFormat || "",
          constraints: problem.constraints || "",
          sampleInput: problem.sampleInput || "",
          sampleOutput: problem.sampleOutput || "",
          timeLimit: problem.timeLimit || 2000,
          memoryLimit: problem.memoryLimit || 256,
        });

        if (testCasesResult.status === "fulfilled") {
          setExistingTestCases(testCasesResult.value);
        }
      })
      .catch((error) =>
        setMessage(
          getErrorMessage(error, "Unable to load problem editor")
        )
      )
      .finally(() => setLoading(false));
  }, [editing, problemId]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]:
        name === "timeLimit" || name === "memoryLimit"
          ? Number(value)
          : value,
    }));
    setMessage("");
  }

  function updateNewTestCase(index, field, value) {
    setNewTestCases((current) =>
      current.map((testCase, testCaseIndex) =>
        testCaseIndex === index
          ? { ...testCase, [field]: value }
          : testCase
      )
    );
  }

  function addNewTestCase() {
    setNewTestCases((current) => [
      ...current,
      {
        ...EMPTY_TEST_CASE,
        displayOrder:
          existingTestCases.length + current.length + 1,
      },
    ]);
  }

  function removeNewTestCase(index) {
    setNewTestCases((current) =>
      current.filter((_, testCaseIndex) => testCaseIndex !== index)
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSaving(true);
      setMessage("");

      const savedProblem = editing
        ? await updateProblem(problemId, form)
        : await createProblem(form);

      const savedProblemId =
        getProblemId(savedProblem) || Number(problemId);

      const validNewTestCases = newTestCases.filter(
        (testCase) => testCase.expectedOutput.trim()
      );

      for (const testCase of validNewTestCases) {
        await createProblemTestCase(savedProblemId, {
          ...testCase,
          displayOrder: Number(testCase.displayOrder),
        });
      }

      navigate("/admin/problems", { replace: true });
    } catch (error) {
      setMessage(
        getErrorMessage(
          error,
          editing
            ? "Unable to update problem"
            : "Unable to create problem"
        )
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <Loader message="Loading problem editor..." />;
  }

  return (
    <div className="page-stack">
      <header className="page-header admin-page-heading">
        <div>
          <Link className="problem-back-link" to="/admin/problems">
            ← Back to problem management
          </Link>
          <p className="eyebrow">
            {editing ? "EDIT PROBLEM" : "CREATE PROBLEM"}
          </p>
          <h1>
            {editing
              ? "Update coding challenge"
              : "Create a professional coding challenge"}
          </h1>
          <p>
            Add a complete statement, execution limits, sample
            values, and visible or hidden evaluation test cases.
          </p>
        </div>
      </header>

      {message && <Alert>{message}</Alert>}

      <form className="professional-problem-form" onSubmit={handleSubmit}>
        <section className="panel-card problem-form-section">
          <div className="problem-form-section-heading">
            <p className="eyebrow">BASIC INFORMATION</p>
            <h2>Challenge identity</h2>
          </div>

          <div className="problem-form-grid">
            <Field
              label="Problem title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Example: Two Sum"
              required
              wide
            />

            <label className="problem-form-field">
              <span>Difficulty</span>
              <select
                name="difficulty"
                value={form.difficulty}
                onChange={handleChange}
              >
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>
            </label>

            <Field
              label="Category"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Arrays, Strings, Dynamic Programming"
            />

            <Field
              label="Problem description"
              name="description"
              value={form.description}
              onChange={handleChange}
              textarea
              placeholder="Write the complete challenge statement"
              required
              wide
            />
          </div>
        </section>

        <section className="panel-card problem-form-section">
          <div className="problem-form-section-heading">
            <p className="eyebrow">FORMATS AND LIMITS</p>
            <h2>Input, output, and execution rules</h2>
          </div>

          <div className="problem-form-grid">
            <Field
              label="Input format"
              name="inputFormat"
              value={form.inputFormat}
              onChange={handleChange}
              textarea
            />
            <Field
              label="Output format"
              name="outputFormat"
              value={form.outputFormat}
              onChange={handleChange}
              textarea
            />
            <Field
              label="Constraints"
              name="constraints"
              value={form.constraints}
              onChange={handleChange}
              textarea
              wide
            />
            <Field
              label="Time limit in milliseconds"
              name="timeLimit"
              type="number"
              value={form.timeLimit}
              onChange={handleChange}
              required
            />
            <Field
              label="Memory limit in MB"
              name="memoryLimit"
              type="number"
              value={form.memoryLimit}
              onChange={handleChange}
              required
            />
          </div>
        </section>

        <section className="panel-card problem-form-section">
          <div className="problem-form-section-heading">
            <p className="eyebrow">SAMPLE VALUES</p>
            <h2>Help users understand the expected result</h2>
          </div>

          <div className="problem-form-grid">
            <Field
              label="Sample input"
              name="sampleInput"
              value={form.sampleInput}
              onChange={handleChange}
              textarea
            />
            <Field
              label="Sample output"
              name="sampleOutput"
              value={form.sampleOutput}
              onChange={handleChange}
              textarea
            />
          </div>
        </section>

        {existingTestCases.length > 0 && (
          <section className="panel-card problem-form-section">
            <div className="problem-form-section-heading">
              <p className="eyebrow">EXISTING TEST CASES</p>
              <h2>Currently saved evaluation cases</h2>
            </div>

            <div className="existing-test-case-list">
              {existingTestCases.map((testCase, index) => (
                <article
                  className="existing-test-case-card"
                  key={getTestCaseId(testCase) ?? index}
                >
                  <div>
                    <strong>Test case {index + 1}</strong>
                    <span>
                      {testCase.hidden ? "Hidden" : "Visible"}
                    </span>
                  </div>
                  <pre>{testCase.input || "No input"}</pre>
                  <pre>
                    {testCase.expectedOutput || "No output"}
                  </pre>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="panel-card problem-form-section">
          <div className="problem-form-section-header-row">
            <div className="problem-form-section-heading">
              <p className="eyebrow">NEW TEST CASES</p>
              <h2>
                {editing
                  ? "Add more evaluation cases"
                  : "Add evaluation cases"}
              </h2>
            </div>

            <button
              className="button button-secondary"
              type="button"
              onClick={addNewTestCase}
            >
              + Add test case
            </button>
          </div>

          <div className="new-test-case-list">
            {newTestCases.map((testCase, index) => (
              <article className="new-test-case-card" key={index}>
                <div className="new-test-case-heading">
                  <strong>New test case {index + 1}</strong>

                  {newTestCases.length > 1 && (
                    <button
                      className="problem-remove-test-case"
                      type="button"
                      onClick={() => removeNewTestCase(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="problem-form-grid">
                  <label className="problem-form-field">
                    <span>Input</span>
                    <textarea
                      rows="5"
                      value={testCase.input}
                      onChange={(event) =>
                        updateNewTestCase(
                          index,
                          "input",
                          event.target.value
                        )
                      }
                    />
                  </label>

                  <label className="problem-form-field">
                    <span>Expected output</span>
                    <textarea
                      rows="5"
                      value={testCase.expectedOutput}
                      required
                      onChange={(event) =>
                        updateNewTestCase(
                          index,
                          "expectedOutput",
                          event.target.value
                        )
                      }
                    />
                  </label>

                  <label className="problem-form-field">
                    <span>Display order</span>
                    <input
                      type="number"
                      min="1"
                      value={testCase.displayOrder}
                      onChange={(event) =>
                        updateNewTestCase(
                          index,
                          "displayOrder",
                          Number(event.target.value)
                        )
                      }
                    />
                  </label>

                  <label className="problem-test-case-checkbox">
                    <input
                      type="checkbox"
                      checked={testCase.hidden}
                      onChange={(event) =>
                        updateNewTestCase(
                          index,
                          "hidden",
                          event.target.checked
                        )
                      }
                    />
                    <span>
                      Hidden test case — users cannot view this input
                    </span>
                  </label>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="problem-form-actions">
          <Link
            className="button button-secondary"
            to="/admin/problems"
          >
            Cancel
          </Link>
          <button
            className="button button-primary"
            type="submit"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : editing
                ? "Update problem"
                : "Create problem"}
          </button>
        </div>
      </form>
    </div>
  );
}
