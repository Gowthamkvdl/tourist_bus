import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://tourist-bus-backend.onrender.com/api",
  withCredentials: true,
});   

export default apiRequest;
