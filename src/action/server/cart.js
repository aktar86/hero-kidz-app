"use server";

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

const { dbConnect, collection } = require("@/lib/dbConnect");

const cartCollection = dbConnect(collection.CART);

export const handleCart = async ({ product, inc = true }) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) {
    return { success: false };
  }

  //getcartitem=> user.email && productId
  const query = { email: user?.email, productId: product?._id };
  const isAdded = await cartCollection.findOne(query);

  if (isAdded) {
    //if exixt = update
    const updateData = {
      $inc: {
        quantity: inc ? 1 : -1,
      },
    };

    const result = await cartCollection.updateOne(query, updateData);

    return { success: Boolean(result.modifiedCount) };
  } else {
    //not exixt = insert

    const newCart = {
      productId: product?._id,
      email: user?.email,
      title: product?.title,
      quantity: 1,
      image: product?.image,
      price: parseFloat(product.price * (1 - product.discount / 100)).toFixed(
        2,
      ),
      username: user?.name,
    };

    const result = await cartCollection.insertOne(newCart);
    return { success: result.acknowledged };
  }
};
