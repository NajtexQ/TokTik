import prisma from "@/lib/prisma";

export async function GET(req) {
  const count = await prisma.video.count();

  return new Response(JSON.stringify(count));
}
