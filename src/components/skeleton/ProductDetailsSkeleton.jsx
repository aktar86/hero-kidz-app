import React from "react";

const ProductDetailsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 animate-pulse">
      {/* Back */}
      <div className="flex justify-center mb-5">
        <div className="h-5 w-24 bg-gray-300 rounded" />
      </div>

      {/* Card */}
      <div className="bg-white border rounded-2xl p-8">
        {/* Image */}
        <div className="flex justify-center mb-10">
          <div className="w-[400px] h-[400px] bg-gray-200 rounded-xl" />
        </div>

        {/* Title */}
        <div className="space-y-3">
          <div className="h-8 w-2/3 bg-gray-300 rounded" />
          <div className="h-5 w-1/2 bg-gray-200 rounded" />
        </div>

        {/* Price */}
        <div className="flex gap-3 mt-4">
          <div className="h-8 w-24 bg-gray-300 rounded" />
          <div className="h-6 w-16 bg-gray-200 rounded" />
        </div>

        {/* Description lines */}
        <div className="space-y-2 mt-6">
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 w-4/5 bg-gray-200 rounded" />
        </div>

        {/* Button */}
        <div className="h-12 bg-gray-300 rounded-full mt-6" />
      </div>

      {/* QnA */}
      <div className="mt-10 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-1/2 bg-gray-300 rounded" />
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
