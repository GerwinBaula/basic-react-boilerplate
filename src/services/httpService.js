import Axios from "axios";
import config from "../config.json";
import { toast } from "react-toastify";

Axios.defaults.headers.common["user-key"] = config.API_KEY;

Axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    // Get a logger service for to log unexpected errors
    console.log("Logging the error", error);
    toast.error(error);
  }

  return Promise.reject(error);
});

export default {
  get: Axios.get,
  post: Axios.post,
  update: Axios.update,
  delete: Axios.delete
};
