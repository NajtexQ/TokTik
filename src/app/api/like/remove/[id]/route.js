import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

import prisma from "@/lib/prisma";

export async function DELETE(req, { params }) {
  const { id } = params;

  const session = await getServerSession(authConfig);
  if (!session) {
    return new Response(JSON.stringify({ error: "Not authenticated" }));
  }
  try {
    const like = await prisma.like.findFirst({
      where: {
        videoId: id,
        userId: session.user.id,
      },
    });
    if (!like) {
      return new Response(JSON.stringify({ error: "Not liked" }));
    }
    await prisma.like.delete({
      where: {
        id: like.id,
      },
    });
    return new Response({ true: "true" });
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify({ error: "There was an error" }));
  }
}
