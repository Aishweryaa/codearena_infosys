import { useState } from "react";

import {
  GoogleLogin,
} from "@react-oauth/google";

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

export default function LoginPage() {
  const {
    login,
    googleLogin,
    isAuthenticated,
    isAdmin,
  } = useAuth();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const [
    form,
    setForm,
  ] = useState({
    email: "",
    password: "",
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

  function destination(role) {
    return role === "ADMIN"
      ? "/admin"
      : "/dashboard";
  }

  async function handleNormalLogin(
    event
  ) {
    event.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const user = await login(
        form.email.trim(),
        form.password
      );

      navigate(
        destination(user.role),
        {
          replace: true,
        }
      );
    } catch (error) {
      setMessage(
        getErrorMessage(
          error,
          t("invalidCredentials")
        )
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin(
    response
  ) {
    try {
      setLoading(true);
      setMessage("");

      if (!response.credential) {
        throw new Error(
          t(
            "googleCredentialMissing"
          )
        );
      }

      const user =
        await googleLogin(
          response.credential
        );

      navigate(
        destination(user.role),
        {
          replace: true,
        }
      );
    } catch (error) {
      setMessage(
        getErrorMessage(
          error,
          t("googleLoginFailed")
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

            {t("securePlatform")}
          </span>
        </div>

        <div className="visual-copy">
          <span className="hero-status-pill">
            <span className="hero-status-dot" />

            {t("loginHeroStatus")}
          </span>

          <p className="eyebrow">
            {t("welcomeCodeArena")}
          </p>

          <h1>
            {t("loginHeroTitle")}
          </h1>

          <p>
            {t("loginHeroText")}
          </p>

          <div className="auth-feature-row">
            <div>
              <Icon
                name="code"
                size={20}
              />

              <span>
                <strong>
                  {t(
                    "fourLanguagesTitle"
                  )}
                </strong>

                <small>
                  {t(
                    "fourLanguagesText"
                  )}
                </small>
              </span>
            </div>

            <div>
              <Icon
                name="shield"
                size={20}
              />

              <span>
                <strong>
                  {t(
                    "secureExecution"
                  )}
                </strong>

                <small>
                  {t(
                    "secureExecutionText"
                  )}
                </small>
              </span>
            </div>
          </div>
        </div>

        <div
          className="auth-code-window"
          aria-hidden="true"
        >
          <div className="auth-code-toolbar">
            <span />
            <span />
            <span />

            <strong>
              solution.cpp
            </strong>
          </div>

          <div className="auth-code-content">
            <p>
              <span>1</span>
              <em>#include</em>{" "}
              &lt;iostream&gt;
            </p>

            <p>
              <span>2</span>
              <em>
                using namespace
              </em>{" "}
              std;
            </p>

            <p>
              <span>3</span>
            </p>

            <p>
              <span>4</span>
              <em>int</em>{" "}
              main() &#123;
            </p>

            <p>
              <span>5</span>
              &nbsp;&nbsp;cout
              &lt;&lt;{" "}
              <b>
                "Hello, CodeArena!"
              </b>
              ;
            </p>

            <p>
              <span>6</span>
              &nbsp;&nbsp;
              <em>return</em> 0;
            </p>

            <p>
              <span>7</span>
              &#125;
            </p>
          </div>

          <div className="auth-code-result">
            <Icon
              name="check"
              size={16}
            />

            {t("accepted")} · 42 ms
          </div>
        </div>
      </section>

      <section className="authentication-panel">
        <div className="auth-page-controls">
          <LanguageSwitcher compact />
          <ThemeToggle />
        </div>

        <div className="authentication-card">
          <div className="mobile-brand">
            <Brand />
          </div>

          <span className="authentication-icon">
            <Icon
              name="profile"
              size={23}
            />
          </span>

          <p className="eyebrow">
            {t("welcomeBack")}
          </p>

          <h2>
            {t("signInCodeArena")}
          </h2>

          <p className="muted">
            {t("loginDescription")}
          </p>

          {message && (
            <Alert>
              {message}
            </Alert>
          )}

          <form
            className="form-stack"
            onSubmit={
              handleNormalLogin
            }
          >
            <label className="form-field">
              <span>
                {t("emailAddress")}
              </span>

              <span className="input-with-icon">
                <Icon
                  name="profile"
                  size={17}
                />

                <input
                  type="email"
                  value={form.email}
                  onChange={(
                    event
                  ) =>
                    setForm({
                      ...form,
                      email:
                        event
                          .target
                          .value,
                    })
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
                  type="password"
                  value={
                    form.password
                  }
                  onChange={(
                    event
                  ) =>
                    setForm({
                      ...form,
                      password:
                        event
                          .target
                          .value,
                    })
                  }
                  placeholder={t(
                    "passwordPlaceholder"
                  )}
                  autoComplete="current-password"
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

                  {t("signingIn")}
                </>
              ) : (
                <>
                  {t("signIn")}

                  <Icon
                    name="arrow"
                    size={18}
                  />
                </>
              )}
            </button>
          </form>

          <div className="form-divider">
            <span>
              {t("continueWith")}
            </span>
          </div>

          <div className="google-login">
            <GoogleLogin
              onSuccess={
                handleGoogleLogin
              }
              onError={() =>
                setMessage(
                  t(
                    "googleAuthenticationFailed"
                  )
                )
              }
              useOneTap={false}
              size="large"
              width="300"
            />
          </div>

          <p className="authentication-switch">
            {t("newToCodeArena")}{" "}

            <Link to="/register">
              {t("createAccount")}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}