import Logo from "@/components/layouts/Logo";
import React from "react";

const loading = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-285px)]">
      <span className="animate-ping">
        <Logo></Logo>
      </span>
    </div>
  );
};

export default loading;
