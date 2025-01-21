import { Spinner } from "@nextui-org/react";
import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner color="default" label="Loading..." />
    </div>
  );
};

export default Loader;
