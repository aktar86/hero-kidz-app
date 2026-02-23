"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    // 👉 replace with your API / next-auth
    const form = {
      email,
      password,
    };
    console.log(form);
    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    console.log(result);

    if (result?.ok) {
      router.push("/");
    } else {
      alert(result?.error || "Login Failed");
    }

    setLoading(false);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to your account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              required
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>

            <div className="relative">
              <input
                type={show ? "text" : "password"}
                required
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

        {/* Extra Links */}
        <div className="flex justify-between mt-4 text-sm text-gray-600">
          <span className="flex">
            <p>dont have account?</p>
            <button
              onClick={() => router.push("/register")}
              className="underline text-blue-600 cursor-pointer"
            >
              Register
            </button>
          </span>

          <button
            onClick={() => router.push("/forgot-password")}
            className="hover:text-blue-600"
          >
            Forgot password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
