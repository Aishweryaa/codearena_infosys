import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Brand,
} from "../components/Common.jsx";

import {
  Icon,
} from "../components/Icons.jsx";

import {
  ThemeToggle,
} from "../components/UiEffects.jsx";

import LanguageSwitcher from "../components/LanguageSwitcher.jsx";

const features = [
  {
    icon: "code",
    titleKey: "featureMonacoTitle",
    textKey: "featureMonacoText",
  },
  {
    icon: "shield",
    titleKey: "featureDockerTitle",
    textKey: "featureDockerText",
  },
  {
    icon: "activity",
    titleKey: "featureProgressTitle",
    textKey: "featureProgressText",
  },
  {
    icon: "trophy",
    titleKey: "featureCompeteTitle",
    textKey: "featureCompeteText",
  },
];

const languages = [
  "C++",
  "Java",
  "Python",
  "JavaScript",
  "Docker",
  "React",
];

export default function LandingPage() {
  const { t } = useTranslation();

  const steps = [
    [
      "01",
      t("chooseChallengeTitle"),
      t("chooseChallengeText"),
    ],
    [
      "02",
      t("writeRunTitle"),
      t("writeRunText"),
    ],
    [
      "03",
      t("submitSecurelyTitle"),
      t("submitSecurelyText"),
    ],
    [
      "04",
      t("learnVerdictsTitle"),
      t("learnVerdictsText"),
    ],
  ];

  return (
    <main className="landing-page">
      <header className="landing-nav">
        <Link
          className="landing-brand"
          to="/"
        >
          <Brand />
        </Link>

        <nav
          className="landing-nav-links"
          aria-label="Landing navigation"
        >
          <a href="#features">
            {t("landingFeatures")}
          </a>

          <a href="#workflow">
            {t("landingHowItWorks")}
          </a>

          <a href="#languages">
            {t("landingLanguages")}
          </a>
        </nav>

        <div className="landing-nav-actions">
          <LanguageSwitcher compact />

          <ThemeToggle compact />

          <Link
            className="button button-secondary landing-login"
            to="/login"
          >
            {t("login")}
          </Link>

          <Link
            className="button button-primary"
            to="/register"
          >
            {t("register")}

            <Icon
              name="arrow"
              size={17}
            />
          </Link>
        </div>
      </header>

      <section className="landing-hero">
        <div className="landing-hero-copy">
          <span className="landing-pill">
            <span />
            {t("landingPill")}
          </span>

          <h1>
            {t("landingHeroFirst")}

            <span>
              {" "}
              {t("landingHeroSecond")}
            </span>
          </h1>

          <p>
            {t(
              "landingHeroDescription"
            )}
          </p>

          <div className="landing-hero-actions">
            <Link
              className="button button-primary landing-main-cta"
              to="/register"
            >
              {t("startCodingFree")}

              <Icon
                name="arrow"
                size={18}
              />
            </Link>

            <Link
              className="button button-secondary"
              to="/login"
            >
              {t(
                "alreadyHaveAccount"
              )}
            </Link>
          </div>

          <div className="landing-trust-row">
            <span>
              <Icon
                name="check"
                size={16}
              />

              {t("fourLanguages")}
            </span>

            <span>
              <Icon
                name="check"
                size={16}
              />

              {t("dockerSandbox")}
            </span>

            <span>
              <Icon
                name="check"
                size={16}
              />

              {t("liveVerdicts")}
            </span>
          </div>
        </div>

        <div
          className="landing-hero-visual"
          aria-label="CodeArena editor preview"
        >
          <span className="landing-orbit landing-orbit-one">
            C++
          </span>

          <span className="landing-orbit landing-orbit-two">
            Java
          </span>

          <span className="landing-orbit landing-orbit-three">
            Python
          </span>

          <article className="landing-editor-card">
            <div className="landing-editor-toolbar">
              <div>
                <span />
                <span />
                <span />
              </div>

              <strong>
                solution.cpp
              </strong>

              <small>
                Monaco Editor
              </small>
            </div>

            <div className="landing-editor-body">
              <p>
                <i>1</i>
                <b>#include</b>{" "}
                &lt;iostream&gt;
              </p>

              <p>
                <i>2</i>
                <b>
                  using namespace
                </b>{" "}
                std;
              </p>

              <p>
                <i>3</i>
              </p>

              <p>
                <i>4</i>
                <b>int</b>{" "}
                main() &#123;
              </p>

              <p>
                <i>5</i>
                &nbsp;&nbsp;
                <b>int</b> n; cin
                &gt;&gt; n;
              </p>

              <p>
                <i>6</i>
                &nbsp;&nbsp;cout
                &lt;&lt; (n % 2 === 0 ?
                <em>"Even"</em> :
                <em>"Odd"</em>);
              </p>

              <p>
                <i>7</i>
                &nbsp;&nbsp;
                <b>return</b> 0;
              </p>

              <p>
                <i>8</i>
                &#125;
              </p>
            </div>

            <div className="landing-editor-footer">
              <span>
                <Icon
                  name="check"
                  size={17}
                />

                {t("accepted")}
              </span>

              <span>
                {t(
                  "testCasesPassed"
                )}
              </span>

              <span>
                42 ms
              </span>
            </div>
          </article>
        </div>
      </section>

      <section
        className="landing-language-strip"
        id="languages"
      >
        <p>
          {t("buildExecuteWith")}
        </p>

        <div>
          {[
            ...languages,
            ...languages,
          ].map(
            (
              language,
              index
            ) => (
              <span
                key={`${language}-${index}`}
              >
                {language}
              </span>
            )
          )}
        </div>
      </section>

      <section
        className="landing-section"
        id="features"
      >
        <div className="landing-section-heading">
          <p className="eyebrow">
            {t("everythingArena")}
          </p>

          <h2>
            {t("focusedPractice")}
          </h2>

          <p>
            {t(
              "focusedPracticeDescription"
            )}
          </p>
        </div>

        <div className="landing-feature-grid">
          {features.map(
            (feature, index) => (
              <article
                key={feature.titleKey}
                style={{
                  "--feature-index":
                    index,
                }}
              >
                <span className="landing-feature-icon">
                  <Icon
                    name={
                      feature.icon
                    }
                    size={23}
                  />
                </span>

                <h3>
                  {t(
                    feature.titleKey
                  )}
                </h3>

                <p>
                  {t(
                    feature.textKey
                  )}
                </p>

                <span className="landing-card-arrow">
                  <Icon
                    name="arrow"
                    size={18}
                  />
                </span>
              </article>
            )
          )}
        </div>
      </section>

      <section
        className="landing-section landing-workflow"
        id="workflow"
      >
        <div className="landing-section-heading">
          <p className="eyebrow">
            {t("howItWorks")}
          </p>

          <h2>
            {t(
              "challengeToAccepted"
            )}
          </h2>
        </div>

        <div className="landing-steps">
          {steps.map(
            ([
              number,
              title,
              text,
            ]) => (
              <article key={number}>
                <strong>
                  {number}
                </strong>

                <div>
                  <h3>
                    {title}
                  </h3>

                  <p>
                    {text}
                  </p>
                </div>
              </article>
            )
          )}
        </div>
      </section>

      <section className="landing-cta">
        <span className="landing-cta-glow" />

        <p className="eyebrow">
          {t("readyToStart")}
        </p>

        <h2>
          {t("landingCtaTitle")}
        </h2>

        <p>
          {t("landingCtaText")}
        </p>

        <div>
          <Link
            className="button button-primary"
            to="/register"
          >
            {t(
              "createFreeAccount"
            )}

            <Icon
              name="arrow"
              size={18}
            />
          </Link>

          <Link
            className="button button-secondary"
            to="/login"
          >
            {t("signIn")}
          </Link>
        </div>
      </section>

      <footer className="landing-footer">
        <Brand compact />

        <p>
          {t("footerText")}
        </p>

        <span>
          © 2026 CodeArena
        </span>
      </footer>
    </main>
  );
}