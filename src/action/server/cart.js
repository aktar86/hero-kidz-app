"use server";

import { authOptions } from "@/lib/authOptions";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { cache } from "react";

const { dbConnect, collection } = require("@/lib/dbConnect");

const cartCollection = dbConnect(collection.CART);

// cart post if not added before. if added then it update
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

//get all cart
//cache kore rakhbe
export const getCart = cache(async () => {
  const user = (await getServerSession(authOptions)) || {};
  if (!user) {
    return [];
  }

  const query = { email: user?.email };
  const result = cartCollection.find(query).toArray();
  return result;
});

// delete cart
export const deleteItemsFromCart = async (id) => {
  const user = (await getServerSession(authOptions)) || {};
  if (!user) {
    return { success: false };
  }
  if (id?.length != 24) {
    return { success: false };
  }

  const query = { _id: new ObjectId(id) };
  const result = await cartCollection.deleteOne(query);

  //jehetu client component use kora hocche tai comnt kore raka hoyese
  // if (Boolean(result.deletedCount)) {
  //   revalidatePath("/cart");
  // }
  return { success: Boolean(result.deletedCount) };
};
