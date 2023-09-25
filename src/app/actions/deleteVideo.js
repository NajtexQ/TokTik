import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

export default async function deleteVideo(id) {
  const session = await getServerSession(authConfig);

  if (!session) {
    return new Response(JSON.stringify({ error: "Not authenticated" }));
  }

  const video = await prisma.video.delete({
    where: {
      id,
    },
  });

  return video;
}
