import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getErrorMessage } from "../api/http.js";
import { Alert, Brand } from "../components/Common.jsx";
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
    <main className="authentication-layout">
      <section className="authentication-visual">
        <Brand />

        <div className="visual-copy">
          <p className="eyebrow">CREATE YOUR ACCOUNT</p>
          <h1>Begin your CodeArena learning journey.</h1>
          <p>
            Register a secure account and access protected user
            features through JWT authentication.
          </p>

          <div className="feature-grid">
            <article>
              <strong>Strong password validation</strong>
              <span>
                Uppercase, lowercase, number, and special
                character protection.
              </span>
            </article>

            <article>
              <strong>Encrypted password storage</strong>
              <span>
                Passwords are stored using BCrypt hashing.
              </span>
            </article>

            <article>
              <strong>Safe default role</strong>
              <span>
                New registrations always receive the USER role.
              </span>
            </article>
          </div>
        </div>
      </section>

      <section className="authentication-panel">
        <div className="authentication-card">
          <div className="mobile-brand">
            <Brand />
          </div>

          <p className="eyebrow">REGISTER</p>
          <h2>Create your account</h2>
          <p className="muted">
            Use a strong password to secure your account.
          </p>

          {message && <Alert>{message}</Alert>}

          <form className="form-stack" onSubmit={handleSubmit}>
            <label className="form-field">
              <span>Username</span>
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
            </label>

            <label className="form-field">
              <span>Email address</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={changeField}
                placeholder="name@example.com"
                autoComplete="email"
                required
              />
            </label>

            <label className="form-field">
              <span>Password</span>
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
            </label>

            <label className="form-field">
              <span>Confirm password</span>
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
            </label>

            <button
              className="button button-primary button-block"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Creating account..."
                : "Create account"}
            </button>
          </form>

          <p className="password-note">
            Password must include uppercase, lowercase, number,
            and special character.
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
