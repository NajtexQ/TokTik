import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import prisma from "@/lib/prisma";

import deleteVideo from "@/app/actions/deleteVideo";

export async function POST(req) {
  const session = await getServerSession(authConfig);

  if (!session) {
    return new Response(JSON.stringify({ error: "Not authenticated" }));
  }

  const videoId = req.nextUrl.searchParams.get("videoId");

  const video = await prisma.video.findUnique({
    where: {
      id: videoId,
    },
  });

  console.log("Video");
  console.log(video);

  if (!video) {
    console.log("Video not found");
    return new Response(JSON.stringify({ error: "Video not found" }));
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (video.userId !== session.user.id && !user.isAdmin) {
    console.log("Not authorized 1");
    return new Response(JSON.stringify({ error: "Not authorized" }));
  }

  console.log("Deleting video");

  await deleteVideo(videoId);

  console.log("Video deleted");

  return new Response(JSON.stringify({ success: true }));
}
