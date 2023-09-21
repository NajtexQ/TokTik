import prisma from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

export default async function getProfile(username) {
  const session = await getServerSession(authConfig);

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
    },
  });

  const followers = await prisma.follows.count({
    where: {
      userId: user.id,
    },
  });

  const following = await prisma.follows.count({
    where: {
      followerId: user.id,
    },
  });

  const isFollowing = await prisma.follows.findFirst({
    where: {
      userId: user.id,
      followerId: session.user.id,
    },
  });

  const videos = await prisma.video.findMany({
    where: {
      userId: user.id,
    },
  });

  //   console.log({
  //     ...user,
  //     followers,
  //     following,
  //     isFollowing: isFollowing ? true : false,
  //     videos,
  //   });

  return {
    ...user,
    followers,
    following,
    isFollowing: isFollowing ? true : false,
    videos,
  };
}
