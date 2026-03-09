"use client";

import { handleCart } from "@/action/server/cart";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

const CartButtons = (product) => {
  const router = useRouter();
  const pathname = usePathname();
  const { status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  console.log(product);
  const handleAddToCart = async () => {
    setIsLoading(true);

    if (status == "authenticated") {
      const result = await handleCart(product._id);
      if (result.success) {
        Swal.fire("Added to Cart", product?.title, "success");
      } else {
        Swal.fire("Ops!", "somethis went wrong", "error");
      }
      setIsLoading(false);
    } else {
      router.replace(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      setIsLoading(false);
    }
  };

  return (
    <button
      disabled={status === "loading" || isLoading}
      onClick={handleAddToCart}
      className="btn btn-primary btn-block btn-sm md:btn-md"
    >
      Add to Cart
    </button>
  );
};

export default CartButtons;
