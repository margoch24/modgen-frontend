import { Skeleton } from "@mui/material";

function CustomSkeleton() {
  return (
    <Skeleton
      sx={{
        minHeight: "300px",
        width: "80%",
        margin: "auto",
        borderRadius: "12px",
        background: "#E3E2E2",
        transformOrigin: "inherit",
        transform: "inherit",

        "&::after": {
          background:
            "linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.08), transparent)",
          animationDuration: "1s",
        },
      }}
      animation="wave"
    />
  );
}

export default CustomSkeleton;
