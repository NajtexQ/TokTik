import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

export async function POST(req, { params }) {
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

    if (like) {
      return new Response(JSON.stringify({ error: "Already liked" }));
    }
    const addLike = await prisma.like.create({
      data: {
        userId: session.user.id,
        videoId: id,
      },
    });
    return new Response({ true: "true" });
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify({ error: "There was an error" }));
  }
}
