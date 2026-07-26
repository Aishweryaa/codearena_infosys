import { Icon } from "./Icons.jsx";

export function Brand({ compact = false }) {
  return (
    <span className={`brand${compact ? " brand-compact" : ""}`}>
      <span className="brand-mark" aria-hidden="true">
        <span className="brand-symbol">&lt;/&gt;</span>
        <span className="brand-pulse" />
      </span>
      <span className="brand-wordmark">
        <span>Code</span>
        <strong>Arena</strong>
      </span>
    </span>
  );
}

export function Loader({ message = "Loading..." }) {
  return (
    <div className="loader-page">
      <span className="code-loader" aria-hidden="true">
        <span>&lt;</span>
        <span className="code-loader-slash">/</span>
        <span>&gt;</span>
      </span>
      <p>{message}</p>
      <span className="loader-line" />
    </div>
  );
}

export function Alert({ type = "error", children }) {
  const iconName =
    type === "success" ? "check" : type === "warning" ? "activity" : "shield";

  return (
    <div className={`alert alert-${type}`} role="alert">
      <span className="alert-icon">
        <Icon name={iconName} size={18} />
      </span>
      <span>{children}</span>
    </div>
  );
}

export function StatCard({ label, value, detail, icon = "activity" }) {
  return (
    <article className="stat-card">
      <span className="stat-card-glow" aria-hidden="true" />
      <div className="stat-card-heading">
        <span>{label}</span>
        <span className="stat-card-icon">
          <Icon name={icon} size={19} />
        </span>
      </div>
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
      <span className="badge-dot" />
      {value}
    </span>
  );
}

export function SectionTitle({ eyebrow, title, description, icon = "sparkles" }) {
  return (
    <div className="section-title">
      <span className="section-title-icon">
        <Icon name={icon} size={20} />
      </span>
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </div>
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
