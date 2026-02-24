"use client";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

const SocialLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callback") || "/";

  const handleSocialLogin = async () => {
    const result = await signIn("google", { redirect: false, callbackUrl });

    if (result?.ok) {
      router.push(callbackUrl || "/");
      Swal.fire({
        icon: "success",
        text: "Login Successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      Swal.error("error", "sorry", "error");
    }
  };
  return (
    <button
      onClick={handleSocialLogin}
      className="btn btn-outline btn-error hover:text-white w-full my-3"
    >
      <FcGoogle className="text-lg" />
      Sign in With Google
    </button>
  );
};

export default SocialLogin;
