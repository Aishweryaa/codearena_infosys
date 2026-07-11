const API_BASE_URL = "";

const API = {
  login: "/api/v1/auth/login",
  register: "/api/v1/auth/register",
  problems: "/api/v1/problem",
  submissions: "/api/v1/submissions",
  leaderboard: "/api/v1/leaderboard",
};

function getToken() {
  return localStorage.getItem("token");
}

function getRole() {
  return localStorage.getItem("userRole");
}

function saveLogin(data, username) {
  const token = data.token || data.jwt || data.accessToken;
  const roleRaw = data.role || data.userRole || "ADMIN";
  const role = roleRaw.replace("ROLE_", "").toUpperCase();

  if (token) {
    localStorage.setItem("token", token);
  }

  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("userRole", role);
  localStorage.setItem("username", data.username || username || "Admin");
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userRole");
  localStorage.removeItem("username");

  window.location.href = "/login.html";
}

function handleLogout() {
  logout();
}

function requireAdmin() {
  const token = getToken();
  const role = getRole();

  if (!token) {
    window.location.href = "/login.html";
    return;
  }

  if (role !== "ADMIN") {
    alert("Only admin can access this page");
    window.location.href = "/index.html";
  }
}

async function apiRequest(url, method = "GET", body = null) {
  const headers = {
    "Content-Type": "application/json",
  };

  const token = getToken();

  if (token) {
    headers.Authorization = "Bearer " + token;
  }

  const response = await fetch(API_BASE_URL + url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  let data = null;

  try {
    data = await response.json();
  } catch (e) {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.message || data?.error || "Request failed");
  }

  return data;
}

function showToast(message, type = "info") {
  alert(message);
}