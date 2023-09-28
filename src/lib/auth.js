import { NextAuthOptions, User, getServerSession } from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";

import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

import prisma from "../../prisma/client";
import { redirect } from "next/navigation";

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_CLIENT_ID,
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    // }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      session.user.username = user.username;

      return session;
    },
  },
  events: {
    async createUser({ user }) {
      user.username = `${user.name.split(" ").join("").toLowerCase()}${
        Math.floor(Math.random() * 9000) + 1000
      }`;

      await prisma.user.update({
        where: { id: user.id },
        data: { username: user.username },
      });

      console.log("createUser", user);

      return user;
    },
    async signIn({ user }) {
      console.log(user.username);
    },
  },
  pages: {
    signIn: "/signin",
  },
};
