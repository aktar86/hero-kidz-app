import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center gap-2">
      <Image
        alt="logo-hero-kidz"
        src={"/assets/logo.png"}
        width={50}
        height={40}
      ></Image>
      <h2 className="text-2xl font-bold">
        Hero<span className="text-primary">Kidz.</span>
      </h2>
    </Link>
  );
};

export default Logo;
