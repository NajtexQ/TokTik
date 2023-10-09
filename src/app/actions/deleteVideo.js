import prisma from "@/lib/prisma";

export default async function deleteVideo(id) {
  await prisma.comment.deleteMany({
    where: {
      videoId: id,
    },
  });

  await prisma.like.deleteMany({
    where: {
      videoId: id,
    },
  });

  await prisma.report.deleteMany({
    where: {
      videoId: id,
    },
  });

  await prisma.tag.deleteMany({
    where: {
      videoId: id,
    },
  });

  const video = await prisma.video.delete({
    where: {
      id,
    },
  });

  return video;
}
