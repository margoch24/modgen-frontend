import ImageSkeleton from "./ImageSkeleton";

function ImageContainer({
  title,
  imageUrl,
  isUploadPending,
}: {
  title: string;
  imageUrl: string;
  isUploadPending: boolean;
}) {
  return (
    <div className="flex-1">
      <h5 className="text-sm text-black pb-2">{title}</h5>
      <ImageSkeleton imageUrl={imageUrl} isUploadPending={isUploadPending} />
    </div>
  );
}

export default ImageContainer;
