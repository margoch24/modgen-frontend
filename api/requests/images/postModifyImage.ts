import { getAxiosInstance } from "@/api/getAxiosInstance";
import { Endpoints, ModifyImageType, ResponseData } from "@/common/types";
import { AxiosError, AxiosResponse } from "axios";

export const postModifyImage = async (formData: FormData | null) => {
  try {
    return await getAxiosInstance().post<ResponseData<ModifyImageType>>(
      Endpoints.postModifyImage,
      formData
    );
  } catch (error) {
    return (error as AxiosError).response as AxiosResponse<
      ResponseData<ModifyImageType>
    >;
  }
};
