import axios from "axios";

const {
  VITE_API_BASE_URL,
  // VITE_API_KEY
} = import.meta.env;

const client = axios.create({
  baseURL: VITE_API_BASE_URL,
  /*   headers: {
    "X-Api-Key": VITE_API_KEY,
  }, */
});

export default client;
