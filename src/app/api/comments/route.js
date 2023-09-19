import prisma from "@/lib/prisma";

export async function GET(req) {
  const { videoId } = req.nextUrl.searchParams.get("videoId");

  const comments = await prisma.comment.findMany({
    where: {
      videoId,
    },
    include: {
      user: true,
    },
  });

  return new Response(JSON.stringify(comments));
}
