import axios from "axios";

const apiRequest = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,

  // baseURL: "https://tourist-bus-backend.onrender.com/api",
  // withCredentials: true,
});   

export default apiRequest;
