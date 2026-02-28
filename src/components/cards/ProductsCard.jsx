import { hindSiliguri } from "@/app/layout";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CartButtons from "../buttons/CartButtons";

const ProductsCard = ({ product }) => {
  const { _id } = product;
  const discountedPrice =
    product.price - (product.price * product.discount) / 100;

  return (
    <div className="card w-full max-w-sm bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all">
      {/* Product Image */}
      <figure className="px-4 pt-4 relative">
        <div className="relative h-52 w-full">
          <Image
            src={product.image}
            alt={product.bangla}
            width={200}
            height={180}
            className="rounded-xl object-contain w-full h-full bg-gray-50"
          />
        </div>
        {product.discount > 0 && (
          <div className="badge badge-primary absolute top-6 right-6 font-bold">
            -{product.discount}%
          </div>
        )}
      </figure>

      <div className="card-body p-5">
        {/* Title */}
        <h2
          className={`${hindSiliguri.className} font-medium card-title text-lg leading-tight h-12 overflow-hidden`}
        >
          {product.bangla}
        </h2>

        {/* Ratings */}
        <div className="flex items-center gap-2 mt-1">
          <div className="rating rating-xs">
            {[1, 2, 3, 4, 5].map((star) => (
              <input
                key={star}
                type="radio"
                className={`mask mask-star-2 ${
                  star <= Math.round(product.ratings)
                    ? "bg-orange-400"
                    : "bg-gray-300"
                }`}
                readOnly
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        {/* Pricing */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary">
            ৳{discountedPrice}
          </span>
          {product.discount > 0 && (
            <span className="text-sm line-through text-gray-400">
              ৳{product.price}
            </span>
          )}
        </div>

        {/* Action Button */}
        <div className="card-actions mt-4">
          <CartButtons
            product={{ ...product, _id: _id.toString() }}
          ></CartButtons>
          <Link href={`products/${_id}`} className="w-full">
            <button className="btn btn-primary btn-outline btn-block btn-sm md:btn-md">
              view details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
