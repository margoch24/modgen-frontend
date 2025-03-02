import { BackendUrlType, Env } from "@/common/types";
import axios from "axios";
import { StorageType } from "../common/hooks/useStorage";
import { isWindowDefined } from "@/common/utils/browser";

const NODE_ENV = process.env.NODE_ENV;
const PROD_BASE_URL = process.env.NEXT_PUBLIC_PROD_BASE_URL;
const DEV_BASE_URL = process.env.NEXT_PUBLIC_DEV_BASE_URL;
const PROD_BASE_URL_TWO = process.env.NEXT_PUBLIC_PROD_BASE_URL_TWO;
const DEV_BASE_URL_TWO = process.env.NEXT_PUBLIC_DEV_BASE_URL_TWO;
const APP_TOKEN = process.env.NEXT_PUBLIC_APP_TOKEN;

const axiosInstance = axios.create({
  baseURL: NODE_ENV === Env.Production ? PROD_BASE_URL : DEV_BASE_URL,
  headers: {
    "App-Token": APP_TOKEN,
  },
});

export const getAxiosInstance = () => {
  const backendUrlType = isWindowDefined()
    ? JSON.parse(window[StorageType.SessionStorage]["backendUrlType"] || '""')
    : BackendUrlType.One;

  const backendUrl =
    NODE_ENV === Env.Production
      ? backendUrlType === BackendUrlType.Two
        ? PROD_BASE_URL_TWO
        : PROD_BASE_URL
      : backendUrlType === BackendUrlType.Two
        ? DEV_BASE_URL_TWO
        : DEV_BASE_URL;

  console.log(backendUrl, axiosInstance.defaults.baseURL);

  if (backendUrl !== axiosInstance.defaults.baseURL) {
    axiosInstance.defaults.baseURL = backendUrl;
  }

  return axiosInstance;
};
