import { useState } from "react";

import {
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";

import {
  useTranslation,
} from "react-i18next";

import {
  getErrorMessage,
} from "../api/http.js";

import {
  Alert,
  Brand,
} from "../components/Common.jsx";

import {
  Icon,
} from "../components/Icons.jsx";

import {
  ThemeToggle,
} from "../components/UiEffects.jsx";

import LanguageSwitcher from "../components/LanguageSwitcher.jsx";

import {
  useAuth,
} from "../context/AuthContext.jsx";

export default function RegisterPage() {
  const {
    register,
    isAuthenticated,
    isAdmin,
  } = useAuth();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const [
    form,
    setForm,
  ] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  if (isAuthenticated) {
    return (
      <Navigate
        to={
          isAdmin
            ? "/admin"
            : "/dashboard"
        }
        replace
      />
    );
  }

  function changeField(event) {
    setForm({
      ...form,
      [event.target.name]:
        event.target.value,
    });

    setMessage("");
  }

  async function handleSubmit(
    event
  ) {
    event.preventDefault();

    if (
      form.password !==
      form.confirmPassword
    ) {
      setMessage(
        t("passwordsDoNotMatch")
      );

      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const user =
        await register(
          form.username.trim(),
          form.email.trim(),
          form.password
        );

      navigate(
        user.role === "ADMIN"
          ? "/admin"
          : "/dashboard",
        {
          replace: true,
        }
      );
    } catch (error) {
      setMessage(
        getErrorMessage(
          error,
          t(
            "registrationFailed"
          )
        )
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="authentication-layout auth-page">
      <section className="authentication-visual">
        <div className="auth-brand-row">
          <Brand />

          <span className="auth-secure-label">
            <Icon
              name="shield"
              size={16}
            />

            {t(
              "secureRegistration"
            )}
          </span>
        </div>

        <div className="visual-copy">
          <span className="hero-status-pill">
            <span className="hero-status-dot" />

            {t(
              "registerHeroStatus"
            )}
          </span>

          <p className="eyebrow">
            {t(
              "createYourAccountEyebrow"
            )}
          </p>

          <h1>
            {t(
              "registerHeroTitle"
            )}
          </h1>

          <p>
            {t(
              "registerHeroText"
            )}
          </p>

          <div className="feature-grid modern-feature-grid">
            <article>
              <span className="feature-icon">
                <Icon
                  name="shield"
                  size={20}
                />
              </span>

              <div>
                <strong>
                  {t(
                    "secureIdentity"
                  )}
                </strong>

                <span>
                  {t(
                    "secureIdentityText"
                  )}
                </span>
              </div>
            </article>

            <article>
              <span className="feature-icon">
                <Icon
                  name="code"
                  size={20}
                />
              </span>

              <div>
                <strong>
                  {t(
                    "professionalEditor"
                  )}
                </strong>

                <span>
                  {t(
                    "professionalEditorText"
                  )}
                </span>
              </div>
            </article>

            <article>
              <span className="feature-icon">
                <Icon
                  name="leaderboard"
                  size={20}
                />
              </span>

              <div>
                <strong>
                  {t(
                    "visibleProgress"
                  )}
                </strong>

                <span>
                  {t(
                    "visibleProgressText"
                  )}
                </span>
              </div>
            </article>
          </div>
        </div>

        <div
          className="auth-floating-badges"
          aria-hidden="true"
        >
          <span className="language-badge language-java">
            Java
          </span>

          <span className="language-badge language-python">
            Python
          </span>

          <span className="language-badge language-cpp">
            C++
          </span>

          <span className="language-badge language-js">
            JavaScript
          </span>
        </div>
      </section>

      <section className="authentication-panel">
        <div className="auth-page-controls">
          <LanguageSwitcher compact />
          <ThemeToggle />
        </div>

        <div className="authentication-card register-card">
          <div className="mobile-brand">
            <Brand />
          </div>

          <span className="authentication-icon">
            <Icon
              name="sparkles"
              size={23}
            />
          </span>

          <p className="eyebrow">
            {t("joinCodeArena")}
          </p>

          <h2>
            {t("registerTitle")}
          </h2>

          <p className="muted">
            {t(
              "registerDescription"
            )}
          </p>

          {message && (
            <Alert>
              {message}
            </Alert>
          )}

          <form
            className="form-stack"
            onSubmit={handleSubmit}
          >
            <label className="form-field">
              <span>
                {t("username")}
              </span>

              <span className="input-with-icon">
                <Icon
                  name="profile"
                  size={17}
                />

                <input
                  name="username"
                  value={
                    form.username
                  }
                  onChange={
                    changeField
                  }
                  placeholder={t(
                    "usernamePlaceholder"
                  )}
                  minLength="3"
                  maxLength="50"
                  autoComplete="username"
                  required
                />
              </span>
            </label>

            <label className="form-field">
              <span>
                {t(
                  "emailAddress"
                )}
              </span>

              <span className="input-with-icon">
                <Icon
                  name="profile"
                  size={17}
                />

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={
                    changeField
                  }
                  placeholder={t(
                    "emailPlaceholder"
                  )}
                  autoComplete="email"
                  required
                />
              </span>
            </label>

            <label className="form-field">
              <span>
                {t("password")}
              </span>

              <span className="input-with-icon">
                <Icon
                  name="shield"
                  size={17}
                />

                <input
                  name="password"
                  type="password"
                  value={
                    form.password
                  }
                  onChange={
                    changeField
                  }
                  placeholder="Example: Code@123"
                  minLength="8"
                  autoComplete="new-password"
                  required
                />
              </span>
            </label>

            <label className="form-field">
              <span>
                {t(
                  "confirmPassword"
                )}
              </span>

              <span className="input-with-icon">
                <Icon
                  name="check"
                  size={17}
                />

                <input
                  name="confirmPassword"
                  type="password"
                  value={
                    form.confirmPassword
                  }
                  onChange={
                    changeField
                  }
                  placeholder={t(
                    "confirmPasswordPlaceholder"
                  )}
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
                  <span className="button-spinner" />

                  {t(
                    "creatingAccount"
                  )}
                </>
              ) : (
                <>
                  {t(
                    "createAccountButton"
                  )}

                  <Icon
                    name="arrow"
                    size={18}
                  />
                </>
              )}
            </button>
          </form>

          <p className="password-note">
            <Icon
              name="shield"
              size={14}
            />

            {t("passwordNote")}
          </p>

          <p className="authentication-switch">
            {t(
              "alreadyRegistered"
            )}{" "}

            <Link to="/login">
              {t("signIn")}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}