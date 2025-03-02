export enum Env {
  Production = "production",
  Development = "development",
  Test = "test",
}

export enum Endpoints {
  postModifyImage = "/modify-image",
  getVerifyImage = "/verify-image",
}

export type ResponseData<T> = {
  data: T & { message?: string };
  error: boolean;
};

export type VerifyImageType = {
  reversed_filename: string;
  status: string;
  modified_status?: boolean;
  ssim_modified: number;
  ssim_reversed: number;
};
export type ModifyImageType = {
  original_filename: string;
  modified_filename: string;
  modification_id: string;
};

export enum VerificationStatus {
  Pending = "pending",
  Success = "true",
  Fail = "false",
}

export const MAX_WIDTH = 1000;

export enum BackendUrlType {
  One = "one",
  Two = "two",
}
