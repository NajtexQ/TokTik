import prisma from "@/lib/prisma";

export default async function getReports() {
  const reports = await prisma.report.findMany({
    include: {
      video: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              username: true,
              image: true,
            },
          },
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
        },
      },
    },
  });

  return reports;
}
