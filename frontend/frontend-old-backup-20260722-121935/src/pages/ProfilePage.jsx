import { useEffect, useState } from "react";
import { getCurrentUser } from "../api/userApi.js";
import { getErrorMessage } from "../api/http.js";
import {
  Alert,
  formatDate,
  Loader,
  RoleBadge,
} from "../components/Common.jsx";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then(setProfile)
      .catch((error) =>
        setMessage(
          getErrorMessage(error, "Unable to load profile")
        )
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader message="Loading your profile..." />;
  }

  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">ACCOUNT PROFILE</p>
          <h1>My CodeArena account</h1>
          <p>
            Review the identity and role returned by your
            protected profile API.
          </p>
        </div>
      </header>

      {message && <Alert>{message}</Alert>}

      {profile && (
        <>
          <section className="profile-hero-card">
            <span className="profile-avatar">
              {profile.profilePicture ? (
                <img src={profile.profilePicture} alt="" />
              ) : (
                profile.username?.charAt(0)?.toUpperCase()
              )}
            </span>

            <div>
              <p className="eyebrow">AUTHENTICATED USER</p>
              <h2>{profile.username}</h2>
              <p>{profile.email}</p>
              <RoleBadge role={profile.role} />
            </div>
          </section>

          <section className="profile-details-grid">
            <article>
              <span>User ID</span>
              <strong>{profile.userId}</strong>
            </article>

            <article>
              <span>Username</span>
              <strong>{profile.username}</strong>
            </article>

            <article>
              <span>Email address</span>
              <strong>{profile.email}</strong>
            </article>

            <article>
              <span>Authentication provider</span>
              <strong>{profile.authProvider}</strong>
            </article>

            <article>
              <span>Account role</span>
              <strong>{profile.role}</strong>
            </article>

            <article>
              <span>Account created</span>
              <strong>{formatDate(profile.createdAt)}</strong>
            </article>
          </section>
        </>
      )}
    </div>
  );
}
