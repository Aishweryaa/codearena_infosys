import { useTranslation } from "react-i18next";
import i18n from "../i18n.js";

export function getProblemId(problem) {
  return problem?.id ?? problem?.problemId ?? null;
}

export function getTestCaseId(testCase) {
  return testCase?.id ?? testCase?.testCaseId ?? null;
}

export function getProblemSummary(problem) {
  const description = problem?.description?.trim();

  if (!description) {
    return i18n.t("problemSummaryFallback");
  }

  return description.length > 180
    ? `${description.slice(0, 180)}...`
    : description;
}

export function ProblemDifficultyBadge({ difficulty }) {
  const { t } = useTranslation();

  const value = String(
    difficulty || "EASY"
  ).toUpperCase();

  const difficultyLabels = {
    EASY: t("easy"),
    MEDIUM: t("medium"),
    HARD: t("hard"),
  };

  return (
    <span
      className={`problem-difficulty problem-difficulty-${value.toLowerCase()}`}
    >
      {difficultyLabels[value] || value}
    </span>
  );
}