"use client";

import { ModifyImageType, VerifyImageType } from "@/common/types";
import ImageStatus from "@/components/ImageStatus";
import ImageUpload from "@/components/ImageUpload";
import ImageVerifier from "@/components/ImageVerifier";
import { useState } from "react";

export default function Home() {
  const [imageData, setImageData] = useState<ModifyImageType>({
    original_filename: "",
    modified_filename: "",
    modification_id: "",
  });

  const [verifiedData, setVerifiedData] = useState<VerifyImageType>({
    reversed_filename: "",
    status: "",
    ssim_modified: 0,
    ssim_reversed: 0,
  });

  const [isUploadPending, setIsUploadPending] = useState<boolean>(false);
  const [isVerificationPending, setIsVerificationPending] =
    useState<boolean>(false);

  const [previewOriginalUrl, setPreviewOriginalUrl] = useState<string>("");

  const updateImageData = (data: ModifyImageType) => {
    setImageData(data);
  };

  const updateVerifiedData = (data: VerifyImageType) => {
    setVerifiedData(data);
  };

  const updateIsUploadPending = (isPending: boolean) => {
    setIsUploadPending(isPending);
  };

  const updateIsVerificationPending = (isPending: boolean) => {
    setIsVerificationPending(isPending);
  };

  const updatePreviewOriginalUrl = (url: string) => {
    setPreviewOriginalUrl(url);
  };

  return (
    <div className="container m-auto">
      <ImageUpload
        updateIsPending={updateIsUploadPending}
        updateImageData={updateImageData}
        updatePreviewOriginalUrl={updatePreviewOriginalUrl}
        updateVerifiedData={updateVerifiedData}
      />
      <ImageVerifier
        previewOriginalUrl={previewOriginalUrl}
        isUploadPending={isUploadPending}
        imageData={imageData}
        updateIsVerificationPending={updateIsVerificationPending}
        updateVerifiedData={updateVerifiedData}
        updateImageData={updateImageData}
      />

      <ImageStatus
        isVerificationPending={isVerificationPending}
        verifiedData={verifiedData}
      />
    </div>
  );
}
