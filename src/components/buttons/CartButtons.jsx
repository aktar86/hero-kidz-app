"use client";

import { handleCart } from "@/action/server/cart";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";

const CartButtons = ({ product }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { status } = useSession();
  // const isLogin = session?.status !== "authenticated";

  // const handleAddToCart = async () => {
  //   if (isLogin) {
  //     const result = await handleCart({ product, inc: true });
  //     if (result.success) {
  //       Swal.fire("Added to Cart", product?.title, "success");
  //     } else {
  //       Swal.fire("Ops!", "somethis went wrong", "error");
  //     }
  //   } else {
  //     return router.replace(
  //       `/login?callbackUrl=${encodeURIComponent(pathname)}`,
  //     );
  //   }
  // };

  const handleAddToCart = async ({}) => {
    if (status == "authenticated") {
      const result = await handleCart({ product, inc: true });
      if (result.success) {
        Swal.fire("Added to Cart", product?.title, "success");
      } else {
        Swal.fire("Ops!", "somethis went wrong", "error");
      }
    } else {
      router.replace(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
    }
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
