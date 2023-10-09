"use client";

import Nav from "../components/Nav";

import { useState, useEffect } from "react";

export default function SearchPage({ search, listOfVideos }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    listOfVideos.forEach((video) => {
      setVideos((videos) => [...videos, video]);
    });
  }, []);

  return (
    <>
      <Nav />
      <div className="w-screen h-screen flex flex-col gap-4 items-center justify-center">
        <h1 className="text-xl font-semibold">Searching for: {search}</h1>
        <div className="w-full max-w-[720px] h-full max-h-[600px] rounded-lg drop-shadow-lg bg-gray-100 flex flex-col gap-8 p-4 overflow-auto">
          {videos.map((video) => (
            <div
              key={video.id}
              className="w-full h-[150px] flex flex-col items-center justify-center gap-4 bg-white cursor-pointer rounded-lg"
              onClick={() => {
                location.replace(`/video?id=/${video.id}`);
              }}
            >
              <div className="flex flex-col items-center gap-1">
                <h1 className="font-semibold text-xl">{video.title}</h1>
                <h1>@{video.user.username}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
