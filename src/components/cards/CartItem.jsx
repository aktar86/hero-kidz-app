"use client";

import { deleteItemsFromCart } from "@/action/server/cart";
import Image from "next/image";
import { useState } from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const CartItem = ({ item, removeItem }) => {
  const { title, image, price, quantity, _id } = item;

  const totalPrice = Number(price * quantity);

  const handleDeleteCart = async () => {
    // deleteItemsFromCart(_id)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await deleteItemsFromCart(_id);

        if (result.success) {
          removeItem(_id);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Ops!",
            text: "Something went wrong",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="card card-side bg-base-100 shadow-md p-4 items-center gap-4 border border-gray-200 ">
      {/* Image */}
      <figure className="relative">
        <Image
          src={image}
          alt={title}
          width={100}
          height={100}
          className="object-cover rounded-lg"
        />
      </figure>

      {/* Info */}
      <div className="flex-1 space-y-2">
        <h2 className="font-semibold text-lg">{title}</h2>

        <p className="text-primary font-bold">${price}</p>

        {/* Quantity Control */}
        <div className="flex items-center gap-3">
          <button
            disabled={quantity <= 1}
            className={` btn btn-sm btn-outline `}
          >
            <FaMinus />
          </button>

          <span className="font-semibold text-lg w-6 text-center">
            {quantity}
          </span>

          <button className="btn btn-sm btn-outline">
            <FaPlus />
          </button>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col items-end gap-3">
        <p className="font-bold text-lg">${totalPrice}</p>

        <button
          onClick={handleDeleteCart}
          className="btn btn-error btn-sm text-white"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
