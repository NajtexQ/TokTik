import prisma from "../../../../../prisma/client";

import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

import { v4 as uuidv4 } from "uuid";

import { videoUpload } from "@/app/serverFunctions/videoUpload";

export async function POST(req) {
  const session = await getServerSession(authConfig);

  if (!session) {
    return new Response(JSON.stringify({ error: "Not authenticated" }));
  }
  try {
    const formData = await req.formData();

    console.log(formData);

    const file = formData.get("video");
    const title = formData.get("title");
    const desc = formData.get("desc");

    if (!file) {
      return new Response(JSON.stringify({ error: "No video" }));
    }

    if (!file.name.endsWith(".mp4")) {
      return new Response(JSON.stringify({ error: "Not a video" }));
    }

    const fileName = `${uuidv4()}.mp4`;

    const videoUploadResponse = await videoUpload(
      file,
      "uploads/videos",
      fileName
    );

    if (!videoUploadResponse) {
      return new Response(JSON.stringify({ error: "Error uploading video" }));
    }

    const data = {
      data: {
        title,
        desc,
        url: videoUploadResponse.url,
        userId: session.user.id,
      },
    };

    console.log(data);

    const video = await prisma.video.create(data);

    return new Response(JSON.stringify(video));
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify({ error: e }));
  }
}
