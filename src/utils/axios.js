import axios from "axios";

const isLocalhost = window.location.hostname === "localhost";
const baseURL = isLocalhost
  ? "http://localhost:8000/"
  : "https://health-care-backend-ivory.vercel.app/";

const instance = axios.create({
  baseURL,
});

export default instance;
