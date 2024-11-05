import React from "react";
import { CircularProgress } from "@mui/material";

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <CircularProgress size="5rem" />
    </div>
  );
};

export default LoadingIndicator;
