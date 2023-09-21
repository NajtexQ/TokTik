import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

export async function GET(req, { params }) {
  const session = await getServerSession(authConfig);
  if (!session) {
    return new Response(JSON.stringify({ error: "Not authenticated" }));
  }

  const { id } = params;
  const video = await prisma.video.findUnique({
    where: {
      id,
    },
  });

  console.log(video);

  const author = await prisma.user.findUnique({
    where: {
      id: video.userId,
    },
  });

  const likesCount = await prisma.like.count({
    where: {
      videoId: id,
    },
  });

  const likedByUser = await prisma.like.findFirst({
    where: {
      videoId: id,
      userId: session.user.id,
    },
  });

  return new Response(
    JSON.stringify({
      ...video,
      likedByUser: likedByUser ? true : false,
      likes: likesCount,
      author: {
        name: author.name,
        username: author.username,
        image: author.image,
      },
    })
  );
}
