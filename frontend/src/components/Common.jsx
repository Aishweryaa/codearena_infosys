export function Brand() {
  return (
    <span className="brand">
      <span className="brand-symbol">&lt;/&gt;</span>
      <span>Code</span>
      <strong>Arena</strong>
    </span>
  );
}

export function Loader({ message = "Loading..." }) {
  return (
    <div className="loader-page">
      <span className="spinner" />
      <p>{message}</p>
    </div>
  );
}

export function Alert({ type = "error", children }) {
  return (
    <div className={`alert alert-${type}`} role="alert">
      {children}
    </div>
  );
}

export function StatCard({ label, value, detail }) {
  return (
    <article className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
      {detail && <small>{detail}</small>}
    </article>
  );
}

export function RoleBadge({ role }) {
  const value = String(role || "USER")
    .replace("ROLE_", "")
    .toUpperCase();

  return (
    <span className={`role-badge role-${value.toLowerCase()}`}>
      {value}
    </span>
  );
}

export function formatDate(value) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
