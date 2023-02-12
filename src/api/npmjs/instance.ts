import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_NPM_JS,
  headers: {
    "accept-language": "en",
    "content-type": "application/json",
  },
});

instance.interceptors.request.use(
  async (config) => {
    return config;
  },
  async (error) => {
    throw error;
  }
);

instance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    throw error;
  }
);

export { instance };
