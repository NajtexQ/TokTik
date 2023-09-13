import prisma from "../../../../../../prisma/client";

import { getServerSession } from "next-auth";

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

  return new Response(
    JSON.stringify({
      ...video,
      author: {
        name: author.name,
        username: author.username,
        image: author.image,
      },
    })
  );
}
