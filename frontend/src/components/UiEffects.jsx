import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Icon } from "./Icons.jsx";

export function UiEffects() {
  const location = useLocation();

  useEffect(() => {
    function updatePointer(event) {
      document.documentElement.style.setProperty(
        "--pointer-x",
        `${event.clientX}px`
      );
      document.documentElement.style.setProperty(
        "--pointer-y",
        `${event.clientY}px`
      );
    }

    window.addEventListener("pointermove", updatePointer, {
      passive: true,
    });

    return () => window.removeEventListener("pointermove", updatePointer);
  }, []);

  return (
    <>
      <div className="ambient-scene" aria-hidden="true">
        <span className="ambient-orb ambient-orb-one" />
        <span className="ambient-orb ambient-orb-two" />
        <span className="ambient-orb ambient-orb-three" />
        <span className="ambient-grid" />
        <span className="pointer-glow" />
      </div>
      <div className="route-progress" key={location.pathname} />
    </>
  );
}

export function ThemeToggle({ compact = false }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("codearena-theme");
    return saved === "light" ? "light" : "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("codearena-theme", theme);
  }, [theme]);

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      aria-label={`Switch to ${nextTheme} theme`}
      className={`theme-toggle${compact ? " theme-toggle-compact" : ""}`}
      onClick={() => setTheme(nextTheme)}
      title={`Switch to ${nextTheme} theme`}
      type="button"
    >
      <span className="theme-toggle-track">
        <span className="theme-toggle-thumb">
          <Icon name={theme === "dark" ? "moon" : "sun"} size={15} />
        </span>
      </span>
      {!compact && (
        <span>{theme === "dark" ? "Dark" : "Light"}</span>
      )}
    </button>
  );
}
