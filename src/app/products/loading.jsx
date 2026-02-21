import ProductSkeleton from "@/components/skeleton/ProductSkeleton";
import React from "react";

const loading = () => {
  return (
    <div>
      {
        <div className="grid grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      }
    </div>
  );
};

export default loading;
