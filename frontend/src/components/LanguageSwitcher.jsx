import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  {
    code: "en",
    label: "English",
  },
  {
    code: "ta",
    label: "தமிழ்",
  },
  {
    code: "hi",
    label: "हिन्दी",
  },
  {
    code: "te",
    label: "తెలుగు",
  },
];

export default function LanguageSwitcher({ compact = false }) {
  const { i18n, t } = useTranslation();

  const currentLanguage = (
    i18n.resolvedLanguage ||
    i18n.language ||
    "en"
  ).split("-")[0];

  useEffect(() => {
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  function handleLanguageChange(event) {
    i18n.changeLanguage(event.target.value);
  }

  return (
    <label
      className={`language-switcher${
        compact ? " language-switcher-compact" : ""
      }`}
      title={t("language")}
    >
      <span
        className="language-switcher-icon"
        aria-hidden="true"
      >
        🌐
      </span>

      <span className="visually-hidden">
        {t("language")}
      </span>

      <select
        aria-label={t("language")}
        value={currentLanguage}
        onChange={handleLanguageChange}
      >
        {languages.map((language) => (
          <option
            key={language.code}
            value={language.code}
          >
            {language.label}
          </option>
        ))}
      </select>
    </label>
  );
}