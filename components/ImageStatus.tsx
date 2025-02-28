import { VerificationStatus, VerifyImageType } from "@/common/types";
import ImageContainer from "./ImageContainer";
import { getBackendImage } from "@/common/helper";
import CustomSkeleton from "./CustomSkeleton";
import { CircularProgress } from "@mui/material";
import { CircleCheckBig, CircleX } from "lucide-react";

function ImageStatus({
  isVerificationPending,
  verifiedData,
}: {
  isVerificationPending: boolean;
  verifiedData: VerifyImageType;
}) {
  const { reversed_filename, status } = verifiedData;
  return (
    <div className="sm:flex flex-row items-center sm:w-[90%] m-auto text-center my-10 space-y-10 sm:space-y-0">
      {reversed_filename && status && (
        <ImageContainer
          title="Reversed image"
          isUploadPending={isVerificationPending}
          imageUrl={reversed_filename ? getBackendImage(reversed_filename) : ""}
        />
      )}
      {isVerificationPending && (
        <div className="flex-1">
          <h5 className="text-sm text-black pb-2">Reversed image</h5>
          <CustomSkeleton />
        </div>
      )}
      <div className="flex-1">
        {reversed_filename && status && (
          <>
            <h5 className="text-sm text-black pb-3">Verification status:</h5>
            {status === VerificationStatus.Success ? (
              <div className="flex flex-row items-center justify-center space-x-2">
                <h4 className="text-sm text-black font-bold">Reversible</h4>
                <CircleCheckBig color="green" size={30} />
              </div>
            ) : (
              <div className="flex flex-row items-center justify-center space-x-2">
                <h4 className="text-sm text-black font-bold">Irreversible</h4>
                <CircleX color="red" size={30} />
              </div>
            )}
          </>
        )}
        {isVerificationPending && (
          <>
            <h5 className="text-sm text-black pb-5">Verification status:</h5>
            <CircularProgress color="inherit" className="opacity-45" />
          </>
        )}
      </div>
    </div>
  );
}

export default ImageStatus;
