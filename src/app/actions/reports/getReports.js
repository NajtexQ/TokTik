import prisma from "@/lib/prisma";

export default async function getReports() {
  const reports = await prisma.report.findMany({
    include: {
      video: true,
      user: true,
    },
  });

  return reports;
}
