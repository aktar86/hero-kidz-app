import { fontBangla, hindSiliguri } from "@/app/layout";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Banner = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row  items-center">
      {/* text content */}
      <div className="flex-1 space-y-3">
        {/* <h1 className={`text-7xl font-bold ${fontBangla.className} `}>
          আপনার শিশুকে সুন্দর ভবিষ্যত দিন
        </h1> */}
        <h1 className={`text-6xl font-bold ${hindSiliguri.className} `}>
          আপনার শিশুকে দিন একটি{" "}
          <span className="text-primary">সুন্দর ভবিষ্যত</span>
        </h1>
        <p className="text-xl">
          Buy every toy with 15% discount upcomming offer{" "}
        </p>
        <Link href={"/"}>
          <button className="btn btn-primary btn-outline">
            Explore Products
          </button>
        </Link>
      </div>
      {/* image */}
      <div className="flex-1 flex justify-center items-center">
        <Image
          src={"/assets/hero.png"}
          alt="আপনার শিশুকে সুন্দর ভবিষ্যত দিন"
          width={600}
          height={500}
        ></Image>
      </div>
    </div>
  );
};

export default Banner;
