import { getAxiosInstance } from "@/api/getAxiosInstance";
import { Endpoints, ResponseData, VerifyImageType } from "@/common/types";
import { AxiosError, AxiosResponse } from "axios";

export const getVerifyImage = async (modification_id: string) => {
  try {
    return await getAxiosInstance().get<ResponseData<VerifyImageType>>(
      Endpoints.getVerifyImage + `?modification_id=${modification_id}`
    );
  } catch (error) {
    return (error as AxiosError).response as AxiosResponse<
      ResponseData<VerifyImageType>
    >;
  }
};
