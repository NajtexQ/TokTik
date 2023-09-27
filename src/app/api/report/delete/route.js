import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

export async function POST(req) {
  const session = await getServerSession(authConfig);

  if (!session) {
    return new Response(JSON.stringify({ error: "Not authenticated" }));
  }

  const reportId = req.nextUrl.searchParams.get("reportId");

  const report = await prisma.report.delete({
    where: {
      id: reportId,
    },
  });

  return new Response(JSON.stringify(report));
}
