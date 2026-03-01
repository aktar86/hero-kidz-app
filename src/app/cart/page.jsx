import { getCart } from "@/action/server/cart";
import CartItem from "@/components/cards/CartItem";
import CartSection from "@/components/ui/CartSection";

import React from "react";

const CartPage = async () => {
  const cartItems = await getCart();
  const formattedItems = cartItems.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));

  return (
    <div>
      {/* title */}
      <div>
        <h2 className="font-bold text-5xl border-l-10 pl-5 py-3 text-primary">
          My Cart
        </h2>
      </div>

      <CartSection cartItems={formattedItems} />
    </div>
  );
};

export default CartPage;
