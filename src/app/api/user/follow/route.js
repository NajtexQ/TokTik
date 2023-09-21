import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

export async function POST(req) {
  const session = await getServerSession(authConfig);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userId = req.nextUrl.searchParams.get("userId");

  const checkFollow = await prisma.follows.findFirst({
    where: {
      followerId: session.user.id,
      userId,
    },
  });

  if (checkFollow) {
    const unfollow = await prisma.follows.delete({
      where: {
        id: checkFollow.id,
      },
    });
    return new Response(JSON.stringify(unfollow));
  } else {
    const follow = await prisma.follows.create({
      data: {
        followerId: session.user.id,
        userId,
      },
    });
    return new Response(JSON.stringify(follow));
  }
}
