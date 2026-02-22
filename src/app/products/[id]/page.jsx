import { getSingleProduct } from "@/action/server/product";
import ProductDetailsCard from "@/components/cards/ProductDetailsCard";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getSingleProduct(id);

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      images: [product.image],
    },
  };
}

const ProductDetails = async ({ params }) => {
  const { id } = await params;
  const product = await getSingleProduct(id);

  return <ProductDetailsCard product={product}></ProductDetailsCard>;
};

export default ProductDetails;
