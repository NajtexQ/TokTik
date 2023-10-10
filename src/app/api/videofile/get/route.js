import { readFileSync } from "fs";
import path from "path";

export function GET(req, res) {
  const defPath = path.join(process.cwd(), "uploads", "videos");
  const q = new URL(req.url);

  const videoId = q.searchParams.get("videoId");
  const file = `${defPath}/${videoId}`;
  const videoBuf = readFileSync(file);
  console.log(file);
  try {
    const videoBuffer = readFileSync(file);

    return new Response(videoBuffer, {
      headers: {
        "Content-Type": "video/mp4",
      },
    });
  } catch (e) {
    console.log(e.message);
    return new Response(e.message, { status: 500 });
  }
  //console.log(res);
}
