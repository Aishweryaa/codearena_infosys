import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  loginUser,
  loginWithGoogle,
  registerUser,
} from "../api/authApi.js";
import { getCurrentUser } from "../api/userApi.js";

const AuthContext = createContext(null);

function normalizeRole(role) {
  return String(role || "USER")
    .replace("ROLE_", "")
    .toUpperCase();
}

function profilePictureStorageKey(data) {
  const identity = data?.userId ?? data?.id ?? data?.email ?? "default";
  return `codearena_profile_picture_${identity}`;
}

function getSavedProfilePicture(data) {
  return localStorage.getItem(profilePictureStorageKey(data));
}

function userFromResponse(data) {
  return {
    userId: data.userId ?? data.id ?? null,
    username: data.username ?? "Coder",
    email: data.email ?? "",
    role: normalizeRole(data.role),
    authProvider: data.authProvider ?? "LOCAL",
    profilePicture: getSavedProfilePicture(data) || data.profilePicture || null,
    createdAt: data.createdAt ?? null,
  };
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem("codearena_token")
  );

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("codearena_user")) || null;
    } catch {
      return null;
    }
  });

  const [initializing, setInitializing] = useState(true);

  function saveAuthentication(data) {
    if (!data?.token) {
      throw new Error("JWT token was not returned by the backend");
    }

    const authenticatedUser = userFromResponse(data);

    localStorage.setItem("codearena_token", data.token);
    localStorage.setItem(
      "codearena_user",
      JSON.stringify(authenticatedUser)
    );

    setToken(data.token);
    setUser(authenticatedUser);

    return authenticatedUser;
  }

  function logout() {
    localStorage.removeItem("codearena_token");
    localStorage.removeItem("codearena_user");
    setToken(null);
    setUser(null);
  }

  function updateProfilePicture(profilePicture) {
    setUser((currentUser) => {
      if (currentUser) {
        const storageKey = profilePictureStorageKey(currentUser);

        if (profilePicture) {
          localStorage.setItem(storageKey, profilePicture);
        } else {
          localStorage.removeItem(storageKey);
        }
      }

      if (!currentUser) {
        return currentUser;
      }

      const updatedUser = {
        ...currentUser,
        profilePicture: profilePicture || null,
      };

      localStorage.setItem(
        "codearena_user",
        JSON.stringify(updatedUser)
      );

      return updatedUser;
    });
  }

  useEffect(() => {
    async function initializeSession() {
      if (!token) {
        setInitializing(false);
        return;
      }

      try {
        const profile = await getCurrentUser();
        const refreshedUser = userFromResponse(profile);

        localStorage.setItem(
          "codearena_user",
          JSON.stringify(refreshedUser)
        );
        setUser(refreshedUser);
      } catch {
        logout();
      } finally {
        setInitializing(false);
      }
    }

    initializeSession();
  }, [token]);

  useEffect(() => {
    window.addEventListener("codearena:session-expired", logout);

    return () => {
      window.removeEventListener("codearena:session-expired", logout);
    };
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      initializing,
      isAuthenticated: Boolean(token),
      isAdmin: normalizeRole(user?.role) === "ADMIN",
      login: async (email, password) =>
        saveAuthentication(await loginUser(email, password)),
      register: async (username, email, password) =>
        saveAuthentication(
          await registerUser(username, email, password)
        ),
      googleLogin: async (credential) =>
        saveAuthentication(await loginWithGoogle(credential)),
      logout,
      updateProfilePicture,
    }),
    [token, user, initializing]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
