import { ModifyImageType, VerifyImageType } from "@/common/types";
import ImageContainer from "./ImageContainer";
import { Button } from "./ui/button";
import { getBackendImage } from "@/common/helper";
import { useEffect, useTransition } from "react";
import { getVerifyImage } from "@/api/requests/images/getVerifyImage";
import { toast } from "sonner";

function ImageVerifier({
  imageData,
  isUploadPending,
  previewOriginalUrl,
  updateVerifiedData,
  updateIsVerificationPending,
  updateImageData,
}: {
  imageData: ModifyImageType;
  isUploadPending: boolean;
  previewOriginalUrl: string;
  updateVerifiedData: (data: VerifyImageType) => void;
  updateIsVerificationPending: (isPending: boolean) => void;
  updateImageData: (data: ModifyImageType) => void;
}) {
  const { modification_id, modified_filename } = imageData;
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    updateIsVerificationPending(isPending);
  }, [isPending, updateIsVerificationPending]);

  const handleVerifyImage = () => {
    if (!modification_id) {
      return;
    }

    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 100);

    startTransition(async () => {
      try {
        const response = await getVerifyImage(modification_id);
        const { error, data } = response?.data ?? {};

        if (error) {
          toast.error(data?.message || "Internal server error");
          return;
        }
        const { reversed_filename, status } = data;
        updateVerifiedData({
          reversed_filename,
          status,
        });

        updateImageData({
          ...imageData,
          modification_id: "",
        });

        toast.success("Successfully verified");
      } catch {
        toast.error("Internal server error");
      }
    });
  };
  return (
    <div className="text-center">
      <div className="sm:flex flex-row items-center sm:w-[90%] m-auto space-y-10 sm:space-y-0">
        <ImageContainer
          title="Original image"
          isUploadPending={isUploadPending}
          imageUrl={previewOriginalUrl}
        />
        <ImageContainer
          title="Modified Image"
          isUploadPending={isUploadPending}
          imageUrl={modified_filename ? getBackendImage(modified_filename) : ""}
        />
      </div>
      <Button
        onClick={handleVerifyImage}
        disabled={!modification_id}
        className="cursor-pointer mt-10"
      >
        Verify image reversibility
      </Button>
      <hr className="h-px my-6 bg-gray-200 border-0"></hr>
    </div>
  );
}

export default ImageVerifier;
