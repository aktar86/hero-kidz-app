"use client";
import React, { useMemo, useState } from "react";
import CartItem from "../cards/CartItem";

const CartSection = ({ cartItems = [] }) => {
  const [items, setItems] = useState(cartItems);
  const totalItems = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items],
  );

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item._id != id));
  };

  return (
    <div>
      <p className="font-semibold mt-3">
        <span className="text-primary ">{items.length}</span> items found in the
        cart{" "}
      </p>
      {/* cart */}
      <div className="flex gap-5 ">
        <div className="flex-3 space-y-2">
          {items.map((item, index) => (
            <CartItem
              key={index}
              item={{ ...item, _id: item._id.toString() }}
              removeItem={removeItem}
            />
          ))}
        </div>
        <div className="flex-2 border">
          <h1>Total Items:{totalItems} </h1>
        </div>
      </div>
    </div>
  );
};

export default CartSection;
