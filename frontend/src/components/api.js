import axios from "axios";

// Créer une instance Axios pour effectuer des requêtes HTTP
const api = axios.create({
    baseURL: "http://localhost:5000", // URL de ton backend
    headers: {
        "Content-Type": "application/json",
    }
});

export default api;
