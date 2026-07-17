import http from "./http.js";

export async function registerUser(username, email, password) {
  const response = await http.post("/auth/register", {
    username,
    email,
    password,
  });

  return response.data;
}

export async function loginUser(email, password) {
  const response = await http.post("/auth/login", {
    email,
    password,
  });

  return response.data;
}

export async function loginWithGoogle(credential) {
  const response = await http.post("/auth/google", {
    credential,
  });

  return response.data;
}
