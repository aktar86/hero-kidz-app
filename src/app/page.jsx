import Banner from "@/components/home/Banner";
import Products from "@/components/home/Products";
import TestSession from "@/components/ui/TestSession";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="my-5 border space-y-20">
      {/* server session test */}
      <div className="border border-red-600 m-5">
        <p>Server session</p>
        <p>{JSON.stringify(session)}</p>
      </div>

      <TestSession />

      {/* banner */}

      <section>
        <Banner />
      </section>

      {/* products  */}
      <section>
        <Products />
      </section>
    </div>
  );
}
