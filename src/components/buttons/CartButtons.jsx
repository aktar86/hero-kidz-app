"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const CartButtons = ({ product }) => {
  const router = useRouter();
  const pathname = usePathname();

  // clean destructure
  const { status } = useSession();

  const handleAddToCart = () => {
    // still checking session
    if (status === "loading") return;

    // not logged in → go login
    if (status !== "authenticated") {
      router.replace(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }

    //  logged in → add to cart logic
    alert(product._id);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="btn btn-primary btn-block btn-sm md:btn-md"
    >
      Add to Cart
    </button>
  );
};

export default CartButtons;
