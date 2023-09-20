import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

import prisma from "@/lib/prisma";

export async function GET(req) {
  const session = await getServerSession(authConfig);
  if (!session) {
    return new Response(JSON.stringify({ error: "Not authenticated" }));
  }

  console.log(req.nextUrl.searchParams);

  const skip = req.nextUrl.searchParams.get("value") - 1;

  if (skip < 0) {
    return new Response(JSON.stringify({ error: "Invalid value" }));
  }

  console.log(skip);

  const videos = await prisma.video.findMany({
    skip: skip,
    take: 1,
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!videos.length) {
    return new Response(JSON.stringify({ error: "No videos found" }));
  }

  const author = await prisma.user.findUnique({
    where: {
      id: videos[0].userId,
    },
  });

  const likes = await prisma.like.count({
    where: {
      videoId: videos[0].id,
    },
  });

  const likedByUser = await prisma.like.findFirst({
    where: {
      videoId: videos[0].id,
      userId: session.user.id,
    },
  });

  return new Response(
    JSON.stringify({
      ...videos[0],
      likes,
      likedByUser: likedByUser != null ? true : false,
      author,
    })
  );
}
