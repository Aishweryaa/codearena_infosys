import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getErrorMessage } from "../api/http.js";
import { Alert, Brand } from "../components/Common.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginPage() {
  const {
    login,
    googleLogin,
    isAuthenticated,
    isAdmin,
  } = useAuth();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
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

  function destination(role) {
    return role === "ADMIN" ? "/admin" : "/dashboard";
  }

  async function handleNormalLogin(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const user = await login(
        form.email.trim(),
        form.password
      );

      navigate(destination(user.role), { replace: true });
    } catch (error) {
      setMessage(
        getErrorMessage(error, "Invalid email or password")
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin(response) {
    try {
      setLoading(true);
      setMessage("");

      if (!response.credential) {
        throw new Error("Google credential was not received");
      }

      const user = await googleLogin(response.credential);
      navigate(destination(user.role), { replace: true });
    } catch (error) {
      setMessage(
        getErrorMessage(error, "Google login failed")
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
          <p className="eyebrow">MILESTONE 2 · SECURE ACCESS</p>
          <h1>
            Enter the coding arena with secure authentication.
          </h1>
          <p>
            CodeArena now supports protected user accounts,
            Google sign-in, JWT sessions, and administrator-only
            access.
          </p>

          <div className="security-preview">
            <span className="security-icon">✓</span>
            <div>
              <strong>JWT protected sessions</strong>
              <p>
                Every protected request is authenticated using a
                secure bearer token.
              </p>
            </div>
          </div>

          <div className="security-preview">
            <span className="security-icon">✓</span>
            <div>
              <strong>Role-based authorization</strong>
              <p>
                User and administrator pages are separated and
                protected.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="authentication-panel">
        <div className="authentication-card">
          <div className="mobile-brand">
            <Brand />
          </div>

          <p className="eyebrow">WELCOME BACK</p>
          <h2>Sign in to CodeArena</h2>
          <p className="muted">
            Continue using your secure CodeArena account.
          </p>

          {message && <Alert>{message}</Alert>}

          <form
            className="form-stack"
            onSubmit={handleNormalLogin}
          >
            <label className="form-field">
              <span>Email address</span>
              <input
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm({
                    ...form,
                    email: event.target.value,
                  })
                }
                placeholder="name@example.com"
                autoComplete="email"
                required
              />
            </label>

            <label className="form-field">
              <span>Password</span>
              <input
                type="password"
                value={form.password}
                onChange={(event) =>
                  setForm({
                    ...form,
                    password: event.target.value,
                  })
                }
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </label>

            <button
              className="button button-primary button-block"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="form-divider">
            <span>OR CONTINUE WITH</span>
          </div>

          <div className="google-login">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() =>
                setMessage("Google authentication failed")
              }
              useOneTap={false}
              size="large"
              width="340"
            />
          </div>

          <p className="authentication-switch">
            New to CodeArena?{" "}
            <Link to="/register">Create an account</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
