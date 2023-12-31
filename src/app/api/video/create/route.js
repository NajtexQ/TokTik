import prisma from "../../../../../prisma/client";

import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

import { v4 as uuidv4 } from "uuid";

import { videoUpload } from "@/app/serverFunctions/videoUpload";

export async function POST(req, res) {
  const session = await getServerSession(authConfig);

  if (!session) {
    return new Response(JSON.stringify({ error: "Not authenticated" }));
  }
  try {
    const formData = await req.formData();

    if (!formData) {
      return new Response(JSON.stringify({ error: "No form data" }));
    }

    const file = formData.get("video");
    const title = formData.get("title");
    const desc = formData.get("desc");
    const tags = JSON.parse(formData.get("tags"));

    if (!file) {
      return new Response(JSON.stringify({ error: "No file" }));
    }

    if (!file.name.endsWith(".mp4")) {
      return new Response(JSON.stringify({ error: "Invalid file type" }));
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
        url: fileName,
        userId: session.user.id,
      },
    };

    console.log(data);

    const video = await prisma.video.create(data);

    const tagsData = tags.map((tag) => {
      return {
        name: tag,
        videoId: video.id,
      };
    });

    const tagsResponse = await prisma.tag.createMany({
      data: tagsData,
    });

    return new Response(JSON.stringify(video));
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify({ error: e }));
  }
}
