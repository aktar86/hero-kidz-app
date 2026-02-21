"use client";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const ProductDetailsCard = ({ product }) => {
  const router = useRouter();
  const {
    title,
    bangla,
    image,
    price,
    discount,
    description,
    ratings,
    reviews,
    sold,
    info,
    qna,
  } = product;

  const discountedPrice = price - (price * discount) / 100;
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="w-full flex justify-center items-center">
        <button
          onClick={() => router.back()}
          className=" font-semibold hover:text-primary cursor-pointer"
        >
          <span className="flex  items-center gap-2">
            <ArrowLeft></ArrowLeft> <span>Go Back</span>
          </span>
        </button>
      </div>
      <div className="border border-gray-200 mt-5  gap-5 bg-white rounded-2xl  p-8">
        {/* LEFT SIDE - IMAGE */}
        <div className="  flex mb-10 justify-center items-center">
          <Image
            src={image}
            alt={title}
            width={500}
            height={500}
            className="rounded-xl object-contain"
          />
        </div>

        {/* RIGHT SIDE - DETAILS */}
        <div className="  space-y-5">
          {/* Title */}
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-gray-600 mt-1">{bangla}</p>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-green-600">
              ৳{discountedPrice}
            </span>

            {discount > 0 && (
              <>
                <span className="line-through text-gray-400">৳{price}</span>
                <span className="bg-red-500 text-white px-3 py-1 rounded-md text-sm">
                  -{discount}%
                </span>
              </>
            )}
          </div>

          {/* Rating */}
          <div className="flex gap-6 text-sm text-gray-600">
            <span>⭐ {ratings}</span>
            <span>📝 {reviews} Reviews</span>
            <span>🛒 {sold} Sold</span>
          </div>

          {/* Description */}
          <div>
            <h2 className="font-semibold text-lg mb-2">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{description}</p>
          </div>

          {/* Info */}
          <div>
            <h2 className="font-semibold text-lg mb-2">Key Features</h2>
            <ul className="list-disc ml-5 space-y-1 text-gray-700">
              {info.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          {/* btn  */}
          <div>
            <button className="btn btn-primary w-full rounded-full mt-5">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* QnA Section */}
      <div className="mt-10 bg-white p-8 rounded-2xl border border-gray-200 ">
        <h2 className="text-xl font-bold mb-6">Questions & Answers</h2>

        <div className="space-y-5 ">
          {qna.map((item, i) => (
            <div key={i} className="border-b pb-4">
              <p className="font-semibold">Q: {item.question}</p>
              <p className="text-gray-700 mt-1">A: {item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
