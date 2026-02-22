"use client";
import Link from "next/link";
import React from "react";

const Error404 = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-285px)]">
      <h1 className="text-red-500 font-bold text-4xl">404</h1>
      <h2 className="font-bold text-2xl">Page Not Found</h2>

      <Link href="/" className="btn btn-secondary mt-5">
        Return Home
      </Link>
    </div>
  );
};

export default Error404;
