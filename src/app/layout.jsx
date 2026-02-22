import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";

const poppins = Poppins({
  weight: ["200", "400", "500", "600", "700"],
});

export const fontBangla = localFont({
  src: "./../fonts/mayaboti-normal.ttf",
  // weight: ["100", "200", "300", "500", "700", "900"],
});

export const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "700"],
});

export const metadata = {
  metadataBase: new URL("https://hero-kidz-mauve.vercel.app"),

  title: {
    default: "Hero Kidz | Fun & Educational Toys for Kids",
    template: "%s | Hero Kidz",
  },

  description:
    "Shop colorful and educational toys for kids. Learning boards, puzzles, number games, and development toys. Safe, fun, and smart play for children.",

  keywords: [
    "Hero Kidz",
    "kids toys",
    "educational toys",
    "learning board",
    "number counting toys",
    "children toys online",
    "kids ecommerce store Bangladesh",
  ],

  authors: [{ name: "Hero Kidz Team" }],
  creator: "Hero Kidz",
  publisher: "Hero Kidz",

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    title: "Hero Kidz – Educational Toys Store",
    description:
      "Fun learning toys & development products for kids. Shop now at Hero Kidz.",
    url: "https://hero-kidz-app.vercel.app",
    siteName: "Hero Kidz",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hero Kidz Toys Banner",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Hero Kidz – Kids Educational Toys",
    description: "Safe, colorful and smart learning toys for children.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  category: "ecommerce",
};
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        {/* header */}
        <header className="max-w-11/12 mx-auto">
          <Navbar></Navbar>
        </header>

        {/* main  */}
        <main className="max-w-11/12 mx-auto min-h-[calc(100vh-286px)]">
          {" "}
          {children}
        </main>

        {/* footer */}
        <footer>
          <Footer></Footer>
        </footer>
      </body>
    </html>
  );
};
export default RootLayout;
