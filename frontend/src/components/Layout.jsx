import { useEffect, useState } from "react";
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Brand, RoleBadge } from "./Common.jsx";
import { Icon } from "./Icons.jsx";
import { ThemeToggle } from "./UiEffects.jsx";

const userLinks = [
  { to: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { to: "/problems", label: "Problems", icon: "problems" },
  { to: "/submissions", label: "Submissions", icon: "submissions" },
  { to: "/leaderboard", label: "Leaderboard", icon: "leaderboard" },
  { to: "/profile", label: "Profile", icon: "profile" },
];

const adminLinks = [
  { to: "/admin", label: "Overview", icon: "dashboard", end: true },
  { to: "/admin/problems", label: "Manage problems", icon: "problems" },
  { to: "/admin/problems/create", label: "Create problem", icon: "plus" },
  { to: "/admin/users", label: "Manage users", icon: "users" },
  { to: "/admin/submissions", label: "Submissions", icon: "submissions" },
];

function UserAvatar({ user, large = false }) {
  return (
    <span className={`avatar${large ? " avatar-large" : ""}`}>
      {user?.profilePicture ? (
        <img src={user.profilePicture} alt="" />
      ) : (
        user?.username?.charAt(0)?.toUpperCase() || "U"
      )}
      <span className="avatar-status" aria-hidden="true" />
    </span>
  );
}

export function UserLayout() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

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
        <NavLink className="topbar-brand" to="/dashboard">
          <Brand />
        </NavLink>

        <button
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          className="mobile-menu-button"
          onClick={() => setMenuOpen((current) => !current)}
          type="button"
        >
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>

        <nav className={`top-navigation${menuOpen ? " is-open" : ""}`}>
          {userLinks.map((link) => (
            <NavLink key={link.to} to={link.to}>
              <Icon name={link.icon} size={17} />
              <span>{link.label}</span>
            </NavLink>
          ))}

          {isAdmin && (
            <NavLink className="admin-navigation-link" to="/admin">
              <Icon name="admin" size={17} />
              <span>Admin</span>
            </NavLink>
          )}
        </nav>

        <div className="topbar-account">
          <ThemeToggle compact />
          <UserAvatar user={user} />

          <div className="account-copy">
            <strong>{user?.username}</strong>
            <small>{user?.email}</small>
          </div>

          <button
            aria-label="Logout"
            className="icon-button logout-icon-button"
            onClick={handleLogout}
            title="Logout"
            type="button"
          >
            <Icon name="logout" size={18} />
          </button>
        </div>
      </header>

      <main className="page-container">
        <div className="route-view" key={location.pathname}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        onClick={() => setSidebarOpen((current) => !current)}
        type="button"
      >
        <Icon name={sidebarOpen ? "close" : "menu"} />
      </button>

      {sidebarOpen && (
        <button
          aria-label="Close admin navigation"
          className="admin-sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          type="button"
        />
      )}

      <aside className={`admin-sidebar${sidebarOpen ? " is-open" : ""}`}>
        <div className="admin-brand-row">
          <NavLink to="/admin">
            <Brand />
          </NavLink>
          <ThemeToggle compact />
        </div>

        <section className="admin-profile-card">
          <UserAvatar user={user} large />

          <div>
            <strong>{user?.username}</strong>
            <small>{user?.email}</small>
            <RoleBadge role="ADMIN" />
          </div>
        </section>

        <p className="admin-nav-label">WORKSPACE</p>
        <nav className="admin-navigation">
          {adminLinks.map((link) => (
            <NavLink end={link.end} key={link.to} to={link.to}>
              <Icon name={link.icon} size={18} />
              <span>{link.label}</span>
              <span className="nav-active-dot" />
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <NavLink className="button button-secondary button-block" to="/dashboard">
            <Icon name="arrow" size={17} />
            Open user panel
          </NavLink>

          <button
            className="button button-danger button-block"
            onClick={handleLogout}
            type="button"
          >
            <Icon name="logout" size={17} />
            Logout
          </button>
        </div>
      </aside>

      <main className="admin-content">
        <div className="admin-content-topline">
          <div>
            <p>Administrator workspace</p>
            <strong>CodeArena Control Center</strong>
          </div>
          <span className="live-indicator">
            <span /> System online
          </span>
        </div>

        <div className="route-view" key={location.pathname}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
