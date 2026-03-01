import { getCart } from "@/action/server/cart";

import React from "react";

const CartPage = async () => {
  const carts = await getCart();

  return (
    <div>
      <div>
        <h2 className="font-bold text-5xl border-l-10 pl-5 py-3 text-primary">
          My Cart
        </h2>
        <p className="font-semibold mt-3">
          <span className="text-primary ">{carts.length}</span> items found in
          the cart{" "}
        </p>
      </div>
    </div>
  );
};

export default CartPage;

{
  /* <p></p> */
}
