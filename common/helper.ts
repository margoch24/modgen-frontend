import { Env } from "./types";

const PROD_BASE_URL = process.env.NEXT_PUBLIC_PROD_BASE_URL;
const DEV_BASE_URL = process.env.NEXT_PUBLIC_DEV_BASE_URL;

export const getBackendImage = (imageURL: string) => {
  const baseURL =
    process.env.NODE_ENV === Env.Production ? PROD_BASE_URL : DEV_BASE_URL;
  return `${baseURL}/image?filename=${imageURL}`;
};
