"use server";

import { collection, dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

const usersCollection = dbConnect(collection.USERS);

export const postUser = async (payload) => {
  const { email, password, name } = payload;
  // check paylod
  if (!email || !password) {
    return null;
  }
  //check user

  const isExist = await usersCollection.findOne({ email });
  if (isExist) {
    return null;
  }

  //new data

  const newUser = {
    provider: "credentials",
    name,
    email,
    password: await bcrypt.hash(password, 14),
    role: "user",
    createdAt: new Date().toISOString(),
  };

  // insert data
  const result = await usersCollection.insertOne(newUser);

  if (result.acknowledged) {
    return {
      ...result,
      insertedId: result.insertedId.toString(),
    };
  }
};

export const loginUser = async (payload) => {
  const { email, password } = payload;

  if (!email || !password) {
    return null;
  }

  const user = await usersCollection.findOne({ email });
  if (!user) {
    return null;
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (isMatched) {
    return user;
  } else {
    return null;
  }
};
