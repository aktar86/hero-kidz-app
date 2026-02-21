import { getSingleProduct } from "@/action/server/product";
import ProductDetailsCard from "@/components/cards/ProductDetailsCard";

const ProductDetails = async ({ params }) => {
  const id = await params;
  const product = await getSingleProduct(id);

  return <ProductDetailsCard product={product}></ProductDetailsCard>;
};

export default ProductDetails;
