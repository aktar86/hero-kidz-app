import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-285px)]">
      <h1 className="text-red-500 font-bold text-2xl">404</h1>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/" className="btn btn-primary mt-5">
        Return Home
      </Link>
    </div>
  );
}
