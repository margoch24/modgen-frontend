import { VerificationStatus, VerifyImageType } from "@/common/types";
import ImageContainer from "./ImageContainer";
import { getBackendImage } from "@/common/helper";
import CustomSkeleton from "./CustomSkeleton";
import { CircularProgress } from "@mui/material";
import { CircleCheckBig, CircleX } from "lucide-react";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

function ImageStatus({
  isVerificationPending,
  verifiedData,
}: {
  isVerificationPending: boolean;
  verifiedData: VerifyImageType;
}) {
  const { reversed_filename, status, ssim_modified, ssim_reversed } =
    verifiedData;

  const roundNum = (number: number) => {
    return Math.round((number + Number.EPSILON) * 100) / 100;
  };
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

            <Table className="mt-10 w-fit mx-auto">
              <TableBody>
                <TableRow>
                  <TableCell className="text-left w-[180px]">
                    Reversed similarity %
                  </TableCell>
                  <TableCell className="text-left">
                    {roundNum(ssim_reversed * 100)} %
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-left w-[180px]">
                    Modified similarity %
                  </TableCell>
                  <TableCell className="text-left">
                    {roundNum(ssim_modified * 100)} %
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
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
