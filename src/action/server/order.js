"use server";

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { getCart } from "./cart";

const { dbConnect, collection } = require("@/lib/dbConnect");

const ordersCollection = dbConnect(collection.ORDER);

export const createOrder = async (payload) => {
  const user = (await getServerSession(authOptions)) || {};
  if (!user) {
    return { success: false };
  }

  const cart = await getCart();

  console.log(cart);

  if (cart.length === 0) {
    return false;
  }

  const newOrder = {
    createdAt: new Date().toISOString(),
    item: cart,
    ...payload,
  };

  const result = await ordersCollection.insertOne(newOrder);
  return { success: Boolean(result.insertedId) };
};
