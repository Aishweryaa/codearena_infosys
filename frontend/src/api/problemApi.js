import http from "./http.js";

export async function getProblems() {
  return (await http.get("/problems")).data;
}

export async function getProblem(problemId) {
  return (await http.get(`/problems/${problemId}`)).data;
}

export async function createProblem(problemData) {
  return (await http.post("/problems", problemData)).data;
}

export async function updateProblem(problemId, problemData) {
  return (await http.put(`/problems/${problemId}`, problemData)).data;
}

export async function deleteProblem(problemId) {
  await http.delete(`/problems/${problemId}`);
}

export async function getProblemTestCases(problemId) {
  return (await http.get(`/problems/${problemId}/testcases`)).data;
}

export async function createProblemTestCase(problemId, testCaseData) {
  return (
    await http.post(
      `/problems/${problemId}/testcases`,
      testCaseData
    )
  ).data;
}
