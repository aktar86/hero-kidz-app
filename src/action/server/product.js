"use server";

import { collection, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// db;
const productCollection = dbConnect(collection.PRODUCTS);

export const getProducts = async () => {
  const products = await productCollection.find().toArray();

  return products;
};

export const getSingleProduct = async (id) => {
  if (!ObjectId.isValid(id)) {
    console.error("Invalid ID format provided");
    return { message: "ID is invalid" };
  }

  const query = { _id: new ObjectId(id) };

  const product = await productCollection.findOne(query);
  return { ...product, _id: product._id.toString() } || {};
};
