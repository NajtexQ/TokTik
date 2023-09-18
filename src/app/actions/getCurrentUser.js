import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function getSession() {
  return await getServerSession(authConfig);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session) {
      return new Response(JSON.stringify({ error: "Not authenticated" }));
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    return user;
  } catch (e) {
    console.log(e);
    return null;
  }
}
