import GoogleProvider from "next-auth/providers/google";
import { loginUser } from "@/action/server/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { collection, dbConnect } from "./dbConnect";

const userCollections = dbConnect(collection.USERS);

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // ...add more providers here
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        // username: { label: "Username", type: "text", placeholder: "jsmith" },
        // password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await loginUser(credentials);
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isExist = await userCollections.findOne({ email: user?.email });

      if (!isExist) {
        const newUser = {
          provider: account?.provider,
          name: user?.name,
          email: user?.email,
          image: user?.image,
          role: "user",
          createdAt: new Date().toISOString(),
        };
        const result = await userCollections.insertOne(newUser);
      }

      return true;
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
    async session({ session, user, token }) {
      if (token) {
        session.role = token?.role;
        session.email = token?.email;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.role = user?.role;
        token.email = user?.email;
      }
      return token;
    },
  },
};
