import prisma from "@/lib/prisma";

export default async function getVideosBySearch(search) {
  const videos = await prisma.video.findMany({
    where: {
      tags: {
        some: {
          name: {
            contains: search,
          },
        },
      },
    },
    include: {
      user: true,
    },
  });

  return videos;
}
