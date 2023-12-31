import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

import ProfilePage from "./ProfilePage";

import { redirect } from "next/navigation";

import getProfile from "@/app/actions/getProfile";

export default async function page({ params }) {
  const session = await getServerSession(authConfig);

  if (!session) {
    return redirect("/signin");
  }

  const username = params.username;

  console.log(username);

  const profile = await getProfile(username);

  return (
    <>
      <ProfilePage
        id={profile.id}
        username={profile.username}
        name={profile.name}
        image={profile.image}
        followers={profile.followers}
        following={profile.following}
        videos={profile.videos}
        isFollowing={false}
        isOwner={session.user.id === profile.id}
      />
    </>
  );
}
