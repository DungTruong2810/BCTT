import axios from "axios";
import AppURL from "./appURL";
const axiosInstanceConfig = {
  baseURL: AppURL.endpoid,
  headers: {
    accept: "application/json",
  },
};
export const axiosInstance = axios.create(axiosInstanceConfig);
