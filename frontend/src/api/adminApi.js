import http from "./http.js";

export async function getAdminDashboard() {
  return (await http.get("/admin/dashboard")).data;
}

export async function getUsers() {
  return (await http.get("/admin/users")).data;
}

export async function updateUserRole(userId, role) {
  return (
    await http.put(`/admin/users/${userId}/role`, {
      role,
    })
  ).data;
}
