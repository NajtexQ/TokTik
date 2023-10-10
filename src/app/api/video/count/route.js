import prisma from "@/lib/prisma";

export async function GET(req) {
  const count = await prisma.video.count();

  console.log("This is count: ", count);

  return new Response(JSON.stringify(count));
}
