import axios from "axios";

const API = axios.create({
  baseURL: "https://jobverse-nhfv.onrender.com/api",
});

// Automatically attach the logged-in user's token to every request
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("jobverse_user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default API;
