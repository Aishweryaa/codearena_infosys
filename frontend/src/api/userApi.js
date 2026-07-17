import http from "./http.js";

export async function getCurrentUser() {
  return (await http.get("/users/me")).data;
}

export async function getUserDashboard() {
  return (await http.get("/dashboard/user")).data;
}
