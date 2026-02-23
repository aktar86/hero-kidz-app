"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import SocialLogin from "./SocialLogin";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ⭐ callback url detect
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl, // ⭐ VERY IMPORTANT
      });

      // login failed
      if (result?.error) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Email or password incorrect",
        });
        return;
      }

      // success
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Successfully login",
        showConfirmButton: false,
        timer: 1200,
      });

      router.push(callbackUrl || "/");
    } catch (err) {
      console.log(err);

      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to your account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>

            <div className="relative">
              <input
                type={show ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-3 text-sm text-gray-500"
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {/* or operatior  */}

        <div className="mt-5 flex justify-center items-center gap-5">
          <hr className="grow border border-gray-300" />
          <p>or</p>
          <hr className="grow border border-gray-300" />
        </div>
        {/* social login */}
        <SocialLogin />

        <div className="mt-5 flex gap-2">
          <p>Don't have an account? </p>{" "}
          <Link href={"/register"} className="text-blue-500">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
