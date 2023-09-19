import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

export async function POST(req) {
  const session = await getServerSession(authConfig);
  if (!session) {
    return new Response(JSON.stringify({ error: "Not authenticated" }));
  }

  const { videoId, comment } = await req.json();

  const newComment = await prisma.comment.create({
    data: {
      text: comment,
      videoId,
      userId: session.user.id,
    },
  });

  return new Response(JSON.stringify(newComment));
}
