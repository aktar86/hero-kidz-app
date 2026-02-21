"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({ href, children }) => {
  const path = usePathname();

  const isActive = path === href;

  return (
    <Link
      href={href}
      className={`${isActive ? "text-primary" : "text-gray-500"} font-medium transition-colors`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
