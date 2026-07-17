export function getSubmissionId(submission) {
  return submission?.id ?? submission?.submissionId ?? null;
}

export function getSubmissionStatus(submission) {
  return String(
    submission?.status ??
      submission?.submissionStatus ??
      "PENDING"
  ).toUpperCase();
}

export function SubmissionStatusBadge({ status }) {
  const value = String(status || "PENDING").toUpperCase();

  return (
    <span
      className={`submission-status submission-status-${value
        .toLowerCase()
        .replaceAll("_", "-")}`}
    >
      {value.replaceAll("_", " ")}
    </span>
  );
}
