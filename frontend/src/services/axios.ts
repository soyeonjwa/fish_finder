import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://test.fishfinder.site/",
  headers: {
    "Content-Type": "application/json",
  },
});
