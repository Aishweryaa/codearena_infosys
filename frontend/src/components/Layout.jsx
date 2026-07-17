import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Brand, RoleBadge } from "./Common.jsx";

export function UserLayout() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="application-shell">
      <header className="topbar">
        <NavLink to="/dashboard">
          <Brand />
        </NavLink>

        <nav className="top-navigation">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/profile">Profile</NavLink>

          {isAdmin && (
            <NavLink className="admin-navigation-link" to="/admin">
              Admin panel
            </NavLink>
          )}
        </nav>

        <div className="topbar-account">
          <span className="avatar">
            {user?.profilePicture ? (
              <img src={user.profilePicture} alt="" />
            ) : (
              user?.username?.charAt(0)?.toUpperCase() || "U"
            )}
          </span>

          <div className="account-copy">
            <strong>{user?.username}</strong>
            <small>{user?.email}</small>
          </div>

          <button
            className="button button-secondary button-small"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      <main className="page-container">
        <Outlet />
      </main>
    </div>
  );
}

export function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <NavLink to="/admin">
          <Brand />
        </NavLink>

        <section className="admin-profile-card">
          <span className="avatar avatar-large">
            {user?.username?.charAt(0)?.toUpperCase() || "A"}
          </span>

          <div>
            <strong>{user?.username}</strong>
            <RoleBadge role="ADMIN" />
          </div>
        </section>

        <nav className="admin-navigation">
          <NavLink end to="/admin">
            Overview
          </NavLink>
          <NavLink to="/admin/users">Manage users</NavLink>
        </nav>

        <div className="admin-sidebar-footer">
          <NavLink
            className="button button-secondary button-block"
            to="/dashboard"
          >
            Open user panel
          </NavLink>

          <button
            className="button button-danger button-block"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
