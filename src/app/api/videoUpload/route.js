import { existsSync } from "fs";
import fs from "fs/promises";
import path from "path";

import { v4 as uuidv4 } from "uuid";

export async function POST(req, session) {
  //   if (!session) {
  //     return new Response(JSON.stringify({ error: "Not authenticated" }));
  //   }

  console.log(session);

  const formData = await req.formData();

  const file = formData.get("video");

  if (!file.name.endsWith(".mp4")) {
    return new Response(JSON.stringify({ error: "Not a video" }));
  }

  const fileName = `${uuidv4()}.mp4`;

  console.log(file);

  if (!file) {
    return new Response(JSON.stringify({ error: "No file" }));
  }

  const filePath = path.join(process.cwd(), "public", "videos", fileName);

  const fileArrayBuffer = await file.arrayBuffer();

  try {
    await fs.writeFile(filePath, new Uint8Array(fileArrayBuffer));
    return new Response(
      JSON.stringify({
        file: fileName,
        url: `/videos/${fileName}`,
        size: file.size,
      })
    );
  } catch (e) {
    console.log(e);
    return new Response(JSON.stringify({ error: "Error writing file" }));
  }
}
