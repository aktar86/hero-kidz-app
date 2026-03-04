"use client";
import React, { useMemo, useState } from "react";

import { useRouter } from "next/navigation";
import CartItem from "./CartItem";

const CartSection = ({ cartItems = [] }) => {
  const router = useRouter();
  const [items, setItems] = useState(cartItems);

  const totalItems = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items],
  );

  const totalAmount = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [items],
  );

  const removeItem = (id) => {
    // jei id milbena oi id takbe. r mile gele bad jabe
    // true return korle takbe
    //false return korle bad jabe
    // 2 != 2 false. bad jabe
    setItems((prev) => prev.filter((item) => item._id != id));
  };

  const updateQuantity = async (id, qty) => {
    setItems((prev) =>
      prev.map((item) => (item._id == id ? { ...item, quantity: qty } : item)),
    );
  };

  const handleConfirmOrder = () => {
    alert("Order Confirmed ✅");
  };

  const deliveryFee = 80;

  const onConfirm = () => {
    if (items.length > 0) {
      handleConfirmOrder();
      router.push("/checkout");
    }
  };

  return (
    <div>
      <p className="font-semibold mt-3">
        <span className="text-primary ">{items.length}</span> items found in the
        cart
      </p>
      {/* cart */}
      <div className="flex gap-5 ">
        <div className="flex-4 space-y-2">
          {items.map((item, index) => (
            <CartItem
              key={index}
              item={{ ...item, _id: item._id.toString() }}
              removeItem={removeItem}
              updateQuantity={updateQuantity}
            />
          ))}
        </div>

        {/* right part  */}
        {/* RIGHT SIDE ORDER SUMMARY */}
        <div className="flex-2">
          <div className="bg-white shadow-lg rounded-2xl p-6 sticky top-6 border border-gray-200">
            <h2 className="text-2xl font-bold mb-5">Order Summary</h2>

            {/* Product List */}
            <div className="space-y-4 border-b pb-4">
              {items.map((item) => (
                <div key={item._id} className="flex justify-between text-sm">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-gray-500">
                      Qty: {item.quantity} × ${item.price}
                    </p>
                  </div>

                  <span className="font-semibold">
                    ${(item.quantity * Number(item.price)).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-4 space-y-2">
              {/* Total Item */}
              <div className="flex justify-between text-gray-600">
                <span>Total Item</span>
                <span>{totalItems}</span>
              </div>
              {/* delivery Fee */}
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>{deliveryFee}</span>
              </div>

              {/* sub-total */}
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{totalAmount.toFixed(2)}</span>
              </div>

              {/* Total */}
              <div className="flex justify-between text-xl font-bold">
                <span>Total Price</span>
                <span>${(totalAmount + deliveryFee).toFixed(2)}</span>
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={onConfirm}
              disabled={!items.length}
              className={`${!items.length && "cursor-not-allowed"} w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition disabled:bg-gray-400 `}
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSection;
