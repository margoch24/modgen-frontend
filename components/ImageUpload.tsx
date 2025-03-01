"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { postModifyImage } from "@/api/requests/images/postModifyImage";
import { toast } from "sonner";
import { MAX_WIDTH, ModifyImageType, VerifyImageType } from "@/common/types";

function ImageUpload({
  updateImageData,
  updateIsPending,
  updatePreviewOriginalUrl,
  updateVerifiedData,
}: {
  updateImageData: (data: ModifyImageType) => void;
  updateIsPending: (isPrending: boolean) => void;
  updatePreviewOriginalUrl: (url: string) => void;
  updateVerifiedData: (data: VerifyImageType) => void;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    updateIsPending(isPending);
  }, [isPending, updateIsPending]);

  const handleModifyImage = () => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    startTransition(async () => {
      try {
        const response = await postModifyImage(formData);
        const { error, data } = response?.data ?? {};

        if (error) {
          toast.error(data?.message || "Internal server error");
          return;
        }

        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        const { original_filename, modified_filename, modification_id } = data;
        updateImageData({
          original_filename,
          modified_filename,
          modification_id,
        });
        toast.success("Successfully modified");
      } catch {
        toast.error("Internal server error");
      }
    });
  };

  const resizeImage = (file: File) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onloadend = () => {
      img.src = reader.result as string;
    };

    img.onload = () => {
      if (img.width <= 1000) {
        return setSelectedFile(file);
      }
      const canvas = document.createElement("canvas");
      const scale = MAX_WIDTH / img.width;
      const newHeight = img.height * scale;

      canvas.width = MAX_WIDTH;
      canvas.height = newHeight;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, MAX_WIDTH, newHeight);
      }

      canvas.toBlob((blob) => {
        if (!blob) {
          return;
        }
        const resizedFile = new File([blob], file.name, { type: file.type });
        setSelectedFile(resizedFile);
      }, file.type);
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    if (file.name !== selectedFile?.name || file.type !== selectedFile.type) {
      updateImageData({
        original_filename: "",
        modified_filename: "",
        modification_id: "",
      });
      updateVerifiedData({
        reversed_filename: "",
        status: "",
        ssim_modified: 0,
        ssim_reversed: 0,
      });
    }
    resizeImage(file);
    updatePreviewOriginalUrl(URL.createObjectURL(file));
  };

  return (
    <>
      <Card className="max-w-fit mx-auto my-8 shadow-md">
        <CardContent>
          <div className="flex flex-row items-end space-x-3">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Picture</Label>
              <Input
                ref={fileInputRef}
                onChange={handleFileChange}
                className="cursor-pointer"
                type="file"
              />
            </div>
            <Button
              onClick={handleModifyImage}
              disabled={!selectedFile || isPending}
              className="cursor-pointer"
            >
              {isPending ? "modifying..." : "modify"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <hr className="h-px my-12 bg-gray-200 border-0"></hr>
    </>
  );
}

export default ImageUpload;
