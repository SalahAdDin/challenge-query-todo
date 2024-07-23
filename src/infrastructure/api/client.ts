import axios from "axios";

const { BASE_URL } = import.meta.env;

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-Api-Key": "",
  },
});

export default client;
