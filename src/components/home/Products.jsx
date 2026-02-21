import React from "react";

// import products from "@/data/toys.json";
import ProductsCard from "../cards/ProductsCard";
import { getProducts } from "@/action/server/product";

const Products = async () => {
  const products = await getProducts();

  return (
    <div className="border border-red-400">
      <h2 className="font-bold text-2xl text-center mb-10">Our Products</h2>

      <p>Total Product: {products.length}</p>
      <div className="grid grid-cols-4 gap-4">
        {products.map((product, index) => (
          <ProductsCard key={index} product={product}></ProductsCard>
        ))}
      </div>
    </div>
  );
};

export default Products;
