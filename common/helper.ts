import { StorageType } from "./hooks/useStorage";
import { BackendUrlType, Env } from "./types";
import { isWindowDefined } from "./utils/browser";

const PROD_BASE_URL = process.env.NEXT_PUBLIC_PROD_BASE_URL;
const DEV_BASE_URL = process.env.NEXT_PUBLIC_DEV_BASE_URL;
const PROD_BASE_URL_TWO = process.env.NEXT_PUBLIC_PROD_BASE_URL_TWO;
const DEV_BASE_URL_TWO = process.env.NEXT_PUBLIC_DEV_BASE_URL_TWO;

export const getBackendImage = (imageURL: string) => {
  const backendUrlType = isWindowDefined()
    ? JSON.parse(window[StorageType.SessionStorage]["backendUrlType"] || '""')
    : "";

  const baseURL =
    process.env.NODE_ENV === Env.Production
      ? backendUrlType === BackendUrlType.Two
        ? PROD_BASE_URL_TWO
        : PROD_BASE_URL
      : backendUrlType === BackendUrlType.Two
        ? DEV_BASE_URL_TWO
        : DEV_BASE_URL;
  return `${baseURL}/image?filename=${imageURL}`;
};
