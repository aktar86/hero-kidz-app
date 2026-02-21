import Banner from "@/components/home/Banner";
import Products from "@/components/home/Products";

export default function Home() {
  return (
    <div className="my-5 border space-y-20">
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
