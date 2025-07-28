import axios from "axios";

// Instance Axios servant pour les requêtes HTTP vers le backend
const API = axios.create({
  baseURL: "http://localhost:5555",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
