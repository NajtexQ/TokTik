import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

export async function POST(req) {
  const session = await getServerSession(authConfig);

  if (!session) {
    return new Response(JSON.stringify({ error: "Not authenticated" }));
  }

  const videoId = req.nextUrl.searchParams.get("videoId");

  const findReport = await prisma.report.findFirst({
    where: {
      userId: session.user.id,
      videoId,
    },
  });

  if (findReport) {
    return new Response(
      JSON.stringify({ error: "You have already reported the video!" })
    );
  }

  const report = await prisma.report.create({
    data: {
      userId: session.user.id,
      videoId,
    },
  });

  return new Response(JSON.stringify(report));
}
