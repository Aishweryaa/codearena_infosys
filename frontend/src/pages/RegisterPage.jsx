import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getErrorMessage } from "../api/http.js";
import { Alert, Brand } from "../components/Common.jsx";
import { Icon } from "../components/Icons.jsx";
import { ThemeToggle } from "../components/UiEffects.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function RegisterPage() {
  const {
    register,
    isAuthenticated,
    isAdmin,
  } = useAuth();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    return (
      <Navigate
        to={isAdmin ? "/admin" : "/dashboard"}
        replace
      />
    );
  }

  function changeField(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    setMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const user = await register(
        form.username.trim(),
        form.email.trim(),
        form.password
      );

      navigate(
        user.role === "ADMIN" ? "/admin" : "/dashboard",
        { replace: true }
      );
    } catch (error) {
      setMessage(
        getErrorMessage(error, "Registration failed")
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="authentication-layout auth-page register-auth-page">
      <section className="authentication-visual">
        <div className="auth-brand-row">
          <Brand />
          <span className="auth-secure-label">
            <Icon name="shield" size={15} /> Secure registration
          </span>
        </div>

        <div className="visual-copy">
          <span className="hero-status-pill">
            <span className="hero-status-dot" />
            Start your developer journey
          </span>
          <p className="eyebrow">CREATE YOUR ACCOUNT</p>
          <h1>Join the arena and turn practice into progress.</h1>
          <p>
            Build problem-solving consistency, learn from every verdict,
            and improve your position on the leaderboard.
          </p>

          <div className="feature-grid modern-feature-grid">
            <article>
              <span className="feature-icon">
                <Icon name="shield" size={20} />
              </span>
              <div>
                <strong>Secure identity</strong>
                <span>BCrypt hashing and JWT-protected sessions.</span>
              </div>
            </article>

            <article>
              <span className="feature-icon">
                <Icon name="code" size={20} />
              </span>
              <div>
                <strong>Professional editor</strong>
                <span>Write solutions using the Monaco code editor.</span>
              </div>
            </article>

            <article>
              <span className="feature-icon">
                <Icon name="leaderboard" size={20} />
              </span>
              <div>
                <strong>Visible progress</strong>
                <span>Track submissions, solved problems, and score.</span>
              </div>
            </article>
          </div>
        </div>

        <div className="auth-floating-badges" aria-hidden="true">
          <span className="language-badge language-java">Java</span>
          <span className="language-badge language-python">Python</span>
          <span className="language-badge language-cpp">C++</span>
          <span className="language-badge language-js">JavaScript</span>
        </div>
      </section>

      <section className="authentication-panel">
        <div className="auth-theme-control">
          <ThemeToggle />
        </div>

        <div className="authentication-card register-card">
          <div className="mobile-brand">
            <Brand />
          </div>

          <span className="authentication-icon">
            <Icon name="sparkles" size={23} />
          </span>
          <p className="eyebrow">JOIN CODEARENA</p>
          <h2>Create your account</h2>
          <p className="muted">
            Your first coding challenge is only a minute away.
          </p>

          {message && <Alert>{message}</Alert>}

          <form className="form-stack" onSubmit={handleSubmit}>
            <label className="form-field">
              <span>Username</span>
              <span className="input-with-icon">
                <Icon name="profile" size={17} />
                <input
                  name="username"
                  value={form.username}
                  onChange={changeField}
                  placeholder="Choose a username"
                  minLength="3"
                  maxLength="50"
                  autoComplete="username"
                  required
                />
              </span>
            </label>

            <label className="form-field">
              <span>Email address</span>
              <span className="input-with-icon">
                <Icon name="profile" size={17} />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={changeField}
                  placeholder="name@example.com"
                  autoComplete="email"
                  required
                />
              </span>
            </label>

            <label className="form-field">
              <span>Password</span>
              <span className="input-with-icon">
                <Icon name="shield" size={17} />
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={changeField}
                  placeholder="Example: Code@123"
                  minLength="8"
                  autoComplete="new-password"
                  required
                />
              </span>
            </label>

            <label className="form-field">
              <span>Confirm password</span>
              <span className="input-with-icon">
                <Icon name="check" size={17} />
                <input
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={changeField}
                  placeholder="Enter the password again"
                  minLength="8"
                  autoComplete="new-password"
                  required
                />
              </span>
            </label>

            <button
              className="button button-primary button-block auth-submit-button"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="button-spinner" /> Creating account...
                </>
              ) : (
                <>
                  Create account <Icon name="arrow" size={18} />
                </>
              )}
            </button>
          </form>

          <p className="password-note">
            <Icon name="shield" size={14} />
            Use uppercase, lowercase, number, and special character.
          </p>

          <p className="authentication-switch">
            Already registered?{" "}
            <Link to="/login">Sign in</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
