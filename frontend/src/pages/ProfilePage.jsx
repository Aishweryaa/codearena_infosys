import { useEffect, useRef, useState } from "react";
import { getCurrentUser } from "../api/userApi.js";
import { getErrorMessage } from "../api/http.js";
import {
  Alert,
  formatDate,
  Loader,
  RoleBadge,
} from "../components/Common.jsx";
import { Icon } from "../components/Icons.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { avatarPresets } from "../utils/avatarPresets.js";

const MAX_UPLOAD_SIZE = 5 * 1024 * 1024;

function resizeProfileImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error("Unable to read the selected image"));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("The selected file is not a valid image"));
      image.onload = () => {
        const size = 512;
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = size;
        canvas.height = size;

        const cropSize = Math.min(image.width, image.height);
        const sourceX = (image.width - cropSize) / 2;
        const sourceY = (image.height - cropSize) / 2;

        context.drawImage(
          image,
          sourceX,
          sourceY,
          cropSize,
          cropSize,
          0,
          0,
          size,
          size
        );

        resolve(canvas.toDataURL("image/jpeg", 0.86));
      };
      image.src = reader.result;
    };

    reader.readAsDataURL(file);
  });
}

export default function ProfilePage() {
  const { user, updateProfilePicture } = useAuth();
  const fileInputRef = useRef(null);
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  async function handleImageUpload(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setMessage("");
    setSuccessMessage("");

    if (!file.type.startsWith("image/")) {
      setMessage("Please select a JPG, PNG or WebP image");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_UPLOAD_SIZE) {
      setMessage("Profile image must be smaller than 5 MB");
      event.target.value = "";
      return;
    }

    try {
      setSaving(true);
      const resizedImage = await resizeProfileImage(file);
      updateProfilePicture(resizedImage);
      setSuccessMessage("Profile picture updated successfully");
    } catch (error) {
      setMessage(error.message || "Unable to update profile picture");
    } finally {
      setSaving(false);
      event.target.value = "";
    }
  }

  function chooseAvatar(avatar) {
    updateProfilePicture(avatar.src);
    setMessage("");
    setSuccessMessage(`${avatar.label} selected`);
  }

  function removePicture() {
    updateProfilePicture(null);
    setMessage("");
    setSuccessMessage("Default profile icon restored");
  }

  if (loading) {
    return <Loader message="Loading your profile..." />;
  }

  const displayProfile = profile || user;
  const profilePicture = user?.profilePicture || profile?.profilePicture;
  const initial = displayProfile?.username?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="page-stack profile-page-redesign">
      <header className="page-header">
        <div>
          <p className="eyebrow">PERSONALIZE YOUR ACCOUNT</p>
          <h1>Profile and avatar studio</h1>
          <p>
            Upload your picture or choose an illustrated avatar. Your
            selection appears instantly in the navigation bar.
          </p>
        </div>
      </header>

      {message && <Alert>{message}</Alert>}
      {successMessage && <Alert type="success">{successMessage}</Alert>}

      {displayProfile && (
        <>
          <section className="profile-studio-grid">
            <article className="profile-preview-card">
              <span className="profile-preview-glow" />
              <div className="profile-picture-frame">
                {profilePicture ? (
                  <img src={profilePicture} alt={`${displayProfile.username}'s profile`} />
                ) : (
                  <span>{initial}</span>
                )}
                <span className="profile-online-badge" />
              </div>

              <p className="eyebrow">YOUR CODEARENA IDENTITY</p>
              <h2>{displayProfile.username}</h2>
              <p>{displayProfile.email}</p>
              <RoleBadge role={displayProfile.role} />

              <input
                accept="image/png,image/jpeg,image/webp"
                className="visually-hidden"
                onChange={handleImageUpload}
                ref={fileInputRef}
                type="file"
              />

              <div className="profile-upload-actions">
                <button
                  className="button button-primary"
                  disabled={saving}
                  onClick={() => fileInputRef.current?.click()}
                  type="button"
                >
                  <Icon name="plus" size={17} />
                  {saving ? "Processing..." : "Upload picture"}
                </button>

                <button
                  className="button button-secondary"
                  onClick={removePicture}
                  type="button"
                >
                  Remove
                </button>
              </div>

              <small>JPG, PNG or WebP · Maximum 5 MB</small>
            </article>

            <article className="avatar-picker-card">
              <div className="avatar-picker-heading">
                <div>
                  <p className="eyebrow">QUICK AVATARS</p>
                  <h2>Choose your coding character</h2>
                </div>
                <span>{avatarPresets.length} avatars</span>
              </div>

              <p className="muted">
                These friendly illustrated avatars work offline and can be
                changed anytime. You can also upload an exported Bitmoji image.
              </p>

              <div className="avatar-preset-grid">
                {avatarPresets.map((avatar) => {
                  const selected = profilePicture === avatar.src;

                  return (
                    <button
                      aria-label={`Select ${avatar.label}`}
                      className={`avatar-preset${selected ? " is-selected" : ""}`}
                      key={avatar.id}
                      onClick={() => chooseAvatar(avatar)}
                      type="button"
                    >
                      <img src={avatar.src} alt="" />
                      {selected && <span><Icon name="check" size={15} /></span>}
                    </button>
                  );
                })}
              </div>
            </article>
          </section>

          <section className="profile-details-grid">
            <article>
              <span>User ID</span>
              <strong>{displayProfile.userId ?? displayProfile.id}</strong>
            </article>

            <article>
              <span>Username</span>
              <strong>{displayProfile.username}</strong>
            </article>

            <article>
              <span>Email address</span>
              <strong>{displayProfile.email}</strong>
            </article>

            <article>
              <span>Authentication provider</span>
              <strong>{displayProfile.authProvider || "LOCAL"}</strong>
            </article>

            <article>
              <span>Account role</span>
              <strong>{displayProfile.role}</strong>
            </article>

            <article>
              <span>Account created</span>
              <strong>{formatDate(displayProfile.createdAt)}</strong>
            </article>
          </section>
        </>
      )}
    </div>
  );
}
