import { getCart } from "@/action/server/cart";
import CheckOut from "@/components/ui/CheckOut";
import React from "react";

const CheckOutPage = async () => {
  const cartItems = await getCart();
  const formattedItems = cartItems.map((items) => ({
    ...items,
    _id: items._id.toString(),
  }));
  return (
    <div>
      <CheckOut cartItems={formattedItems}></CheckOut>
    </div>
  );
};

export default CheckOutPage;
