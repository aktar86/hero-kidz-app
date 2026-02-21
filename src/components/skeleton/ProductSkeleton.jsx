import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="card w-full max-w-sm bg-base-100 shadow-xl border border-base-200">
      {/* Image Skeleton */}
      <div className="px-4 pt-4">
        <div className="skeleton h-52 w-full rounded-xl bg-gray-200"></div>
      </div>

      <div className="card-body p-5">
        {/* Title Skeleton */}
        <div className="skeleton h-5 w-3/4 mb-2 bg-gray-200"></div>
        <div className="skeleton h-5 w-1/2 mb-4 bg-gray-200"></div>

        {/* Ratings Skeleton */}
        <div className="flex items-center gap-2 mt-1">
          <div className="skeleton h-4 w-20 bg-gray-200"></div>
          <div className="skeleton h-3 w-10 bg-gray-200"></div>
        </div>

        {/* Pricing Skeleton */}
        <div className="mt-4 flex items-baseline gap-2">
          <div className="skeleton h-8 w-24 bg-gray-200"></div>
          <div className="skeleton h-4 w-12 bg-gray-200"></div>
        </div>

        {/* Button Skeleton */}
        <div className="card-actions mt-4">
          <div className="skeleton h-10 w-full bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
