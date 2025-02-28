import { Card } from "./ui/card";
import CustomSkeleton from "./CustomSkeleton";

function ImageSkeleton({
  imageUrl,
  isUploadPending,
}: {
  imageUrl: string;
  isUploadPending: boolean;
}) {
  return (
    <>
      {imageUrl ? (
        <Card
          className="min-h-[300px] bg-[#E3E2E2] w-[80%] m-auto rounded-xl bg-contain bg-center bg-no-repeat shadow-md"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        ></Card>
      ) : (
        <>
          {isUploadPending ? (
            <CustomSkeleton />
          ) : (
            <div className="min-h-[300px] w-[80%] m-auto bg-[#E3E2E2] rounded-xl"></div>
          )}
        </>
      )}
    </>
  );
}

export default ImageSkeleton;
