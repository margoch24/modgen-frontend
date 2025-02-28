import { Env } from "@/common/types";
import axios from "axios";
const NODE_ENV = process.env.NODE_ENV;
const PROD_BASE_URL = process.env.NEXT_PUBLIC_PROD_BASE_URL;
const DEV_BASE_URL = process.env.NEXT_PUBLIC_DEV_BASE_URL;
const APP_TOKEN = process.env.NEXT_PUBLIC_APP_TOKEN;

const axiosInstance = axios.create({
  baseURL: NODE_ENV === Env.Production ? PROD_BASE_URL : DEV_BASE_URL,
  headers: {
    "App-Token": APP_TOKEN,
  },
});

export default axiosInstance;
