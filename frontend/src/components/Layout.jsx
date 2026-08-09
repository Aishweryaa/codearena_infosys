import { useEffect, useState } from "react";

import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useTranslation } from "react-i18next";

import { useAuth } from "../context/AuthContext.jsx";

import {
  Brand,
  RoleBadge,
} from "./Common.jsx";

import { Icon } from "./Icons.jsx";

import {
  ThemeToggle,
} from "./UiEffects.jsx";

import LanguageSwitcher from "./LanguageSwitcher.jsx";

const userLinks = [
  {
    to: "/dashboard",
    labelKey: "dashboard",
    icon: "dashboard",
  },
  {
    to: "/problems",
    labelKey: "problems",
    icon: "problems",
  },
  {
    to: "/submissions",
    labelKey: "submissions",
    icon: "submissions",
  },
  {
    to: "/leaderboard",
    labelKey: "leaderboard",
    icon: "leaderboard",
  },
  {
    to: "/profile",
    labelKey: "profile",
    icon: "profile",
  },
];

const adminLinks = [
  {
    to: "/admin",
    labelKey: "overview",
    icon: "dashboard",
    end: true,
  },
  {
    to: "/admin/problems",
    labelKey: "manageProblems",
    icon: "problems",
  },
  {
    to: "/admin/problems/create",
    labelKey: "createProblem",
    icon: "plus",
  },
  {
    to: "/admin/users",
    labelKey: "manageUsers",
    icon: "users",
  },
  {
    to: "/admin/submissions",
    labelKey: "submissions",
    icon: "submissions",
  },
];

function UserAvatar({
  user,
  large = false,
}) {
  return (
    <span
      className={`avatar${
        large ? " avatar-large" : ""
      }`}
    >
      {user?.profilePicture ? (
        <img
          src={user.profilePicture}
          alt={user?.username || "User"}
        />
      ) : (
        user?.username
          ?.charAt(0)
          ?.toUpperCase() || "U"
      )}
    </span>
  );
}

export function UserLayout() {
  const {
    user,
    isAdmin,
    logout,
  } = useAuth();

  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();

  const [
    menuOpen,
    setMenuOpen,
  ] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="application-shell">
      <header className="topbar">
        <NavLink
          className="topbar-brand"
          to="/dashboard"
        >
          <Brand />
        </NavLink>

        <button
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          className="mobile-menu-button"
          onClick={() =>
            setMenuOpen(
              (current) => !current
            )
          }
          type="button"
        >
          <Icon
            name={
              menuOpen
                ? "close"
                : "menu"
            }
          />
        </button>

        <nav
          className={`top-navigation${
            menuOpen ? " is-open" : ""
          }`}
        >
          {userLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
            >
              <Icon
                name={link.icon}
                size={17}
              />

              <span>
                {t(link.labelKey)}
              </span>
            </NavLink>
          ))}

          {isAdmin && (
            <NavLink
              className="admin-navigation-link"
              to="/admin"
            >
              <Icon
                name="admin"
                size={17}
              />

              <span>
                {t("admin")}
              </span>
            </NavLink>
          )}
        </nav>

        <div className="topbar-account">
          <LanguageSwitcher compact />

          <ThemeToggle compact />

          <NavLink
            aria-label="Open profile and avatar settings"
            className="topbar-avatar-link"
            title={t("profile")}
            to="/profile"
          >
            <UserAvatar user={user} />
          </NavLink>

          <div className="account-copy">
            <strong>
              {user?.username}
            </strong>

            <small>
              {user?.email}
            </small>
          </div>

          <button
            aria-label={t("logout")}
            className="icon-button logout-icon-button"
            onClick={handleLogout}
            title={t("logout")}
            type="button"
          >
            <Icon
              name="logout"
              size={18}
            />
          </button>
        </div>
      </header>

      <main className="page-container">
        <div
          className="route-view"
          key={location.pathname}
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export function AdminLayout() {
  const {
    user,
    logout,
  } = useAuth();

  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();

  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="admin-shell">
      <button
        aria-expanded={sidebarOpen}
        aria-label="Toggle admin navigation"
        className="admin-mobile-toggle"
        onClick={() =>
          setSidebarOpen(
            (current) => !current
          )
        }
        type="button"
      >
        <Icon
          name={
            sidebarOpen
              ? "close"
              : "menu"
          }
        />
      </button>

      {sidebarOpen && (
        <button
          aria-label="Close admin navigation"
          className="admin-sidebar-backdrop"
          onClick={() =>
            setSidebarOpen(false)
          }
          type="button"
        />
      )}

      <aside
        className={`admin-sidebar${
          sidebarOpen ? " is-open" : ""
        }`}
      >
        <div className="admin-brand-row">
          <NavLink to="/admin">
            <Brand />
          </NavLink>

          <div className="admin-brand-actions">
            <LanguageSwitcher compact />
            <ThemeToggle compact />
          </div>
        </div>

        <section className="admin-profile-card">
          <UserAvatar
            user={user}
            large
          />

          <div>
            <strong>
              {user?.username}
            </strong>

            <small>
              {user?.email}
            </small>

            <RoleBadge role="ADMIN" />
          </div>
        </section>

        <p className="admin-nav-label">
          {t("workspace")}
        </p>

        <nav className="admin-navigation">
          {adminLinks.map((link) => (
            <NavLink
              end={link.end}
              key={link.to}
              to={link.to}
            >
              <Icon
                name={link.icon}
                size={18}
              />

              <span>
                {t(link.labelKey)}
              </span>

              <span className="nav-active-dot" />
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <NavLink
            className="button button-secondary button-block"
            to="/dashboard"
          >
            <Icon
              name="arrow"
              size={17}
            />

            {t("openUserPanel")}
          </NavLink>

          <button
            className="button button-danger button-block"
            onClick={handleLogout}
            type="button"
          >
            <Icon
              name="logout"
              size={17}
            />

            {t("logout")}
          </button>
        </div>
      </aside>

      <main className="admin-content">
        <div className="admin-content-topline">
          <div>
            <p>
              {t(
                "administratorWorkspace"
              )}
            </p>

            <strong>
              {t("controlCenter")}
            </strong>
          </div>

          <span className="live-indicator">
            <span />

            {t("systemOnline")}
          </span>
        </div>

        <div
          className="route-view"
          key={location.pathname}
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
}