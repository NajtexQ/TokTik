import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

export async function GET(req) {
  const session = await getServerSession(authConfig);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const username = req.nextUrl.searchParams.get("username");

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  const followingCount = await prisma.follows.count({
    where: {
      followerId: user.id,
    },
  });

  const followerCount = await prisma.follows.count({
    where: {
      userId: user.id,
    },
  });

  return new Response(JSON.stringify({ followerCount, followingCount }));
}
