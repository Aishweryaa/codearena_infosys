export function getProblemId(problem) {
  return problem?.id ?? problem?.problemId ?? null;
}

export function getTestCaseId(testCase) {
  return testCase?.id ?? testCase?.testCaseId ?? null;
}

export function getProblemSummary(problem) {
  const description = problem?.description?.trim();

  if (!description) {
    return "Open the challenge to read its complete problem statement.";
  }

  return description.length > 180
    ? `${description.slice(0, 180)}...`
    : description;
}

export function ProblemDifficultyBadge({ difficulty }) {
  const value = String(difficulty || "EASY").toUpperCase();

  return (
    <span
      className={`problem-difficulty problem-difficulty-${value.toLowerCase()}`}
    >
      {value}
    </span>
  );
}
