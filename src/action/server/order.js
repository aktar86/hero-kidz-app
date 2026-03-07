"use server";

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { clearCart, getCart } from "./cart";
import { orderInvoiceTemplate } from "@/lib/orderInvoice";
import { sendEmail } from "@/lib/sendEmail";

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

  if (Boolean(result.insertedId)) {
    await clearCart();
  }

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // send invoice
  await sendEmail({
    to: user?.email,
    subject: "Your Order Invoice - Hero Kidz",
    html: orderInvoiceTemplate({
      orderId: result.insertedId,
      items: cart,
      totalPrice: totalAmount,
    }),
  });
  return { success: Boolean(result.insertedId) };
};
