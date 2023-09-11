import { NextAuthOptions, User, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

import { PrismaAdapter } from "@auth/prisma-adapter";

import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

import prisma from "../../prisma/client";

export const authConfig = {
  adapter: PrismaAdapter(prisma),
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
  callbacks: {},
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
  },
  pages: {
    signIn: "/signin",
  },
};
