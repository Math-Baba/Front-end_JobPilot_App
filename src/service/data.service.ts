import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5555",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
