import { useEffect, useMemo, useState } from "react";
import {
  getUsers,
  updateUserRole,
} from "../api/adminApi.js";
import { getErrorMessage } from "../api/http.js";
import {
  Alert,
  formatDate,
  Loader,
  RoleBadge,
} from "../components/Common.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function AdminUsersPage() {
  const { user: currentAdmin } = useAuth();

  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const [updatingId, setUpdatingId] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadUsers() {
    try {
      setLoading(true);
      setMessage("");
      setUsers(await getUsers());
    } catch (error) {
      setMessage(
        getErrorMessage(error, "Unable to load users")
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !normalizedQuery ||
        user.username
          ?.toLowerCase()
          .includes(normalizedQuery) ||
        user.email?.toLowerCase().includes(normalizedQuery);

      const matchesRole =
        roleFilter === "ALL" || user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, query, roleFilter]);

  async function changeRole(user, role) {
    try {
      setUpdatingId(user.userId);
      setMessage("");

      const updated = await updateUserRole(
        user.userId,
        role
      );

      setUsers((current) =>
        current.map((item) =>
          item.userId === updated.userId ? updated : item
        )
      );

      setMessage(
        `${updated.username}'s role was updated to ${updated.role}.`
      );
      setMessageType("success");
    } catch (error) {
      setMessage(
        getErrorMessage(error, "Unable to update user role")
      );
      setMessageType("error");
    } finally {
      setUpdatingId(null);
    }
  }

  if (loading) {
    return <Loader message="Loading registered users..." />;
  }

  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">USER MANAGEMENT</p>
          <h1>Registered CodeArena accounts</h1>
          <p>
            Search accounts, review authentication providers, and
            update platform roles.
          </p>
        </div>

        <div className="header-count">
          <strong>{filteredUsers.length}</strong>
          <span>accounts shown</span>
        </div>
      </header>

      <section className="management-toolbar">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search username or email"
        />

        <select
          value={roleFilter}
          onChange={(event) =>
            setRoleFilter(event.target.value)
          }
        >
          <option value="ALL">All roles</option>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </section>

      {message && (
        <Alert type={messageType}>{message}</Alert>
      )}

      <section className="table-card">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Email</th>
                <th>Provider</th>
                <th>Role</th>
                <th>Created</th>
                <th>Change role</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => {
                const isCurrentAdmin =
                  user.email === currentAdmin?.email;

                return (
                  <tr key={user.userId}>
                    <td>#{user.userId}</td>
                    <td>
                      <div className="table-user">
                        <span className="avatar">
                          {user.profilePicture ? (
                            <img
                              src={user.profilePicture}
                              alt=""
                            />
                          ) : (
                            user.username
                              ?.charAt(0)
                              ?.toUpperCase()
                          )}
                        </span>
                        <strong>{user.username}</strong>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.authProvider}</td>
                    <td>
                      <RoleBadge role={user.role} />
                    </td>
                    <td>{formatDate(user.createdAt)}</td>
                    <td>
                      <select
                        className="role-select"
                        value={user.role}
                        disabled={
                          isCurrentAdmin ||
                          updatingId === user.userId
                        }
                        onChange={(event) =>
                          changeRole(user, event.target.value)
                        }
                      >
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>

                      {isCurrentAdmin && (
                        <small className="current-account-label">
                          Current account
                        </small>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
