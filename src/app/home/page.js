import Nav from "../components/Nav";
import Video from "../components/Video";

import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authConfig);
  return (
    <div>
      <Nav />
      <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
        <Video
          videoId="569598e4-650b-46bd-8b70-128a799ec372"
          title="First video"
          description="This is the first video on my tiktok channel. Hello everyone"
          src="http://localhost:3000/uploads/videos/toktik.mp4"
          authorImg={session.user.image}
          authorName="Najt"
          authorUsername="najt"
          likedByUser={true}
          likes={100}
          comments={[]}
        />
      </div>
    </div>
  );
}
