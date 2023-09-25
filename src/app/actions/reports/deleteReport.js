import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function deleteReport(id) {
  const session = await getServerSession(authConfig);

  if (!session) {
    return new Response(JSON.stringify({ error: "Not authenticated" }));
  }

  const report = await prisma.report.delete({
    where: {
      id,
    },
  });

  return report;
}
