"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const CartButtons = ({ product }) => {
  const router = useRouter();
  const path = usePathname();
  const session = useSession();
  const isLogin = session.status === "authenticated";
  const addToCart = () => {
    if (isLogin) {
      return alert(product._id);
    } else {
      router.push(`/login?callbackUrl=${path}`);
    }
  };
  return (
    <button
      onClick={addToCart}
      className="btn btn-primary btn-block btn-sm md:btn-md"
    >
      Add to Cart
    </button>
  );
};

export default CartButtons;
