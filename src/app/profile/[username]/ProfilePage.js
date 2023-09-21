"use client";

import Nav from "@/app/components/Nav";
import Button from "@/app/components/Button";

import { useState } from "react";

import axios from "axios";

import Image from "next/image";

export default function ProfilePage(props) {
  const [isFollowing, setIsFollowing] = useState(props.isFollowing);

  const videoClick = (id) => {
    window.location.href = "/video/?id=" + id;
  };

  const follow = async () => {
    console.log("follow");
    setIsFollowing(!isFollowing);
    try {
      const url = "/api/user/follow?userId=" + props.id;
      console.log(url);
      const res = await axios.post(url);
      console.log(res);
    } catch (e) {
      console.log(e);
      setIsFollowing(!isFollowing);
    }
  };

  return (
    <>
      <Nav />
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="w-full max-w-[720px] h-full max-h-[600px] rounded-lg drop-shadow-lg bg-gray-50 flex flex-col items-center justify-center gap-8">
          <Image
            src={props.image}
            alt="TokTik Logo"
            width={80}
            height={80}
            priority
            className="rounded-full"
          />
          <div className="flex flex-col items-center gap-1">
            <h1 className="font-semibold text-xl">{props.name}</h1>
            <h1>@{props.username}</h1>
            {props.isOwner &&
              (!isFollowing ? (
                <Button text="Follow" style="w-40 mt-4" func={follow} />
              ) : (
                <Button
                  text="Unfollow"
                  style="w-40 mt-4 bg-gray-400"
                  func={follow}
                />
              ))}
          </div>
          <div className="w-full mt-4 flex justify-center gap-16">
            <div className="flex flex-col gap-1 items-center">
              <h1 className="font-semibold">Followers</h1>
              <h2>{props.followers}</h2>
            </div>
            <div className="flex flex-col gap-1 items-center ">
              <h1 className="font-semibold">Following</h1>
              <h2>{props.following}</h2>
            </div>
          </div>
          <div className="flex flex-col items-center mt-4 gap-2 h-grow">
            <h1 className="font-semibold text-lg">Videos</h1>
            <div className="w-96 grid grid-cols-3 gap-2 p-4 max-h-[100px] h-full overflow-y-auto">
              {props.videos.map((video) => (
                <div
                  className="h-full rounded-lg drop-shadow-lg bg-gray-50 flex flex-col items-center justify-center gap-8"
                  onClick={() => videoClick(video.id)}
                  key={video.id}
                >
                  <div className="flex flex-col items-center gap-1 p-2">
                    <h1 className="font-medium text-lg">{video.title}</h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
