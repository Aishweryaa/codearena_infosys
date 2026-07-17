import http from "./http.js";

export async function submitCode(submissionData) {
  return (
    await http.post("/submissions", submissionData)
  ).data;
}

export async function getMySubmissions() {
  return (
    await http.get("/submissions/me")
  ).data;
}

export async function getSubmission(submissionId) {
  return (
    await http.get(`/submissions/${submissionId}`)
  ).data;
}

export async function getLeaderboard() {
  return (
    await http.get("/leaderboard")
  ).data;
}

export async function getAdminSubmissions() {
  return (
    await http.get("/admin/submissions")
  ).data;
}
