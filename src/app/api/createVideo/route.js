import prisma from "../../../../prisma/client";

import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

export async function POST(req) {
  try {
    const json = await req.json();

    const session = await getServerSession(authConfig);

    console.log(session);

    if (!session) {
      return new Response(JSON.stringify({ error: "Not authenticated" }));
    }

    const data = {
      data: {
        title: json.title,
        desc: "test",
        url: json.url,
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
